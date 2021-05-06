import React, { useState } from "react";
import {View, StyleSheet} from 'react-native';
import Animated,{
  useAnimatedScrollHandler,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";
import Tabbar, { Screens } from "./Tabbar";
import Chanel from "./Chanel"
import  Masonry, {images} from "./Home"


import HeaderImage from "./HeaderImage";
import {default as Content, defaultTabs } from "./Content";
//import Header from "./Header";

const styles=StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    
    flex:1,
  },
});


const Home = () => {
  const [tabs, setTabs] = useState(defaultTabs);
  const y = useSharedValue(0); //useValues([useSharedValue(0)],[]) //useSharedValue(0);
  
    return (
      <View style={styles.container}>
         <Masonry/>
      </View>
      );
    };

export default Home;    
/*
 * 
 * {Screens.map((_, i)=>(
        <Tabbar key={`fd-${i}`} index={i} />
      ))}
       <Chanel/>  <HeaderImage {...{ y }} />
 * <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
          {...{ y }}
        />
 * 
 * 
 */
