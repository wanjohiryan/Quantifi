import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import LinearGradient from "react-native-linear-gradient";
import CircularSlider from "./progress/CircularSlider";

import { default as ChannelIcon } from "./ChannelIcon";
import { default as PanGesture } from "./PanGesture";
import PlayPause from "./PlayPause";
import { DataType } from "./Data";
import Username from "./Username";

const { width: wWidth } = Dimensions.get("window");

// const activeColor = "rgb(41,128,185)";
const hHeight = wWidth / 1.4;
const D = wWidth * 1.2;
const innerR = D / 2;


const styles = StyleSheet.create({
  container: {
    width: wWidth,
    height: hHeight,
    bottom: 64,
  },
});

interface CircularSelectionProps {
  data: DataType[];
  index: Animated.SharedValue<number>;
  isActive: Animated.SharedValue<boolean>;
}

const CircularSelection = ({ index, data, isActive }: CircularSelectionProps) => {
  //Do not edit any of this constants without checking out ./constants.ts in progressbar
  const { duration, position } = useTrackPlayerProgress()

  const users = data.map((item, key) => {
    return { ...item.user, id: `userId-${key}` }
  })
  const concatUsers = (v: number) => {
    const arr = { id: "extras", username: "me", imageUri: require("./assets/placeholder.jpg") };
    const d = new Array(v).fill(arr)
    return d;
  }
  const circles = (users.length <= 20) ? users.concat(concatUsers(20 - users.length)) : (users.length >= 20) ? users.splice(20, users.length - 20) : users;
  //until we figure out issue:[how to update circles], list shall bw upto 20 songs;
  const l = Math.sin(Math.PI / circles.length);
  const r = (innerR * l) / (1 - l);
  const R = innerR + 2 * r;
  const cx = wWidth / 2 - r;
  const cy = R - r;
  const segment = (2 * Math.PI) / circles.length;
  const LEFT = -(R - wWidth / 2);


  const meStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      index.value,
      [0, circles.length],
      [0, -2 * Math.PI * (180 / Math.PI)]
    );
    return {
      transform: [
        { translateY: R - hHeight / 2 },
        { rotateZ: `${rotateZ}deg` },
        { translateY: (-1 * R) + hHeight / 2 },
      ]
    }
  })
  const changeTrack = async (trackID: number) => {
    const TrackID:number | null = await TrackPlayer.getCurrentTrack().then((e)=>{return JSON.parse(e)})
    if (TrackID !== -1 && TrackID !== null){
      if(TrackID !== index.value){
        await TrackPlayer.skip(`${trackID}`);
      };
  }}
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: R,
          width: R * 2,
          height: R * 2,
          left: LEFT,
        }}
        colors={["#161819", "#161819", "#161819"]}
      />
      <PanGesture
        {...{ index, circles, isActive }}
        ratio={wWidth / (circles.length / 2)}
        onEnd={async (index: number) => {
          await changeTrack(Math.trunc(index))
        }}
        data={data}>
        <Animated.View
          style={[StyleSheet.absoluteFill, meStyle]}>
          {circles.map((dat, key) => {
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
                }}>
                <Username
                  {...{ index }}
                  key={key}
                  currentIndex={key}
                  username={dat.username}
                  radius={r} />
                <ChannelIcon
                  {...{ isActive,dat,index}}
                  onPress={async() => {
                    if (key > (data.length - 1)) {
                      index.value = withSpring(0,{velocity:10})
                      await changeTrack(0)
                    } else if ((index.value - key) < 3 || (key - index.value) < 3){
                      index.value = withSpring(key,{velocity:10})
                      await changeTrack(key)
                    } else return
                  }}
                  radius={r}
                  currentIndex={key}/>
              </View>
            );
          })}
        </Animated.View>
      </PanGesture>
      <CircularSlider
        {...{ duration, position, radius: r }}
        style={{
          top: r + (r * 2),
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          right: 0
        }}/>
      <PlayPause
        radius={r}
        style={{
          //backgroundColor: "red",
          width: r * 3,
          height: r * 3,
          alignSelf: "center",
          alignItems:"center",
          justifyContent:"center",
          bottom: -1 * (( r * 3)/2),
          position: "absolute",
          borderRadius: (r * 3) / 2
        }}/>
    </View>
  );
};

export default CircularSelection;
/**
 *  <CircularSlider
        {...{ start, end, duration, position, radius: r }}
        style={{
          top: r + (r * 2),
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          right: 0
        }} />
 *

 *
 *
 *
 *
 * <PanGesture
        ratio={wWidth / (circles.length / 2)}
        //circles={circles}
        //index={index}
        //translateX = {translateX}
        data={data}
        {...{ index, circles }}
      />

 * <View style={{
        alignItems: "center",
        justifyContent: "center",
        //position:"absolute",
        left: (R / 2) - 20,
        flex: 1,
        borderRadius: 55,
        height: 100,
        width: 100,
        position: "absolute",
        bottom: R / 6
      }} >
        <TouchableWithoutFeedback
        //TODO:use TapGestureHandler instead
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
 *
 *
 *
 *
 *
 *
 * <View style={{
          backgroundColor:"#161819",
          position:"absolute",
          height:10,
          bottom:23,
          width:wWidth,
          borderBottomRightRadius:50,
          borderBottomLeftRadius:50,
          }}/>
          <ReanimatedArc
         diameter={innerR}
         //initialAnimation
         //angle of the circle to be shown
         //arcSweepAngle={arc}
         style={{
          //position:"absolute",
          //backgroundColor:"red",
          //borderRadius: innerR,
          //width: innerR * 2,
          //height: innerR * 2,
          //bottom:-r,
          //left : -wWidth/9.8,
          top:r * 2,
         }}
         lineCap="round"
         color="red"
         //rotation of the circle
         //rotation={arc * 2}
         width={200} />
          <Animated.View
     style={[{
       position:"absolute",
       backgroundColor:"red",
       borderRadius: innerR,
       width: innerR * 2,
       height: innerR * 2,
       //bottom:-r,
       left : -wWidth/9.8,
       top:r * 2,
       //right:0,
       transform: [
        //{ translateX: cx },
        //{ translateY: cy },
        //{ rotateZ: `${(key * segment) * 180 / Math.PI}deg` },
        //{ translateY: -cy }
      ]
        }]} />


          */