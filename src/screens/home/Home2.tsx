import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ScreenProps { }

export default class Inbox extends React.Component<ScreenProps>{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chat</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"black",
  },
  text:{
    fontWeight:"400",
    fontSize:12,
    color:"white"
  }
})
