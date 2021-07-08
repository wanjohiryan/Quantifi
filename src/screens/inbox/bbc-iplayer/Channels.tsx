/*Started this screen around three weeks ago, now am done... with everything from my mind,it's like a drem come true on 27 May 2021 */
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player";

import { default as SetPlayer } from "./SetupPlayer";

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

/**TODO: 
 * onPlaylist End, start over and then pause like Spotify
 * onMount screen what should happen exactly?
 * [x]add avatars to moving circles, progress bar, good UI, search bar, index.value to trackPlayer */

const Channels = () => {
  const { bottom } = useSafeAreaInsets();
  const [track, setTrack] = useState(0);
  const index = useSharedValue(0);
  const isActive = useSharedValue(false);

  const dat = Data.map((val, i) => {
        return { ...val.song, id: `${i}` };
     })

  const songs = dat.length > 20 ? dat.slice(20, dat.length - 20) : dat;
    
  //for rendering the trackPlayer on start-up;
  useEffect(() => {
    async function Player() {
       await SetPlayer(songs);
    }
    Player()
    //console.log( "Data", Data.map((_,I)=>I))
    //index.value = withSpring(track)
    // return () => {
    //   TrackPlayer.destroy()
    // }
  },[]);
  //for changing the track
  useEffect(() => {
    let isCancelled = false;

    TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,async()=>{
          const TrackID:number | null = await TrackPlayer.getCurrentTrack().then((e)=>{return JSON.parse(e)})
          if (TrackID !== index.value){
            if(TrackID !== null && TrackID >= 0){
              if (!isCancelled && !isActive.value){
                //setTrack(TrackID);
                index.value = withSpring(TrackID);
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
      <Thumbnails data={Data} {...{ index }} />
      <CircularSelection
        data={Data}
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
 * 
 * <Description data={Data} {...{ index }} />
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