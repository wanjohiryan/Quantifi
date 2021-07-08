import React,{ReactNode} from "react";
import { StyleSheet } from "react-native";
import Animated,{
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import {snapPoint} from "react-native-redash";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {DataType} from "./Data";

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
  circles: {
    imageUri:number,
    username:string;
    id:string;
  }[];
  index:Animated.SharedValue<number>;
  data: DataType[];
  isActive:Animated.SharedValue<boolean>;
  children:ReactNode;
  onEnd:(id:number)=>void;
};


const PanGesture = ({index, ratio, circles, data, isActive, children, onEnd}: PanGestureProps) => {
  const length = circles.length;
 // const isActive = useSharedValue(false)
  const reverseIndex = (index:number)=>{
    "worklet";
    const v = index * (-1 * ratio);
    return v;
  };
  //const fromHere = useSharedValue(false);

  const snapPointsB = data.map((_,i)=> i);
  //const snapPointsA = [ Math.ceil(index.value),Math.floor(index.value)];//channels.map((_,i)=> i * -ratio);
  // const translateX = useSharedValue(0);
  //const isActive = useSharedValue(0);
  const  setIndex = (value:number) => {
    "worklet";
    const v = value / (-1 * ratio);
    return v % length;
  };
  
  // useAnimatedReaction(
  //   ()=> translateX.value,
  //   (v)=>{
  //     if (isActive.value == true && fromHere.value == true){
  //       index.value = v;
  //     } else return;
  //      // (-1 * ratio)
  //   });
  
  
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{x:number}>({
    onStart:(_,ctx)=>{
      ctx.x = index.value;
    },
    onActive:({translationX},{x}) => {
      index.value = x + setIndex(translationX);
      isActive.value = true;
      //fromHere.value = true;
    },
    onEnd:({velocityX}) => {
     const dest = snapPoint(index.value,(velocityX / - ratio), snapPointsB);
     index.value = withSpring(dest,springConfig,()=>{
       isActive.value = false;
       runOnJS(onEnd)(index.value);
       //fromHere.value = false;
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
