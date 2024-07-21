import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { theme } = useContext(ThemeContext);

  // Animation for icons
  const spinValue = new Animated.Value(0);

  const startSpin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
      <View style={styles.topRow}>
        <Text style={[styles.greeting, theme === 'light' ? styles.lightGreeting : styles.darkGreeting]}>
          Good Morning!
        </Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.icon} onPress={startSpin}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <FontAwesomeIcon icon={faBell} size={24} color="black" />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={startSpin}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <FontAwesomeIcon icon={faCog} size={24} color={theme === 'light' ? "black" : "black"} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, theme === 'light' ? styles.lightTab : styles.darkTab]}>
          <Text style={[styles.tabText, theme === 'light' ? styles.lightTabText : styles.darkTabText]}>
            Music
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, theme === 'light' ? styles.lightTab : styles.darkTab]}>
          <Text style={[styles.tabText, theme === 'light' ? styles.lightTabText : styles.darkTabText]}>
            Podcast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, theme === 'light' ? styles.lightTab : styles.darkTab]}>
          <Text style={[styles.tabText, theme === 'light' ? styles.lightTabText : styles.darkTabText]}>
            Story
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  lightContainer: {
    backgroundColor: '#f9f9f9',
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  lightGreeting: {
    color: '#333',
  },
  darkGreeting: {
    color: '#f5f5f5',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 90, 
  },
  lightTab: {
    backgroundColor: '#88cc88',
  },
  darkTab: {
    backgroundColor: '#333',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  lightTabText: {
    color: '#fff',
  },
  darkTabText: {
    color: '#f5f5f5',
  },
});

export default Header;
