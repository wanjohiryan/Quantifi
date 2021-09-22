import React from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from "react-native-gesture-handler";
//import { clamp, onGestureEvent, timing, withSpring } from "react-native-redash";
import { getBottomSpace } from "react-native-iphone-x-helper";

import TabIcon from "./TabIcon";
import Player from "./Player";
import MiniPlayer from "./MiniPlayer";
import { snapPoint } from "react-native-redash";

const { height } = Dimensions.get("window");
const TABBAR_HEIGHT = getBottomSpace() + 50;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};
const {
  Clock,
  Value,
  cond,
  useCode,
  set,
  block,
  not,
  clockRunning,
  interpolate,
  diffClamp,
  Extrapolate
} = Animated;

const styles = StyleSheet.create({
  playerSheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "cyan"
  },
  container: {
    backgroundColor: "#272829",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: TABBAR_HEIGHT,
    flexDirection: "row",
    borderTopColor: "black",
    borderWidth: 1
  }
});

export default () => {
  // const translationY = new Value(0);
  // const velocityY = new Value(0);
  const translateY = useSharedValue(SNAP_BOTTOM);
  // const state = new Value(State.UNDETERMINED);
  // const offset = new Value(SNAP_BOTTOM);
  // const goUp: Animated.Value<0 | 1> = new Value(0);
  // const goDown: Animated.Value<0 | 1> = new Value(0);
  // const gestureHandler = onGestureEvent({
  //   state,
  //   translationY,
  //   velocityY
  // });
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{offset:number}>({
    onStart:(_,ctx)=>{
      ctx.offset = translateY.value;
    },
    onActive: ({ translationY },{offset}) => {
      translateY.value = translationY + offset;
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(translateY.value, velocityY, [SNAP_TOP, SNAP_BOTTOM]);
      translateY.value = withSpring(dest);
    }
  })
  // const translateY = withSpring({
  //   value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
  //   velocity: velocityY,
  //   offset,
  //   state,
  //   snapPoints: [SNAP_TOP, SNAP_BOTTOM],
  //   config
  // });
  // const translateBottomTab = interpolate(translateY, {
  //   inputRange: [SNAP_TOP, SNAP_BOTTOM],
  //   outputRange: [TABBAR_HEIGHT, 0],
  //   extrapolate: Extrapolate.CLAMP
  // });
  const bottomTabStyle = useAnimatedStyle(() => {
    const translateBottomTab = interpolate(
      translateY.value,
      [SNAP_TOP, SNAP_BOTTOM],
      [TABBAR_HEIGHT, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY: translateBottomTab }]
    }
  })

  // const opacity = interpolate(translateY, {
  //   inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
  //   outputRange: [0, 1],
  //   extrapolate: Extrapolate.CLAMP
  // });

  const miniPlayerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity
    }
  })
  // const opacity2 = interpolate(translateY, {
  //   inputRange: [
  //     SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
  //     SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT
  //   ],
  //   outputRange: [0, 1],
  //   extrapolate: Extrapolate.CLAMP
  // });
  const overlay = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [
        SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
        SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT
      ],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity
    }
  });

  // const clock = new Clock();
  // useCode(
  //   block([
  //     cond(goUp, [
  //       set(
  //         offset,
  //         timing({
  //           clock,
  //           from: offset,
  //           to: SNAP_TOP
  //         })
  //       ),
  //       cond(not(clockRunning(clock)), [set(goUp, 0)])
  //     ]),
  //     cond(goDown, [
  //       set(
  //         offset,
  //         timing({
  //           clock,
  //           from: offset,
  //           to: SNAP_BOTTOM
  //         })
  //       ),
  //       cond(not(clockRunning(clock)), [set(goDown, 0)])
  //     ])
  //   ]),
  //   []
  // );
  const playerSheet = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))
  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[styles.playerSheet, playerSheet]}
        >
          <Player //goDown.setValue(1)
            onPress={() =>{translateY.value = withSpring(SNAP_BOTTOM)}} />
          <Animated.View
            pointerEvents="none"
            style={[{
              backgroundColor: "#272829",
              ...StyleSheet.absoluteFillObject
            }, overlay]}
          />
          <Animated.View
            style={[{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: MINIMIZED_PLAYER_HEIGHT
            }, miniPlayerStyle]}
          >
            {/* <MiniPlayer //goUp.setValue(1)
              onPress={() => {translateY.value = withSpring(SNAP_TOP)}} /> */}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={bottomTabStyle}
      >
        <SafeAreaView style={styles.container}>
          {/* <TabIcon name="home" label="Home" />
          <TabIcon name="search" label="Search" />
          <TabIcon
            name="chevron-up"
            label="Player"
            //goUp.setValue(1)
            onPress={() => false}
          /> */}
        </SafeAreaView>
      </Animated.View>
    </>
  );
};
