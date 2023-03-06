import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Event  from './Event.js'
import Profile from './Profile.js'
import GroupFind from './GroupFind.js'
import SettingsHomepage from './SettingsHomepage.js'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Find A Group">
      <Drawer.Screen name="Find a Group" component={GroupFind} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Event" component={Event} />
        <Drawer.Screen name="Preferences" component={SettingsHomepage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}