import * as  React from "react";
import TrackPlayer, { STATE_BUFFERING, STATE_PAUSED, STATE_PLAYING, STATE_READY, TrackPlayerEvents } from 'react-native-track-player';

export default async function (songs:any[]) {
	//const [ready, setReady] = React.useState(false);
	await TrackPlayer.setupPlayer().then(async()=>{
		await TrackPlayer.reset();
		await TrackPlayer.add(songs);
		// await TrackPlayer.play();

		TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
				TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
			],
			compactCapabilities: [
				TrackPlayer.CAPABILITY_PLAY, 
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
				TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS]
	    });
	});
}

