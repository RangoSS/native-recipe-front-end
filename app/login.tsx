import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing token
import jwt_decode from 'jwt-decode';  // Corrected import

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Navigation hook

  const handleLogin = async () => {
    try {
      // Sending login request to the Vercel backend
      const response = await axios.post('https://native-recipe-back-end.onrender.com/api/login', {
        email,
        password,
      });
         console.log('checking api response' ,response)
      // Check if the response contains the token
      if (response.data.token) {
        const token = response.data.token;
  
        // Store token in AsyncStorage
        await AsyncStorage.setItem('userToken', token);

        // console.log('recipe token' , token)
        // Decode the token to extract user info
        const decodedToken = jwt_decode(token);
  
        // Assuming the user ID is stored as 'id' in the token payload
        const userId = decodedToken?.id;
     
        await AsyncStorage.setItem('userId', userId.toString()); // Ensure it's saved as a string
       // console.log('Here is your userId:', userId);
  
        // Navigate to the home screen after login
        router.push('/home');
      } else {
        Alert.alert('Login failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login error', 'Please try again later.');
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push('/register')} // Navigate to registration page
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default LoginScreen;
