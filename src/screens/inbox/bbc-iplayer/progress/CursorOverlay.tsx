import React, { ComponentProps } from "react";
import {Text} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Vector } from "react-native-redash";
//import { FontAwesome as Icon } from "@expo/vector-icons";

import { STROKE } from "./Constants";

interface CursorOverlayProps {
  position: Animated.SharedValue<Vector>;
  icon: string;//ComponentProps<typeof Icon>["name"];
}

const CursorOverlay = ({ position, icon }: CursorOverlayProps) => {
  const style = useAnimatedStyle(() => {
    const { x, y } = position.value;
    ///add a background circle to look like a circular ending
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: STROKE/ 2,
      height: STROKE / 2,
      borderRadius:STROKE,
      backgroundColor:"#2969d8",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      transform: [
        { translateX: x - (STROKE  )/ 2 },
        { translateY: y - (STROKE  )/ 2 },
      ],
    };
  });
  return <Animated.View style={style}/>
};
// <Text style={{color:"#E58406",fontSize:24, fontWeight:"bold"}}>{icon}</Text>
export default CursorOverlay;
