import * as React from "react";
import { View, Image, ImageRequireSource } from "react-native";
import styles from "./Styles";
import Icon from "../../icons";
import IMAGE_SOURCE from "../userprofile/assets/defaultSong.png";

/**
 * TODO:[
 *  rectify icon sizes
 * ./assets/defaultSong.png
 */


export const CameraIcon = (post:{songImage: string | number | undefined}) => {
  return (
      <Image
        style={{
        width: 60,
        height: 60,
        backgroundColor: "transparent",
        borderWidth: 4,
        borderColor: "white",
        borderRadius: 35,
        bottom: -7
        }}
        resizeMode={"cover"}
        source={typeof post.songImage === "string" ? {uri:post.songImage}  : (typeof post.songImage === "number" ? post.songImage : IMAGE_SOURCE)}
      />
  )
}

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
    //@ts-expect-error
    item: <CameraIcon/>,
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