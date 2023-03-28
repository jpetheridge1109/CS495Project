import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { useChatClient } from './useChatClient';
import {AppProvider, useAppContext} from "./AppContext";
import App from "react-native/template/App";
import {ChannelList, Chat, OverlayProvider, Channel,  MessageList,  MessageInput} from 'stream-chat-expo'; // Or stream-chat-expo
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from './chatConfig';

const chatClient = StreamChat.getInstance(chatApiKey);

const Stack = createStackNavigator();

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
          <Stack.Screen name="ChannelList" component={ChannelListScreen} />
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
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
          <NavigationStack />
        </NavigationContainer>
      </SafeAreaView>
      </AppProvider>
  );
};
