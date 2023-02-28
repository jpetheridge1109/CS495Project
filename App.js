import React from 'react';
import Interest_Search from './Screens/interest_search'
import Interest_category from "./Screens/interest_category";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default class App extends React.Component{
  render (){
    return(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Interest_Search}
                options = {{ headerShown: false, headerTransparent: true}}
            />
            <Stack.Screen
                name="Profile"
                component={Interest_category}
                options = {{ headerTransparent: true, headerTitleStyle: { color: '#344e71'}}} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}
