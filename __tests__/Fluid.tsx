import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import Slide from "./Slide";

const { width } = Dimensions.get("window");

const slides = [
  {
    color: "#3984FF",
    picture: require("./assets/1.png"),
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: "#39ffb4",
    picture: require("./assets/2.png"),
    aspectRatio: 400.5 / 429.5,
  },
  {
    color: "#ffb439",
    picture: require("./assets/4.png"),
    aspectRatio: 391.25 / 520,
  },
];
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Fluid = () => {
  const x = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {slides.map((slide, index) => {
          const isFirst = index === 0;
          const isLast = index === slides.length - 1;
          return (
            <View key={index} style={styles.container}>
              <Slide
                x={x}
                index={index}
                aspectRatio={slide.aspectRatio}
                picture={slide.picture}
                colors={[
                  isFirst ? slide.color : slides[index - 1].color,
                  slide.color,
                  isLast ? slide.color : slides[index + 1].color,
                ]}
              />
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default Fluid;

import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  interpolateColor,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import {
  cartesian2Canvas,
  Vector,
  serialize,
  createPath,
  addCurve,
} from "react-native-redash";

const { width } = Dimensions.get("window");
const RATIO = 0.9;
const SIZE = width * RATIO;
const C = 0.551915024494;
const CENTER = { x: 1, y: 1 };

const vec = (x: number, y: number) => cartesian2Canvas({ x, y }, CENTER);
const addX = (v: Vector, x: number) => {
  "worklet";
  return { x: v.x + x, y: v.y };
};
const P00 = vec(0, 1);
const P01 = vec(C, 1);
const P02 = vec(1, C);
const P03 = vec(1, 0);

//const P10 = vec(1, 0);
const P11 = vec(1, -C);
const P12 = vec(C, -1);
const P13 = vec(0, -1);

// const P20 = vec(0, -1);
const P21 = vec(-C, -1);
const P22 = vec(-1, -C);
const P23 = vec(-1, 0);

// const P30 = vec(-1, 0);
const P31 = vec(-1, C);
const P32 = vec(-C, 1);
const P33 = vec(0, 1);

interface SlideProps {
  x: Animated.SharedValue<number>;
  index: number;
  colors: [string, string, string];
  picture: number;
  aspectRatio: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Slide = ({ x, index, colors, picture, aspectRatio }: SlideProps) => {
  const animatedProps = useAnimatedProps(() => {
    const progress = (x.value - width * index) / width;
    const offset = interpolate(progress, [0, 1], [0, -2], Extrapolate.CLAMP);
    const path = createPath({ x: P00.x + offset, y: P00.y });
    addCurve(path, {
      c1: addX(P01, offset),
      c2: P02,
      to: P03,
    });
    addCurve(path, {
      c1: P11,
      c2: addX(P12, offset),
      to: addX(P13, offset),
    });
    addCurve(path, {
      c1: addX(P21, offset),
      c2: {
        x:
          interpolate(
            progress,
            [(-1 * RATIO) / 2, 0],
            [1, 0],
            Extrapolate.CLAMP
          ) + offset,
        y: P22.y,
      },
      to: {
        x:
          interpolate(
            progress,
            [(-1 * RATIO) / 2, 0],
            [1, 0],
            Extrapolate.CLAMP
          ) + offset,
        y: P23.y,
      },
    });
    addCurve(path, {
      c1: {
        x:
          interpolate(
            progress,
            [(-1 * RATIO) / 2, 0],
            [1, 0],
            Extrapolate.CLAMP
          ) + offset,
        y: P31.y,
      },
      c2: addX(P32, offset),
      to: addX(P33, offset),
    });
    return {
      d: serialize(path),
      fill: interpolateColor(progress, [-1, 0, 1], colors),
    };
  });
  return (
    <View>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
        <AnimatedPath fill="#D5E4FF" animatedProps={animatedProps} />
      </Svg>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={picture}
          style={{
            width: width * 0.61,
            height: width * 0.61 * aspectRatio,
          }}
        />
      </View>
    </View>
  );
};

export default Slide;