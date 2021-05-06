import RNFetchBlob from "rn-fetch-blob";


export const cacheAssets = async() => {
    let videoDir = RNFetchBlob.fs.dirs.MovieDir + "/Q.Videos";
    //const videoDir = Root + "/Videos"; //`file://${RNFetchBlob.fs.dirs.DocumentDir}`;
    let exists = await RNFetchBlob.fs.exists(videoDir);
    // let RNFetchBlob.fs.dirs.MovieDir
    if(exists){
        return;
    } else {
        await RNFetchBlob.fs.mkdir(videoDir).catch(e => console.log(e));
    }
}