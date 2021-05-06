import React, { RefObject, useEffect} from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated,{
  useSharedValue,
  withTiming,
  interpolate,
  useDerivedValue,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";
//import { useSafeAreaInsets } from "react-native-safe-area-context";


import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import TabHeader from "./TabHeader";
import { TabModel } from "./Content";

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const {height: wHeight} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,//watch-out for this one
  },
  header: {
    flexDirection: "row",
    height: MIN_HEADER_HEIGHT,
    alignItems: "center",
    paddingHorizontal: PADDING,
  },
  title: {
    //fontFamily: "Text-Semibold",
    fontSize: 18,
    marginLeft: PADDING * 2,
    flex: 1,
    color:'white',
  },
});

interface HeaderProps {
  y: Animated.SharedValue<number>;
  tabs: TabModel[];
  scrollView: RefObject<Animated.ScrollView>;
};


export default ({ y, tabs, scrollView }: HeaderProps) => {
  const toggle = useSharedValue<0|1>(0);
  console.log("opacity1" + toggle.value)
  
  useEffect(()=> { toggle.value = 0 && (y.value > HEADER_IMAGE_HEIGHT ? 1 : 1 ) },[y, toggle])

    const transition = useDerivedValue(() => {return withTiming(toggle.value,{duration:100})})
    console.log("y" + y.value)
    console.log("opacity" + transition.value)

   /**
    * useCode(() => 
  block([
    toggle.value = useSharedValue(greaterThan(y, HEADER_IMAGE_HEIGHT))]), 
    [toggle,y]);

    useAnimatedReaction(
    ()=>{return y.value > HEADER_IMAGE_HEIGHT/2 },
    (d)=>{
      if (d){
          toggle.value = 1
      }
    },[toggle, y]);
    useAnimatedReaction(
    ()=>{return y.value < HEADER_IMAGE_HEIGHT },
    (d)=>{
      if (d){
           toggle.value = 1
      }
    },[toggle, y]);
    */

  
    // React.useMemo(() => setT(y), [y, toggle])

/**
 * useEffect(()=> { toggle.value = setToggle(y); },[y.value, toggle.value])

useCode(() => block([
          toggle.value = setT(y)
          ]), [
        toggle,
        y,
      ])
 * 
 */
  

 // const insets = useSafeAreaInsets();

  //const transition = useDerivedValue(()=> withTiming(toggle, { duration: 100 }));
  
  //const { top: paddingTop } = insets;
  
  const styleText = useAnimatedStyle(() => {
     const TranslateX = interpolate(
           y.value, 
           [0, HEADER_IMAGE_HEIGHT],
           [-ICON_SIZE - PADDING, 0],
           Extrapolate.CLAMP,
      );
    const TranslateY = interpolate(
           y.value,
           [150, 0, HEADER_IMAGE_HEIGHT],
           [
             HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
             HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
             0,
           ],
           {extrapolateRight: Extrapolate.CLAMP,}
    );
  
  return{
    transform:[{translateY:TranslateY}, {translateX: TranslateX}]
  }
  })
  
  const styleOpacity = useAnimatedStyle(()=> {
    const opacity = interpolate(
            y.value,
           [0, HEADER_IMAGE_HEIGHT],
           [0,1,],
           Extrapolate.CLAMP
    )
    return {opacity:transition.value}});

 /* useCode(() => block([set(toggle.value, greaterThan(y.value, HEADER_IMAGE_HEIGHT))]), [
    toggle,
    y,
  ]);*/
  return (
    <Animated.View style={[styles.container, { paddingTop:10 }]}>
      <Animated.View
        style={[{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "black",
        }, styleOpacity]}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => console.log("😂😂✌🏽")}>
          <View>
            <Animated.View
              style={[{ ...StyleSheet.absoluteFillObject,},]}
            >
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.Text
          style={[
            styles.title,
            styleText
          ]}
        >
          Quantifi
        </Animated.Text>
      </View>
     {//<TabHeader {...{ y, transition, tabs, scrollView }} />
     }
    </Animated.View>
  );
};


