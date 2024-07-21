import React from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem, TouchableOpacity, Image } from 'react-native';
import { Track } from 'react-native-track-player';

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
  
const RecentlyPlayedScreen: React.FC = () => {
    
    const renderItem = ({ item }: { item: Track }) => (
        <TouchableOpacity style={styles.item} >
            
          <Image source={item.uri} style={styles.artwork} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>Artist:{item.artist}</Text>
        </TouchableOpacity>
      );
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recently Played Songs</Text>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  artwork: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  songItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    color: 'gray'
  },
  artist: {
    fontSize: 16,
    marginTop: 30,
    color: 'gray',
  },
});

export default RecentlyPlayedScreen;
