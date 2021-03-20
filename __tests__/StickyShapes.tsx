import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import {
  addCurve,
  addLine,
  createPath,
  mix,
  serialize,
} from "react-native-redash";
import Svg, { Path } from "react-native-svg";

export const SIZE = 150;
const H_FACTOR = 0.3;
const V_FACTOR = 2.5;
export const MAX_HEIGHT = SIZE * V_FACTOR;
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SquareProps {
  progress: Animated.SharedValue<number>;
}

const Square = ({ progress }: SquareProps) => {
  const animatedProps = useAnimatedProps(() => {
    const factor = {
      x: mix(progress.value, 0, H_FACTOR),
      y: mix(progress.value, 1, V_FACTOR),
    };
    const p1 = { x: 0, y: 0 };
    const p2 = { x: SIZE, y: 0 };
    const p3 = { x: SIZE * (1 - factor.x), y: SIZE * factor.y };
    const p4 = { x: SIZE * factor.x, y: SIZE * factor.y };
    const path = createPath(p1);
    addLine(path, p2);
    addCurve(path, {
      c1: { x: p2.x, y: 0 },
      c2: { x: p3.x, y: 0 },
      to: p3,
    });
    addLine(path, p4);
    addCurve(path, {
      c1: { x: p4.x, y: 0 },
      c2: { x: p1.x, y: 0 },
      to: p1,
    });
    return {
      d: serialize(path),
      fill: "#45A6E5",
    };
  });
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <AnimatedPath animatedProps={animatedProps} />
    </Svg>
  );
};

export default Square;

import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Square, { SIZE, MAX_HEIGHT } from "./Square";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: (width - SIZE) / 2,
    top: 0,
    bottom: 0,
    width: SIZE,
  },
});

const StickyShapes = () => {
  const isOnTop = useSharedValue(true);
  const sticked = useSharedValue(true);
  const sticking = useDerivedValue(() => withSpring(sticked.value ? 1 : 0));
  const translateY = useSharedValue(0);
  const progress = useDerivedValue(
    () =>
      sticking.value *
      interpolate(translateY.value, [0, MAX_HEIGHT], [0, 1], Extrapolate.CLAMP)
  );
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent
  >({
    onActive: ({ translationY }) => {
      translateY.value = translationY;
      if (translateY.value > MAX_HEIGHT) {
        sticked.value = false;
      }
    },
    onEnd: ({ velocityY: velocity }) => {
      const dest = snapPoint(translateY.value, velocity, [0, height - SIZE]);
      translateY.value = withSpring(dest, { velocity }, () => {
        sticked.value = true;
        if (dest !== 0) {
          isOnTop.value = !isOnTop.value;
          translateY.value = 0;
        }
      });
    },
  });
  const container = useAnimatedStyle(() => ({
    transform: [{ rotate: isOnTop.value ? "0deg" : "180deg" }],
  }));
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: (1 - sticking.value) * translateY.value,
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.container, container]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[StyleSheet.absoluteFill, style]}>
          <Square progress={progress} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default StickyShapes;