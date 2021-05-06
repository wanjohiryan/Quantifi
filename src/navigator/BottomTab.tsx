import * as React from "react";
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import Tabbar from "./../screens/tabbar/BottomTab";
import { Home } from "./../screens/home";
import { Inbox } from "./../screens/inbox";
import { Quoin } from "./../screens/quoin";
import { Trending } from "./../screens/popular";
import { Profile } from "./../screens/userprofile";

type Routes = {
    Home: React.ReactElement,
    Inbox: React.ReactElement,
    Quoin: React.ReactElement,
    Trending: React.ReactElement,
    Profile: React.ReactElement,
}

const BottomTab: React.FC = () => {

    const Tab = createBottomTabNavigator<Routes>();

    return (
        <Tab.Navigator
            initialRouteName='Home'
            backBehavior="none"
            tabBarOptions={{
                showLabel: false,
            }}
            tabBar={({ state, navigation, descriptors }: BottomTabBarProps) =>

                <Tabbar {...{ state, navigation, descriptors }} />}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home"
                }}
            />
            <Tab.Screen
                name="Trending"
                component={Trending}
                options={{
                    tabBarLabel: "Popular"
                }}
            />
            <Tab.Screen
                name="Quoin"
                component={Quoin}
                options={{
                    tabBarLabel: "Quoin"
                }}
            />
            <Tab.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    tabBarLabel: "Inbox"
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