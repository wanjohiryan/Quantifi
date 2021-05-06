import { Alert, PermissionsAndroid } from 'react-native';

export const getStoragePermission = async () => {
	let permissions = await PermissionsAndroid.requestMultiple(
		[
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
		],
		//@ts-expect-error
		{ 
			title: 'Quantifi Storage Permission',
			message: 'Quantifi needs to access your storage',
		}
		
	);

	if (permissions['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
		return;
	} else {
		Alert.alert(
			'Permission to access storage required',
			'Quantifi woulld like to access your storage',
			[{ text: "Let's Do It", onPress: async () => await getStoragePermission() }],
			{ cancelable: false }
		);
	}
};

export const checkStoragePermissions = async () => {
	let granted = await PermissionsAndroid.check(
		PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
	);
	return granted;
};
