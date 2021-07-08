import React from "react";
import { StyleSheet, FlatList, Dimensions, View, Text, ImageBackground } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Item from "./Item";
// import { items, Post } from "./Data";
import Icon from "../../../icons";
import { SCROLL_HEIGHT,MAX_HEIGHT } from "./Styles";
import Tabbar from "./Tabbar"

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  // container: {
  //   height: (items.length) * MAX_HEIGHT,
  //   backgroundColor: "transparent",
  //   borderRadius: width / 14,
  // },
});

const AnimatedList = Animated.createAnimatedComponent(FlatList);

const Channel = () => {
  // const posts = items.map((item, i) => {
  //   return { ...item, id: `channel-${i}` }
  // });
  const { bottom, top, left, right } = useSafeAreaInsets();
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value }, }) => {
      y.value = value;
    },
  });
  return (
    <View style={{
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "black",
      bottom,
      left,
      right,
      top
    }}>
      <View style={{ height: height - SCROLL_HEIGHT, top: 0, alignItems: "center", justifyContent: "space-between", flexDirection: "row", padding:15 }}>
        <Icon name="arrowLeft" svg={{ height: 35, width: 35, fill:"white" }}/>
        <Text style={{ color: "#674889", fontWeight: "bold", fontSize: 35 }}>Quantifi</Text>
        <Icon name="camera" svg={{ height: 35, width: 35, fill: "white" }}/>
      </View>
      <ImageBackground
       source={require("./assets/khaled-ghareeb-upepKTbwm3A-unsplash.jpg")}
       style={{
         ...StyleSheet.absoluteFillObject,
        height: undefined,
        width:undefined,
        }}>
          {/* <Tabbar/> */}
      </ImageBackground>
    </View>
  );
};

export default Channel;
/*<Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={MAX_HEIGHT}
        decelerationRate="fast"
      >
        <Animated.View style={styles.container}>
          {items.map((item, index) => (
            <Item item={item} key={index} y={y} index={index} />
          ))}
        </Animated.View>
      </Animated.ScrollView> 
      <AnimatedList
          style={[StyleSheet.absoluteFill]}
          data={posts}
          onScroll={onScroll}
          scrollEventThrottle={16}
          snapToInterval={MAX_HEIGHT}
          decelerationRate="fast"
          //contentContainerStyle={}
          removeClippedSubviews
          //windowSize={5}
          nestedScrollEnabled
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          //initialNumToRender={3}
          //maxToRenderPerBatch={7}
          // snapToEnd
          //snapToOffsets={items.map((_,i)=>i)}
          //snapToAlignment="start" //{'start'}
          renderItem={({ item, index }) => (<Animated.View style={[styles.container, { overflow: "hidden" }]}><Item item={item} key={index} y={y} index={index} /></Animated.View>)}
        />
      
      */