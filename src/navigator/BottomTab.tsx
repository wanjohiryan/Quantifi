import * as React from "react";
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import {useSharedValue} from "react-native-reanimated";

import Tabbar from "./../screens/tabbar/BottomTab";
import { Data, DataProps } from "../screens/userprofile/Data";
import { Home } from "./../screens/home";
import { Profile } from "./../screens/quoin";
import { Camera } from "./../screens/apps";

type Routes = {
    Home: React.ReactElement,
    Inbox: React.ReactElement,
    Quoin: React.ReactElement,
    Camera: React.ReactElement,
    Profile: React.ReactElement,
}

const BottomTab: React.FC = () => {
    // const params = React.useRef<DataProps>();
    const [params, setParams] = React.useState<DataProps>(Data[0]);
    const videoProgress = useSharedValue(0);

    React.useEffect(()=>{
        console.log("progress:",videoProgress.value)
    },[videoProgress]);

    const Tab = createBottomTabNavigator<Routes>();

    return (
        <Tab.Navigator
            initialRouteName='Home'
            backBehavior="none"
            tabBarOptions={{
                showLabel: false,
            }}
            tabBar={({ state, navigation, descriptors }: BottomTabBarProps) =>

                <Tabbar {...{ state, navigation, descriptors, params, videoProgress }} />}>

            <Tab.Screen
                name="Home"
                //component={() => <Home postProps={params}/>}
                options={{tabBarLabel: "Home"}}
                children={() =>( 
                  <Home
                    videoProgress={videoProgress}
                    postProps={(props)=>setParams(props)}/>)}
            />
            <Tab.Screen
                name="Camera"
                component={Camera}
                options={{
                    tabBarLabel: "Camera"
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: "Profile"
                }}
            />
        </Tab.Navigator>
    )
};

export default BottomTab;