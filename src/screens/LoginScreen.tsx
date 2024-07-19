import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  navigation: any;
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<Props> = ({ navigation, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
   
    if (username === 'user' && password === 'password') {
      onLoginSuccess(); 
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid credentials. Please try again.');
    }
  };
  const handleForgotPassword = () => {
   console.warn("forgot")
  };

  const handleRegister = () => {
   console.warn("no")
  };

  return (
    <LinearGradient colors={['#99c99c', '#1a1a1a']} collapsable style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>JazzHub</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomLinks} onPress={handleRegister}>
            <Text style={styles.linkText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0.6,0.5,0,0.3)', 
  },
  title: {
    color: 'white',
    fontSize: 49,
    fontWeight: 'bold',
    borderColor: 'black',
    marginBottom: 50,
    textAlign: 'center',
    
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
   
    backgroundColor: '#88cc88', 
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color:'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomLinks: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#99c99c',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
