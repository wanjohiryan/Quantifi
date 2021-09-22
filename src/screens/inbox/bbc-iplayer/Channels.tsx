/*Started this screen around three weeks ago, now am done... with everything from my mind,it's like a drem come true on 27 May 2021 */
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player";

import { default as SetPlayer } from "./SetupPlayer";

import { default as CircularSelection } from "./CircularSelection";
import { default as Thumbnails } from "./Thumbnails2";
import { Data, DataType } from "./Data";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black"
  }
});

/**TODO: 
 * onPlaylist End, start over and then pause like Spotify
 * onMount screen what should happen exactly?
 * [x]add avatars to moving circles, progress bar, good UI, search bar, index.value to trackPlayer */

type ChannelsProps={
  currentSong:(v:DataType)=>void;
}

const Channels = ({currentSong}:ChannelsProps) => {
  const [songData] = useState(Data)
  const { bottom } = useSafeAreaInsets();
  const index = useSharedValue(0);
  const isActive = useSharedValue(false);


  useEffect(() => {
    let isCancelled = false;

    TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,async()=>{
          const TrackID:number | null = await TrackPlayer.getCurrentTrack().then((e)=>{return JSON.parse(e)})
          if (TrackID !== index.value){
            if(TrackID !== null && TrackID >= 0){
              if (!isCancelled && !isActive.value){
                //setTrack(TrackID);
                index.value = withSpring(TrackID);
                currentSong(Data[index.value])
              }
            };
            //[x] work on why index.value won't change
            //[x] also progress bar
            //[x] tap gesture for songs
            //[x] change tracks on movement of index
            //[x] index.value = withSpring(TrackID);
          }
       });
    TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_QUEUE_ENDED, async()=>{
        if (!isCancelled && !isActive.value){
          await TrackPlayer.skip("0")
          index.value = withSpring(0);
          await TrackPlayer.pause()
        }
    })

    return()=>{
      isCancelled = true;
    }//in debug mode the screen keeps remounting every damn time
  },[index]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container, { bottom: bottom }]}>
      <Thumbnails data={songData} {...{ index }} />
      <CircularSelection
        data={songData}
        {...{ index, isActive }} />
    </View>
  );
};

export default Channels;
/**
 * <LinearGradient
        style={{ ...StyleSheet.absoluteFillObject, bottom: wWidth / 1.4 }}
        colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
      />
 */