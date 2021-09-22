import {StyleSheet, Dimensions} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

import tabs from "./Model";

export const { width: wWidth, height } = Dimensions.get('window');
export const BOTTOM_WIDTH = wWidth;
export const tabWidth = BOTTOM_WIDTH / tabs.length;
const tabHeight = 100;
export const TABBAR_HEIGHT = getBottomSpace() + tabHeight;
export const MINIMIZED_PLAYER_HEIGHT = 45;
export const SNAP_TOP = 0;
export const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      width: BOTTOM_WIDTH,
      //marginBottom:15,
      //alignItems:"flex-end",
      justifyContent:"center",
      height: TABBAR_HEIGHT,
      bottom:-10,
    },
    playerSheet: {
      //borderRadius:30
	  backgroundColor:"black",
    },
    cont: {
      backgroundColor: "#272829",
      position: "absolute",
      flexDirection: "row",
      borderTopColor: "black",
      borderWidth: 1
    },
    indicator:{
      //weird calculations right here?? used the size of the circle
      left: (-1 * tabWidth) + tabWidth/2,
    },
    songImage: {
      width: 50,
      height: 50,
    },
    tab: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: tabHeight,
      zIndex: 4,
      bottom:30,
    },
    activeIcon: {
      backgroundColor: 'transparent',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    top:{
      // was to be but never became
      top: -30,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      height:30,
      width: wWidth,
      position:"absolute",
      backgroundColor:"black"
    },
    tabContainer: {
      width: BOTTOM_WIDTH,
      flex: 1,
      backgroundColor:"transparent",
      top: height/1.1,//300 | 1.1( StatusBar.translucent === false)
      position: "absolute",
      alignSelf:"center",
    },
    dummyPusher: {
      flexDirection: "row",
    },
    backImage: {
      ...StyleSheet.absoluteFillObject,
      height:100,
      width: wWidth,
      resizeMode:"cover",
    },
  });

  export default styles;