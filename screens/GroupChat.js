import React from "react";
import ProfSetName from "./ProfSet_Name";
import ProfSetDetails from "./ProfSet_Details";
import ProfSetAboutMe from "./ProfSet_AboutMe";
import {StreamChat} from "stream-chat";
import {chatApiKey, chatUserId, chatUserName} from "../chatConfig";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider
} from "stream-chat-expo";

export default function GroupChat({route, navigation}) {
  const groupId = route.params.groupId
  const chatClient = StreamChat.getInstance(chatApiKey);
  const user = {
    id: global.user,
    name: global.userName,
  };
  if (!chatClient.userID) {
    chatClient.connectUser({
      id: global.userID,
      name: global.userName,
    }, chatClient.devToken(global.userID));
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