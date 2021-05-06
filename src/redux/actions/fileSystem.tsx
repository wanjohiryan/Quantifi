import RNFetchBlob from 'rn-fetch-blob';
import {Dispatch} from "redux";
import {DispatchTypes} from "./../reducers";
import RenderToast from '../../components/RenderToast';
import ErrorReporter from '../../utils/ErrorReporter';

const mime = 'audio/mpeg';

export type mediaType ={
	title: string,
	artist: string,
	album: string,
	duration: number,
	cover: string,
	blured: boolean,
}

export const deleteTrack = (track: { url: string; }) => async (dispatch:Dispatch<DispatchTypes>) => {
	try {
		await RNFetchBlob.fs.unlink(track.url);
		await RNFetchBlob.fs.scanFile([{ path: track.url, mime }]);
		dispatch({ type: 'delete_track', payload: track });
	} catch (e) {
		ErrorReporter(e);
	}
};

export const renameTrack = (track: { url: string; }, newName: string) => async (dispatch:Dispatch<DispatchTypes>) => {
	try {
		let pathArr = track.url.split('/');
		let extension:any = pathArr[pathArr.length - 1].split('.');
		extension = extension[extension.length - 1];
		pathArr[pathArr.length - 1] = `${newName}.${extension}`;
		let newPath = pathArr.join('/');
		let exists = await RNFetchBlob.fs.exists(newPath);
		if (exists) return RenderToast('A file with the same name already exists');
		await RNFetchBlob.fs.mv(track.url, newPath);
		await RNFetchBlob.fs.scanFile([{ path: newPath, mime }]);
		await RNFetchBlob.fs.scanFile([{ path: track.url, mime }]);
		dispatch({ type: 'rename_track', payload: { ...track, title: newName, url: newPath } });
	} catch (e) {
		ErrorReporter(e);
	}
};
