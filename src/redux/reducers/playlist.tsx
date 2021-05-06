import {DispatchTypes} from "./Action";

type FavTypes = {
	playlistTitle:string;
	title:string;
	artist:string;
	song:any
}

type DefaultStateI = { 
	Favourites:FavTypes[];
	[key:string]:FavTypes[];
}

const INITIAL_STATE:DefaultStateI = { Favourites: [] };

export default function (state:DefaultStateI = INITIAL_STATE, action:DispatchTypes) {
	switch (action.type) {
		case 'create_playlist':
			return { ...state, [action.payload]: [] };
		case 'add_to_playlist': {
			let { title, song } = action.payload;
			let updatedList = { ...state };
			updatedList[title].push(song);
			return { ...updatedList };
		}
		case 'remove_from_playlist': {
			let playlists = { ...state };
			let { playlistTitle } = action.payload;
			let index = playlists[playlistTitle].findIndex(
				(item: { title: string; artist: string; }) => item.title === action.payload.title && item.artist === action.payload.artist
			);
			if (index !== -1) playlists[playlistTitle].splice(index, 1);
			return { ...playlists };
		}
		case 'rename_playlist': {
			let { oldTitle, newTitle } = action.payload;
			let newList = { ...state };
			newList[newTitle] = newList[oldTitle];
			delete newList[oldTitle];
			return { ...newList };
		}
		case 'delete_playlist': {
			let listCopy = { ...state };
			delete listCopy[action.payload];
			return { ...listCopy };
		}
		default:
			return state;
	}
}
