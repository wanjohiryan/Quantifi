import React, { useEffect, useRef } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, StyleProp, ViewStyle, ActivityIndicator } from "react-native";
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

    const onPlayPause = () => {
        if (isPlaying.current === "playing") {
            TrackPlayer.pause()
        } else if (isPlaying.current === "paused") {
            TrackPlayer.play()
        }
    }
    return (
        <TouchableWithoutFeedback onPress={onPlayPause}>
            <View style={[styles.container, { backgroundColor: isPlaying.current === "loading" ? "white" : "transparent" }, style]}>
                {returnPlayBtn()}
            </View>
        </TouchableWithoutFeedback>

    )
}