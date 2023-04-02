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

export default function ProfileFind (){
  return(
      <Stack.Navigator>
        <Stack.Screen
            name="Profile_Page"
            component={Profile}
            options = {{ headerTransparent: true, headerTitle:''}}
        />
        <Stack.Screen
            name="ProfileEditor"
            component={ProfileEditor}
            options = {{ headerTransparent: true, headerBackTitleVisible:false, headerTitle:''}} />
      </Stack.Navigator>
  );
}
