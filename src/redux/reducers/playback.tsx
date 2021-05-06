import {DispatchTypes}  from "./Action";

type DefaultState = {
	currentTrack: {
		id: string;
		title: string;
		artist: string;
		duration: number;
		artwork: string;
	},
	// currentTrack: null,
	// playingFrom: ['home'],
	// queue: [],
	loop: boolean;
	shuffle: boolean;
}

const INITIAL_STATE:DefaultState = {
	currentTrack: {
		id: '000',
		title: 'SoundSpice',
		artist: 'Faisal Arshed',
		duration: 0,
		artwork: 'cover'
	},
	// currentTrack: null,
	// playingFrom: ['home'],
	// queue: [],
	loop: false,
	shuffle: false
};

export default function(state:DefaultState = INITIAL_STATE, action: DispatchTypes) {
	switch (action.type) {
		case 'current_track':
			return { ...state, currentTrack: action.payload };
		case 'set_loop':
			return { ...state, loop: action.payload };
		case 'set_shuffle':
			return { ...state, shuffle: action.payload };
		default:
			return state;
	}
}

// home			-->		['home]
// playlist	-->		['playlist', playlistName]
// artist		-->		['artist', artistName]
// album		-->		['album', albumName]
// folder		-->		['folder', 'folderName']
