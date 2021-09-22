import {Dimensions, StyleSheet} from "react-native";

export const HEIGHT = Dimensions.get('window').height;
export const WIDTH =  Dimensions.get('window').width;
const hHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    scrollContainer:{
      backgroundColor:"black",
      flex:1
    },
    container: {
      width: '100%',
      height: HEIGHT,
      backgroundColor:"black",
    },
    videPlayButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 100,
    },
    video: {
      //...StyleSheet.absoluteFillObject,
      position: 'absolute',
      backgroundColor:"#161819",
      borderRadius: 30,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      alignSelf:"center",
      //backgroundColor:"black",
      //tintColor:"black",
      height:"100%",
      width:"100%",
    },
    uiContainer: {
      height: '100%',
      justifyContent: 'flex-end',
      
    },
    bottomContainer: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom:100
    },
    handle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 20,
    },
    description: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '300',
      marginBottom: 20,
    },
    description2: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '300',
      marginBottom: 10,
    },
    songRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding:0,
      marginBottom:-20,
    },
    songName: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 5,
    },
  
    songImage: {
      width: 50,
      height: 50,
      borderRadius: 10,
     // borderWidth: 5,
      //borderColor: '#4c4c4c',
    },
  
    //  right container
    rightContainer: {
      alignSelf: 'flex-end',
      height: HEIGHT/2,
      justifyContent: 'space-between',
      marginRight: 5,
      position:"absolute",
      bottom:80
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#fff',
      alignSelf:"flex-end"
    },
  
    iconContainer: {
      alignItems: 'center',
    },
    statsLabel: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      marginTop: 5,
    },
  });

export default styles;
  
  