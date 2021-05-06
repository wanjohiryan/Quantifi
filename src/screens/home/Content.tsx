/* eslint-disable max-len */
import React, { ReactElement } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import { MIN_HEADER_HEIGHT } from "./Header";
//import { default as Chanel } from "../Chanel";
//import { MusicList } from "../Music";
//import Snapchat from "../Video";

import { Browser as BrowserIcon, Music as MusicIcon, Video as VideoIcon } from "../../icons"
const { height } = Dimensions.get("window");
const items = [
  {
    title: "Image",
    //display: <Chanel/>,
  },
  {
    title: "Late Sunset",
    //display: <Snapchat/>,
  },
  {
    title: "Cabbage Kimchi",
    //display: <MusicList/>,
  },
];

const menu = [
  { name: "Image", element: <BrowserIcon/>, items },
  { name: "Video", element: <VideoIcon/>, items },
  { name: "Music", element: <MusicIcon/>, items },
];

export const defaultTabs = menu.map(({ element }) => ({ element, anchor: 0 }));

const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    //fontFamily: "Text-Regular",
    fontSize: 14,
  },
  title1: {
    //fontFamily: "Text-Semibold",
    fontSize: 24,
  },
  title2: {
    //fontFamily: "Text-Semibold",
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: "#e2e3e4",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: "#247A00",
  },
  item: {
    borderBottomColor: "#e2e3e4",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    //fontFamily: "Text-Medium",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    //fontFamily: "Text-Medium",
    marginBottom: 16,
  },
});

export interface TabModel {
  name?: string;
  element: ReactElement;
  anchor: number;
};

interface ContentProps {
  y: Animated.SharedValue<number>;
  onMeasurement: (index: number, tab: TabModel) => void;
};

 const Content  = ({ y, onMeasurement }: ContentProps) => {
  const opacity = interpolate(
    y.value,
    [HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100, HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT],
    [1, 0],
    Extrapolate.CLAMP,
  );
  
  return (
    <React.Fragment>
      <View style={styles.placeholder} />
      <Animated.View style={[styles.section, { opacity }]}>
        <Text style={styles.text}>$$ • Asiatisch • Koreanisch • Japanisch</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Opens at 11:30 AM</Text>
          <View style={styles.ratings}>
            <Text style={styles.text}>(186)</Text>
          </View>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.title2}>Restaurant info</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Europaallee 48, Zürich, Zürich 8004</Text>
          <Text style={styles.link}>More info</Text>
        </View>
      </View>
      <View style={styles.divider} />
      {menu.map(({ name, element, items: menuItems }, index) => (
        <View
          style={styles.section}
          key={index}
          onLayout={({
            nativeEvent: {
              layout: { y: anchor },
            },
          }) => onMeasurement(index, { name, element, anchor: anchor - 142 })}
        >
          <Text style={styles.title1}>{name}</Text>
          {menuItems.map(({ title }, j) => (
            <View style={styles.item} key={j}>
              <Text style={styles.title}>{title}</Text>
                <View style = {{flex:1}} >
                  <Text>{title}</Text>
                  {/*display*/}
                </View>
            </View>
          ))}
        </View>
      ))
      }
      <View style={{ height }} />
    </React.Fragment>
  );
};

export default Content;