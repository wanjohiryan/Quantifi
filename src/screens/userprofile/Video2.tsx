import React from 'react';
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
import Video from 'react-native-video';

import { Heart, Comment, Share, Music } from "../../icons";
//import { Viewport } from "@skele/components";
import styles, { HEIGHT } from "./Styles";
import { Data as posts, DataProps, IMAGE_SOURCE } from "./Data";
import { Description } from '../../utils';

const hHeight = Dimensions.get("window").height;
//const ViewportAwareVideo = Viewport.Aware(Video);


interface PostProps {
  data: DataProps;
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
    if (this._isMounted) {
      const status = this.playerRef?.props.paused
      if (status) {
        return this.setState({ isPaused: false })
      }// else { return;}
    }
  };

  pause() {
    if (this._isMounted) {
      const status = this.playerRef?.props.paused
      if (this.playerRef && !status) {
        this.setState({ isPaused: true })
      }
    }
  };

  componentWillUnmount() {
    if (this._isMounted) {
      if (this.playerRef) {
        this.setState({ isPaused: true })
        // this.playerRef.forceUpdate()
      }
    }

  };

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
          onPressOut={this.onPlayPausePress}
          onPressIn={this.onPlayPausePress}>
          <View>
            <Video
              //key={post.id}
              source={post.videoUri}
              style={styles.video}
              ref={(ref) => this.playerRef = ref}
              onError={(e: any) => console.log(e)}
              paused={isPaused} //currentVisibleIndex }
              playInBackground={false}
              playWhenInactive={false}
              ignoreSilentSwitch={"obey"}
              onLoad={() => this.playerRef?.seek(0)}
              repeat
              //muted
              resizeMode="cover"
            />
            <View style={styles.uiContainer}>
              <View style={styles.rightContainer}>
                <Image
                  style={styles.profilePicture}
                  resizeMode={"cover"}
                  source={post.user.imageUri}
                />
                <TouchableOpacity style={styles.iconContainer} onPress={this.onLikePress}>
                  <Heart color={isLiked ? 'red' : 'white'} fill />
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
                  source={typeof post.songImage === "string" ? { uri: post.songImage } : IMAGE_SOURCE}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* <Description
          style={{ position: "absolute", flexDirection: "column", height: 30, width: "100%", bottom: 0, marginHorizontal: 5, padding: 2 }}
          linesToTruncate={3}
          username={post.user.username}>
          Here is my first comment😁😎, i would like to
          say that i have always loved what you do, please continue with your good work,
          why? Because it unites people... Also i have tipped you with some Quoins 😁😋
        </Description> */}
      </View>
    );
  }
};

interface VideoState {
  items: any[],
};
interface VideoProps { };

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
        ref={(ref) => {
          //@ts-ignore
          this.cellRefs[item.item.id] = ref;
        }}
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
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={this._onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews
          snapToInterval={HEIGHT}
          snapToAlignment="start" //{'start'}
          decelerationRate="fast" //{'fast'}
        />
      </View>
    );
  };
}
