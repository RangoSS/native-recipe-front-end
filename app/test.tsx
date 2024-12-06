import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const TestPage = () => {
  const [recipes, setRecipes] = useState<any[]>([]); // Recipe data state

  // Fetch recipe data from API
  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get('http://localhost:3003/api/test'); // Destructure response
      console.log('Fetched Data:', data);

      // Access the recipes array directly
      if (Array.isArray(data.recipes)) {
        setRecipes(data.recipes);
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

  console.log('Recipes State:', recipes); // Log the recipes state to verify

  // If no recipes are available, show a message
  if (recipes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No recipes available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes</Text>
      <View style={styles.cardContainer}>
        {recipes.map((recipe, index) => (
          <View key={recipe._id || index} style={styles.card}>
            <Text style={styles.cardTitle}>{recipe.name || 'No name available'}</Text>
            <Text>Category: {recipe.category || 'No category available'}</Text>
            <Text>Servings: {recipe.servings || 'No servings specified'}</Text>
            <Text>Ingredients: {recipe.ingredients || 'No ingredients listed'}</Text>
            <Text>Instructions: {recipe.instructions || 'No instructions provided'}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Set background to white
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Set font color to black
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Set font color to black
  },
});

export default TestPage;
