import React from 'react';
import Interest_Search from './screens/InterestSearch'
import InterestCategory from "./screens/InterestCategory";
import Interest_page from "./screens/InterestHomePage";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MemberList from "./screens/MemberList";
import RSVPList from "./screens/RSVPList";
import Start from "./modals/Event";
import Profile from './screens/Profile'
import ProfileEditor from "./screens/ProfileEditor";
import ProfileOther from "./screens/ProfileOther";
const Stack = createNativeStackNavigator();

export default function GroupFind (){
    return(
          <Stack.Navigator>
            <Stack.Screen
                name="Interest_Categories"
                component={Interest_Search}
                options = {{ headerTransparent: true, headerTitle:''}}
            />
            <Stack.Screen
                name="Specific_Interests"
                component={InterestCategory}
                options = {{ headerTransparent: true, headerBackTitleVisible:false, headerTitle:''}} />
            <Stack.Screen
                name="Interest_Home_Page"
                component={Interest_page}
                options = {{ headerTransparent: true, headerBackTitleVisible:false, headerTitle:''}} />
            <Stack.Screen
                name="Members_Page"
                component={MemberList}
                options = {{ headerTransparent: true, headerBackTitleVisible:false,headerTitle:''}} />
            <Stack.Screen
                name="RSVP_List"
                component={RSVPList}
                options = {{ headerTransparent: true, headerBackTitleVisible:false,headerTitle:''}} />
            <Stack.Screen
                name="Member_Profile"
                component={ProfileOther}
                options = {{ headerTransparent: true, headerBackTitleVisible:false,headerTitle:''}} />
            <Stack.Screen
                name="ProfileEditor"
                component={ProfileEditor}
                options = {{ headerTransparent: true, headerBackTitleVisible:false,headerTitle:''}} />
            <Stack.Screen name = "Start" component = {Start}/>
            <Stack.Screen name = "RSVP List" component = {RSVPList}/>
          </Stack.Navigator>
    );
}
