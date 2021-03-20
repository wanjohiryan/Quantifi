import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function App() {
  const radius = useSharedValue(50);

  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `
    M 100, 100
    m -${radius.value}, 0
    a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
    a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0
    `;
    return {
      d: path,
    };
  });

  // attach animated props to an SVG path using animatedProps
  return (
    <Svg>
      <AnimatedPath animatedProps={animatedProps} fill="black" />
    </Svg>
  );
}