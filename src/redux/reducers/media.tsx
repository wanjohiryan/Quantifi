import {DispatchTypes} from "./Action";

type DefaultStateI = {
	mediaFiles: {
		id:any
	}[], 
	artists: any[], 
	albums: any[], 
	mediaLoaded: boolean;
};

const INITIAL_STATE:DefaultStateI = { mediaFiles:[], artists: [], albums: [], mediaLoaded: false };

export default function(state : DefaultStateI = INITIAL_STATE, action: DispatchTypes) {
	switch (action.type) {
		case 'get_media_success':
			return { mediaLoaded: true, ...action.payload };
		case 'rename_track': {
			let mediaArr = [...state.mediaFiles];
			let index = mediaArr.findIndex((i) => i.id === action.payload.id);
			//@ts-expect-error
			if (index !== -1) mediaArr[index] = action.payload;
			return { ...state, mediaFiles: mediaArr };
		}
		case 'delete_track': {
			let mediaArray = [...state.mediaFiles];
			let i = mediaArray.findIndex((item) => item.id === action.payload.id);
			if (i !== -1) {
				mediaArray.splice(i, 1);
				mediaArray = mediaArray.map((val, i) => {
					return { ...val, index: i };
				});
			}
			return { ...state, mediaFiles: mediaArray };
		}
		default:
			return state;
	}
}
