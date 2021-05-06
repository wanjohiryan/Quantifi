import { Alert, Linking } from 'react-native';

export default function (e:any) {
	Alert.alert(
		'Oops! an error ocurred',
		'Send error log to developers?',
		[{ text: 'Send', onPress: () => mailError(e) }],
		{ cancelable: true }
	);
}

function mailError(e: any) {
	Linking.openURL(
		`mailto:elviswanjohi47@gmail.com?subject=Quantifi error log&body=LOG\n\n${JSON.stringify(
			e
		)}`
	);
}
