import React from 'react';
import {
  GestureResponderEvent,
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { BottomTabBarProps, BottomTabDescriptorMap, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { NavigationHelpers, TabNavigationState } from "@react-navigation/native";

import CircleCursor from "./FluidCircle";
import { Message, Home, Search, Quoin, User } from "../../icons"

const { width, height } = Dimensions.get('window');

/**
 * This is the React Component Rendering the Bottom Tabbar as a whole
 */
const tabs = [
  {
    name: 'home',
    item: <Home />,
  },
  {
    name: 'popular',
    item: <Search />,
  },
  {
    name: 'Quoin',
    item: <Quoin />,
  },
  {
    name: 'inbox',
    item: <Message />,
  },
  {
    name: 'user',
    item: <User />,
  },
];

const colors = [
  "#3984FF",
  "#39ffb4",
  "#ffb439",
  "#ff00ff",
  "#0000ff",
]
export const tabWidth = width / tabs.length;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    zIndex: 2,
  },
  activeIcon: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type ButtonProps = {
  options: BottomTabNavigationOptions;
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  width: number;
  position: number;
  readonly indicatorPosition: Animated.SharedValue<number>;
  children: React.ReactElement;
  color: string;
};
function Button({
  color,
  children,
  options,
  onPress,
  onLongPress,
  width,
  position,
  indicatorPosition,
}: ButtonProps) {
  const staticIconStyle = useAnimatedStyle(() => {
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
    return {
      opacity: visibility,
      transform: [{ translateY: 10 * (1 - visibility) }],
    };
  });

  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onLongPress={onLongPress}
      testID={options.tabBarTestID}
      onPress={onPress}>
      <View style={styles.tab}>
        <Animated.View style={staticIconStyle}>
          {React.cloneElement(children, { color: color })}
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

  const activeIndex = useSharedValue(0);
  const indicatorPosition = useDerivedValue(() => {
    return withTiming(activeIndex.value * tabWidth + tabWidth / 2, {
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
  

  const color = "black";
  
  return (
    <Animated.View style={styles.container}>
        <Animated.View
          style={[{ position: 'absolute', left: -tabWidth }, indicatorStyle]}>
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

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
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
              color={color}
              onPress={onPress}
              options={options}
              onLongPress={onLongPress}
              width={tabWidth}
              indicatorPosition={indicatorPosition}
              position={position}
              key={`bg-${index}`}
            >
              {item}
            </Button>
          </React.Fragment>
        );
      })}
    </Animated.View>
  );
}

const tabBarStyles = StyleSheet.create({
  top:{
    top: -30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height:30,
    width,
    position:"absolute",
  },
  container: {
    width,
    flex: 1,
    top: height / 1.04,//300 | 1.1( StatusBar.translucent === false)
    position: "absolute",
  },
  dummyPusher: {
    flexDirection: "row",
  },
});



interface TabbarProps extends BottomTabBarProps {
  state: TabNavigationState<Record<string, object | undefined>>;
  navigation: NavigationHelpers<Record<string, object | undefined>, BottomTabNavigationEventMap>;
  descriptors: BottomTabDescriptorMap;
}

function TabBar({ state, navigation, descriptors }: TabbarProps): React.ReactElement {
  return (
      
    <View style={tabBarStyles.container}>
      <View style={tabBarStyles.top}/>
      <ImageBackground source={require("./assets/back.png")}>
      <View style={tabBarStyles.dummyPusher} />
      <Bar
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
      </ImageBackground>
    </View>
  );
}

export default TabBar;