import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router'; // Use Expo Router for navigation
const { width, height } = Dimensions.get('window'); // Get screen dimensions

const Index: React.FC = () => {
  const router = useRouter(); // Get the router instance

  return (
    <ImageBackground
      source={require('../../assets/images/recipe1.jpg')} // Local image
      style={styles.background}
      imageStyle={styles.image} // Ensure the image scales properly
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Recipe World!</Text>
        <Text style={styles.subtitle}>
          Share your favorite recipes with the world. Add, edit, and explore a variety of culinary delights!
        </Text>

        <TouchableOpacity
      style={styles.loginButton}
      onPress={() => router.push('/login')} // Use path navigation to login screen
    >
      <Text style={styles.loginText}>Login</Text>
    </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width, // Make the image width match the screen width
    height: height, // Make the image height match the screen height
    resizeMode: 'cover', // Ensures the image scales while maintaining aspect ratio
  },
  image: {
    resizeMode: 'cover', // Ensures the image maintains its aspect ratio
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  title: {
    fontSize: width * 0.08, // Responsive font size
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.045, // Responsive font size
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#ff6347',
    paddingVertical: height * 0.02, // Responsive padding
    paddingHorizontal: width * 0.2, // Responsive padding
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
  },
});

export default Index;
