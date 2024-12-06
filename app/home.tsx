import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, FlatList, ScrollView } from 'react-native';
import apiClient from '../header/apiClient'; // Axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
  const [showForm, setShowForm] = useState(true);
  const [recipes, setRecipes] = useState<any[]>([]); // Recipe data state
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    preparationTime: '',
    cookingTime: '',
    servings: '',
  });

  // Fetch recipes from the server
  const fetchRecipes = async () => {
    try {
      // Get userId from AsyncStorage (assuming it's stored as userId)
      const userId = await AsyncStorage.getItem('userId');
      console.log('home userId', userId);
  
      // Check if userId exists
      if (!userId) {
        Alert.alert('Error', 'User not found. Please log in.');
        return;
      }
  
      const token = await AsyncStorage.getItem('userToken');
      const response = await apiClient.get('/recipes', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('Response data:', response.data); // Log the response data
  
      // Access the recipes array correctly
      const recipes = response.data.recipes || []; // Ensure it's an array
  
      // Filter recipes by userId
      const filteredRecipes = recipes.filter(recipe => recipe.userId === userId);
  
      if (Array.isArray(filteredRecipes)) {
        setRecipes(filteredRecipes);
      } else {
        console.error('Error: Recipes data is not an array');
        setRecipes([]); // Clear the state in case of invalid data
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      Alert.alert('Error', 'Failed to fetch recipes. Please try again.');
    }
  };
  

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Handle input changes for recipe form fields
  const handleInputChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  // Add new recipe
  const handleAddRecipe = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');  // Get userId for ownership
      const newRecipe = { ...recipe, userId }; // Include userId for ownership
      const response = await apiClient.post('/recipes', newRecipe, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Recipe added successfully!');
        setRecipe({
          name: '',
          ingredients: '',
          instructions: '',
          category: '',
          preparationTime: '',
          cookingTime: '',
          servings: '',
        });
        fetchRecipes();
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      Alert.alert('Error', 'Failed to add the recipe. Please try again.');
    }
  };

  // Delete recipe
  const handleDeleteRecipe = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await apiClient.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Success', 'Recipe deleted successfully!');
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      Alert.alert('Error', 'Failed to delete the recipe. Please try again.');
    }
  };

  // Toggle the form visibility
  const toggleForm = () => setShowForm(!showForm);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleForm}>
          <Text style={styles.toggleText}>{showForm ? 'Hide Form' : 'Show Form'}</Text>
        </TouchableOpacity>

        {showForm && (
          <View style={styles.form}>
            {['name', 'ingredients', 'instructions', 'category', 'preparationTime', 'cookingTime', 'servings'].map(
              (field, idx) => (
                <TextInput
                  key={idx}
                  style={styles.input}
                  placeholder={`Enter ${field}`}
                  value={recipe[field]}
                  onChangeText={(text) => handleInputChange(field, text)}
                />
              )
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
              <Text style={styles.addText}>Add Recipe</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.header}>My Recipes</Text>
        <View style={styles.cardContainer}>
          {recipes.map((recipe, index) => (
            <View key={recipe._id || index} style={styles.card}>
              <Text style={styles.cardTitle}>{recipe.name || 'No name available'}</Text>
              <Text>Category: {recipe.category || 'No category available'}</Text>
              <Text>Servings: {recipe.servings || 'No servings specified'}</Text>
              <Text>Ingredients: {recipe.ingredients || 'No ingredients listed'}</Text>
              <Text>Instructions: {recipe.instructions || 'No instructions provided'}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteRecipe(recipe._id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(to bottom, #6a1b9a, #8e24aa)', // Purple gradient
  },
  scrollContainer: {
    padding: 20,
  },
  toggleButton: {
    backgroundColor: '#673ab7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
    textAlign: 'center',
  },
  cardContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // for Android shadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomePage;
