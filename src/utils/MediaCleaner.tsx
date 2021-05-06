import _ from 'underscore';
import { store } from './../redux/store';
// import { PITCH_ALGORITHM_MUSIC } from 'react-native-track-player';

export default function cleanupMedia(media: any[]) {
	if (!Array.isArray(media) || media.length === 0) return [];
	let newMedia = [];
	let folderName = '';
	let {
		settings: { foldersToSkip }
	} = store.getState();
	let mediaFiles = media.filter(
		(val) =>
			!(
				foldersToSkip.includes(getFolder(val.path).toLowerCase()) ||
				val.fileName.includes('.flac') ||
				val.fileName.includes('#')
			)
	);
	for (let i = 0; i < mediaFiles.length; i++) {
		folderName = getFolder(mediaFiles[i].path);
		newMedia.push({
			id: mediaFiles[i].duration + i,
			duration: mediaFiles[i].duration,
			url: mediaFiles[i].path,
			title:
				mediaFiles[i].title || mediaFiles[i].fileName.replace(/.mp3|.aac|.wav|.amr|.flac/, ''),
			artwork: mediaFiles[i].cover || null,
			artist: mediaFiles[i].author === '<unknown>' ? 'unknown' : mediaFiles[i].author,
			album: mediaFiles[i].album === '<unknown>' ? 'unknown' : mediaFiles[i].album,
			index: i,
			folder: folderName
			// pitchAlgorithm: PITCH_ALGORITHM_MUSIC
		});
	}
	return { mediaFiles: newMedia, artists: getArtists(newMedia), albums: getAlbums(newMedia) };
}

function getFolder(path:string) {
	let dirArr = path.split('/');
	return dirArr[dirArr.length - 2];
}

function getArtists(media: { id: any; duration: any; url: any; title: any; artwork: any; artist: any; album: any; index: number; folder: string; }[]) {
	let sectionsData: any[] = [];
	let data = _.groupBy(media, 'artist');
	let titles = Object.keys(data);
	titles.forEach((title) => {
		sectionsData.push({
			title,
			data: data[title]
		});
	});
	let sortedData = _.sortBy(sectionsData, 'title').filter((item) => item.title !== 'null');
	return sortedData;
}

function getAlbums(media: { id: any; duration: any; url: any; title: any; artwork: any; artist: any; album: any; index: number; folder: string; }[]) {
	let sectionsData: any[] = [];
	let data = _.groupBy(media, 'album');
	let titles = Object.keys(data);
	titles.forEach((title) => {
		sectionsData.push({
			title,
			data: data[title]
		});
	});
	let sortedData = _.sortBy(sectionsData, 'title').filter((item) => item.title !== 'null');
	return sortedData;
}
