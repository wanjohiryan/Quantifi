//import * as Actions from "./Model";
import {DispatchTypes} from "./Action";

interface DefaultStateI{
	isPlaying:boolean;
};

const INITIAL_STATE:DefaultStateI = { isPlaying: false };

export default function (state:DefaultStateI = INITIAL_STATE, action:DispatchTypes) {
	switch (action.type) {
		case 'set_playback':
			return { ...state, isPlaying: action.payload };
		default:
			return state;
	}
}
