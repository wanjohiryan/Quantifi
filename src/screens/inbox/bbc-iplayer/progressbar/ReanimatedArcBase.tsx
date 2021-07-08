/*
 * implemented on the base of https://github.com/bartgryszko/react-native-circular-progress/blob/master/src/CircularProgress.js
 * but with Animated
 */

import * as React from 'react';
import { View, ViewStyle, StyleProp, Platform, } from 'react-native';
import { Svg, Path, G, Defs, Mask, Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
} from 'react-native-reanimated';

//const Circle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export type Props = {
  diameter: number;
  width: number;
  arcSweepAngle: Animated.SharedValue<number>;
  rotation: Animated.SharedValue<number>;
  color: string;
  lineCap: 'round' | 'butt' | 'square';
  hideAngle: boolean;
  style?: StyleProp<ViewStyle>;
};

export const defaultProps = {
  color: 'black',
  rotation: 0,
  lineCap: 'round',
  arcSweepAngle: 360,
  hideAngle: false,
};
/**const animatedProps = useAnimatedProps(() => {
    const p1 = startPos.value;
    const p2 = endPos.value;
    const duration = absoluteDuration(start.value, end.value);
    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI)}`,
    };
  }); */
const AnimatedArc = ({
  diameter,
  width,
  arcSweepAngle,
  rotation,
  color,
  lineCap,
  hideAngle,
  style }: Props) => {
  const outerRadius = (diameter / 2);
  const innerRadius = (diameter / 2) - (width / 2);
  const pivot = outerRadius;
  const offsetAndroid = (Platform.OS === 'android') ? outerRadius : 0;
  
  const arc = (x: number, y: number, large = false, sweep = false) => {
    "worklet";
    return `A ${innerRadius} ${innerRadius} 0 ${large ? "1" : "0"} ${sweep ? "1" : "0"} ${x} ${y}`;
  };
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    "worklet";
    const angleInRadians = (((angleInDegrees - 90) * Math.PI) / 180);
    return {
      x: (centerX + (radius * Math.cos(angleInRadians))),
      y: (centerY + (radius * Math.sin(angleInRadians))),
    };
  }

  const pathProps = useAnimatedProps(() => {
    const endAngle = Math.min(arcSweepAngle.value, 360);
    const start = polarToCartesian(
      outerRadius,
      outerRadius,
      innerRadius,
      (endAngle * 0.9999),
    );
    const end = polarToCartesian(
      outerRadius,
      outerRadius,
      innerRadius,
      0);
    const largeArcFlag = ((endAngle - innerRadius) <= 180) ? '0' : '1';
    const hideSmallAngle = (hideAngle ? 1 : 0 && ((endAngle - 0) <= 1)) ? true : false;

    return {
      fill: "blue",
      //style:{transform:[{translateX:30},{translateY:20}]} ,
      d:`M ${start.x} ${start.y} ${arc(end.x, end.y, true,true)}`,
    };
  });
//(hideSmallAngle) ? '' :
  /**const Gprops = useAnimatedProps(()=>{
    return{
      style:{transform:{translateX: -offsetAndroid,rotation: `${rotation.value}deg`,translateY: offsetAndroid}}
    }
  }) */
  
  return (
    <View style={[style,{alignItems:"center", justifyContent:"center"}]}>
      <Svg
        //style={{backgroundColor:"red",}}
        width={diameter}
        height={diameter}
        viewBox={`${-pivot} ${-pivot} ${diameter} ${diameter}`}>
          <Defs>
          <Mask id="mask">
          <AnimatedPath
            animatedProps={pathProps}
            //d={circlePath}
            stroke={color}
            strokeWidth={width}
            strokeLinecap={lineCap}
            transform={`translate(${-pivot} ${-pivot})`}
          />
          </Mask>
          </Defs>
        <Circle stroke={"black"} r={width - 20} cx={pivot} cy={-pivot} />
      </Svg>
    </View>
  );
}

AnimatedArc.defaultProps = defaultProps;

export default AnimatedArc;

/**const circlePath = getCirclePath(
    outerRadius,
    outerRadius,
    innerRadius,
    0,
    Math.min(arcSweepAngle.value, 360),
  );
  <AnimatedG
         //animatedProps={Gprops}
          transform={{
            //translateX: -offsetAndroid,
            //rotation: rotation.value,//`${rotation.value}deg`,
            //translateY: offsetAndroid
          }}>
  transform={{
            translateX:-offsetAndroid,
            rotation:rotation.value,//`${rotation.value}deg`,
            translateY:offsetAndroid}}

  function animatedString(
    strings: TemplateStringsArray,
    ...values: Array<number | string | Animated.SharedValue<string | number>>
  ) {
    const arr = [];
    const n = values.length;
    for (let i = 0; i < n; i++) {
      arr.push(strings[i], values[i]);
    }
    const end = strings[n];
    if (end) {
      arr.push(end);
    }
    return concat(...arr);
  }

    function getCirclePath(
    x: number,y: number,
    radius: number,startAngle: number,endAngle:number,) {
    const start = polarToCartesian(
      x,
      y,
      radius,
      (endAngle * 0.9999),
    );
    //const  = start;
    //const arcEndPosition:{x: Animated.SharedValue<number>;y: Animated.SharedValue<number>} = {x: useSharedValue<number>(0),y: useSharedValue<number>(0),};
    const hideSmallAngle = (hideAngle ? 1 : 0 && ((endAngle - startAngle) <= 1)) ? 1: 0

    cond(
      and(
        this.props.hideSmallAngle ? 1 : 0,
        lessOrEq(sub(endAngle, startAngle), 1),
      ),
      1,
      0,
    );

    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = ((endAngle - startAngle) <= 180) ? '0' : '1';

     return {hideSmallAngle ? '' :
      animatedString`M ${start.x} ${
        start.y
      } A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    }
  }

  getCirclePath(
    outerRadius,
    outerRadius,
    innerRadius,
    0,
    Math.min(arcSweepAngle.value, 360),

    const style = useAnimatedStyle(()=>{
        const pivot = outerRadius;
        //`translate(${-pivot} ${-pivot})`
      return{
        transform:[{translateX:-pivot},{translateX:-pivot}]
      }
    })
  );
  */