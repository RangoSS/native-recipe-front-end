import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, FlatList } from 'react-native';
import apiClient from '../header/apiClient'; // Axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
  const [showForm, setShowForm] = useState(true); // Toggle form visibility
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    preparationTime: '',
    cookingTime: '',
    servings: '',
  });

  const fetchRecipes = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await apiClient.get('/recipes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(response.data); // Set recipes fetched from the backend
    } catch (error) {
      console.error('Error fetching recipes:', error);
      Alert.alert('Error', 'Failed to load recipes. Please try again.');
    }
  };

  useEffect(() => {
    fetchRecipes(); // Fetch recipes on component mount
  }, []);

  const handleInputChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleAddRecipe = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await apiClient.post(
        '/recipes',
        recipe,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
        }); // Reset form
        fetchRecipes(); // Refresh recipes list
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      Alert.alert('Error', 'Failed to add the recipe. Please try again.');
    }
  };

  const toggleForm = () => setShowForm(!showForm); // Toggle form visibility

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleForm}>
        <Text style={styles.toggleText}>
          {showForm ? 'Hide Form' : 'Show Form'}
        </Text>
      </TouchableOpacity>

      {showForm && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Recipe Name"
            value={recipe.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={recipe.ingredients}
            onChangeText={(text) => handleInputChange('ingredients', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Instructions"
            value={recipe.instructions}
            onChangeText={(text) => handleInputChange('instructions', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={recipe.category}
            onChangeText={(text) => handleInputChange('category', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Preparation Time"
            value={recipe.preparationTime}
            onChangeText={(text) => handleInputChange('preparationTime', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Cooking Time"
            value={recipe.cookingTime}
            onChangeText={(text) => handleInputChange('cookingTime', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Servings"
            value={recipe.servings}
            onChangeText={(text) => handleInputChange('servings', text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
            <Text style={styles.addText}>Add Recipe</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.header}>My Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()} // Assuming `id` is a unique identifier
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.recipeDetails}>Category: {item.category}</Text>
            <Text style={styles.recipeDetails}>Servings: {item.servings}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  toggleButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeCard: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeDetails: {
    fontSize: 14,
  },
});

export default HomePage;
