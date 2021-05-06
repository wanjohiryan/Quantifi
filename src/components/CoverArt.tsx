import React from 'react';
import { Dimensions, StyleSheet,Image, ImageRequireSource } from 'react-native';

const ImageSize = Dimensions.get('window').width * 0.82;
const placeholder:ImageRequireSource = require("../../assets/placeholder.jpg");

interface CoverProps{
	src:string;
}

const CoverArt = ({src}:CoverProps) => {
	const imgSrc = src ? { uri: src } : placeholder;
	return <Image source={imgSrc} style={styles.Cover}/>;
};

export default CoverArt;

const styles = StyleSheet.create({
   Cover:{
	height:ImageSize,
	width:ImageSize,
	borderRadius: 5,
   }
});
