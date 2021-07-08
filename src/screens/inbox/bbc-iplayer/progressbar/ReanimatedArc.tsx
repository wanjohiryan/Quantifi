import * as React from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import AnimatedArcBase, {
  Props as AnimatedArcBaseProps,
  defaultProps,
} from './ReanimatedArcBase';

type Props = Omit<AnimatedArcBaseProps, 'arcSweepAngle' | 'rotation'> & {
  arcSweepAngle: number;
  rotation: number;
  initialAnimation: boolean;
  animationDuration: number;
  easing: Animated.EasingFunction;
};

function AnimatedArc({
  arcSweepAngle,
  style,
  rotation, 
  initialAnimation,
  animationDuration,
  diameter,
  width,
  color,
  lineCap,
  hideAngle,
  easing}:Props) {

  const arcSweepAngleValue = useSharedValue<number>(0); //new Animated.Value<number>(0);
  const rotationValue = useSharedValue<number>(0);

  const arcSweepAngleTiming: Animated.SharedValue<null | number> = useSharedValue(null);
  const rotationTiming: Animated.SharedValue<null | number> = useSharedValue(null); //| null = null;

  React.useEffect(()=>{
    //const { initialAnimation, arcSweepAngle, rotation } = this.props;
   function  runArcAnimation() {
    //const { arcSweepAngle, animationDuration, easing } = this.props;

    if (arcSweepAngleTiming.value !== null) {
      cancelAnimation(arcSweepAngleTiming);
    }

    arcSweepAngleTiming.value = withTiming(arcSweepAngle, {
      //toValue: arcSweepAngle,
      duration: animationDuration,
      easing,
    }, () => { console.log(arcSweepAngleTiming), arcSweepAngleTiming.value = null; });
  };


  function runRotationAnimation() {
    //const { rotation, animationDuration, easing } = this.props;

    if (rotationTiming.value !== null) {
      cancelAnimation(rotationTiming);
    }

    rotationTiming.value = withTiming(rotation, {
      //toValue: rotation,
      duration: animationDuration,
      easing,
    }, () => {rotationTiming.value = null });
  };

    if (initialAnimation) {
      runArcAnimation();
      runRotationAnimation();
    } else {
      arcSweepAngleValue.value = (arcSweepAngle);
      rotationValue.value = (rotation);
    };
  },[arcSweepAngle,rotation])

  //React Memo
  /**componentDidUpdate(prevProps: Props) {
    const { arcSweepAngle, rotation } = this.props;

    if (arcSweepAngle !== prevProps.arcSweepAngle) {
      this.runArcAnimation();
    }

    if (rotation !== prevProps.rotation) {
      this.runRotationAnimation();
    }
  } */

    //const { diameter, width, color, lineCap, hideAngle, style } = this.props;
    return (
      <AnimatedArcBase
        arcSweepAngle={arcSweepAngleValue}
        rotation={rotationValue}
        diameter={diameter}
        width={width}
        color={color}
        lineCap={lineCap}
        hideAngle={hideAngle}
        style={style}
      />
    );
};
 
AnimatedArc.defaultProps = {
  ...defaultProps,
  initialAnimation: true,
  animationDuration: 800,
  easing: Easing.linear,
};

export default AnimatedArc;

