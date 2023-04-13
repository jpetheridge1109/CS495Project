import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Event  from './modals/Event.js'
import ProfileFind from './ProfileFind.js'
import GroupFind from './GroupFind.js'
import SettingsHomepage from './screens/SettingsHomepage.js'
import Calendar from './screens/Calendar.js'
import LoginPage from './LoginPage.js'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image, StyleSheet } from 'react-native';
import { useChatClient } from './useChatClient';
import {AppProvider, useAppContext} from "./AppContext";
import {ChannelList, Chat, OverlayProvider, Channel,  MessageList,  MessageInput} from 'stream-chat-expo'; // Or stream-chat-expo
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from './chatConfig';

const chatClient = StreamChat.getInstance(chatApiKey);

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const filters = {
  members: {
    '$in': [chatUserId]
  },
};

const sort = {
  last_message_at: -1,
};


const ChannelScreen = props => {
  const { channel } = useAppContext();
  console.log(channel);
  return (
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
  );
};

const ChannelListScreen = props => {
  const { setChannel } = useAppContext();
  return (
      <ChannelList
          onSelect={(channel) => {
            const { navigation } = props;
            setChannel(channel);
            navigation.navigate('ChannelScreen');
          }}
      />
  );
};


const NavigationStack = () => {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>
  }
  return (
      <OverlayProvider>
        <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="ChannelList" component={ChannelListScreen} options = {{ headerTitle:'Messages', headerTitleAlign:'center'}}/>
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} options = {{ headerTransparent: true, headerTitle:''}}/>
        </Stack.Navigator>
        </Chat>
      </OverlayProvider>
  );
};

export default () => {
  return (
      <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login Page">
            <Drawer.Screen name="Login Page" component={LoginPage}
              options={{
                drawerItemStyle: { height: 0 },
                headerTransparent: false,
                headerTitle: 'hi',
                headerShown: false,
                drawerLockMode: 'locked-closed',
                swipeEnabled: false
              }}
              screenOptions={{
                headerBackButton: "disabled",
                swipeEdgeWidth: 0,
                gestureEnabled: false
              }} />

            <Drawer.Screen name="Frisbee Group" component={GroupFind}
              options={{
                drawerLabelStyle: {
                  color: "blue",
                  fontWeight: 'bold'
                }, 
                drawerIcon: () => 
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('./assets/frisbee.png')}
                />
                
                }}/>
            <Drawer.Screen name="Find a Group" component={GroupFind}
              options={{
                drawerIcon: () => 
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('./assets/magnifying.png')}
                />
                }}/>
            <Drawer.Screen name="Chat" component={NavigationStack}
                options={{
                  drawerIcon: () => 
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require('./assets/chat_drawer.png')}
                  />
                  }}/>
            <Drawer.Screen name="Calendar" component={Calendar}
                options={{
                  drawerIcon: () => 
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require('./assets/calendar_drawer.png')}
                  />
                  }}/>
            <Drawer.Screen name="Profile" component={ProfileFind}
                options={{
                  drawerIcon: () => 
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require('./assets/profile.png')}
                  />
                  }} />
            {/* <Drawer.Screen name="Event" component={Event}
                options={{
                  drawerIcon: () => 
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require('./assets/frisbee.png')}
                  />
                  }} /> */}
            <Drawer.Screen name="Preferences" component={SettingsHomepage}
                options={{
                  drawerIcon: () => 
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require('./assets/settings.png')}
                  />
                  }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      </AppProvider>

  );
};