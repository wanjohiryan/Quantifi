import React from 'react';
import {
  GestureResponderEvent,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
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
} from 'react-native-reanimated';
import  LinearGradient  from "react-native-linear-gradient";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { BottomTabBarProps, BottomTabDescriptorMap, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { NavigationHelpers, TabNavigationState } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles,{tabWidth} from "./Styles";
import tabs,{colors} from "./Model";
import CircleCursor from "./FluidCircle";

/**
 * This is the React Component Rendering the Bottom Tabbar as a whole
 * ]
 */

type ButtonProps = {
  options: BottomTabNavigationOptions;
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  width: number;
  isActive:boolean;
  position: number;
  readonly activeIndex:Animated.SharedValue<number>;
  readonly indicatorPosition: Animated.SharedValue<number>;
  item: React.ReactElement;
  color: string;
};
function Button({
  item,
  options,
  onPress,
  onLongPress,
  width,
  position,
  activeIndex,
  indicatorPosition,
  isActive
}: ButtonProps) {
  const staticIconStyle = useAnimatedStyle(() => {
    const yOffset = isActive ? 0 : 80;
    const visibility = interpolate(
      indicatorPosition.value,
      [
        position - width / 2,
        position - width / 8,
        position + width / 8,
        position + width / 2,
      ],
      [1, 0, 0, 1],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      activeIndex.value,
      [0, 1, 2],
      [0, 50, 0]
    );
    const translateX = interpolate(
      activeIndex.value,
      [0, 1, 2],
      [50, 0, 50]
    )
    const scaleCamera = interpolate(
      activeIndex.value,
      [0, 1, 2],
      [0, 5, 0]
    )
    return {
      //opacity: visibility,
      // opacity: visibility,
      //transform: isActive ? [{translateY: 50},{translateX:0}] : [{translateX:50},{translateY:0}],
      //scale:scaleCamera,
      //transform:[{translateY: 50}],
      //top:-10,isActive ?: withSpring(0)
      //justifyContent:"space-between"
      // transform: [{ translateY:isActive ? 350 : 0}],
    };
  });
   const iconColor = "white";
  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onLongPress={onLongPress}
      testID={options.tabBarTestID}
      onPress={onPress}>
      <View style={[styles.tab,{paddingBottom:-50}]}>
        <Animated.View style={staticIconStyle}>
          {/* {React.cloneElement(children, { color: iconColor })} {children} */}
			  <View>{item}</View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

interface BarProps extends BottomTabBarProps {
  state: TabNavigationState<Record<string, object | undefined>>;
  navigation: NavigationHelpers<Record<string, object | undefined>, BottomTabNavigationEventMap>;
  descriptors: BottomTabDescriptorMap;
}

function Bar({ state, navigation, descriptors }: BarProps) {

  const activeIndex = useSharedValue(1);
  const indicatorPosition = useDerivedValue(() => {
    return withTiming((activeIndex.value * tabWidth) + tabWidth / 2, {
      duration: 800,
    });
  });
  
  const velocity = 16;
  const { routes } = state;
  
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX:withSpring(indicatorPosition.value, { velocity })}],
    };
  });

  const color = "white";
  
  return (
    <View style={styles.container}>
        <Animated.View
          style={[styles.indicator,{bottom:0}, indicatorStyle]}>
          {tabs.map((tab, index) => (
            <CircleCursor
              key={`bg-${index}`}
              item={tab.item}
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

        const position = tabWidth * index + tabWidth / 2; // item center

        return (
          <React.Fragment key={index}>
            <Button
              {...{activeIndex,item }}
              color={color}
              onPress={onPress}
              options={options}
              onLongPress={onLongPress}
              width={tabWidth}
              indicatorPosition={indicatorPosition}
              position={position}
              isActive={activeIndex.value === 1}
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
}

function TabBar({ state, navigation, descriptors }: TabbarProps): React.ReactElement {
  const {bottom: paddingBottom} = useSafeAreaInsets();
  return ( 
    <View style={[styles.tabContainer, {paddingBottom}]}>
    <View style={[{borderTopColor:"#ff9000", borderTopWidth:2, height:2,position:"relative", top:-10, bottom:0,left:0, right:0}]}/>
      <LinearGradient
        style={{ ...StyleSheet.absoluteFillObject, bottom: 0, width:"100%", }}
        colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
      />
      {/* <View style={styles.dummyPusher} /> */}
      <Bar
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
      </View>
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