import React, { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withTiming,
  withSpring,
  withDelay,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import LinearGradient from "react-native-linear-gradient";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { BottomTabBarProps, BottomTabDescriptorMap, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { NavigationHelpers, TabNavigationState } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

import styles, { height, MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM, SNAP_TOP, TABBAR_HEIGHT, tabWidth } from "./Styles";
import tabs, { colors } from "./Model";
import CircleCursor from "./FluidCircle";
import { DataProps } from '../userprofile/Data';
import MiniPlayer from './player/MiniPlayer';
import Player from './player/Player';
import { snapPoint } from 'react-native-redash';
import { usePlaybackState } from 'react-native-track-player';
import { DataType } from '../inbox/bbc-iplayer/Data';

/**
 * This is the React Component Rendering the Bottom Tabbar as a whole
 * ]
 */

 const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};

type ButtonProps = {
  options: BottomTabNavigationOptions;
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  currentPosition: number;
  index: number;
  position: number;
  readonly indicatorPosition: Animated.SharedValue<number>;
  readonly activeIndex: Animated.SharedValue<number>;
  item: React.ReactElement;
  postProps: DataProps;
};
function Button({
  item,
  options,
  onPress,
  onLongPress,
  index,
  activeIndex,
}: ButtonProps) {
  const staticIconStyle = useAnimatedStyle(() => {
    //const yOffset = isActive ? 0 : 80;
    const opacity = interpolate(
      index,
      [0, 1, 2],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      activeIndex.value,
      [0, 1, 2],
      [20, 100, 20]
    );
    const antiOpacity = interpolate(
      index,
      [0,1,2],
      [30,0,-30],
      Extrapolate.CLAMP
    )
    const activeI = interpolate(
      activeIndex.value,
      [0, 1, 2],
      [0, 1, 0]
    );
    // const translateX = interpolate(
    //   activeIndex.value,
    //   [0, 1, 2],
    //   [50, 0, 50]
    // )
    const scale = interpolate(
      activeIndex.value,
      [0, 1, 2],
      [0, 2, 0]
    )
    return {
      //opacity,
      //scale: 10,
       transform: [
         { translateY:withSpring(opacity * -translateY) },
         { translateX:withSpring(activeI*antiOpacity) },
         //{ scale:withSpring(opacity*scale) },
       ],
    };
  });
  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onLongPress={onLongPress}
      style={{...StyleSheet.absoluteFillObject}}
      testID={options.tabBarTestID}
      onPress={onPress}>
      <View style={[styles.tab,{bottom:60}]}>
         <Animated.View style={[staticIconStyle]}>
           {/* //why wont it work? both movement and passing props */}
          {item}
        </Animated.View> 
      </View>
    </TouchableWithoutFeedback>
  );
}

interface BarProps extends BottomTabBarProps {
  state: TabNavigationState<Record<string, object | undefined>>;
  navigation: NavigationHelpers<Record<string, object | undefined>, BottomTabNavigationEventMap>;
  descriptors: BottomTabDescriptorMap;
  params: DataProps;
  activeIndex:Animated.SharedValue<number>;
}

function Bar({ state, navigation, descriptors, params, activeIndex }: BarProps) {

  
  const indicatorPosition = useDerivedValue(() => {
    return withTiming((activeIndex.value * tabWidth) + tabWidth / 2);
  });

  const velocity = 16;
  const { routes } = state;

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(indicatorPosition.value) }],
    };
  });

  const color = "white";

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.indicator, indicatorStyle]}>
        {tabs.map((tab, index) => (
          <CircleCursor
            key={`bg-${index}`}
            item={tab.item}
            postProps={params}
            width={tabWidth}
            colorIcon={color}
            indicatorPosition={indicatorPosition}
            activeIndex={activeIndex}
            index={index}
            colors={colors}
          />
        ))}
      </Animated.View>
      {tabs.map(({ item }, index) => {

        const route = routes[index];

        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          activeIndex.value = index

          // const event = navigation.emit({
          //   type: "tabPress",
          //   target: route.key,
          //   canPreventDefault: true
          // });

          // if (!isFocused && !event.defaultPrevented) {
          //   navigation.navigate(route.name)
          // }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        };

        const activePosition = tabWidth + tabWidth / 2;
        const position = tabWidth * index + tabWidth / 2;// item center
        return (
          <React.Fragment key={index}>
            {/* <TouchableWithoutFeedback
            onPress={()=>{
              activeIndex.value = index
              console.log("help me")
            }}
            onLongPress={onLongPress}> */}
            <Button
              {...{ item, index, activeIndex }}
              postProps={params}
              currentPosition={activePosition}
              onPress={onPress}
              options={options}
              onLongPress={onLongPress}
              indicatorPosition={indicatorPosition}
              position={position}
              key={`bg-${index}`}
            />
          </React.Fragment>
        );
      })}
    </View>
  );
}

interface TabbarProps extends BottomTabBarProps {
  state: TabNavigationState<Record<string, object | undefined>>;
  navigation: NavigationHelpers<Record<string, object | undefined>, BottomTabNavigationEventMap>;
  descriptors: BottomTabDescriptorMap;
  params: DataProps;
  videoProgress:Animated.SharedValue<number>;
}

function TabBar({ state, navigation, descriptors, params, videoProgress }: TabbarProps): React.ReactElement {
  const[likedSong, setLikedSong] = useState<DataType>();
  const [current, setCurrent] = useState<DataType>();
  
  const translateY = useSharedValue(SNAP_BOTTOM);
  const activeIndex = useSharedValue(1);
  const {bottom, left, right} = useSafeAreaInsets();
   const clamp = (value:number) => {
     "worklet";
     // top:boolean = false, bottom:boolean = false, both:boolean = true // both &&
     //value > SNAP_BOTTOM ? SNAP_BOTTOM : 
     const d = value < SNAP_TOP ? SNAP_TOP : value;
     // const t = top && (value > SNAP_TOP ? SNAP_TOP : value);
     // const b = bottom && (value < SNAP_BOTTOM ? SNAP_BOTTOM : value)
     //const out = d || b || t;
     return d;
     //return out ? out : value;
   }
   const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { offset: number }>({
     onStart: (_, ctx) => {
       ctx.offset = translateY.value;
     },
     onActive: ({ translationY }, { offset }) => {
       translateY.value = clamp(translationY + offset);
     },
     onEnd: ({ velocityY }) => {
       const dest = snapPoint(translateY.value, velocityY, [SNAP_TOP, SNAP_BOTTOM]);
       translateY.value = withSpring(dest);
     }
   })
  const playerSheet = useAnimatedStyle(() =>{ 
    const top = interpolate(
      translateY.value,
      [SNAP_BOTTOM,SNAP_TOP],
      [10,0],
      Extrapolate.CLAMP
    )
    const opacity = interpolate(
      translateY.value,
      [
        SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
        SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT
      ],
      [1, 0],
      Extrapolate.CLAMP
    )
    return{
      top,
      //opacity,
      transform: [{ translateY: translateY.value }]
  }})
  const overlay = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [
        SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 2,
        SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT
      ],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity
    }
  });
   const miniPlayerStyle = useAnimatedStyle(() => {
     const opacity = interpolate(
       translateY.value,
       [MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
       [0, 1],
       Extrapolate.CLAMP
     );
     return {
       opacity:withTiming(opacity)
     }
   })
   const bottomTabStyle = useAnimatedStyle(() => {
     const opacity = interpolate(
       translateY.value,
       [SNAP_TOP, SNAP_BOTTOM/4],
       [0, 1],
       Extrapolate.CLAMP
     );
     return {
        opacity
     }
   })
  //  const musicMiniPlayerOpacity = useAnimatedStyle(()=>{
  //    //so, the song miniPlayer is only shown by default on entering the app, then after that.
  //    //if someone chooses a song, thy render a one song screen, where the repeat that song only.
  //    //unless they were listening to their favorites
  //    //also build another component like this for an attachment
  //    const opacity = interpolate(
  //      activeIndex.value,
  //      [0,1,2],
  //      [0,1,0],
  //      Extrapolate.CLAMP
  //    );
  //    return{
  //      opacity: withTiming(opacity)
  //    }
  //  })
  return (
    <>
    {params.attachment?.videoSource &&
     (<PanGestureHandler onGestureEvent={gestureHandler}>
     <Animated.View style={[StyleSheet.absoluteFill,playerSheet]}>
       <Player
         currentAttach={params.attachment.videoSource}
         translateY={translateY}
         playing={translateY.value === SNAP_TOP ? true : false}
         currentSong={(v:DataType)=>setCurrent(v)}
         //onFinish={()}
         onPress={() => { translateY.value = withSpring(SNAP_BOTTOM, config) }} />
       <Animated.View
         pointerEvents="none"
         style={[{
           backgroundColor: "#272829",
           ...StyleSheet.absoluteFillObject
         },overlay]}//overlay
       />
       <Animated.View
         style={[{
           position: "absolute",
           top: 0,
           left: 0,
           right: 0,
           height: MINIMIZED_PLAYER_HEIGHT
         }, miniPlayerStyle]}>
         <MiniPlayer
           params={params}
           activeIndex={activeIndex}
           onPressLike={(v?:DataType)=>setLikedSong(v)}
           onPress={() => { translateY.value = withSpring(SNAP_TOP, config) }} />
       </Animated.View>
     </Animated.View>
   </PanGestureHandler>)
    }
        <Animated.View style={[styles.tabContainer,{bottom, right, left}]}>
          <LinearGradient
            style={{ ...StyleSheet.absoluteFillObject, bottom: 0, height:"100%", width: "100%", }}
            colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
          />
          <Bar
            {...{ params, activeIndex }}
            state={state}
            navigation={navigation}
            descriptors={descriptors}
          />
        </Animated.View>
    </>
  );
}

export default TabBar;

/**
 * <ImageBackground
      style={styles.backImage}
      source={require("./assets/back.png")}>
     <View style={{backgroundColor:"rgba(0,0,0,0.6)", flex:1}}>
          </ImageBackground>
    </View>
 */