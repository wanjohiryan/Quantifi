import {checkStoragePermissions} from "./storage";
import {checkCameraPermissions} from "./camera";


export default function checkPermissions async () {
	const storj = await checkStoragePermissions();
	const cam = await checkCameraPermissions();
}