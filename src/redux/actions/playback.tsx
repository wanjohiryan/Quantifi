import TrackPlayer from 'react-native-track-player';
import {Dispatch} from "redux";
import {DispatchTypes} from "./../reducers";

//type dispatchType = (arg0: { type: string; payload: boolean | TrackPlayer.Track | TrackPlayer.Track[]; }) => void;

export const setCurrentTrack = (currentTrack: TrackPlayer.Track | TrackPlayer.Track[]) => async (dispatch:Dispatch<DispatchTypes>) => {
	try {
		await TrackPlayer.reset();
		await TrackPlayer.add(currentTrack);
		dispatch({ type: 'current_track', payload: currentTrack });
		TrackPlayer.play();
		dispatch({ type: 'set_playback', payload: true });
	} catch (e) {
		console.log(e)
		// do nothing lmao
	}
};

export const setPlayback = (isPlaying:boolean) => {
	isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
	return { type: 'set_playback', payload: isPlaying };
};

export const setLoop = (isLoop:boolean) => {
	return { type: 'set_loop', payload: isLoop };
};

export const setShuffle = (isShuffle:boolean) => {
	return { type: 'set_shuffle', payload: isShuffle };
};
