import { Alert, PermissionsAndroid } from 'react-native';

export const getStoragePermission = async () => {
	let permissions = await PermissionsAndroid.requestMultiple(
		[
			PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
			PermissionsAndroid.PERMISSIONS.CAMERA,
		],
		//@ts-expect-error
		{ 
			title: 'Camera Permission',
			message: 'Quantifi needs permission to access your camera',
		}
		
	);

	if (permissions['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
		return;
	} else {
		Alert.alert(
			'Permission to access camera required',
			'Quantifi needs to access your camera to function correctly',
			[{ text: "Let's Go", onPress: async () => await getStoragePermission() }],
			{ cancelable: false }
		);
	}
};

export const checkCameraPermissions = async () => {
	let camera = await PermissionsAndroid.check(
		PermissionsAndroid.PERMISSIONS.CAMERA
	);
	let audio = await PermissionsAndroid.check(
		PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
	);
	return camera && audio;
};
