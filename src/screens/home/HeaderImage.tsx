import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, } from "react-native-reanimated";

const { height: wHeight, width: wWidth } = Dimensions.get("window");
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const backgroundImage = require("./assets/maths.jpeg");

export const HEADER_IMAGE_HEIGHT = wHeight / 10;
const styles = StyleSheet.create({
  image: {
    top: 0,
    left: 0,
    resizeMode: "cover",
    position:"absolute",
    backgroundColor:"transparent"
  },
});

interface HeaderImageProps {
  y: Animated.SharedValue<number>;
}

export default ({ y }: HeaderImageProps) => {
  const imageStyle = useAnimatedStyle(()=>{
    const height = interpolate(
      y.value,
      [-100, 0],
      [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
      {extrapolateRight:Extrapolate.CLAMP},
    );
    const top = interpolate(
      y.value,
      [0, 100],
      [0, -100],
      {extrapolateLeft:Extrapolate.CLAMP},
    );
    return{
      top:top,
      height:height,
      width: wWidth,
    }
  });
  return (
    <Animated.Image
      source={backgroundImage}
      style={[styles.image, imageStyle]}
    />
  );
};
