import * as React from "react";
import {StyleSheet, View, Text, StyleProp, ViewProps} from "react-native";

 const styles = StyleSheet.create({
     container:{
         justifyContent:"flex-end",
         height:"100%",
         //bottom:0,
     },
     cont:{
         alignSelf:"flex-end",
         height:200,
         marginRight:5,
         justifyContent:"space-between",
     },
     text:{
         color:"white",
         fontWeight:"800",
         fontSize:12
     }
 })

interface Props{
    style?:StyleProp<ViewProps>;
    onPress?:()=>void;
}

function Emoji ({onPress,style}:Props) {
        return(
            <View style={[styles.container,style]}>
                <View style={styles.cont} >
                    <Text style={styles.text}>S</Text>
                    <Text style={styles.text}>M</Text>
                    <Text style={styles.text}>I</Text>
                    <Text style={styles.text}>L</Text>
                    <Text style={styles.text}>E</Text>
                </View>
            </View>
        )
}

export default Emoji;