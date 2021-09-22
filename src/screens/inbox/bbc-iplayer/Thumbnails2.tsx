import React from "react";
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  Text
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";
//import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";

import { CommentSection, Description } from "../../../utils";
import styles, { width, CoverHeight, circularHeight } from "./Styles";
//import { DataType } from "./Data";/
//import { DataProps } from "../../userprofile/Data";
import { DataType } from "./Data";

interface ThumbnailProps {
  post: DataType;
};

const Thumbnail = ({
  post: { user, song, comments, likes, shares }
}: ThumbnailProps) => {
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, width: width, backgroundColor: "black" }}>
      <Image
        source={song.artwork}
        resizeMode="cover"
        style={[styles.cover]} />
        <CommentSection
        comments={comments}
        likes={likes}
        stars={shares}
        style={{ marginTop: CoverHeight - 40, position: "absolute", width: "100%", height:40 }} />
      <View style={{position:"absolute", flexDirection: "row", height: (CoverHeight - circularHeight), width: "100%", marginTop: CoverHeight, padding: 5}}>
        <Text style={{fontSize:24, color:"white", fontWeight:"bold"}}>{song.title}</Text>
        <Text style={{fontSize:16, color:"grey", fontWeight:"bold"}}>{song.artist}</Text>
      </View>
      {/* <Description
        style={{position:"absolute", flexDirection: "column", height: (CoverHeight - circularHeight), width: "100%", marginTop: CoverHeight, padding: 5}}
        linesToTruncate={3}
        username={user.username}>
        Here is my first comment😁😎, i would like to
        say that i have always loved what you do, please continue with your good work,
        why? Because it unites people... Also i have tipped you with some Quoins 😁😋
      </Description> */}
    </View>
  );
};

interface ThumbnailsProps {
  data: DataType[];
  index: Animated.SharedValue<number>;
 // posts:DataProps[];
};

const Thumbnails = ({ data, index }: ThumbnailsProps) => {
  return (
    <View style={styles.thumbnailsContainer}>
      <SafeAreaView />
      <StatusBar backgroundColor="black" />
      <View style={styles.thumbnailsContent}>
        {data.map((dat, key: number) => {
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
              <Thumbnail post={dat} key={key} />
            </Animated.View>)
        })}
      </View>
    </View>
  );
}

export default Thumbnails;
/**this makes a flowless comeback;
 * key === 0 ?interpolate(
              index.value,
              [0, 1, 1, data.length - 1, data.length],
              [0, -width, width, width, 0]
            ):


<View style={{ flexDirection: "column", flex: 1, padding: 5, }} >
          <Text numberOfLines={1} style={{ color: "white", fontWeight: "bold" }} >{`${user.username}`}</Text>
          <Text
            style={{ color: "grey", fontWeight: "300" }}
            numberOfLines={2}>
            </Text>
        </View>
                    <View
            style={{
              flexDirection:"row",
              paddingHorizontal:20,
              width:"100%",
              height:40,
              bottom:0,
              position:"absolute",
              justifyContent:"space-between",
              borderBottomWidth:0.2,
              borderBottomColor:"white",
              alignItems:"center"}}>
        <Text numberOfLines={1} style={{ color:"white",fontSize:20, fontWeight:"bold"}} >{`${comments} Comments`}</Text>
         <Text numberOfLines={1} style={{ color:"white",fontSize:20, fontWeight:"bold"}} >{`${shares} Quoins`}</Text>
        <Text numberOfLines={1} style={{ color:"white",fontSize:20, fontWeight:"bold"}} >{`${likes} Likes`}</Text>
        </View>
    <View style={styles.thumbContainer}>
            start={[0, 0.3]}
            end={[0, 1]}
            <LinearGradient
          style={{position:"absolute",height: 100,width:"100%", bottom:30, }}
          colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}/>
            */