import React from "react";
import { CameraRollEdgeInfo, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
  withSpring,
  useSharedValue,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withDelay,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";
import { DataProps } from "../userprofile/Data";
import { CameraIcon } from "./Model";
import { height } from "./Styles";

/**
 * This is the Fluid-ish Circle and Active Icon Renderer
 */

const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  activeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent"
  },
});

type ActiveIconProps = {
  index: number;
  children: React.ReactElement;
  activeIndex: Animated.SharedValue<number>;
  width: number;
  color: string;
  post:DataProps;
};

/**
 * the active icons y-index seem to be off; 🤔
 */


function ActiveIcon({ post, index, children, activeIndex, width }: ActiveIconProps) {
  const circleIconStyle = useAnimatedStyle(() => {
     const isActive = 1 === activeIndex.value;
     const yOffset = isActive ? 80 : 0;
    // const translateY = withSpring(
    //   interpolate(
    //   activeIndex.value,
    //   [0, 1, 2],
    //   [0, -height / 5, 0],
    //   Extrapolate.CLAMP
    // ));
    const translateX = withSpring(
      interpolate(
      activeIndex.value,
      [0, 1, 2],
      [0, 0 , 0],
      Extrapolate.CLAMP
    ));
    const opacity = interpolate(
      index,
      [0, 1, 2],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      //opacity,
      transform: [
        {
           translateY: withDelay(isActive ? 350 : 0, withSpring(-yOffset)),
          //translateY
        }
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: width,
          top: - width / 10,
          //left: width / 1.65,
          backgroundColor:"red",
          height: 64,
          flexDirection:"row",
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5,
          //backgroundColor: "transparent"
        },
        circleIconStyle,
      ]}>
      <View style={styles.activeIcon}>
        {index === 1 ? <CameraIcon songImage={typeof post.attachment !== "undefined" ? post.attachment.song?.artwork : post.user.imageUri} /> : children}
      </View>
    </Animated.View>
  );
}
interface CircleCursorProps {
  index: number;
  indicatorPosition: Animated.SharedValue<number>;
  item: React.ReactElement;
  colorIcon: string;
  activeIndex: Animated.SharedValue<number>;
  width: number;
  colors: string[];
  postProps:DataProps;
}
const CircleCursor = ({ index,postProps, colors, colorIcon, activeIndex, item, width }: CircleCursorProps) => {
  const CX = width + 1;

  const CY = 45


  return (

    <View key={`fg-${index}`}>
      {/* 
	  Keep the play/pause button here by opacity
	  the progress bar should also be here
	   */}
      {/* <ActiveIcon
        color={colorIcon}
        index={index}
        post={postProps}
        activeIndex={activeIndex}
        width={width}
        key={`activeIcon-${index}`}>{item}</ActiveIcon> */}
      <Svg
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          bottom: 0,
          left: width / 2 - width,
          overflow: "hidden"
        }}
        width={width * 2.5}
        height={100} >
        <Circle fill={colors[0]} r={5} cx={CX} cy={CY} />
        {/* <Line
              stroke="#E58406"
              strokeWidth={4}
              strokeLinecap="round"
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
            /> */}
        {/* {<AnimatedPath animatedProps={animatedProps} />} */}
      </Svg>
    </View>
  );
};

export default CircleCursor;

/*
const radius = useSharedValue(50);

//do we animated the curve?
console.log("width",width)
  const animatedProps = useAnimatedProps(() => {
    //L 0 0 L 0 0
    const path: string = `M ${CX - radius.value}, ${CY}
    m ${radius.value}, 0
    a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
    a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0`;
    return {
      d: path,
       fill: interpolateColor(
         indicatorPosition.value,
         [
           width / 2,
           (width) + width / 2,
           (width * 2) + width / 2,
           (width * 3) + width / 2,
           (width * 4) + width / 2,
         ], colors),
    };
  });
//style={{overflow: 'hidden',}}
    path = "M (CX - R), CY
            m R , 0
            a R(radiusBottom), R(bottom less is less) 0 1, 0 (R * 2), 0
            a R, R 0 1, -(R * 2), 0
            "
          M ${CX - radius.value}, ${CY}
    m ${radius.value}, 0
    a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
    a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0

  const CX = width / 1.5;

  const CY = 30

  const radius = useSharedValue(25);
     */