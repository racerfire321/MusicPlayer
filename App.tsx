import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMap, faHistory, faMusic } from '@fortawesome/free-solid-svg-icons';
import HomeScreen from './src/screens/HomeScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import MapScreen from './src/screens/MapScreen';
import LoginScreen from './src/screens/LoginScreen';
import ThemeProvider from './src/context/ThemeProvider';
import UserList from './src/screens/UserList';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      activeColor="black"
      inactiveColor="white"
      barStyle={{ backgroundColor: '#425444' }}
      shifting={true}
    >
      <Tab.Screen
        name="Album"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Album',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NowPlaying"
        component={PlayerScreen}
        options={{
          tabBarLabel: 'Now Playing',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faMusic} size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="RecentMusic"
        component={UserList}
        options={{
          tabBarLabel: 'RecentMusic',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHistory} size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PopularMusic"
        component={MapScreen}
        options={{
          tabBarLabel: 'Popular Music',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faMap} size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="LoginScreen"
                options={{ headerShown: false }}
              >
                {props => <LoginScreen {...props} onLoginSuccess={loginSuccess} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}

export default App;
