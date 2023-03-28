import React from "react";
import {useAppContext} from "../AppContext";
import {
  Channel,
  MessageInput,
  MessageList,
  OverlayProvider
} from "stream-chat-expo";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Text} from "react-native";
import { useChatClient } from './useChatClient';
import {ChannelList, Chat } from 'stream-chat-expo'; // Or stream-chat-expo
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from './chatConfig';

export default class ChatView extends React.Component {
  render() {
    // const Stack = createStackNavigator();
    //
    // const Drawer = createDrawerNavigator();
    //
    // const filters = {
    //   members: {
    //     '$in': [chatUserId]
    //   },
    // };
    //
    // const sort = {
    //   last_message_at: -1,
    // };
    //
    // const ChannelScreen = props => {
    //   const { channel } = useAppContext();
    //   console.log(channel);
    //   return (
    //       <Channel channel={channel}>
    //         <MessageList />
    //         <MessageInput />
    //       </Channel>
    //   );
    // };
    //
    // const ChannelListScreen = props => {
    //   const { setChannel } = useAppContext();
    //   return (
    //       <ChannelList
    //           onSelect={(channel) => {
    //             const { navigation } = props;
    //             setChannel(channel);
    //             navigation.navigate('ChannelScreen');
    //           }}
    //       />
    //   );
    // };
    //
    // const NavigationStack = () => {
    //   const { clientIsReady } = useChatClient();
    //
    //   if (!clientIsReady) {
    //     return <Text>Loading chat ...</Text>
    //   }
    //   return (
    //       <OverlayProvider>
    //         <Chat client={chatClient}>
    //           <Stack.Navigator>
    //             <Stack.Screen name="ChannelList" component={ChannelListScreen} options = {{ headerTitle:'Messages', headerTitleAlign:'center'}}/>
    //             <Stack.Screen name="ChannelScreen" component={ChannelScreen} options = {{ headerTransparent: true, headerTitle:''}}/>
    //           </Stack.Navigator>
    //         </Chat>
    //       </OverlayProvider>
    //   );
    // };
    // return(<NavigationStack></NavigationStack>);
  }

}
