import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  ViewToken,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ListRenderItemInfo,
  ScrollView,
} from 'react-native';
import Video, { OnProgressData } from 'react-native-video';
import Animated from "react-native-reanimated";

import Icon,{ Heart, Comment, Share, Music } from "../../icons";
//import { Viewport } from "@skele/components";
import styles, { HEIGHT, WIDTH } from "./Styles";
import { Data as posts, DataProps, IMAGE_SOURCE } from "./Data";
import { Description, millify } from '../../utils';

const hHeight = Dimensions.get("window").height;
//const ViewportAwareVideo = Viewport.Aware(Video);


interface PostProps {
  data: DataProps;
  progress: Animated.SharedValue<number>;
  postProps: (props: DataProps) => void;
};
interface PostState {
  isLiked: boolean,
  post: DataProps;
  isPaused: boolean;
};

class Post extends React.PureComponent<PostProps, PostState> {
  playerRef!: Video | null;
  _isMounted: boolean;

  constructor(props: PostProps | Readonly<PostProps>) {
    super(props);
    this.state = {
      post: this.props.data,
      isLiked: false,
      isPaused: true,
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  play() {
    if (this._isMounted && this.state.post.type == "video") {
      const status = this.playerRef?.props.paused
      if (status) {
        return this.setState({ isPaused: false })
      }// else { return;}
    }
  };

  post() {
    if (this._isMounted) {
      this.props.postProps(this.state.post)
    }
  }

  pause() {
    if (this._isMounted && this.state.post.type == "video") {
      const status = this.playerRef?.props.paused
      if (this.playerRef && !status) {
        this.setState({ isPaused: true })
      }
    }
  };

  componentWillUnmount() {
    if (this._isMounted && this.state.post.type == "video") {
      if (this.playerRef) {
        this.setState({ isPaused: true })
        // this.playerRef.forceUpdate()
      }
    }
  };
  
  getImageSize = () => {
	  const image = require("./assets2/watermark.png")
	  const size = Image.resolveAssetSource(image)
      const whRatio = size.width / size.height;
	return {
		width:size.width,
		height:size.height
	}
  }

  onLikePress = () => {
    const likesToAdd = this.state.isLiked ? -1 : 1;
    this.setState({
      post: {
        ...this.state.post,
        likes: this.state.post.likes + likesToAdd,
      }
    });
    this.setState({ isLiked: !this.state.isLiked });
  };

  handleProgress = (data: OnProgressData) => {
    //currentTime: current Position in seconds
    //playableDuration : available time to be played
    //seekableDuration: total length time in seconds
      this.props.progress.value = this._isMounted ? data.currentTime / data.seekableDuration : 0;
  }
   

  onPlayPausePress = () => {
    if (this._isMounted) {
      this.setState({ isPaused: !this.state.isPaused });
    }
  };

  render() {
    const { post, isLiked, isPaused } = this.state;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          //onPressOut={this.onPlayPausePress}
          onPressIn={this.onPlayPausePress}>
          <View>
            <Video
                //key={post.id}
                source={post.src}
                style={styles.video}
                ref={(ref) => this.playerRef = ref}
                onError={(e: any) => console.log(e)}
                paused//={isPaused} //currentVisibleIndex }
                playInBackground={false}
                playWhenInactive={false}
                ignoreSilentSwitch={"obey"}
                onLoad={() => this.playerRef?.seek(0)}
                repeat
                //muted
                onProgress={this.handleProgress}
                resizeMode='cover'
              />
            <View style={styles.uiContainer}>
              {/* <View style={styles.rightContainer}>
                <Image
                  style={styles.profilePicture}
                  resizeMode={"cover"}
                  source={post.user.imageUri}
                />
                <TouchableOpacity style={styles.iconContainer} onPress={this.onLikePress}>
                  <Icon name="like" svg={{ fill: isLiked ? 'red' : "white", height: 25, width: 25 }} />                  
                  <Text style={styles.statsLabel}>{millify(post.likes)}</Text>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                  <Icon name="comment" svg={{ fill: "white", height: 25, width: 25 }} />
                  <Text style={styles.statsLabel}>{millify(post.comments)}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon name="ticketStar" svg={{ fill: "white", height: 25, width: 25 }} />
                  <Text style={styles.statsLabel}>{millify(post.stars)}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Share color="white" />
                  <Text style={styles.statsLabel}>{millify(post.shares)}</Text>
                </View>
              </View> */}

              <View style={styles.bottomContainer}>
                <Image
                  style={{
					              width:this.getImageSize().width,
                        flex:2,
					              height:this.getImageSize().height,
					              bottom:0,
					              top:0,
					              left:0,
					              right:0,
					              backgroundColor:"transparent"
					              }}
                  resizeMode={"contain"}
                  source={require("./assets2/watermark.png")}
                />
                <View style={{
                    flex:1,
                    flexDirection:"row",
                    backgroundColor:"transparent",
                    justifyContent:"center",
                    alignSelf:"flex-end",
                    alignItems:"center"
                }} >
                <View style={styles.iconContainer}>
                <View style={styles.iconContainer}>
                <Icon name="like" svg={{ fill: isLiked ? 'red' : "grey", height: 25, width: 25 }} />                  
                  <Text style={styles.statsLabel}>{millify(post.likes)}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon name="ticketStar" svg={{ fill: "white", height: 25, width: 25 }} />
                  <Text style={styles.statsLabel}>{millify(post.stars)}</Text>
                </View>
                  <Icon name="comment" svg={{ fill: "grey", height: 25, width: 25 }} />
                  <Text style={styles.statsLabel}>{millify(post.comments)}</Text>
                </View>
                </View>
                {/* <Text style={styles.description}>{post.description ? post.description : post.title}</Text>
                <View style={styles.songRow}>
                  <Music color="white" />
                  {typeof post.attachment?.song?.title !== "string" ?
                    (<Text style={styles.songName}>originalSound @{post.user.username}</Text>)
                    :
                    (<Text style={styles.songName}>{post.attachment.song.title}</Text>)
                  }
                </View> */}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

interface VideoState {
  items: any[],
};
interface VideoProps {
  postProps: (props: DataProps) => void;
  videoProgress: Animated.SharedValue<number>;
};

export default class TikTok extends React.PureComponent<VideoProps, VideoState>{
  viewabilityConfig: {
    itemVisiblePercentThreshold: number,
  };
  //index: number;
  //flatListRef!: FlatList<DataProps> | null;
  cellRefs: {};

  constructor(props: VideoProps | Readonly<VideoProps>) {
    super(props);
    this.state = {
      items: [],
    };
    this.viewabilityConfig = { itemVisiblePercentThreshold: 70 };
    this.cellRefs = {};
    //this.index = 0;
  };

  componentDidMount() {
    this.loadItems();
    posts.forEach((_item, key) => {
      setTimeout(this.loadItems, (key + 1) * 1000);
    })
  }

  loadItems = () => {
    const start = this.state.items.length;
    const newItems = posts.map((item, key) => ({
      ...item,
      id: start + `p${key}`,
    }));
    const appendItems = [...this.state.items, ...newItems];
    this.setState({ items: appendItems })
  }
  _renderItem = (item: ListRenderItemInfo<DataProps>) => {
    return (
      <Post
        postProps={(currentItem) => this.props.postProps(currentItem)}
        ref={(ref) => {
          //@ts-ignore
          this.cellRefs[item.item.id] = ref;
        }}
        progress={this.props.videoProgress}
        data={item.item}
      />
    )
  }
  _onViewableItemsChanged = (props: { changed: ViewToken[]; viewableItems: ViewToken[] }) => {
    const changed = props.changed;
    const viewableItems = props.viewableItems;
    changed.forEach((item) => {
      //@ts-ignore
      const cell = this.cellRefs[item.item.id];
      if (cell) {
        if (item.isViewable) {
          cell.play()
          cell.post()
        } else {
          cell.pause()
        }
      }
    })
  }


  render() {
    const { items } = this.state;
    return (
      <View style={styles.scrollContainer}>
        <FlatList
          style={{ flex: 1 }}
          data={items}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={this._onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews
          snapToInterval={WIDTH}
          //snapToInterval={HEIGHT}
          snapToAlignment="start" //{'start'}
          decelerationRate="fast" //{'fast'}
        />
      </View>
    );
  };
}
