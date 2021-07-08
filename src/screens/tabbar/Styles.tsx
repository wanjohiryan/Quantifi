import {StyleSheet, Dimensions} from "react-native";
import tabs from "./Model";

const { width: wWidth, height } = Dimensions.get('window');
export const BOTTOM_WIDTH = wWidth;
export const tabWidth = BOTTOM_WIDTH / tabs.length;
const tabHeight = 100;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      width: BOTTOM_WIDTH,
      //alignContent:"center",
      justifyContent:"center",
      //position:"absolute",
      bottom:-10,
    },
    indicator:{
      //weird calculations right here?? used the size of the circle
      left: (-1 * tabWidth) + tabWidth/2,
      //paddingHorizontal: 5
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
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
     // left: -10,
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
      //borderRadius:wWidth/14,
      //marginHorizontal: wWidth * 0.13,
      backgroundColor:"transparent",
      top: height/1.1,//300 | 1.1( StatusBar.translucent === false)
      position: "absolute",
      alignSelf:"center",
      // height:150
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