import * as React from "react";
import {StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomTab } from "./src/navigator";
import checkPermissions from "./src/utils/permissions"
import { Data, DataType } from "./src/screens/inbox/bbc-iplayer/Data";
import setUpPlayer from "./src/screens/inbox/bbc-iplayer/SetupPlayer";


enableScreens();

interface State {
    songData: DataType[],
  };

export default class App extends React.PureComponent<{},State>{
    constructor(props: {}) {
        super(props);
        this.state = {
            songData:Data
        }
    }
    
  //for rendering the trackPlayer on start-up;[]music has been redacted for now;
  async componentDidMount(){
        // const dat = this.state.songData.map((val, i) => {
        //     return { ...val.song, id: `${i}` };
        //  })
    
        // const songs = dat.length > 20 ? dat.slice(20, dat.length - 20) : dat;

        // await setUpPlayer(songs);
		await checkPermissions();
  }
    render() {
        return (
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <StatusBar
                                animated
                                showHideTransition='fade'
                                backgroundColor="black"
                                barStyle="light-content"
                            />
                            <BottomTab />
                        </NavigationContainer>
                    </SafeAreaProvider>
        )
    }
};


/**    const granted = await checkStoragePermissions();
        if(!granted)
        { await getStoragePermission()}
        else{
            //const Dir = await RNFetchBlob.fs.dirs.DocumentDir;//data/user/0/com.quantifi/files
            //console.log(Dir)}
            cacheAssets()
    }} */
