import React from 'react';
import Interest_Search from './screens/interest_search'
import Interest_category from "./screens/interest_category";
import Interest_page from "./screens/interest_page";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Member_list from "./screens/member_list";
import RSVPList from "./screens/RSVPList";
import Start from "./modals/Event";

const Stack = createNativeStackNavigator();

export default class GroupFind extends React.Component{
  render (){
    return(
          <Stack.Navigator>
            <Stack.Screen
                name="Interest_Categories"
                component={Interest_Search}
                options = {{ headerTransparent: true, headerTitle:''}}
            />
            <Stack.Screen
                name="Specific_Interests"
                component={Interest_category}
                options = {{ headerTransparent: true, headerBackTitleVisible:false, headerTitle:''}} />
            <Stack.Screen
                name="Interest_Home_Page"
                component={Interest_page}
                options = {{ headerTransparent: true, headerBackTitleVisible:false, headerTitle:''}} />
            <Stack.Screen
                name="Members_Page"
                component={Member_list}
                options = {{ headerTransparent: true, headerBackTitleVisible:false,headerTitle:''}} />
            <Stack.Screen name = "Start" component = {Start}/>
            <Stack.Screen name = "RSVP List" component = {RSVPList}/>
          </Stack.Navigator>
    );
  }
}
