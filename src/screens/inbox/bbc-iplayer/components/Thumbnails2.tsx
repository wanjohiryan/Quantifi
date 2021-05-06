import React from "react";
import { View,
   FlatList, 
   Text,
   ImageBackground, 
   StatusBar,
   Image,
   StyleSheet} from "react-native";
import Animated, { 
  interpolate, 
  useAnimatedStyle} from "react-native-reanimated";
import {SafeAreaView} from "react-native-safe-area-context";

import styles,{width} from "./Styles";
import {default as Header} from "./Header";
import { DataType } from "./Data";

const AnimFlatList = Animated.createAnimatedComponent(FlatList);

interface ThumbnailProps {
    post: DataType;
  };

const Thumbnail = ({
    post: {song, user }
  }: ThumbnailProps) => {
    return (
      <View style={{...StyleSheet.absoluteFillObject,width:width}}>
        <Header/>
        <ImageBackground source={song.artwork} resizeMode="cover" 
		      style={styles.cover}>
          <View style={styles.content}>
		      <Image
		         style={{
		         	height: 50,
		         	width:50,
		         	borderRadius:15,
		         }}
		         resizeMode="cover"
		         source={user.imageUri}/>
          <Text style={styles.type}>{user.username}</Text>
        </View>
        </ImageBackground>
      </View>
    );
  };

interface ThumbnailsProps {
  data: DataType[];
  index: Animated.SharedValue<number>;
};

const Thumbnails = ({data, index}:ThumbnailsProps) => {

    return(
        <View style={styles.thumbnailsContainer}>
          <SafeAreaView/>
          <StatusBar backgroundColor="black"/>
          <View style={styles.thumbnailsContent}>
          {data.map((dat:DataType, key:number) =>{
             const style = useAnimatedStyle(()=>{
            const translateX = interpolate(
              index.value,
              [key - 1, key, key + 1],
              [width, 0, -width]
            )
            return {transform:[{translateX}]}
          });
          return (
            <Animated.View
              style={[{...StyleSheet.absoluteFillObject}, style]}
              key={key}>
                  <Thumbnail post={dat} key={key} />
            </Animated.View>)
        })}
          </View>
        </View>
      );
  }

export default Thumbnails;
/**key === 0 ?interpolate(
              index.value,
              [0, 1, 1, data.length - 1, data.length],
              [0, -width, width, width, 0]
            ):
            <View style={styles.thumbContainer}>
            start={[0, 0.3]}
            end={[0, 1]}
			
			<LinearGradient style={{
          position:"absolute",
          width:width,
          height: 0.5 * CoverHeight, 
          top:hHeight }} colors={["#ffffff", "#ffffff"]}/>
            */