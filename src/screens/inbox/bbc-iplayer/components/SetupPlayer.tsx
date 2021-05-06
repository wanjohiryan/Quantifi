import * as  React from "react";
import TrackPlayer, { STATE_BUFFERING, STATE_PAUSED, STATE_PLAYING, STATE_READY, TrackPlayerEvents } from 'react-native-track-player';

export default async function (songs:any[]) {
	const [ready, setReady] = React.useState(false);
	await TrackPlayer.setupPlayer();
	await TrackPlayer.add(songs);
	//await TrackPlayer.play();
	TrackPlayer.updateOptions({
		stopWithApp: true,
		capabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
		],
		compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE]
	});

	TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE,
		async (event:{state:TrackPlayer.State})=>{
		if (event.state === STATE_BUFFERING){
		    setReady(false);
		}
		if (event.state === STATE_READY){
		   setReady(true);
		}
	  })
	  return ready;
}

export function isPlayingState(){
	const[isPlaying, setIsPlaying] = React.useState(false);

	TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE,
		async (event:{state:TrackPlayer.State})=>{
		if (event.state === STATE_PAUSED){
		   setIsPlaying(false);
		}
		if (event.state === STATE_PLAYING){
		   setIsPlaying(true)
		}
		if (event.state === STATE_BUFFERING){
			setIsPlaying(false)
			//isPlaying = false;
		 }
	  })

	return isPlaying;
}
