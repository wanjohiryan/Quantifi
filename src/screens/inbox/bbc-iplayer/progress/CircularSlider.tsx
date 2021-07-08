import React, { useEffect,useRef } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { polar2Canvas, ReText } from "react-native-redash";
import Svg, { Defs, Mask, Path } from "react-native-svg";
import TrackPlayer,{usePlaybackState} from "react-native-track-player";

import {
  SIZE,
  STROKE,
  R,
  PI,
  CENTER,
  arc,
  absoluteDuration,
  toRads,
  formatTime,
  radsToDuration,
} from "./Constants";
import Cursor from "./Cursor";
import Gesture from "./Gesture";
import Quadrant from "./components/Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  timerCont:{
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timers:{ 
    fontSize: 15, 
    fontWeight: "bold", 
    color: "#545454" },
  retext:{
    fontSize: 15, 
    fontWeight: "bold", 
    color: "#545454",
    justifyContent:"center",
    flex:0.5,
    alignItems:"flex-start",
    alignSelf:"flex-start",
    paddingTop:0,
  }
})

interface CircularProps {
  style: StyleProp<ViewStyle>;
  position: number;
  radius:number;
  duration: number;
}

const CircularSlider = ({ style, position, duration, radius }: CircularProps) => {
  const isActive = useSharedValue(false);
  const start = useSharedValue(0);
  const end = useSharedValue(Math.PI);


  const seconds = (v:number) => {
    "worklet";
    const activeDuration = absoluteDuration(v, end.value);
    return radsToDuration(activeDuration,duration);
  }

  const toStart =(v:number)=>{
    "worklet";
    return Math.PI - v;
  }

  // const playbackState = usePlaybackState();
  // const isPlaying = useRef("paused")

   useAnimatedReaction(
     () =>toRads(position,duration),
     (e) => {
      //  the trackPlayer keeps sending "NaN" when not playing, so i did this work around, it causes a crush
      if (e < Math.PI && e > 0 && isActive.value == false){
        start.value = toStart(e);
      }})

  const seek = async (v:number)=>{
    await TrackPlayer.seekTo(v);
  }
  const startPos = useDerivedValue(() =>
    polar2Canvas({ theta: start.value, radius: R }, CENTER)
  );
  const endPos = useDerivedValue(() =>
    polar2Canvas({ theta: end.value, radius: R }, CENTER)
  );
  const animatedProps = useAnimatedProps(() => {
    //[x]add tap gesture, new colors, time, lock the values to never excide the half circle
    const p1 = startPos.value;
    const p2 = endPos.value;
    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, false, false)}`,
    };
  });

  const timeActive = useDerivedValue(() => {
    return `${formatTime(seconds(start.value))}`
  })

  return (
    <View style={style}>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            <AnimatedPath
              //for brightness we add color as white
              stroke="white"
              strokeWidth={STROKE/2}
              strokeLinecap="round"
              animatedProps={animatedProps}
            />
          </Mask>
        </Defs>
        <Quadrant />
        <Cursor pos={startPos} />
      </Svg>
      <Gesture 
      {...{isActive,start,end}}
      onEnd={async (start:number)=>{
        const s = seconds(start);
        await seek(s)
        }}/>
      <View style={[styles.timerCont,{padding:radius / 2}]}>
        {/* {work on retext style} */}
        {isActive.value ? <ReText style={styles.retext} text={timeActive}/> : <Text style={styles.timers}>{formatTime(position)}</Text>}
        <Text style={styles.timers}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

export default CircularSlider;
