import * as React from "react";
import {View} from "react-native";
import Icon,{ Message, Home, Apps, Quoin, User } from "../../icons";

/**
 * TODO:[
 *  rectify icon sizes
 */

export const colors = [
  "#3984FF",
  "#3984FF",
  // "#3984FF",
  // "#3984FF",
  // "#3984FF",
];

const tabs = [
    {
      name: 'home',
      item: <Icon name="home" svg={{ height: 35, width: 35, fill: "white" }} />,
    },
    {
      name: 'camera',
      item: <View style={{ width: 60, height: 60, backgroundColor: "transparent", borderWidth: 4, borderColor: "white", borderRadius: 35, bottom:5 }}/>,
    },
    // {
    //   name: 'Quoin',
    //   item: <Quoin />,
    // },
    {
      name: 'inbox',
      item: <Icon name="like" svg={{ height: 35, width: 35, fill: "white" }} />,
    },
    // {
    //   name: 'user',
    //   item: <User />,
    // },
  ];

export default tabs;