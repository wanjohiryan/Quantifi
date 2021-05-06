import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Animated,{
   interpolateColor,
   withSpring, 
   interpolate,
   Extrapolate, 
   useAnimatedStyle} from "react-native-reanimated";
import {DataType} from "./Data";

const margin = 10;
const activeColor =  "rgb(41,128,185)" ;
const nonActiveColor =  "rgb(145,146,147)" ;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  image:{
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode:"cover",
  }
});

interface ChannelIconProps {
  radius: number;
  currentIndex: number;
  data:DataType;
  index: Animated.SharedValue<number>;
  name:string;
}

const ChannelIcon = ({
  radius,
  index,
  name,
  data,
  currentIndex,
}: ChannelIconProps) => {

const inputRange = [currentIndex - 1, currentIndex, currentIndex + 1];
const colorIcon = useAnimatedStyle(()=>{
    const backgroundColor =withSpring(
      interpolateColor(
      index.value, 
      inputRange,
      [nonActiveColor, activeColor, nonActiveColor],
      //Extrapolate.CLAMP,
      "RGB"
    ));
    const borderWidth =withSpring(
      interpolate(
      index.value, 
      inputRange,
      [0, 5, 0],
    ));
    const scale = interpolate(
      index.value, 
      inputRange,
      [1, 1.15, 1],
      Extrapolate.CLAMP
    );
    return{
      backgroundColor,
      transform:[{scale}]
    }
  });
  const textStyle= useAnimatedStyle(()=>{
    const opacity = interpolate(
      index.value,
      inputRange,
      [0,1,0],
      Extrapolate.CLAMP
    )
    return{opacity}
  })
  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Animated.View
        style={[{
          width: (radius - margin) * 2,
          height: (radius - margin) * 2,
          borderRadius: radius - margin,
          justifyContent: "center",
          alignItems: "center",
        }, colorIcon]}
      >
       <Text style={styles.text}>{name}</Text>
      </Animated.View>
    </View>
  );
};

export default ChannelIcon; 

/**
 *  const clock = new Clock();
  const value = useSharedValue(0);
 * useCode(
    block([
      cond(and(not(isActive), approximates(index, currentIndex)), [
        set(value, runSpring(clock, 0, 1)),
        cond(not(clockRunning(clock)), set(isActive, 0))
      ]),
      cond(isActive, [stopClock(clock), set(value, 0)])
    ]),
    []
    isActive,
  );
 */