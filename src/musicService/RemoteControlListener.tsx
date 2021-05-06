import TrackPlayer,
		{STATE_BUFFERING,
         STATE_PAUSED,
         STATE_PLAYING, 
		 STATE_STOPPED, 
		 TrackPlayerEvents} from 'react-native-track-player';
import MusicControl from "react-native-music-control";
//import { store } from './../redux/store';
//import { getRandomNumber } from '../utils';



module.exports = async function () {
	//MusicControl.handleAudioInterruptions(true);
	//MusicControl.enableBackgroundMode(true);
/***	TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_ERROR, async (e)=>{
		MusicControl.updatePlayback({
			elapsedTime: await TrackPlayer.getPosition(),
			state:MusicControl.STATE_ERROR
		})
		console.log(e)
	}) */

	

	TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PLAY, () => {
		TrackPlayer.play();
		//store.dispatch({ type: 'set_playback', payload: true });
	});


	TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PAUSE, () => {
		TrackPlayer.pause();
		//store.dispatch({ type: 'set_playback', payload: false });
	});

	TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_NEXT, () => {
		TrackPlayer.skipToNext();
	});

	TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PREVIOUS, () => {
		TrackPlayer.skipToPrevious();
	});

	TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_STOP, () => {
		TrackPlayer.destroy();
    })
}
/**
 * TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_NEXT, () => {
		let { playback, media } = store.getState();
		let { currentTrack, shuffle } = playback;
		let { mediaFiles } = media;
		backgroundPlayback(
			shuffle
				? mediaFiles[getRandomNumber(0, mediaFiles.length)]
				: currentTrack.index === mediaFiles.length - 1
				? mediaFiles[0]
				: mediaFiles[currentTrack.index + 1]
		);
	});

let flag = false;
TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE,async (event:{state:TrackPlayer.State})=>{

		if(event.state === STATE_PLAYING){
			MusicControl.updatePlayback({
				elapsedTime: await TrackPlayer.getPosition(),
				state:MusicControl.STATE_PLAYING
			})
		}
		if(event.state === STATE_PAUSED){
			MusicControl.updatePlayback({
				elapsedTime: await TrackPlayer.getPosition(),
				state:MusicControl.STATE_PAUSED
			})
		}
		if(event.state === STATE_BUFFERING){
			MusicControl.updatePlayback({
				elapsedTime: await TrackPlayer.getPosition(),
				state:MusicControl.STATE_BUFFERING
			})
		}
		if(event.state === STATE_STOPPED){
			MusicControl.updatePlayback({
				elapsedTime: await TrackPlayer.getPosition(),
				state:MusicControl.STATE_STOPPED
			})
		}
		//MusicControl.setNowPlaying(await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack()))
	})
async function backgroundPlayback(track:any) {
	if (flag) return;
	flag = true;
	setTimeout(() => (flag = false), 250);
	await TrackPlayer.reset();
	await TrackPlayer.add(track);
	store.dispatch({ type: 'current_track', payload: track });
	TrackPlayer.play();
	store.dispatch({ type: 'set_playback', payload: true });
}

	TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PREVIOUS, () => {
		let { playback, media } = store.getState();
		let { currentTrack, shuffle } = playback;
		let { mediaFiles } = media;
		backgroundPlayback(
			shuffle
				? mediaFiles[getRandomNumber(0, mediaFiles.length)]
				: currentTrack.index === 0
				? mediaFiles[mediaFiles.length - 1]
				: mediaFiles[currentTrack.index - 1]
		);
	});

	TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_QUEUE_ENDED, ({ position }) => {
		let { playback, media } = store.getState();
		let { currentTrack, shuffle, loop } = playback;
		let { mediaFiles } = media;
		if (position > 0) {
			if (loop) {
				backgroundPlayback(currentTrack);
			} else {
				backgroundPlayback(
					shuffle
						? mediaFiles[getRandomNumber(0, mediaFiles.length)]
						: currentTrack.index === mediaFiles.length - 1
						? mediaFiles[0]
						: mediaFiles[currentTrack.index + 1]
				);
			}
		}
	});
 */