import { combineReducers } from 'redux';
import media from './media';
//import footer from './playerFooter';
import playback from './playback';
import player from './blacklistedPlayback';
import playlists from './playlist';
//import settings from './settings';
//import lyrics from './lyrics';

export type{DispatchTypes} from "./Action"

const Reducers = combineReducers({
	media,
	//footer,
	playback,
	player,
	playlists,
	//settings,
	//lyrics
});

export default Reducers;