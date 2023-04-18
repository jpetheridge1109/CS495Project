import React, {useContext} from "react";
import {StreamChat} from "stream-chat";
import {chatApiKey} from "../chatConfig";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider
} from "stream-chat-expo";
import {UserContext, UserProvider} from "../context/UserProvider";

export default function GroupChat({route, navigation}) {
  const groupId = route.params.groupId
  const chatClient = StreamChat.getInstance(chatApiKey);
  const {state} = useContext(UserContext);

  if (!chatClient.userID) {
    chatClient.connectUser({
      id: state.userID,
      name: state.username,
    }, chatClient.devToken(state.userID));
  }
  let channel = chatClient.channel('messaging',groupId);
  return(
      <OverlayProvider>
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <MessageList />
            <MessageInput />
          </Channel>
        </Chat>
      </OverlayProvider>
  )
}