import React, { RefObject, ReactElement, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import MaskedView from "@react-native-community/masked-view";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { TabModel } from "./Content";

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: "row",
    backgroundColor: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  containerTab: {
    height: 45,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    flexDirection: "row"
  },
  name: {
    //fontFamily:"Text-Bold",
    fontWeight: "400",
  }
});

interface TabProps {
  children: ReactElement;
  color: string;
  onMeasurement?: (measurement: number) => void;
  onPress?: () => void;
  name?: string;
}
function Tab({ name, children, color, onMeasurement, onPress }: TabProps) {
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View
        onLayout={
          onMeasurement
            ? ({
              nativeEvent: {
                layout: { width },
              },
            }) => onMeasurement(width)
            : undefined
        }
        style={styles.containerTab}
      >
        {React.cloneElement(children, { color: color })}
        <Text style={[styles.name, { color }]}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

interface TabsProps {
  tabs: TabModel[];
  active?: boolean;
  onMeasurement?: (index: number, measurement: number) => void;
  onPress?: (index: number) => void;
};

function Tabs({ tabs, active, onMeasurement, onPress }: TabsProps) {
  return (
    <View style={styles.overlay}>
      {tabs.map(({ element, name }, index) => (
        <Tab
          key={index}
          onMeasurement={
            onMeasurement ? onMeasurement.bind(null, index) : undefined
          }
          color={active ? "#3b4043" : "#f8f9fa"}
          onPress={onPress ? onPress.bind(null, index) : undefined}
          name={active ? name : undefined}
        >
          {element}
        </Tab>
      ))}
    </View>
  )
};

interface TabHeaderProps {
  transition: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
  tabs: TabModel[];
  scrollView: RefObject<Animated.ScrollView>;
}

function indexRenderer(y:Animated.SharedValue<number>, tabs: TabModel[]):any {
  "worklet";
 const index = tabs.map((tab, i) => {
    if((i === tabs.length - 1)
      ? 
      (y.value >= tab.anchor)
      :
      (y.value >= tab.anchor &&
       y.value <= tabs[i + 1].anchor))
       return i 
       else return 0
  })
  return {index}
};

const TabHeader = ({ transition, y, tabs, scrollView }: TabHeaderProps) => {

  const index = useSharedValue(0);

  useEffect(()=>
    {index.value = indexRenderer(y, tabs)},[tabs, y , index]
  );

  const [measurements, setMeasurements] = useState<number[]>(
    new Array(tabs.length).fill(0)
  );

  const contOpacity = useAnimatedStyle(() => ({ opacity: transition.value }));

  const indexTransition = useDerivedValue(() => withSpring(index.value));

  const width = interpolate(
    indexTransition.value,
    tabs.map((_, i) => i),
    measurements,
  );

  const headerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      indexTransition.value,
      tabs.map((_tab, i) => i),
      measurements.map((_, i) => {
        return (
          -1 *
          measurements
            .filter((_measurement, j) => j < i)
            .reduce((acc, m) => acc + m, 0) -
          8 * i
        );
      }),
    );
    return {
      transform: [{ translateX: translateX },]
    }
  });

  const maskStyle = ({
    borderRadius: 24,
    backgroundColor: '#3b4043',
    width,
    flex: 1,
  })
  const maskElement = <Animated.View style={maskStyle} />;

  return (
    <Animated.View style={[styles.container, contOpacity]}>
      <Animated.View
        style={[{
          ...StyleSheet.absoluteFillObject,
        }, headerStyle]}
      >
        
      </Animated.View>
      <MaskedView style={StyleSheet.absoluteFill} maskElement={maskElement}>
        <Animated.View
          style={[{
            ...StyleSheet.absoluteFillObject,
          }, headerStyle]}
        >
          
        </Animated.View>
      </MaskedView>
    </Animated.View>
  );
};
export default TabHeader;
/**
 * 
 * <Tabs
          onMeasurement={(i, m) => {
            measurements[i] = m;
            setMeasurements([...measurements]);
          }}
          {...{ tabs, headerStyle }}
        />
 */

/**
 * <Tabs
            active
            onPress={(i) => {
              if (scrollView.current) {
                scrollView.current
                  .getNode()
                  .scrollTo({ y: tabs[i].anchor + 1 });
              }
            }}
            {...{ tabs, headerStyle }}
          />
 * 
 * 
 */


/**
  *
  * if (
   i === tabs.length - 1
     ?
     (y.value >= tab.anchor)
     :
     (y.value >= tab.anchor &&
     y.value <= tabs[i + 1].anchor)
     ) { setIndex(useSharedValue(i)) }
  */

     

    
  /**
   * if ( tabs.map((tab,i)=>(
    i === tabs.length - 1
    ? y.value >= tab.anchor
    : 
      y.value >= tab.anchor &&
      y.value <= tabs[i + 1].anchor)
    )){setIndex(useSharedValue(1))}
   *

 const index =
    useDerivedValue(() => {
      if (tabs.map((tab, i) => 
        (i === tabs.length - 1)
        ? (y.value >= tab.anchor)
        :
        (y.value >= tab.anchor &&
         y.value <= tabs[i + 1].anchor)))
           return 1 
      else  return 0 
    }, [tabs, y])

    useAnimatedReaction(
      ()=>{useDerivedValue(() => {
         tabs.map((tab, i) => 
          (i === tabs.length - 1)
          ? (y.value >= tab.anchor)
          :
          (y.value >= tab.anchor &&
           y.value <= tabs[i + 1].anchor))
           return { 1 }}}
        ,
        (data)=>{
            symbolicateStackTrace(data)
        }
      )
        const indexT =
    useDerivedValue(() => {
      const me = tabs.map((tab, i) =>{ 
        if((i === tabs.length - 1)
        ? (y.value >= tab.anchor)
        :
        (y.value >= tab.anchor &&
         y.value <= tabs[i + 1].anchor))
          return i
          else  return 0
         })
         return me
    }, [tabs, y])
   */