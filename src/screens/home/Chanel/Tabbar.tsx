import React from "react";
import { View, ImageBackground } from "react-native";
import { useAnimatedGestureHandler } from "react-native-reanimated";
import {TapGestureHandler, TapGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Icon from "../../../icons";

interface Props{};

export default function Tabbar({}:Props) {
    const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent,{x:number}>(
        {
          onEnd: () => {
            
          },
        }
      ) 
    return (
        <View style={{backgroundColor: "transparent", flexDirection: "row", justifyContent: "space-evenly", width:"100%", bottom:40,position:"absolute"}}>
            <TapGestureHandler onGestureEvent={onGestureEvent}>
            <Icon name="home" svg={{ height: 35, width: 35, fill: "white" }} />
            <View style={{ width: 70, height: 70, backgroundColor: "transparent", borderWidth: 5, borderColor: "white", borderRadius: 35, top:-20 }}></View>
            <Icon name="camera" svg={{ height: 35, width: 35, fill: "white" }} />
            </TapGestureHandler>
        </View>
    )
}