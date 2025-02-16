import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface SongProps {
  song: any;
}

function PlayerScreen({ route, navigation }: { route: any, navigation: any }) {
  const { song } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (song) {
      const interval = setInterval(async () => {
        if (!isPlaying) {
          const progress = await TrackPlayer.getProgress();
          setPosition(progress.position);
          setDuration(progress.duration);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, song]);

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) {
      return '00:00';
    }
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  if (!song) {
    return (
      <LinearGradient colors={['#99c99c', '#1a1a1a']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.message}>Please choose a song first</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#ffffff" />
            <Text style={styles.backButtonText}> ╰┈➤Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#99c99c', '#1a1a1a']} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#ffffff" />
          <Text style={styles.backButtonText}> ╰┈➤Back</Text>
        </TouchableOpacity>
        <Image source={song.uri} style={styles.albumCover} />
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.songArtist}>{song.artist}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>{formatTime(position)}</Text>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#ffffff"
            thumbTintColor="#1DB954"
            onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
            disabled={!isPlaying}
          />
          <Text style={styles.progressLabel}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.playButton} onPress={() => TrackPlayer.skipToPrevious()}>
            <Image source={require('../assets/img/next1.png')} style={styles.playIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
            <Image source={!isPlaying ? require('../assets/img/pause.png') : require('../assets/img/play.png')} style={styles.playIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => TrackPlayer.skipToNext()}>
            <Image source={require('../assets/img/next.png')} style={styles.playIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0.6,0.5,0,0.3)',
    paddingHorizontal: 20,
  },
  albumCover: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  songArtist: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 10,
  },
  progressLabel: {
    color: '#ffffff',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#1DB954',
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  playButton: {
    backgroundColor: '#1DB954',
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  playIcon: {
    width: 30,
    height: 30,
    tintColor: '#ffffff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 5,
  },
  message: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default PlayerScreen;
