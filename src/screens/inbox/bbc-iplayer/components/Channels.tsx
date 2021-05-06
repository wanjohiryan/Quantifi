import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";
import LinearGradient from "react-native-linear-gradient";

import { default as SetPlayer } from "./SetupPlayer";
import { default as Socials } from "./Socials"
import Description from "./Description"

import { default as CircularSelection } from "./CircularSelection";
import { default as Thumbnails } from "./Thumbnails2";
import { Data } from "./Data";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black"
  }
});

/**TODO: add avatars to moving circles, progress bar, good UI, search bar, index.value to trackPlayer */
const { width: wWidth } = Dimensions.get("window");

const Channels = () => {
  const { bottom } = useSafeAreaInsets();
  const index = useSharedValue(0);
  const isPlayerReady = useSharedValue(false);
  const songs = React.useMemo(() => {
    const dat = Data.map((val, i) => {
      return { ...val.song, id: `${i}` };
    })
    return dat;
  }, [Data]);//useMemo(()=>)

  useEffect(() => {
    async function Player() {
      isPlayerReady.value = await SetPlayer(songs);
    }
    Player()
    return () => {
      TrackPlayer.destroy()
    }
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container, { bottom: bottom }]}>
      <Thumbnails data={Data} {...{ index }} />
      <LinearGradient
        style={{ ...StyleSheet.absoluteFillObject, bottom: wWidth / 1.4 }}
        colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
      />
      <Description data={Data} {...{ index }} />
      <CircularSelection
        isPlayerReady={isPlayerReady}
        data={Data}
        {...{ index }} />
        <View style={{
          backgroundColor:"black",
          position:"absolute",
          height:10,
          bottom:64, 
          width:wWidth}}/>
      <Socials data={Data} {...{index}} />
    </View>
  );
};

export default Channels;
/**
 * .then(async()=>{
        MusicControl.setNowPlaying([
          await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack()),{
          elapsedTime:await TrackPlayer.getelapsedTime()
        }]);
      });
    /**setTimeout(() => {
        MusicControl.stopControl();
      }, 3000);
     MusicControl.on(Command.pause,async()=>{
      await TrackPlayer.pause()
      MusicControl.setNowPlaying([songs[Number(await TrackPlayer.getCurrentTrack())],{
        elapsedTime:TrackPlayer.getDuration()
      }])
    });
    MusicControl.on(Command.play,async()=>{
      await TrackPlayer.play()
      MusicControl.setNowPlaying([songs[Number(await TrackPlayer.getCurrentTrack())],{
        elapsedTime:TrackPlayer.getDuration()
      }])
    });
    MusicControl.on(Command.nextTrack,async ()=>{
       await TrackPlayer.skipToNext()
      });
    MusicControl.on(Command.previousTrack,async()=>{
      await TrackPlayer.skipToPrevious()
    });
    MusicControl.setNowPlaying([
          await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack()),
          {elapsedTime:await TrackPlayer.getDuration()}
          ])
      .then(async()=>{
          console.log("Player is Ready");
          isPlaying.value = true;
          MusicControl.setNowPlaying([
            await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack()),{
            duration:await TrackPlayer.getDuration()
          }]);
          MusicControl.updatePlayback({
              state:MusicControl.STATE_PLAYING,
              elapsedTime: await TrackPlayer.getPosition()
            })
        });
        TrackPlayer.addEventListener(
          TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
          async(e)=>{
              index.value = e.track;
              MusicControl.setNowPlaying([
                await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack()),{
                duration:await TrackPlayer.getDuration()
              }]);
              MusicControl.updatePlayback({
                  state:MusicControl.STATE_PLAYING,
                  elapsedTime: await TrackPlayer.getPosition()
                })
          index.value = (e.track)
         console.log("TrackChanged", e.track)
        });
    MusicControl.enableBackgroundMode(true);
    MusicControl.enableControl("play", true);
    MusicControl.enableControl("pause", true);
    MusicControl.enableControl("nextTrack", true);
    MusicControl.enableControl("previousTrack", true);
    MusicControl.enableControl("closeNotification", true,{when:"paused"});
        TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE,
          async (event:{state:TrackPlayer.State})=>{
          if (event.state === STATE_BUFFERING){
            isPlaying.value = null;
            MusicControl.updatePlayback({
              state:MusicControl.STATE_BUFFERING,
              elapsedTime:await TrackPlayer.getPosition(),
              bufferedTime:await TrackPlayer.getBufferedPosition(),
            });
          }
          if (event.state === STATE_PAUSED){
            isPlaying.value = false;
            MusicControl.updatePlayback({
              state:MusicControl.STATE_PAUSED,
              elapsedTime:await TrackPlayer.getPosition(),
              bufferedTime:await TrackPlayer.getBufferedPosition(),
            });
          }
          if (event.state === STATE_PLAYING){
            isPlaying.value = true;
            MusicControl.updatePlayback({
              state:MusicControl.STATE_PLAYING,
              elapsedTime:await TrackPlayer.getPosition(),
              bufferedTime:await TrackPlayer.getBufferedPosition(),
            })
          }
          if (event.state === STATE_READY){
            isPlayerReady.value = true;
          }
        })

        TrackPlayer.addEventListener(
          TrackPlayerEvents.REMOTE_DUCK,
          async (e)=>{
            console.log("remote-duck",e)
          if (e.paused){
            await TrackPlayer.pause()
          }
        })
 * .then(e =>
        index.value = Number(e)
      ) put it somewhere else, on mount, as this will make unnecessary calls
 */