import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withRepeat,
    Easing
} from "react-native-reanimated"
import { DataType } from './Data';
import styles, { width } from './Styles';
import MoreInfo from "./MoreLessText";
import AutoScroll from "./AutoScroll";

interface DescProps {
    oneDat: DataType;
    //currentIndex:number;
    currentSong: DataType[];
}

function Desc({ oneDat: { description }, currentSong }: DescProps) {
    const song = currentSong.map(m => m.song);
    const progress = useSharedValue(0)
    const textStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            progress.value,
            [0, 1],
            [0, width]
        )
        return {
            transform: [{ translateX }]
        }
    })
    /**useEffect(()=>{
        progress.value = withRepeat(withTiming(1,{
            duration: 3000,
            easing:Easing.inOut(Easing.ease)}), -1, true);
        //return() =>{ progress.value = 0};
    }
    ,[progress]) */

    const describe = [...description,
    ...description,
    ...description,
    ...description,
    ...description,
    ...description,
    ...description,
    ...description]//[ ]
    return (
        <View
            style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: "center",
                alignItems: "center",
                //alignSelf:"center",
                //bottom:0,
                //left:0
            }}>
            <MoreInfo linesToTruncate={1} text={describe} />
            <AutoScroll
                endPaddingWidth={10}
                style={{ bottom: 0, left: 0, height: undefined, width: width * 0.75 }} >
                <Text
                    numberOfLines={1}
                    style={[styles.title]}>
                    {`${song[0].artist} - ${song[0].title}`}
                </Text>
            </AutoScroll>
        </View>
    )
}
/**<Animated.Text 
           numberOfLines={1}
           style={[styles.title,textStyle]}>
            {`${song.artist}- ${song.title}`}</Animated.Text> */
interface DescriptionProps {
    index: Animated.SharedValue<number>;
    data: DataType[];
}


const Description = ({ index, data }: DescriptionProps) => {
    return (
        <View style={{ ...StyleSheet.absoluteFillObject, flex: 1 }}>
            {data.map((dat: DataType, key: number) => {
                const currentSong = data.splice(key, 1);
                const style = useAnimatedStyle(() => {
                    const translateX = interpolate(
                        index.value,
                        [key - 1, key, key + 1],
                        [width, 0, -width]
                    )
                    return { transform: [{ translateX }] }
                });
                return (
                    <Animated.View
                        style={[{ ...StyleSheet.absoluteFillObject }, style]}
                        key={key}>
                        <Desc key={key} oneDat={dat} {...{ currentSong }} />
                    </Animated.View>)
            })}
        </View>
    )
}

export default Description