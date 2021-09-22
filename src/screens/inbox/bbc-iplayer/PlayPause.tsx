import React, { useEffect, useRef } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, StyleProp, ViewStyle, ActivityIndicator } from "react-native";
import Animated,{ useAnimatedStyle, withTiming } from "react-native-reanimated";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";

import Icon from "../../../icons";

const styles = StyleSheet.create({
    container: {
        //...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    }
})

interface Props {
    style: StyleProp<ViewStyle>;
    radius: number;
};

export default function PlayPause({ style, radius: r }: Props) {
    const playbackState = usePlaybackState();
    const isPlaying = useRef("paused")

    useEffect(() => {
        if (playbackState === 3) {
            isPlaying.current = "playing"
        } else if (playbackState === 2) {
            isPlaying.current = "paused"
        } else {
            isPlaying.current = "loading"
        }
    }, [playbackState]);

    const playerSheet = useAnimatedStyle(()=>({
        backgroundColor: isPlaying.current === "loading" ? withTiming("white") : withTiming("transparent") 
    }))

    function returnPlayBtn() {
        switch (isPlaying.current) {
            case "playing":
                //height={40} width={40} fill="black"
                return <Icon name="pause" style={{ height: r * 3, width: r * 3, alignSelf: "center" }} svg={{ height: r * 3, width: r * 3, stroke: "white", fill:"white" }} />
            case "paused":
                return <Icon name="play" style={{ height: r * 3, width: r * 3, alignSelf: "center" }} svg={{ height: r * 3, width: r * 3, stroke: "white",fill:"white"  }} />
            default:
                return <ActivityIndicator size={40} color="black" />
        }
    }

    const onPlayPause = async() => {
        if (isPlaying.current === "playing") {
           await TrackPlayer.pause()
        } else if (isPlaying.current === "paused") {
            await TrackPlayer.play()
        }
    }
    return (
        <TouchableWithoutFeedback onPress={onPlayPause}>
            <Animated.View style={[styles.container, playerSheet, style]}>
                {returnPlayBtn()}
            </Animated.View>
        </TouchableWithoutFeedback>

    )
}