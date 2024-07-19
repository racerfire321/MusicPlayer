import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import MapScreen from './src/screens/MapScreen';
import LoginScreen from './src/screens/LoginScreen';
import ThemeProvider from './src/context/ThemeProvider';

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="PlayerScreen" component={PlayerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
          </>
        ) : (
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }} >
            {props => <LoginScreen {...props} onLoginSuccess={loginSuccess} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
