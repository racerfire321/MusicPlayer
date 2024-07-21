import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Button, Animated, Easing } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';
import { ThemeContext, ThemeContextProps } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const songs: Track[] = [
  {
    id: 1,
    title: 'Tum ho',
    artist: 'Mohit chauhan',
    url: require("../assets/music/tumho.mp3"),
    uri: require("../assets/img/tum.jpg")
  },
  {
    id: 2,
    title: 'The Idols',
    artist: 'Weeknd',
    url: require("../assets/music/weeknd.mp3"),
    uri: require("../assets/img/weeknd.jpg")
  },
  {
    id: 3,
    title: 'The smiths',
    artist: 'smiths',
    url: require("../assets/music/smith.mp3"),
    uri: require("../assets/img/smith.jpg")
  },
];

function HomeScreen({ navigation }: { navigation: any }) {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const { theme, toggleTheme } = useContext<ThemeContextProps>(ThemeContext);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setupTrackPlayer();
  }, []);

  const setupTrackPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
    setIsTrackPlayerInit(true);
  };

  const playSong = async (songId: number) => {
    console.warn("Attempting to play song with ID:", songId);
    try {
      await TrackPlayer.stop();
      console.warn("Stopped current playback");
      await TrackPlayer.skip(songId - 1);
      console.warn("Skipped to song with ID:", songId - 1);
      await TrackPlayer.play();
      console.warn("Playback started for song with ID:", songId);
      navigation.navigate('PlayerScreen');
    } catch (error) {
      console.error("Error occurred while playing song:", error);
    }
  };

  const playMap = async () => {
    navigation.navigate('MapScreen');
  };

  const spinAnimation = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => toggleTheme());
  };

  const renderItem = ({ item }: { item: Track }) => (
    <TouchableOpacity style={[styles.item, theme === 'light' ? styles.lightTheme : styles.darkTheme]} onPress={() => playSong(item.id)}>
      <Image source={item.uri} style={styles.artwork} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.artist}>Artist:{item.artist}</Text>
    </TouchableOpacity>
  );

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, theme === 'light' ? styles.lightThemeContainer : styles.darkThemeContainer]}>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={[styles.themeButton, styles.rounded]} onPress={spinAnimation}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          {theme === 'light' ? (
            <FontAwesomeIcon icon={faSun} size={34} color='white'/>
          ) : (
            <FontAwesomeIcon icon={faMoon} size={35} color='white' />
          )}
        </Animated.View>
      </TouchableOpacity>
      <Button title='Click me' onPress={playMap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  themeButton: {
    padding: 5,
    backgroundColor: '#1DB954',
    bottom: 60,
    left: 140,
  },
  rounded: {
    borderRadius: 50,
  },
  lightThemeContainer: {
    backgroundColor: 'white',
  },
  darkThemeContainer: {
    backgroundColor: 'black',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  lightTheme: {},
  darkTheme: {},
  artwork: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  artist: {
    marginTop: 30,
    fontSize: 14,
    color: '#666',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
