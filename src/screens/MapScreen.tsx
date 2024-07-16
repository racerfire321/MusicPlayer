import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions,Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import MusicCard from '../maps/MusicCard';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [popularMusic, setPopularMusic] = useState<any[]>([]);

  useEffect(() => {
    fetchPopularMusic();
  }, [region]);

  const fetchPopularMusic = async () => {
    try {
      // Dummy data for testing with different countries
      const dummyData = [
        {
          id: 1,
          title: 'Song 1',
          artist: 'Artist 1',
          latitude: 48.8566,
          longitude: 2.3522, // Paris, France
          albumCover: require('../assets/music/tum.jpg'),
          songName: 'Song 1',
          artistName: 'Artist 1',
          popularity: 90,
        },
        {
          id: 2,
          title: 'Song 2',
          artist: 'Artist 2',
          latitude: 51.5074,
          longitude: -0.1278, // London, UK
          albumCover: require('../assets/music/smith.jpg'),
          songName: 'Song 2',
          artistName: 'Artist 2',
          popularity: 85,
        },
        {
          id: 3,
          title: 'Song 3',
          artist: 'Artist 3',
          latitude: 40.7128,
          longitude: -74.0060, // New York, USA
          albumCover: require('../assets/music/weeknd.jpg'),
          songName: 'Song 3',
          artistName: 'Artist 3',
          popularity: 88,
        },
        // Add more dummy songs and coordinates as needed
      ];

      // Simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use the dummy data instead of the API response
      setPopularMusic(dummyData);
    } catch (error) {
      console.error('Error fetching popular music:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {popularMusic.map((music: any) => (
           <Marker
           key={music.id}
           coordinate={{ latitude: music.latitude, longitude: music.longitude }}
         >
           <MusicCard
            key={music.id}
            albumCover={"s"}
            songName={music.songName}
            artistName={music.artistName}
            popularity={music.popularity}
          />
         </Marker>
        ))}
      </MapView>
      <View style={styles.cardContainer}>
        {popularMusic.map((music: any) => (
          <MusicCard
            key={music.id}
            albumCover={music.albumCover}
            songName={music.songName}
            artistName={music.artistName}
            popularity={music.popularity}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height * 0.6,
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});

export default MapScreen;
