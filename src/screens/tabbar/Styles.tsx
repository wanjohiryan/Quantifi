import {StyleSheet, Dimensions} from "react-native";
import tabs from "./Model";

const { width: wWidth, height } = Dimensions.get('window');
export const BOTTOM_WIDTH = wWidth * 0.75;
export const tabWidth = BOTTOM_WIDTH / tabs.length;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      width: BOTTOM_WIDTH,
      //alignContent:"center",
      justifyContent:"center",
    },
    indicator:{
      backgroundColor:"white",
      left: (-1 * tabWidth) - 25/3.5,
      //paddingHorizontal: 5
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 64,
      zIndex: 2,
    },
    activeIcon: {
      backgroundColor: 'transparent',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      left: -10,
    },
    top:{
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
      borderRadius:30,
      marginHorizontal: wWidth * 0.13,
      backgroundColor:"black",
      top: height / 1.1,//300 | 1.1( StatusBar.translucent === false)
      position: "absolute",
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