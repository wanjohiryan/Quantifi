import * as React from 'react';
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  } from 'react-native';
import Video from 'react-native-video';

import {Heart, Comment, Share, Music} from "../../icons";
import {DataProps, IMAGE_SOURCE} from "./Data";
import styles from "./Styles";

interface PostProps{
  data:DataProps;
  children:React.ReactElement<Video>;
};
interface PostState {
  isLiked: boolean,
  post: DataProps;
};

export default class Post extends React.PureComponent<PostProps, PostState> {
  constructor(props: PostProps | Readonly<PostProps>){
    super(props);
    this.state = {
      post: this.props.data,
      isLiked: false,
    };
  }

  onLikePress = () => {
    const likesToAdd = this.state.isLiked ? -1 : 1;
    this.setState({post:{
      ...this.state.post,
      likes: this.state.post.likes + likesToAdd,
    }});
    this.setState({isLiked:!this.state.isLiked});
  };
 
 render(){
  const {children} = this.props;
  const {post, isLiked} = this.state;
  return (
    <View style={styles.container}>
        <View>
          {children}
          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              <Image
                style={styles.profilePicture}
                resizeMode={"cover"}
                source={post.user.imageUri}
              />
              <TouchableOpacity style={styles.iconContainer} onPress={this.onLikePress}>
                <Heart color={isLiked ? 'red' : 'white'} fill/>
                <Text style={styles.statsLabel}>{post.likes}</Text>
              </TouchableOpacity>

              <View style={styles.iconContainer}>
                <Comment color="white" />
                <Text style={styles.statsLabel}>{post.comments}</Text>
              </View>

              <View style={styles.iconContainer}>
                <Share color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>@{post.user.username}</Text>
                <Text style={styles.description}>{post.description}</Text>

                <View style={styles.songRow}>
                  <Music color="white" />
                  {typeof post.songName !== "string" ? 
                   <Text style={styles.songName}>originalSound @{post.user.username}</Text>
                   :
                   <Text style={styles.songName}>{post.songName}</Text>
                  }
                </View>
              </View>
                 <Image
                 style={styles.songImage}
                 resizeMode={"cover"}
                 source={typeof post.songImage === "string" ? {uri: post.songImage} : IMAGE_SOURCE }
                  />
            </View>
          </View>
        </View>
    </View>
  );
 }
};

//{React.cloneElement(children,{paused:paused})} <TouchableWithoutFeedback onLongPress={this.onPlayPausePress}>
/**onPlayPausePress = () => {
    this.setState({paused:!this.state.paused});
  };
 */