import * as React from "react";
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";

import Tabbar from "./src/screens/tabbar/BottomTab";
import { Home } from "./src/screens/home";
import { Inbox } from "./src/screens/inbox";
import { Quoin } from "./src/screens/quoin";
import { Trending } from "./src/screens/popular";
import { Profile } from "./src/screens/userprofile";
import { StatusBar } from "react-native";

enableScreens();

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
            
            <Tabbar {...{state, navigation, descriptors}} />}>
            
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

//const AppNavigator = createAppContainer(BottomTab);

const App = () => (
    
    <NavigationContainer>
      <StatusBar 
        animated={true}
        backgroundColor="#39ffb4"
        barStyle="dark-content"
        translucent={true}
      >
      </StatusBar>
      <BottomTab/>
	</NavigationContainer>
   
);

export default App;