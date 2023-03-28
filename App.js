import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Event  from './modals/Event.js'
import Profile from './screens/Profile.js'
import GroupFind from './GroupFind.js'
import SettingsHomepage from './screens/SettingsHomepage.js'
import LoginPage from './LoginPage.js'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login Page">
        <Drawer.Screen name="Login Page" component={LoginPage} options={{
          drawerItemStyle: { height: 0 }
          }}/>
        <Drawer.Screen name="Find a Group" component={GroupFind} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Event" component={Event} />
        <Drawer.Screen name="Preferences" component={SettingsHomepage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
