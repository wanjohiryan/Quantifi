import {Dimensions,StyleSheet} from "react-native";

const {height, width} = Dimensions.get("window");
export const SCROLL_HEIGHT = height * 0.93;
export const MIN_HEIGHT = SCROLL_HEIGHT / 7;
export const MAX_HEIGHT = SCROLL_HEIGHT / 1.3;

const styles = StyleSheet.create({
  container: {
    width,
    height: MIN_HEIGHT,
    top: 0,
    justifyContent: "flex-end",
    //backgroundColor:"transparent",
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: width / 15,
    backfaceVisibility: "visible",
  },
  blog: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: width / 15,
    borderColor: "white",
    borderWidth: 1,
    height: MAX_HEIGHT,
    width: "100%"
  },
  user: {
    flexDirection: "row",
    width: "35%",
    alignSelf: "center",
    height: MIN_HEIGHT / 2,
    marginBottom: -MIN_HEIGHT / 2,
    alignItems: "center"
  },
  userBlog: {
    flexDirection: "row",
    width: "35%",
    //alignSelf: "center",
    height: MIN_HEIGHT / 2,
    alignItems: "center",
    top: -MIN_HEIGHT,
    marginBottom: -MIN_HEIGHT / 2,
    left: 0
  },
  blogText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    flexWrap: "wrap",
    flexShrink: 1,
    flex: 0.5
  },
  titleContainer: {
    maxHeight: MAX_HEIGHT * 0.61,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  mainTitle: {
    // ...StyleSheet.absoluteFillObject,
    position: "absolute",
    flexDirection: "column",
    //backgroundColor:"red",
    alignItems: "center",
    //backgroundColor:"blue",
    justifyContent: "center",
    left: 0,
    right: 0,
    //padding: 32,
    height: MAX_HEIGHT * 0.25,
    bottom: -10,
    //marginBottom:-(MAX_HEIGHT * 0.25),
    //top: 0,
    //backgroundColor:"red",
    width: "100%"
    //transform: [{ translateY: 64 }],
  },
  mainTitle2: {
    // ...StyleSheet.absoluteFillObject,
    position: "absolute",
    flexDirection: "column",
    //backgroundColor:"red",
    alignItems: "center",
    backgroundColor: "blue",
    justifyContent: "center",
    left: 0,
    right: 0,
    //padding: 32,
    height: MAX_HEIGHT * 0.25,
    bottom: 0,
    //top: 0,
    //backgroundColor:"red",
    width: "100%"
    //transform: [{ translateY: 64 }],
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  description: {
    flexDirection: "column",
    height: MAX_HEIGHT * 0.15,
    width: "100%",
    top: 0,
    // bottom:-MAX_HEIGHT * 0.15,
    //marginTop:-MAX_HEIGHT * 0.15,
    //bottomMargin:0,
    //top: MAX_HEIGHT * 0.75,
    padding: 5,
  },
  user2: {
    flexDirection: "row",
    width: "40%",
    alignSelf: "flex-start",
    height: MIN_HEIGHT / 2,
    top: -MAX_HEIGHT / 1.6,
    alignItems: "center",
    // padding: 15,
  },
  blogCont: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;