import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';

const songs: Track[] = [
  {
    id: '1',
    title: 'Tum ho',
    artist: 'Mohit Chauhan',
    url: require("../assets/music/tumho.mp3"),
    uri: require("../assets/img/tum.jpg")
  },
  {
    id: '2',
    title: 'The Idols',
    artist: 'Weeknd',
    url: require("../assets/music/weeknd.mp3"),
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

function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

  useEffect(() => {
    setupTrackPlayer();

    const progressInterval = setInterval(async () => {
      if (isTrackPlayerInit && isPlaying) {
        const trackPosition = await TrackPlayer.getPosition();
        const trackDuration = await TrackPlayer.getDuration();
        setPosition(trackPosition);
        setDuration(trackDuration);
      }
    }, 1000);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isPlaying]);

  const setupTrackPlayer = async () => {
    if (!isTrackPlayerInit) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(songs);
      setIsTrackPlayerInit(false);
    }
  };

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

  const renderItem = ({ item }: { item: Track }) => (
    <TouchableOpacity
      style={styles.songItem}
      onPress={() => {
        setCurrentSong(item);
        TrackPlayer.skip(item.id).then(() => {
          togglePlayback();
        });
        // togglePlayback();
      }}
    >
      <Image source={item.uri} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.songList}
      />
      <View style={styles.playerContainer}>
        <Text style={styles.trackInfo}>Playing: {currentSong.title}</Text>
        <Text style={styles.trackInfo}>Artist: {currentSong.artist}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>{formatTime(position)}</Text>
          <View style={styles.progressBar}>
            <View
              style={{ width: `${(position / duration) * 100 || 0}%`, height: 3, backgroundColor: 'blue' }}
            />
          </View>
          <Text style={styles.progressLabel}>{formatTime(duration)}</Text>
        </View>
        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  songList: {
    flex: 1,
    marginTop: 20
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  songInfo: {
    marginLeft: 10
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  songArtist: {
    fontSize: 14,
    color: '#666'
  },
  playerContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  trackInfo: {
    fontSize: 18,
    marginBottom: 10
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  progressBar: {
    backgroundColor: '#ccc',
    height: 3,
    flex: 1,
    marginHorizontal: 10
  },
  progressLabel: {
    fontSize: 12
  },
  playButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  playButtonText: {
    fontSize: 18,
    color: 'white'
  }
});

export default PlayerScreen;
