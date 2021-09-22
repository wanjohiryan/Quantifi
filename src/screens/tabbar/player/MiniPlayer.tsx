import React, { useState } from "react";
import { StyleSheet, Text, View} from "react-native";
import { TapGestureHandler, TapGestureHandlerGestureEvent, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler } from "react-native-reanimated";

import Icon from "../../../icons";
import { DataType } from "../../inbox/bbc-iplayer/Data";
import { DataProps } from "../../userprofile/Data";
import { MINIMIZED_PLAYER_HEIGHT } from "../Styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#272829",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    //bottom:-20
  },
  text: {
    color: "white",
    flex:1,
	fontWeight:"bold",
	fontSize:18,
  },
});

interface MiniPlayerProps {
  onPress: () => void;
  params:DataProps;
  activeIndex: Animated.SharedValue<number>;
  onPressLike:(v?:DataType)=>void;
}

export default ({ onPress, params, onPressLike }: MiniPlayerProps) => {
  const r = 40;
  const [isLiked, setIsLiked] = useState(false);

  // const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
  //   onActive: () => {
  //     runOnJS(onPress)()
  //   }
  // })
  
  // const onLikePress = () => {    
    // setIsLiked(!isLiked);
    // onPressLike(params);
  // };

    // const returnPlayBtn = () => {
        // switch (isPlaying) {
            // case "playing":
                //height={40} width={40} fill="black"
                // return <Icon name="pause" style={{ height: r, width: r, alignSelf: "center" }} svg={{ height: r, width: r, stroke: "white", fill:"white" }} />
            // case "paused":
                // return <Icon name="play" style={{ height: r, width: r, alignSelf: "center" }} svg={{ height: r, width: r, stroke: "white",fill:"white"  }} />
            // default:
                // return <ActivityIndicator size={40} color="white" />
        // }
    // }

    // const onPlayPause = async () => {
        // if (isPlaying === "playing") {
            // await TrackPlayer.pause();
        // } else if (isPlaying === "paused") {
            // await TrackPlayer.play();
        // }
    // }

//how will it work?
  return (
      <Animated.View style={[styles.container]}>
        {/* we should show the time of the video, title, and episode plus season here*/}
        <Text style={styles.text}>{params.title}</Text>
      </Animated.View>
  );
};

/*<TouchableWithoutFeedback onPress={onLikePress}>
          <Icon name="like" svg={{ fill:isLiked ? "red" : "white", height: 25, width: 25 }} />
        </TouchableWithoutFeedback>
        {params && <Text style={styles.text}>{params?.song.artist} - {params?.song.title}</Text>}
        <TouchableWithoutFeedback onPress={onPlayPause}>
          {returnPlayBtn()}
        </TouchableWithoutFeedback>*/