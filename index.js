/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
// @ts-ignore
import bgService from './src/musicService/RemoteControlListener';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(()=>bgService);
