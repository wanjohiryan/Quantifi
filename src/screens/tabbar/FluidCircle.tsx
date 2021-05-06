import React from "react";
import {StyleSheet, View} from "react-native";
import Animated, { 
    useAnimatedProps,
    interpolateColor,
    useAnimatedStyle,
    withTiming,
    withDelay,
    useSharedValue,
 } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

/**
 * This is the Fluid-ish Circle and Active Icon Renderer
 */

const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  activeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"transparent"
  },
});

type ActiveIconProps = {
  index: number;
  children:React.ReactElement;
  activeIndex: Animated.SharedValue<number>;
  width: number;
  color:string;
};

/**
 * the active icons y-index seem to be off; 🤔
 */


function ActiveIcon({color, index, children, activeIndex, width }: ActiveIconProps) {
  const circleIconStyle = useAnimatedStyle(() => {
    const isActive = index === activeIndex.value;
    const yOffset = isActive ? 0 : 80;
    return {
      transform: [
        {
          translateY: withDelay(isActive ? 350 : 0, withTiming(yOffset)),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: width ,
          top: -3,
          left: width/1.65,
          height: 64,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5,
          backgroundColor:"transparent"
        },
        circleIconStyle,
      ]}>
      <View style={styles.activeIcon}>
          {React.cloneElement(children , { color: color})}
      </View>
    </Animated.View>
  );
}
interface CircleCursorProps {
  index: number;
  indicatorPosition:Animated.SharedValue<number>;
  item:React.ReactElement;
  colorIcon:string;
  activeIndex:Animated.SharedValue<number>;
  width:number;
  colors:string[];
}
const CircleCursor = ({index,colors, colorIcon, activeIndex,item, width, indicatorPosition }: CircleCursorProps) => {
  const CX = width / 1.5;

  const CY = 30

  const radius = useSharedValue(25);

  const animatedProps = useAnimatedProps(() => {
    
    /*
    path = "M (CX - R), CY
            m R , 0        
            a R(radiusBottom), R(bottom less is less) 0 1, 0 (R * 2), 0
            a R, R 0 1, -(R * 2), 0
            "
     */
    const path: string = `
    M ${CX - radius.value}, ${CY}
    m ${radius.value}, 0
    a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
    a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0
    `;
    return {
      d: path,
      fill:interpolateColor(
        indicatorPosition.value,
        [
		    width / 2,
        (width) + width / 2,
        (width * 2) + width / 2,
        (width * 3) + width / 2,
		    (width * 4) + width / 2,
        ],colors),
    };
  });

  return (
  
  <View key={`fg-${index}`}>
    <ActiveIcon
            color={colorIcon}
            index={index}
            activeIndex={activeIndex}
            width={width}
            key={`fg-${index}`}
          >
              {item}
    </ActiveIcon>
    <Svg 
    style={{
      position: "absolute", 
      alignItems:"center", 
      justifyContent:"center"}}
      width={width * 2.5} 
      height={64} >
      <AnimatedPath  animatedProps={animatedProps} /> 
    </Svg>
  </View>
  );
};

export default CircleCursor;

