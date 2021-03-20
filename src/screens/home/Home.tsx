import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';


interface ScreenProps{}
const Wheight = Dimensions.get("window");

export default class Home extends React.Component<ScreenProps> {
  render(){
    return (
      
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
      </View>
      );
    };
  }
    

const styles=StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"black",
  },
  text:{
    fontWeight:"400",
    fontSize:12,
    color:"white"
  }
});
