//circular profile, cover like IG, more like IG, blog Formatted text
import React, { useRef } from "react";
import { StyleSheet, Dimensions, Alert, View, Text, ImageBackground, Image, FlatList, TouchableWithoutFeedback, ScrollView } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Video from "react-native-video";
import Icon from "../../../icons";
import { Description, CommentSection } from "../../../utils";
import { Post, sources, oneItem } from "./Data";
import styles,{MAX_HEIGHT,MIN_HEIGHT} from "./Styles";

const { width } = Dimensions.get("window");
const AnimatedVideo = Animated.createAnimatedComponent(Video);

interface ItemProps {
  index: number;
  y: Animated.SharedValue<number>;
  item: Post;
}

const Item = ({
  y,
  index,
  item: { likes, comments, stars, user, type, post },
}: ItemProps) => {
  //const transition = useDerivedValue(() => withTiming(y.value, { duration: 1000 }))
  //for blogs i'd like to play with opacity of the blog itself as like the title and the disappearance of the title
  const playerRef = useRef<Video | null>(null);
  const [paused, setPaused] = React.useState(true);
  const style = useAnimatedStyle(() => {
    return {
      //withSpring to remove stutter
      height: interpolate(
        y.value,
        [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
        [MIN_HEIGHT, MAX_HEIGHT],
        Extrapolate.CLAMP
      ),
    };
  });
  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, (index - 0.5) * MAX_HEIGHT, index * MAX_HEIGHT],
      [0, 0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });
  const postTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });
  const itemsSources = post && post.source.map((item, i) => { return { ...item, id: `${i}` } })
  const blogStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity
    };
  });
  const user2Style = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, (index - 0.5) * MAX_HEIGHT, index * MAX_HEIGHT],
      [0, 0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity
    }
  })
  const pictureStyle = useAnimatedStyle(() => {
    return {
      height: MAX_HEIGHT * 0.85,
      width: "100%",
      top: 0
    }
  });
  const blogContStyle = useAnimatedStyle(() => {
    return {
      height: MAX_HEIGHT,
      width: "100%",
      top: 0
    }
  });
  const renderPost = (type: "image" | "video" | "gif", src: number, key: string) => {
    //View style={{ ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" }}
    console.log(key)
    return (
      <>
        {(type == "image" || type == "gif") ?
          (
            <Animated.Image
              key={key}
              source={src}
              style={[styles.picture, pictureStyle]}
              resizeMode="cover"
            />) :
          (
            <TouchableWithoutFeedback {...{key}} style={{ ...StyleSheet.absoluteFillObject }} onPress={() => setPaused(!paused)}>
              <Animated.View {...{key}} style={[{ ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" }, pictureStyle]}>
                <AnimatedVideo
                  key={key}
                  ref={playerRef}
                  onError={(e: any) => console.log(e)}
                  playInBackground={false}
                  playWhenInactive={false}
                  ignoreSilentSwitch={"obey"}
                  //poster={user.avatar}
                  //posterResizeMode="cover"
                  onLoad={() => (playerRef.current !== null) && playerRef.current.seek(100)}
                  repeat
                  //muted
                  resizeMode="cover"
                  source={src}
                  style={[styles.picture, { backgroundColor: "grey" }]}
                  paused={paused}
                />
                <View style={{ opacity: paused ? 1 : 0 }} >
                  <Icon name={paused ? "play" : "pause"} style={{ backgroundColor: "transparent", alignSelf: "center" }} svg={{ fill: "white", height: 40, width: 40 }} />
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          )}
      </>
    )
  }
  return (
    <Animated.View style={[styles.container, style]}>
      {type === "post" &&
        post && (
          <React.Fragment key={'fragment1'}>
            {post.source.length === 1 ? (
              renderPost(post.source[0].type, post.source[0].src, `item-${user.name}-${post.source[0].type}`)
            ) : (
              // <Animated.View
              //   style={[{ ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" }, pictureStyle]}
              // ></Animated.View> we get rid of this too
              <ScrollView
                //scrollEventThrottle={16}
                horizontal
                //scrollEnabled
                scrollEventThrottle={16}
                //nestedScrollEnabled
                //scrollPerfTag={"scroll"}
               // keyExtractor={(item) => item.id}
                //key={post.source.map((_,i)=>`${i}`)}
                showsHorizontalScrollIndicator={true}
                key={`scrollEnabled`}
                snapToInterval={width}
                contentContainerStyle={{...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" }}
                style={[StyleSheet.absoluteFill]}>
                  {post.source.map((item,index)=>
                    renderPost(item.type,item.src,item.type === "video" ? `${item.src}-video-${index}`:`${item.src}-pic-${index}`)
                  )}
                </ScrollView>
            )}
            <View style={styles.titleContainer}>
              <Animated.View style={[styles.user, blogStyle]}>
                <Image style={{ height: 40, width: 40, borderRadius: 10 }} source={user.avatar} />
                <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={[styles.subtitle,{marginLeft:5}]}>{user.name}</Text>
              </Animated.View>
              <Animated.View style={[styles.user2, { backgroundColor: "#fff00" }, user2Style]}>
                <Image style={{ height: 40, width: 40, marginBottom: 5, borderRadius: 20, padding: 5, marginLeft: 10 }} source={user.avatar} />
                <View style={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: 5 }}>
                  <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={[styles.subtitle, { marginLeft: 5 }]}>{user.name}</Text>
                  <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={[{
                    color: "white",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "400",
                    marginBottom: 5,
                    alignSelf: "center"
                  }]}>5 hours ago</Text>
                </View>
              </Animated.View>
              <Animated.View style={[styles.mainTitle, postTitleStyle]}>
                <CommentSection
                  style={{ left: 0, height: 40, width: "100%", top: 0, alignSelf: "flex-start" }}
                  {...{ likes, comments, stars }}
                />
                {/* <Text style={styles.title}>{post.description}</Text>  */}
                <Description
                  linesToTruncate={3}
                  username={user.name}
                  style={styles.description}>{post.description}</Description>
              </Animated.View>
            </View>
          </React.Fragment>)
      }
    </Animated.View>
  );
};

export default Item;
/*post.source.map((_, i) => (
                  <Text
                    key={`mappedPost-${i}`}
                    style={styles.title}>More</Text>
                ))} */

                //const renderAttachments = (type: "image" | "video" | "gif", src: number, key: string) => {
                  //   return (
                  //     <View style={StyleSheet.absoluteFill}>
                  //       {(type == "image" || type == "gif") ?
                  //         (
                  //           <Image
                  //             key={key}
                  //             source={src}
                  //             style={[styles.picture]}
                  //             resizeMode="cover"
                  //           />) :
                  //         (<View style={{ ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" }}>
                  //           <Video
                  //             key={key}
                  //             ref={playerRef}
                  //             onError={(e: any) => console.log(e)}
                  //             playInBackground={false}
                  //             playWhenInactive={false}
                  //             ignoreSilentSwitch={"obey"}
                  //             //poster={user.avatar}
                  //             //posterResizeMode="cover"
                  //             //@ts-expect-error
                  //             onLoad={() => playerRef.current.seek(100)}
                  //             repeat
                  //             //muted
                  //             resizeMode="cover"
                  //             source={src}
                  //             style={[styles.picture, { backgroundColor: "grey" }]}
                  //             paused
                  //           />
                  //           <Icon name="play" style={{ position: "absolute", backgroundColor: "transparent", alignSelf: "center" }} svg={{ fill: "white", height: 40, width: 40 }} />
                  //         </View>)}
                  //     </View>
                  //   )
                  // }
                  // : blog && (
                  //   typeof blog.background === "string" && (
                  //     <Animated.View style={[styles.blog, { backgroundColor: blog.background, }, blogContStyle]}>
                  //       <View style={[styles.titleContainer]}>
                  //         <Animated.View style={[styles.userBlog, blogStyle]}>
                  //           <Image style={[{ height: 40, width: 40, borderRadius: 10 }]} source={user.avatar} />
                  //           <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={[styles.subtitle]}>{user.name}</Text>
                  //         </Animated.View>
                  //         <Animated.View style={[styles.blogCont, user2Style]}>
                  //           <View style={styles.userBlog}>
                  //             <Image style={[{ height: 40, width: 40, borderRadius: 10 }]} source={user.avatar} />
                  //             <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={[styles.subtitle]}>{user.name}</Text>
                  //           </View>
                  //           <Text style={[styles.blogText,{color:blog.textColor}]}>{blog.text.replace("/n", '/n')}</Text>
                  //           {blog.attachments && 
                  //               (<View style={{ flex:0.3, borderRadius: 10, bottom: 40, backgroundColor:"black", borderWidth:5,borderColor:blog.textColor }}>
                  //                 {renderPost(blog.attachments[0].type, blog.attachments[0].src, `${user.name}-blog`)}
                  //               </View>)}
                  //         </Animated.View>
                  //       </View>
                  //       <CommentSection
                  //               style={{ left: 0, height: 40, width: "100%", bottom: 0, position:"absolute"}}
                  //               {...{ likes, stars, comments }} />
                  //     </Animated.View>)
                  //     )