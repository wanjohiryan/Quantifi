import * as React from "react";
import { StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import {cacheAssets} from "./src/utils/Cache";
import {checkStoragePermissions, getStoragePermission} from "./src/utils/Permissions";
//import { Provider } from 'react-redux';
//import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomTab } from "./src/navigator";
import RNFetchBlob from "rn-fetch-blob";
//import {store,persistor} from "./src/redux/store";

enableScreens();
//const AppNavigator = createAppContainer(BottomTab);

export default class App extends React.PureComponent {
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }

     /**async componentDidMount(){
        await cacheAssets()
     } */
    
    render() {
        return (
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <StatusBar
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
