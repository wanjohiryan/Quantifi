import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AsyncStorage,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import { isNull } from "underscore";
import { RectButton, TapGestureHandler, TapGestureHandlerGestureEvent, TapGestureHandlerProperties } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Video, { OnProgressData } from 'react-native-video';

import { DataProps } from "../../userprofile/Data";
import Channels from "../../inbox/bbc-iplayer/Channels";
import { DataType } from "../../inbox/bbc-iplayer/Data";
import { MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM, wWidth } from "../Styles";

const { width } = Dimensions.get("window");
export const MUSIC = "@me/favorites";
const styles = StyleSheet.create({
	video: {
      position: 'absolute',
      backgroundColor:"#161819",
      borderRadius: 30,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      alignSelf:"center",
      height:"100%",
      width:"100%",
    },
  root: {
    flex: 1
  },
  container: {
    margin: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    padding: 16
  },
  title: {
    color: "white",
    padding: 16
  },
  cover: {
    marginVertical: 16,
    width: width - 32,
    height: width - 32
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  song: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  },
  artist: {
    color: "white"
  },
  slider: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: width - 32,
    borderRadius: 2,
    height: 4,
    marginVertical: 16
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});

interface PlayerProps {
  onPress: () => void;
  currentSong:(v:DataType)=> void;
  currentAttach: number;
  translateY:Animated.SharedValue<number>;
  playing:boolean;
}

export default ({ playing, currentAttach }: PlayerProps) => {
  const { bottom } = useSafeAreaInsets();
  const playerRef = useRef<Video>(null);
  const progress = useSharedValue<number>(0);

  // const progressStyle = useAnimatedStyle(){
  //   const p = progress.value * wWidth
  // }
 
  const handleProgress = (data: OnProgressData) => {
    //currentTime: current Position in seconds
    //playableDuration : available time to be played
    //seekableDuration: total length time in seconds
    progress.value = (data.currentTime / data.seekableDuration)
  }


  return (
      <Animated.View style={[StyleSheet.absoluteFill,{flex:1, height:"100%",}]}>
        <View style={{top:0, width:"100%"}} >
          <Text>ProgressBar using svg</Text>
        </View>
			<Video
                source={currentAttach}
                style={styles.video}
                ref={playerRef}
                onError={(e: any) => console.log(e)}
                paused={!playing}          //={isPaused} //currentVisibleIndex }
                playInBackground={false}
                playWhenInactive={false}
                ignoreSilentSwitch={"obey"}
                onLoad={() =>{if (playerRef.current) playerRef.current.seek(0)}}
                repeat
                //onProgress={this.handleProgress}
                resizeMode='contain'
              />
      </Animated.View>
  );
};


