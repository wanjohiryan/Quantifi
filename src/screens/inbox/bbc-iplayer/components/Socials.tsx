import * as React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated"

import { Share, Smiley, Tag, Comment, Reshare } from "../../../../icons"
import { DataType } from "./Data";
import {onLikePress} from "../../../../utils"

const { width: wWidth, height } = Dimensions.get("window");
const styles = StyleSheet.create({
	container: {
		height: 64,
		width: wWidth,
		borderRadius: 20,
		backgroundColor: "black",
		bottom: height * 0.5,
	},
});

/**ToBeNoted: 
 * i can refactor the following code to be a little less and more clean but i don't have time;
 * sometime later though i will, but for now...
 * if it's working don't touch it 
 * 
 */
interface SocialsProps {
 data:DataType[];
 index:Animated.SharedValue<number>;
};

const Socials = ({data, index }: SocialsProps) => {
	//let dat:DataType = {};
	const [post, setPost] = React.useState<DataType>(data[index.value])
	const [isLiked, setLiked] = React.useState<boolean>(false)
	const {likes, comments, shares} = post
	function toggleLikes(){
		const {postLikes, setIsLiked} = onLikePress(likes,isLiked)
		setPost({...post, likes: postLikes})
		setLiked(setIsLiked);
	}
	//setPost()
	/**React.useEffect(()=>{
		 dat = data[index.value];
	},[]) */
	return (
		<View style={styles.container}>
			<View style={{
				...StyleSheet.absoluteFillObject,
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				paddingHorizontal: 20,
				//position:"absolute"
			}} >
				<View style={{ flexDirection: "column", flex: 0.8 }} >
					<Reshare fill="white" />
					<Text style={{color:"white", flex:0.5}} >{shares}</Text>
				</View>
				<View style={{ flexDirection: "column", flex: 0.8 }} >
					<Comment color={"white"} />
					<Text style={{color:"white", flex:0.5}}>{comments}</Text>
				</View>
				<View style={{ flexDirection: "column", flex: 0.8 }} >
					<TouchableOpacity onPress={()=>toggleLikes()}
					 style={{alignItems:"center", justifyContent:"center"}} >
					<Smiley fill={isLiked ? "red" : "white"} />
					</TouchableOpacity>
					<Text style={{color:"white", flex:0.5}}>{likes}</Text>
				</View>
				<View style={{ flexDirection: "column", flex: 0.8 }} >
					<Share fill="white" />
					<Text style={{color:"white", flex:0.5}}>{shares}</Text>
				</View>
				<View style={{ flexDirection: "column", flex: 0.8 }} >
					<Tag fill="white" />
					<Text style={{color:"white", flex:0.5}}>{likes}</Text>
				</View>
			</View>
		</View>
	);
}

export default Socials;
/**
			  <Text style={{color: "blue",}} >Retweet</Text>
		<Text style={{color: "grey",}} >Tag</Text>
		<Text style={{color: "green",}} >Comment</Text>
		<Text style={{color: "white",}} >share</Text>
		<Text style={{color: "red",}} >like</Text>
			*/
