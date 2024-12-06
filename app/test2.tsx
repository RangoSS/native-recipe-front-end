import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

{/*const TestPage = () => {
  const [recipes, setRecipes] = useState<any[]>([]); // Recipe data state

  // Fetch recipe data from API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/test');
      console.log('Fetched Recipes:', response); // Log the entire response
      
      // Check if the response is an object and try to extract an array
      const data = response.data;
      
      // Convert the response data into an array (if it's not already)
      const recipesArray = Array.isArray(data) ? data : [data];
      
      console.log('Converted Recipes Array:', recipesArray); // Log the converted array
      setRecipes(recipesArray); // Set data into state
    } catch (error) {
      console.error('Error fetching recipes:', error);
      Alert.alert('Error', 'Failed to fetch recipes. Please try again.');
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  console.log('Recipes:', recipes); // Log the recipes state to check the data

  // If recipes is not an array or is empty, render this message
  if (!Array.isArray(recipes) || recipes.length === 0) {
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
        {recipes.map((recipe) => (
          <View key={recipe._id} style={styles.card}>
            <Text style={styles.cardTitle}>{recipe.name}</Text>
            <Text>Category: {recipe.category}</Text>
            <Text>Servings: {recipe.servings}</Text>
            <Text>Ingredients: {recipe.ingredients}</Text>
        
          </View>
        ))}
      </View>
    </View>
  );
};
*/}
const TestPage = () => {
    const items = [
      { id: 1, name: 'Item 1',city:'cape town' },
      { id: 2, name: 'Item 2',city:'durban' },
      { id: 3, name: 'Item 3',city:'lusaka' },
      { id: 5, name: 'mazambane',ciry:'thembisa' },
    ];
    console.log('yo got a wrong data',items)
    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#333',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default TestPage;
