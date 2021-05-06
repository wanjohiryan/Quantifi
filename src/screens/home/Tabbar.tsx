import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView, } from "react-native-safe-area-context";
import MaskedView from "@react-native-community/masked-view";
import Animated, { interpolate, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

import { VideoNew as Video, MusicNew as Music, Browser,ImageNew as Picture } from "../../icons"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width: wWidth } = Dimensions.get("window")
const TABBAR_HEIGHT = 60;
const TAB_WIDTH = 80;
const TABBAR_WIDTH = TAB_WIDTH * 4;

export const Screens = [
  "Video",
  "Global",
  "Music",
  "Picture",
];

type TabProps = {
  color: string,
  backgroundColor: string,
  borderColor: string
};

const tabStyles = StyleSheet.create({
  tabs: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    height: TABBAR_HEIGHT,
    //position:"absolute",
  },
  tab: {
    width: TAB_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1
  },
  firstTab: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1
  },
  lastTab: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 1
  },
})


function Tab({ color, backgroundColor, borderColor }: TabProps) {

  const tabStyle = {
    backgroundColor,
    borderColor
  };
  return (
    <View style={tabStyles.tabs}>
      <View style={[tabStyles.tab, tabStyles.firstTab, tabStyle]}>
        <Browser color={color} />
      </View>
      <View style={[tabStyles.tab, tabStyle]}>
        <Picture color={color} />
      </View>
      <View style={[tabStyles.tab, tabStyle]}>
        <Video color={color} />
      </View>
      <View style={[tabStyles.tab, tabStyles.lastTab, tabStyle]}>
        <Music color={color} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    //backgroundColor: "#212223",
  },
  activeTab: {
    backgroundColor: "black",
    width: TAB_WIDTH,
    height: TABBAR_HEIGHT,
    borderRadius: 20,
  },
  container: {
    width: TABBAR_WIDTH,
    height: TABBAR_HEIGHT,
    alignItems: "center",
    justifyContent:"center",
    position:"absolute",
    marginHorizontal:20,
    //backgroundColor: "#212223",
  },
});

type TabBarProps = {
  index: number;
};

function Tabbar({ index }: TabBarProps) {
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const x = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    }
  });
  const moveX = useAnimatedStyle(() => {
    const TranslateX = interpolate(
      x.value,
      [0, TABBAR_WIDTH],
      [TABBAR_WIDTH - TAB_WIDTH, 0]
    );
    return { translateX: TranslateX }
  });

  return (
      <View style={styles.container}>
        <SafeAreaView style={styles.root} />
        <Tab color="#f8f9fa" backgroundColor="black" borderColor="#505152" />
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={<Animated.View style={[styles.activeTab, moveX]} />}
        >
          <Tab color="black" backgroundColor="#f8f9fa" borderColor="#f8f9fa" />
        </MaskedView>
        <Animated.ScrollView
          ref={scrollView}
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: TABBAR_WIDTH * 2}}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          bounces={false}
          snapToInterval={TABBAR_WIDTH/4 + TAB_WIDTH/2}
          horizontal
        />
      </View>
  );
}

export default Tabbar;

/**
 * <TouchableWithoutFeedback
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (scrollView.current) {
                scrollView.current
                  .getNode()
                  .scrollTo({ x: TAB_WIDTH * index, animated: true })
              }
            }}
          >
 *
 *
 *
 *
 *
 *  </TouchableWithoutFeedback>
 *
 *
 *
 *
 */