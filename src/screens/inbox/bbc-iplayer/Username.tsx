import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { Extrapolate, useAnimatedStyle, interpolate } from "react-native-reanimated";

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        right: 0,
        left: 0,
        backgroundColor: "transparent",
    },
    txt: {
        justifyContent: "space-around",
        alignItems: "center",
        left: 0,
        right: 0,
        alignContent: "space-around",
        position: "absolute",
    }
});

interface Props {
    currentIndex: number;
    index: Animated.SharedValue<number>;
    username: string;
    radius: number;
}

export default function Username({ currentIndex, index, username, radius }: Props) {
    const textStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            index.value,
            [currentIndex - 1, currentIndex, currentIndex + 1],
            [0, 1, 0],
            Extrapolate.CLAMP
        )
        return { opacity }
    })
    return (
        <View
            //there's a slight lag, that appears and disappears,(i can't quite catch it) i think it's from here so imma...
            shouldRasterizeIOS
            renderToHardwareTextureAndroid
            style={[styles.txt, { top: (radius * 2) }]} >
            <Animated.Text
                adjustsFontSizeToFit
                allowFontScaling
                numberOfLines={1}
                style={[styles.text, textStyle]}>{username}</Animated.Text>
        </View>
    )
}