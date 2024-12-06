import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, FlatList, ScrollView } from 'react-native';
import apiClient from '../header/apiClient'; // Axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
  const [showForm, setShowForm] = useState(true);
  const [recipes, setRecipes] = useState([]);
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
      const token = await AsyncStorage.getItem('userToken');
      const response = await apiClient.get('/recipes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Response data:', response.data);  // Log the response data
      // Check if the response data has a recipes array
      if (response.data && Array.isArray(response.data.recipes)) {
        // Filter recipes to show only those belonging to the current user
        setRecipes(response.data.recipes.filter((r) => r.userId === token));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      Alert.alert('Error', 'Failed to load recipes. Please try again.');
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
      const newRecipe = { ...recipe, userId: token }; // Include userId for ownership
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
        <FlatList
          data={recipes}
          keyExtractor={(item) => item._id} // Use _id instead of id for MongoDB
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Text style={styles.recipeName}>{item.name}</Text>
              <Text style={styles.recipeDetails}>Category: {item.category}</Text>
              <Text style={styles.recipeDetails}>Servings: {item.servings}</Text>
              {/* Render ingredients array */}
              <Text style={styles.recipeDetails}>
                Ingredients: {item.ingredients && item.ingredients.join(', ')}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteRecipe(item._id)} // Use _id for MongoDB
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
  recipeCard: {
    flex: 1,
    backgroundColor: '#ffc107',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  recipeDetails: {
    fontSize: 14,
    color: '#555',
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