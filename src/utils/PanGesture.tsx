import React,{ReactNode} from "react";
import { StyleSheet } from "react-native";
import Animated,{
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {snapPoint} from "react-native-redash";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {DataType} from "../screens/inbox/bbc-iplayer/Data";

const springConfig ={
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
  posts:number[];
  index:Animated.SharedValue<number>;
  isActive:Animated.SharedValue<boolean>;
  children:ReactNode;
};


const PanGesture = ({index, ratio, posts, isActive, children}: PanGestureProps) => {
  const length = posts.length;
  const reverseIndex = (index:number)=>{
    "worklet";
    const v = index * (-1 * ratio);
    return v;
  };
  const snapPointsB = posts.map((_,i)=> i);
  const  setIndex = (value:number) => {
    "worklet";
    const v = value / (-1 * ratio);
    return v % length;
  };
  
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{x:number}>({
    onStart:(_,ctx)=>{
      ctx.x = index.value;
    },
    onActive:({translationX},{x}) => {
      index.value = x + setIndex(translationX);
      isActive.value = true;
    },
    onEnd:({velocityX}) => {
     const dest = snapPoint(index.value,(velocityX / - ratio), snapPointsB);
     index.value = withSpring(dest,springConfig,()=>{
       isActive.value = false;
       //runOnJS(onEnd)(index.value);
     });
    }
  })
  
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};
export default PanGesture;
