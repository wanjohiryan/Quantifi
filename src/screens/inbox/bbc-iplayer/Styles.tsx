import {StyleSheet,Dimensions} from "react-native";

export const { width, height:hHeight } = Dimensions.get("window");
export const circularHeight = width / 1.4;
export const CoverHeight = hHeight - (circularHeight * 1.5);

const styles = StyleSheet.create({
    thumbnailsContainer: {
        flex: 0.8,
        height:hHeight,
        
      },
    thumbnailsContent: {
        flex: 1,
        height:hHeight,
      },
    thumbContainer: {
      width,
      aspectRatio: 640 / 360,
    },
    cover: {
      //...StyleSheet.absoluteFillObject,
      width: width,
      borderRadius:(width / 15),
      height: CoverHeight,
    },
    content: {
      padding: 16
    },
    type: {
      color: "white",
      fontWeight: "bold"
    },
    title: {
      color: "white",
      fontSize: 24,
	  //bottom:0,
	  //position:"absolute"
    },
    subtitle: {
      color: "white",
      fontSize: 18,
	  //bottom:0,
	  //position:"absolute"
    }
  });

export default styles;