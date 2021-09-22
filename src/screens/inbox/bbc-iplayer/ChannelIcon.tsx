import * as React from "react";
import { ImageRequireSource, Image, View, StyleSheet } from "react-native";
import { TapGestureHandler, TapGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
//import { DataProps } from "../../userprofile/Data";

const margin = 10;

//[]implement TapGesture later

interface ChannelIconProps {
  radius: number;
  currentIndex: number;
  dat: {
    imageUri: ImageRequireSource;
    username: string;
    id: string
  };
  index: Animated.SharedValue<number>;
  onPress:() => void;
  isActive:Animated.SharedValue<boolean>;
}

const ChannelIcon = ({
  radius,
  index,
  dat,
  currentIndex,
  onPress,
  isActive,
}: ChannelIconProps) => {

  const inputRange = [currentIndex - 1, currentIndex, currentIndex + 1];
  const colorIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      index.value,
      inputRange,
      [1, 1.25, 1],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }]
    }
  });
  // const previousIndex = React.useMemo(()=>{return currentIndex},[])
  //  console.log("prev", previousIndex)
  

  // const clamp = (input:number,currentIndex:number)=>{
  //    "worklet";
  //   // 3 as our numbers start from 1 instead of 0
  //   //const output = (input < 3) ? currentIndex - input : (input > 3) ? currentIndex + input : currentIndex;
  //   //if (input < 3)return currentIndex - input
  //   //else if (input == 3)return currentIndex
  //   const output = (input == 0) ? 
  //                         (currentIndex-2) : (input == 1) ? 
  //                               (currentIndex  -1) : (input == 2) ? 
  //                                     currentIndex : (input == 3) ?
  //                                           (currentIndex + 1) : (input === 4) ?
  //                                                 (currentIndex + 2) : currentIndex
  //   /**if (input == 0) return -2;
  //   else if (input == 1) return -1;
  //   else if (input == 2) return currentIndex;
  //   else if (input == 3) return  1;
  //   else if (input == 4) return 2; */
  //   console.log("current", currentIndex)
  //   console.log("output", output)
  //   const filter = (output - currentIndex) > 3 ? currentIndex : (currentIndex - output) > 3 ? currentIndex : output;
  //   console.log("filter", filter)
  //   return filter;
  //   }

  const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent,{x:number}>(
    {
      onActive: () => {
        runOnJS(onPress)()
        isActive.value = true;
      // const t = (x / (radius * 2));
    //     //console.log("raw",t)
       //const v = clamp(t,currentIndex);
      //      //console.log("output",v)
      //index.value = withSpring(v);
      },
      onEnd:()=>{
        isActive.value = false;
      }
    }
  ) 

  return (
    <TapGestureHandler {...{onGestureEvent}}>
      <Animated.View
        style={{
          width: radius * 2,
          height: radius * 2,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Animated.View
          style={[{
            width: (radius - margin) * 2,
            height: (radius - margin) * 2,
            borderRadius: radius - margin,
            justifyContent: "center",
            alignItems: "center",
          }, colorIcon]}
        >
          <Image
            source={dat.imageUri}
            resizeMode={"cover"}
            style={{
              height: (radius - margin) * 2,
              width: (radius - margin) * 2,
              borderRadius: (radius - margin),
            }} />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ChannelIcon;