import React from 'react';
import Dialog from 'react-native-dialog';
import styled, { withTheme } from 'styled-components/native';
import { foreground2Color, contrastColor } from '../themes/styles';

interface DialogBoxProps{
	title:string;
	description:string;
	buttonTitle:string;
	isVisible:boolean;
	onCancel:()=>void;
	cancelButton:boolean;
	theme:{
		foreground:any;
		contrast:any;
		elevatedBG:any;
	};
	onConfirm:()=>void;
}
function ConfirmDialog({onConfirm,theme, title, description, buttonTitle, isVisible, onCancel, cancelButton }:DialogBoxProps) {
	const { foreground, contrast, elevatedBG } = theme;
	return (
		<Dialog.Container
			visible={isVisible}
			backdropColor="black"
			onBackButtonPress={onCancel}
			onBackdropPress={onCancel}
			contentStyle={{ backgroundColor: elevatedBG }}>
			<DialogTitle numberOfLines={2}>{title}</DialogTitle>
			<DialogDescription>{description}</DialogDescription>
			{cancelButton ? (
				<Dialog.Button label="Cancel" color={contrast} onPress={onCancel} />
			) : null}
			<Dialog.Button label={buttonTitle} color={foreground} onPress={onConfirm} />
		</Dialog.Container>
	);
}

export default withTheme(ConfirmDialog);

const DialogTitle = styled(Dialog.Title)`
	font-family: 'ProductSans';
	margin-left: 10px;
	color: ${foreground2Color};
`;

const DialogDescription = styled(Dialog.Description)`
	font-family: 'ProductSans';
	padding: 10px;
	color: ${contrastColor};
`;
