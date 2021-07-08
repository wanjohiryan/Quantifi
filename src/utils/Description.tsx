import React from "react";
import { View, StyleProp, ViewStyle, Text, StyleSheet } from "react-native";


interface Props {
    style?: StyleProp<ViewStyle>;
    linesToTruncate: number;
    username: string;
    children: string;
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: "column",
        //margin: 2,
        alignSelf:"center",
        
        justifyContent:"space-around",
        alignItems:"center",
        flexShrink:1
    }
})

function Describe({ style, linesToTruncate, username, children }: Props) {
    return (
        <View style={style}>
            <View style={styles.cont}>
                <Text 
                    numberOfLines={linesToTruncate}
                    style={{ color: "#d3d3d3", fontWeight: "bold" }} >
                    {`${username}:`}
                    <Text
                        allowFontScaling
                        adjustsFontSizeToFit
                        style={{ color: "#6a6a6a", fontWeight: "300",flexWrap:"wrap", }}>
                        {children}
                    </Text>
                </Text>
            </View>
        </View>
    )
}

// <Text style={{color: "grey", fontWeight: "200", borderBottomColor:"grey",borderBottomWidth:2 }}>more</Text>
export default Describe;

/*Here is my first comment😁😎, i would like to
say that i have always loved what you do, please continue with your good work,
why? Because it unites people... Also i have tipped you with some Quoins 😁😋 */