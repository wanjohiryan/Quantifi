import React from "react";
import Animated, { useAnimatedProps, useAnimatedStyle } from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { Circle } from "react-native-svg";

import { STROKE } from "./Constants";

const r = (STROKE / 6);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CursorProps {
  pos: Animated.SharedValue<Vector>;
}

const Cursor = ({ pos, }: CursorProps) => {
  const animatedProps = useAnimatedProps(() => {
    const { x, y } = pos.value;
    //add a background to show circular ending #FD9F07
    return {
      cx: x,
      cy: y,
      r,
    };
  });
  return <AnimatedCircle animatedProps={animatedProps} fill="black" />
};

export default Cursor;
