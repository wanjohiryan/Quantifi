export const createPlaylist = (title: string) => {
	return { type: 'create_playlist', payload: title };
};

export const addToPlaylist = (title:string, song: any) => {
	return { type: 'add_to_playlist', payload: { title, song } };
};

export const renamePlaylist = (oldTitle: string, newTitle: string) => {
	return { type: 'rename_playlist', payload: { oldTitle, newTitle } };
};

export const deletePlaylist = (title:string) => {
	return { type: 'delete_playlist', payload: title };
};

type playType={
	title:string;
	artist:string;
};

export const removeFromPlaylist = (playlistTitle:string, { title, artist }:playType) => {
	return { type: 'remove_from_playlist', payload: { playlistTitle, title, artist } };
};
