import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MusicCardProps {
  albumCover: any;
  songName: string;
  artistName: string;
  popularity: number;
}

const MusicCard: React.FC<MusicCardProps> = ({ albumCover, songName, artistName, popularity }) => {
  return (
    <View style={styles.card}>
      <Image source={ albumCover } style={styles.albumCover} />
      <View style={styles.textContainer}>
        <Text style={styles.songName}>{songName}</Text>
        <Text style={styles.artistName}>{artistName}</Text>
        <Text style={styles.popularity}>Popularity: {popularity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    height: 250,
    borderRadius: 70,
    transform: [{ scaleY: 0.5 },{scaleX : 0.4}],
  },
  albumCover: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  textContainer: {
    padding: 16,
    flex: 1,
  },
  songName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 16,
    color: '#555',
  },
  popularity: {
    marginTop: 8,
    fontSize: 14,
    color: '#777',
  },
});

export default MusicCard;
