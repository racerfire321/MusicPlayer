import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image,Permission, Button } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';

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
    url:require("../assets/music/weeknd.mp3"),
    uri: require("../assets/img/weeknd.jpg")
  },
  {
    id: 3,
    title: 'The smiths',
    artist: 'smiths',
    url:require("../assets/music/smith.mp3"),
    uri: require("../assets/img/smith.jpg")
  },
];

function HomeScreen({ navigation }: { navigation: any }) {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

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

  const renderItem = ({ item }: { item: Track }) => (
    <TouchableOpacity style={styles.item} onPress={() => playSong(item.id)} >
      <Image source={item.uri} style={styles.artwork} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.artist}>Artist:{item.artist}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title='Click me' onPress={playMap}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  artwork: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  artist: {
    marginTop: 30,
    fontSize: 14,
    color: '#666'
  }
});

export default HomeScreen;
