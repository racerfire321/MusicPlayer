import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions,Image,Permission, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import MusicCard from '../maps/MusicCard';
import Geolocation from 'react-native-geolocation-service'; 

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [popularMusic, setPopularMusic] = useState<any[]>([]);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        setLocationPermission(true);
        fetchCurrentLocation();
      } else {
        console.log('Location permission denied');
        setLocationPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Current position:', position);
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    fetchPopularMusic();
  }, [region]);

  const fetchPopularMusic = async () => {
    try {
      
      const dummyData = [
        {
          id: 1,
          title: 'Tum ho',
          artist: 'Mohit chauhan ',
          latitude: 48.8566,
          longitude: 2.3522, 
          albumCover: require('../assets/img/tum.jpg'),
          songName: 'Tum ho',
          artistName: 'Mohit chauhan ',
          popularity: 90,
        },
        {
          id: 2,
          title: 'The Idol',
          artist: 'Weeknd',
          latitude: 51.5074,
          longitude: -0.1278,
          albumCover: require('../assets/img/smith.jpg'),
          songName: 'The Idol',
          artistName: 'Weeknd',
          popularity: 85,
        },
        {
          id: 3,
          title: 'Double decker',
          artist: 'The Smiths',
          latitude: 40.7128,
          longitude: -74.0060, 
          albumCover: require('../assets/img/weeknd.jpg'),
          songName: 'Double decker',
          artistName: 'The smiths',
          popularity: 88,
        },
        {
          id: 4,
          title: 'Tum ho',
          artist: 'Mohit chauhan ',
          latitude: 27.7172,
          longitude: 85.3240,
          albumCover: require('../assets/img/tum.jpg'),
          songName: 'Tum ho',
          artistName: 'Mohit chauhan ',
          popularity: 90,
        },
        {
          id: 5,
          title: 'Double decker',
          artist: 'The Smiths',
          latitude: 22.3193,
             longitude: 114.1694,
          albumCover: require('../assets/img/weeknd.jpg'),
          songName: 'Double decker',
          artistName: 'The smiths',
          popularity: 88,
        },
       
      ];

     
      await new Promise((resolve) => setTimeout(resolve, 1000));

     
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
            albumCover={music.albumCover}
            songName={music.songName}
            artistName={music.artistName}
            popularity={music.popularity}
          />
         </Marker>
        ))}
      </MapView>
      {/* <View style={styles.cardContainer}>
        {popularMusic.map((music: any) => (
          <MusicCard
            key={music.id}
            albumCover={music.albumCover}
            songName={music.songName}
            artistName={music.artistName}
            popularity={music.popularity}
          />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
   backgroundColor: '#88cc88',
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
