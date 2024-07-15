import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image,Permission } from 'react-native';
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
    url:require("../assets/music/tumho.mp3"),
    uri: require("../assets/img/weeknd.jpg")
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
    console.warn(songId);
    await TrackPlayer.skip(songId);
    await TrackPlayer.play();
    navigation.navigate('PlayerScreen');
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
    fontWeight: 'bold'
  },
  artist: {
    marginTop: 30,
    fontSize: 14,
    color: '#666'
  }
});

export default HomeScreen;