export const SET_PLAYBACK = "set_playback";
export const GET_MEDIA_SUCCESS = "get_media_success";
export const RENAME_TRACK = "rename_track";
export const DELETE_TRACK = "delete_track";
export const CURRENT_TRACK = "current_track";
export const SET_LOOP = "set_loop";
export const SET_SHUFFLE = "set_shuffle";
export const CREATE_PLAYLIST = "create_playlist";
export const ADD_TO_PLAYLIST = "add_to_playlist";
export const REMOVE_FROM_PLAYLIST = "remove_from_playlist"
export const RENAME_PLAYLIST = "rename_playlist";
export const DELETE_PLAYLIST = "delete_playlist";

export interface CreatePlaylist {
	type:typeof CREATE_PLAYLIST;
	payload:any;
}
export interface AddToPlaylist {
	type:typeof ADD_TO_PLAYLIST;
	payload:{
		title:string;
		song:any;
	}
}
export interface RemoveFromPlaylist{
	type:typeof REMOVE_FROM_PLAYLIST;
	payload:{
		playlistTitle:string;
		title:string;
		artist:string;
	}
}
export interface RenamePlaylist {
	type:typeof RENAME_PLAYLIST;
	payload:{
		oldTitle:string;
		newTitle:string;
	}
}
export interface DeletePlayList{
	type:typeof DELETE_PLAYLIST;
	payload:any;
}
export interface CurrentTrack {
    type: typeof CURRENT_TRACK;
    payload: any;
}
export interface SetLoop {
    type: typeof SET_LOOP;
    payload: boolean | any;
}
export interface SetShuffle {
    type: typeof SET_SHUFFLE;
    payload: boolean | any;
}
export interface SetPlayBack {
    type: typeof SET_PLAYBACK;
    payload: boolean;
}
export interface GetMediaSuccess {
    type: typeof GET_MEDIA_SUCCESS;
    payload: any;
}
export interface RenameTrack {
    type: typeof RENAME_TRACK;
    payload: {
        id?: any
        title?:string;
        url?:string;
        track?:any;
    }
}
export interface DeleteTrack {
    type: typeof DELETE_TRACK;
    payload: {
        id?: any;
        url?:string;
    }
}

export type DispatchTypes = SetPlayBack | 
                            GetMediaSuccess | 
                            RenameTrack | 
                            DeleteTrack | 
                            SetShuffle | 
                            SetLoop | 
                            CurrentTrack|
                            DeletePlayList|
                            RenamePlaylist|
                            RemoveFromPlaylist|
                            AddToPlaylist|
                            CreatePlaylist;