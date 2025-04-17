import React, { useState, useCallback, useRef } from "react";
import { View, Alert, StyleSheet, Text, Button, Dimensions, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { rVS, rS, rMS } from "../../Utils/Responsive";

const { width } = Dimensions.get("window");

export default function Instruction() {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef();

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  // Fetch video duration when player is ready
  const fetchVideoDuration = async () => {
    if (playerRef.current) {
      try {
        const videoDuration = await playerRef.current.getDuration();
        setDuration(videoDuration);
      } catch (error) {
        console.error("Error fetching duration:", error);
      }
    }
  };

  // Seek video when tapping on seek bar
  const handleSeekBarTap = async (event) => {
    if (!playerRef.current || duration === 0) return;

    const { locationX } = event.nativeEvent; // Get tap position
    const progress = locationX / width; // Normalize tap position (0-1)
    const seekTime = progress * duration; // Convert to seconds

    console.log("Seeking to:", seekTime);
    await playerRef.current.seekTo(seekTime, true); // Seek to tapped position
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Smart tool to organize your notes and simplify your day.</Text>
      </View>

      {/* Video Player */}
      <View style={styles.videoContainer}>
        <YoutubePlayer
          ref={playerRef}
          height={width * 0.56}
          play={playing}
          videoId={"ppCOUV27ubo"}
          onChangeState={onStateChange}
          onReady={fetchVideoDuration} 
        />

        {/* Seek Bar Tap Overlay */}
        {/* <TouchableOpacity
          onPress={handleSeekBarTap}
          activeOpacity={1}
          style={styles.seekBarOverlay}
        /> */}
      </View>

      {/* <View style={styles.buttonContainer}>
        <Button title="Log Video Time & Duration" onPress={fetchVideoDuration} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rS(10),
  },
  textContainer: {
    marginVertical: rVS(10),
    alignItems: "center",
  },
  text: {
    fontSize: rMS(22),
    color: "#4D8733",
    fontFamily: "Poppins-SemiBold",
  },
  videoContainer: {
    width: "100%",
    height: width * 0.56,
    overflow: "hidden",
    position: "relative",
    borderRadius: 10,
    overflow: 'hidden',
  },
  seekBarOverlay: {
    position: "absolute",
    bottom: '36.5%', // Position at the bottom where seek bar is
    width: "85%",
    backgroundColor: "transparent", 
    alignSelf:'center',
    height:20,
    borderRadius:5,
  },
  buttonContainer: {
    marginTop: rVS(20),
  },
});
