import React from 'react';
import { View, StyleSheet, Text } from 'react-native';



export default function CameraScreen() {
    return (
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }} >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }} >CAM</Text>
        </View>
    )
}