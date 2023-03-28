import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Event  from './modals/Event.js'
import Profile from './screens/Profile.js'
import GroupFind from './GroupFind.js'
import SettingsHomepage from './screens/SettingsHomepage.js'
import Calendar from './screens/Calendar.js'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
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
          <Drawer.Navigator initialRouteName="Find A Group">
            <Drawer.Screen name="Find a Group" component={GroupFind} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Event" component={Event} />
            <Drawer.Screen name="Preferences" component={SettingsHomepage} />
            <Drawer.Screen name="Chat" component={NavigationStack}/>
            <Drawer.Screen name="Calendar" component={Calendar}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      </AppProvider>

  );
};
