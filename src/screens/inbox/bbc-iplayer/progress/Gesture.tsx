import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, withSpring } from "react-native-reanimated";
import { canvas2Polar } from "react-native-redash";

import { absoluteDuration, CENTER,normalize } from "./Constants";

interface GestureProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  isActive: Animated.SharedValue<boolean>;
  onEnd:(start:number)=>void;
}

const Gesture = ({ start,onEnd,isActive}: GestureProps) => {
  const clamp = (v: number) => {
    "worklet";
    //const duration = absoluteDuration(start.value, end.value);
    //i've settled with clamping to the left, it seems more realistic to clamp a song to the start;
    const output = (v < 0) ? 0 : (v > Math.PI) ? Math.PI : v;
    // i want to clamp it to 0; This works but i don't need it no more
    //const t = (v > Math.PI) && (duration > Math.PI / 2) ? 0 : (v > Math.PI) && (duration < Math.PI / 2) ? Math.PI : v
    return output;
  }
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{ offset: number }>({
    onStart: (_, ctx) => {
      //ctx.region = Region.START;
      ctx.offset = start.value;
      isActive.value = true;
    },
    onActive: ({ x, y }, ctx) => {
      isActive.value = true;
      const { theta } = canvas2Polar({ x, y }, CENTER);
      const delta = theta - ctx.offset;
      //[x]make the start.value clamp to zero if the  values go below zero
      //[x]make the start.value clamp to PI if it goes beyond PI
      start.value = clamp(normalize(start.value + delta));
      ctx.offset = theta;
    },
    onEnd:()=>{
      isActive.value = false;
      runOnJS(onEnd)(start.value)
    }
  });

  const onTapGesture = useAnimatedGestureHandler<TapGestureHandlerGestureEvent,{ offset: number }>({
    onActive: ({ x, y },ctx) => {
      const { theta } = canvas2Polar({ x, y }, CENTER);
      const delta = theta - start.value;
      //[x]make the start.value clamp to zero if the  values go below zero
      //[x]make the start.value clamp to PI if it goes beyond PI
      start.value = clamp(normalize(start.value + delta));
      isActive.value = true;
      //ctx.offset = theta;
    },
    onEnd:()=>{
      isActive.value = false;
      runOnJS(onEnd)(start.value);
    }
  });

  return (
    <PanGestureHandler {...{onGestureEvent}}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <TapGestureHandler onGestureEvent={onTapGesture}>
          <Animated.View style={StyleSheet.absoluteFill}/>
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Gesture;
/**if (ctx.region === Region.START || ctx.region === Region.MAIN) {
        start.value = normalize(start.value + delta);
      }
      if (ctx.region === Region.END || ctx.region === Region.MAIN) {
        end.value = normalize(end.value + delta);
      }
 * <CursorOverlay position={startPos} icon="bed" />
  <CursorOverlay position={endPos} icon="bell" />

if (ctx.region === Region.END) {
        end.value = normalize(end.value + delta);
      }

      else if (containedInSquare({ x, y }, endPos.value, STROKE)) {
        ctx.region = Region.END;
        ctx.offset = end.value;
      }


 * if (containedInSquare({ x, y }, startPos.value, STROKE)) {
        ctx.region = Region.START;
        ctx.offset = start.value;
      } else if (containedInSquare({ x, y }, endPos.value, STROKE)) {
        ctx.region = Region.END;
        ctx.offset = end.value;
      }else {
        ctx.region = Region.MAIN;
        const { theta } = canvas2Polar({ x, y }, CENTER);
        ctx.offset = theta;
      } */