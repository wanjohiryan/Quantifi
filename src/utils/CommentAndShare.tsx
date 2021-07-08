import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { millify } from "./millify";
import Icon from "../icons"

interface Props {
    style?: StyleProp<ViewStyle>;
    stars: number,
    comments: number,
    likes: number,
}
//paddingHorizontal:width/3,

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor:"transparent", //"rgb(0,0,0.5)",//"#3984FF",
        height: 40,
        paddingVertical: 5,
        //alignContent:"center",
        //alignItems:"center",
        alignSelf: "center",
        justifyContent: "space-between",
        //borderTopColor: "white",
        //borderTopWidth: 0.5,
    },
    text: {
        color: "white"
    },
    element: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    numbers: {
        color: "white",
        fontWeight: "300",
        fontSize: 12
    },
    share: {
        height: "100%",
        right: 0,
        alignItems: "center",
        flex: 0.2
    },
    triple: {
        width: "70%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        left: 0,
        alignItems: "center",
        flex: 0.7,
        paddingHorizontal: 15
    }
})

export default class Toggle extends PureComponent<Props>{
    render() {
        const { style, comments, stars, likes } = this.props;
        return (
            <View style={[styles.container, style]}>
                <View style={styles.triple} >
                    <View style={[styles.element]}>
                        <Icon name="like" svg={{ fill: "white", height: 25, width: 25 }} />
                        <Text style={styles.numbers}>{millify(likes, { precision: 1 })}</Text>
                    </View>
                    <View style={styles.element}>
                        <Icon name="comment" svg={{ fill: "white", height: 25, width: 25 }} />
                        <Text style={styles.numbers} >{millify(comments, { precision: 1 })}</Text>
                    </View>
                    <View style={styles.element}>
                        <Icon name="ticketStar" svg={{ fill: "white", height: 25, width: 25 }} />
                        <Text style={styles.numbers} >{millify(stars, { precision: 1 })}</Text>
                    </View>
                </View>
                <View style={styles.share}>
                    {/* <Share 
                    // TODO:this icon to be remove with one that faces upwards
                    stroke={"white"} /> */}
                    <Icon name="share" svg={{ fill: "white", height: 25, width: 25 }} />
                </View>
            </View>
        )
    }
}