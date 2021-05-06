import React,{useEffect} from "react";
import { StyleSheet } from "react-native";
import Animated,{
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  useAnimatedReaction,
} from "react-native-reanimated";
import {snapPoint} from "react-native-redash";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { Channel } from "./Model";
import {DataType} from "./Data";

const springConfig ={
  //toValue: useSharedValue(0),
  // these values have been selected from
  // http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  // we put high values here for the active animation to start fast
  restSpeedThreshold: 0.01,
  restDisplacementThreshold: 0.01
};

interface PanGestureProps {
  //translateX: Animated.SharedValue<number>;
  ratio: number;
  circles: Channel[];
  index:Animated.SharedValue<number>;
  data: DataType[];
};


const PanGesture = ({index, ratio, circles, data}: PanGestureProps) => {
  const reverseIndex = (index.value * (-1 * ratio));
  const snapPointsB = data.map((_,i)=> (-i * ratio));
  //const snapPointsA = [ Math.ceil(index.value),Math.floor(index.value)];//channels.map((_,i)=> i * -ratio);
  const length = circles.length;
  const translateX = useSharedValue(reverseIndex);
  //const isActive = useSharedValue(0);
  const  setIndex = (value:number) => {
    "worklet";
    const v = value / (-1 * ratio);
    return v % length;
  };
  /**
   * useEffect(()=>{
     index.value = setIndex(translateX.value)
   * })
   */
  useAnimatedReaction(
    ()=> setIndex(translateX.value),
    (v)=>{
       index.value = v;// (-1 * ratio)
    });
  //useEffect(()=>)
  
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{x:number}>({
    onStart:(_,ctx)=>{
      ctx.x = translateX.value
    },
    onActive:({translationX},{x}) => {
      translateX.value = x + translationX;
      //isActive.value = 1;
    },
    onEnd:({velocityX}) => {
     const dest = snapPoint(translateX.value, velocityX, snapPointsB);
     translateX.value = withSpring(dest,springConfig);
    }
  })
  
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
export default PanGesture;
