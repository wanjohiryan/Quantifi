import * as React from "react";
import { Dimensions, View, StyleSheet, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import TrackPlayer from 'react-native-track-player';
import LinearGradient from "react-native-linear-gradient";

import { Pause, Play } from "../../../../icons";
import { default as ChannelIcon } from "./ChannelIcon";
import { default as PanGesture } from "./PanGesture";
import { DataType } from "./Data";
import {isPlayingState} from "./SetupPlayer";

const { width: wWidth } = Dimensions.get("window");

const hHeight = wWidth / 1.4;
const D = wWidth * 1.2;
const innerR = D / 2;
const styles = StyleSheet.create({
  container: {
    width: wWidth,
    height: hHeight,
    top: 64,
    //bottom:64,
    //borderBottomEndRadius:30,
  }
});

interface CircularSelectionProps {
  data: DataType[];
  index: Animated.SharedValue<number>;
  isPlayerReady: Animated.SharedValue<boolean>;
}

const CircularSelection = ({ index, isPlayerReady, data }: CircularSelectionProps) => {
  const [isPlaying, setPlaying] = React.useState((isPlayingState() === true)? true : false);
  //const progress = useSharedValue(0);
  const TrackPlaying = isPlaying === true;
  const TrackReady = isPlayerReady.value === true  
 
  const circles = new Array(20).fill(0);
  const l = Math.sin(Math.PI / circles.length);
  const r = (innerR * l) / (1 - l);
  const R = innerR + 2 * r;
  const cx = wWidth / 2 - r;
  const cy = R - r;
  const segment = (2 * Math.PI) / circles.length;
   
  //progress.value = React.useMemo(()=>{return index.value},[index])
  
   React.useEffect(() => {
    async function togglePlayBack (){
      if (TrackPlaying) { await TrackPlayer.pause() }
      else if(!TrackPlaying){ await TrackPlayer.play() }
    }
    togglePlayBack();

  }, [index])

  const meStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      index.value,
      [-circles.length, 0, circles.length],
      [2 * Math.PI * (180 / Math.PI), 0, -2 * Math.PI * (180 / Math.PI)]
    );
    return {
      transform: [
        { translateY: R - hHeight / 2 },
        { rotateZ: `${rotateZ}deg` },
        { translateY: (-1 * R) + hHeight / 2 },
      ]
    }
  })

  const togglePressPlay = async () => {
    TrackReady ? setPlaying(!isPlaying) : null;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: R,
          width: R * 2,
          height: R * 2,
          left: -(R - wWidth / 2),
        }}
        colors={["#353637", "#161819", "#161819"]}
      />

      <Animated.View
        style={[{
          ...StyleSheet.absoluteFillObject,
          position: "absolute",
        }, meStyle]}
      >
        {circles.map((_, key) => {
          return (
            <View
              {...{ key }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: [
                  { translateX: cx },
                  { translateY: cy },
                  { rotateZ: `${(key * segment) * 180 / Math.PI}deg` },
                  { translateY: -cy }
                ]
              }}
            >
              <ChannelIcon
                radius={r}
                currentIndex={key}
                data={data[index.value]}
                name={`${key + 1}`}
                index={index}
              />
            </View>
          );
        })}
      </Animated.View>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        //position:"absolute",
        left: (R / 2) - 20,
        flex: 1,
        borderRadius: 55,
        height: 100,
        width: 100,
        borderWidth: 5,
        borderColor: "grey",
        position: "absolute",
        bottom: R / 6
      }} >
        <TouchableWithoutFeedback
          onPress={() => togglePressPlay()}
        //isPlaying.value = !isPlaying.value
        >
          <View>
            {TrackReady ?
              (TrackPlaying ? <Pause height={40} width={40} fill="white" />
                : <Play fill="white" height={40} width={40} />) :
              <ActivityIndicator color="grey" size={24} removeClippedSubviews />
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
      <PanGesture
        ratio={wWidth / (circles.length / 2)}
        //circles={circles}
        //index={index}
        //translateX = {translateX}
        data={data}
        {...{ index, circles }}
      />
    </View>
  );
};

export default CircularSelection;
