import React from 'react';
import {
  View,
  FlatList,
  Dimensions,  Platform,
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableWithoutFeedback
} from 'react-native';
import Video from 'react-native-video';
//@ts-ignore
import { Viewport } from "@skele/components";

import Post from './Posts';
import styles from "./Styles";
import { Data as posts, DataProps } from "./Data";

const hHeight = Dimensions.get("window").height;
const ViewportAwareVideo = Viewport.Aware(Video);

interface VideoState {
  isPause: boolean,
  currentVisibleIndex: any,
  index: any,
};
interface VideoProps { };

export default class TikTok extends React.PureComponent<VideoProps, VideoState>{
  viewabilityConfig: {
    viewAreaCoveragePercentThreshold: number,
  };
  //index: number;
  flatListRef!: FlatList<DataProps> | null;
  playerRef!: Video | null;

  constructor(props: VideoProps | Readonly<VideoProps>) {
    super(props);
    //this.flatListRef = typeof FlatList<DataProps[]>()
    this.state = {
      isPause: true,
      currentVisibleIndex: null,
      index:0,
    };
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 70};
    //this.index = 0;
  };

  _onViewableItemsChanged = (props: { changed: ViewToken[]; viewableItems: ViewToken[] }) => {
    const changed = props.changed;
    const viewableItems = props.viewableItems;
    changed.forEach(item=>{
      if(item.isViewable) this.setState({ index: item.item.id });
      console.log(item.item.id)
    })
    viewableItems.forEach(item=>{
      if(item.isViewable) this.setState({ currentVisibleIndex: item.item.id });
      console.log(item.item.id)
    })
    /**if (viewableItems && viewableItems.length > 0) {
      this.setState({ currentVisibleIndex: viewableItems[0].index });
    } */
  };

  isLegitIndex = (index: number, length: number) => {
    if (index < 0 || index >= length) return false;
    return true;
  };
  // number | undefined

  pagination = (velocity:any) => {
    let nextIndex: number;
    if (Platform.OS === "ios")
      nextIndex = velocity >= 0 ? this.state.index + 1 : (this.state.index > 1 ? this.state.index - 1 : 0);
    else
      nextIndex = velocity < 0 ? this.state.index : this.state.index + 1;
    if (this.isLegitIndex(nextIndex, posts.length)) {
      this.setState({index:nextIndex});// = nextIndex;
    }
    this.setState({ isPause: true })
    //this.playerRef?.props.
    //@ts-ignore
    this.flatListRef.scrollToIndex({ viewPosition: 0.5, index: this.state.index + 1, animated: true });
  };

  onPlayPausePress = () => {
    this.setState({ isPause: !this.state.isPause });
  }
  render() {
    const { currentVisibleIndex, isPause } = this.state;
    return (
      <View>
        <FlatList
          data={posts}
          renderItem={({ item }) => {
            const posts = item;
            return (
              <Post
                data={posts}>
                <TouchableWithoutFeedback
                  onPress={this.onPlayPausePress}>
                  <Video
                    source={posts.videoUri}
                    style={styles.video}
                    ref={(ref) => this.playerRef = ref}
                    //onViewportEnter={()=> this.setState({isPause: false})}
                    //onViewportLeave={()=> this.setState({isPause: true})}
                    onError={(e: any) => console.log(e)}
                    paused={(this.state.index !== currentVisibleIndex) || (!isPause)} //currentVisibleIndex }
                    playInBackground={false}
                    playWhenInactive={false}
                    ignoreSilentSwitch={"obey"}
                    //onLoad={()=> this.setState({isPause: true})}
                    //poster={require()}
                    repeat
                    resizeMode="contain"
                  />
                </TouchableWithoutFeedback>
              </Post>
            )
          }}
          showsVerticalScrollIndicator={false}
          /**onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            this.pagination(e.nativeEvent.velocity?.y);
            console.log(e)
          }}  */
          scrollEventThrottle={1}
          ref={(ref) => { this.flatListRef = ref }}
          onViewableItemsChanged={this._onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={2}
          contentContainerStyle={{
            backgroundColor:"black",
          }}
          keyExtractor={(item) => item.id}
          removeClippedSubviews
          snapToInterval={hHeight}
          //snapToAlignment="start" //{'start'}
          decelerationRate="fast" //{'fast'}
        />
      </View>
    );
  };
}
/**<Viewport.Tracker> */
/***onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            this.pagination(e.nativeEvent.velocity?.y);
          }}
          pagination = (velocity: any) => {
    let nextIndex;
    if (Platform.OS === "ios")
      nextIndex = velocity >= 0 ? this.index + 1 : (this.index > 1 ? this.index - 1 : 0);
    else
      nextIndex = velocity < 0 ? this.index : this.index + 1;
    if (this.isLegitIndex(nextIndex, posts.length)) {
      this.index = nextIndex;
    }
    changed.forEach(item => {
      if (item.isViewable){
        this.index = item.item.id
      }
    })
    _renderItem = (items: ListRenderItemInfo<DataProps>) => {
    const { currentVisibleIndex, isPause } = this.state;
    const posts = items.item;
    return (
      <Post data={posts}>
       <TouchableWithoutFeedback onPress={this.onPlayPausePress}>
        <Video
          //key={this.index}
          source={typeof posts.videoUri === "string" ? { uri: posts.videoUri } : posts.videoUri}
          style={styles.video}
          ref={(ref) => this.playerRef = ref}
          //onViewportEnter={()=> this.setState({isPause: false})}
          //onViewportLeave={()=> this.setState({isPause: true})}
          onError={(e: any) => console.log(e)}
          paused={this.index !== currentVisibleIndex || !isPause}
          //onLoad={()=}
          repeat
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>
      </Post>
    )
  };
    viewableItems.forEach(item=>{
      if(item.isViewable) this.setState({ currentVisibleIndex: item.item.id });
    })
    this.index !== currentVisibleIndex ||
    getItemLayout={(_data, i) => ({
            length: HEIGHT ,
            offset: HEIGHT * i,
            index: i,
          })}

onViewableItemsChanged={this._onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}

onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            this.pagination(e.nativeEvent.velocity?.y);
          }}
          getItemLayout={(_data, i) => ({
            length: height,
            offset: height * i,
            index: i,
          })}
          ref={(ref) => { this.flatListRef = ref }}

ref={(ref) => {
            this.playerRef = ref;
          }}




          */