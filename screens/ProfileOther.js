import React, {useContext, useEffect, useState} from "react";
import {findOne} from "../db";
import {
  ActivityIndicator, Image,
  SafeAreaView,
  ScrollView, StyleSheet, Text,
  TouchableOpacity,
  View
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {StreamChat} from "stream-chat";
import {chatApiKey} from "../chatConfig";
import {UserContext} from "../context/UserProvider";

/* NEXT STEPS:
-Add settings button to top bar
-Fix shadows
*/
let fname = "";
let name2 = "";
let name = "";
let age = "";
let grade = "";
let major = "";
let aboutMe = "";
let interestIds = [];
let profilePic = "placeholder"
let interests = []
let MEMBERID;


export default function ProfileOther({route, navigation}){

  const [isLoading, setIsLoading] = useState(true);
  const {state} = useContext(UserContext);

  const getInterestInfo = async (interestIds) => {
    let response;
    interests.length = 0
    for(let i = 0; i < interestIds.length; i++){
      response = await findOne("group", {"_id": {"$oid":interestIds[i]}});
      interests.push(response.document)
    }
  }

  useEffect(() => {
    (async () => {
      const memberId = route.params.memberId;
      MEMBERID = memberId;
      let response = await findOne("user", {"_id": {"$oid":memberId}});
      interestIds.length = 0;

      fname = response.document.fname
      name = response.document.fname +" "+ response.document.lname;
      age = response.document.age
      grade = response.document.class
      major = response.document.major
      aboutMe = response.document.bio
      interestIds = response.document.groups
      profilePic = response.document.img
      await getInterestInfo(interestIds);
      setIsLoading(false)
    })();
  });

  const onDirectMessage = async () => {
    const filter = { type: 'messaging', members: { $in: [state.userID,MEMBERID] }, member_count: 3 };
    //add user to chat
    const chatClient = StreamChat.getInstance(chatApiKey);
    const user = {
      id: 'admin',
      name: 'admin',
    };

    console.log("user id: " + chatClient.userID);
    if(chatClient.userID === undefined){
      await chatClient.connectUser(user, chatClient.devToken('admin')); //login admin if no one logged in
      console.log("user connected")
    }
    await chatClient.disconnectUser()
    console.log("user disconnected")  //disconnect current user

    await chatClient.connectUser(user, chatClient.devToken('admin')); //login admin
    console.log("user connected")

    const channels = await chatClient.queryChannels(filter);
    let channel;
    if (channels.length === 0){ //create new channel if doesn't exist
      console.log("Channel not found")
      let response = await findOne("user", {"_id": {"$oid":global.userID}});
      let fname2 = response.document.fname
      name2 = response.document.fname + " " + response.document.lname
      let g_name = fname + " and " + fname2;
      console.log(g_name);
      channel = chatClient.channel('messaging',global.userID+MEMBERID,{name: g_name, members:['admin']})    //always add admin to every new group
      await channel.create();
    }
    else{
      console.log("Channel found")
      channel = channels[0];
    }

    console.log("channel: " + channel);
    await channel.addMembers([global.userID], {text: global.userName + ' joined the channel'})    //add member to the channel
    await channel.addMembers([MEMBERID], {text: name + ' joined the channel'})    //add member to the channel
    await chatClient.disconnectUser()    //disconnect admin
    navigation.navigate('Group_Chat',{groupId: channel.id})
  }

  const RenderedObject = () => {
    if (isLoading) {
      return <SafeAreaView style={styles.container}>
        <View>
          <ActivityIndicator size='large' color="#00ff00"/>
        </View>
      </SafeAreaView>
    }
    return (
        <View style={styles.container}>
          <ScrollView>
            <Image source={{uri: profilePic}} style={styles.profPic}></Image>

            <View style={styles.infoBackground}>
              <Text style={styles.nameFont}>{name}</Text>
              <Text style={styles.bodyFont}>Age: {age}</Text>
              <Text style={styles.bodyFont}>Grade: {grade}</Text>
              <Text style={styles.bodyFontBottom}>Major: {major}</Text>
              <TouchableOpacity style={styles.dmBox} onPress={() => onDirectMessage()}>
                <Image source={require('../assets/mail-icon.png')}
                       style={styles.dmPic}></Image>
                <Text style={styles.dmFont}>Direct Message</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.infoBackground}>
              <Text style={styles.nameFont}>About Me:</Text>
              <Text style={styles.bodyFontBottom}>{aboutMe}</Text>
            </View>

            <View style={styles.infoBackground}>
              <Text style={styles.nameFont}>Interests:</Text>
              {
                interests.map((item) => <Item item={item} key={item._id}/>)
              }

            </View>
          </ScrollView>
          <StatusBar style='auto'/>
        </View>
    );
  }
  const Item = ({item}) => (
      <TouchableOpacity style={styles.interestBox}>
        <Image source={{uri:item.img}} style={styles.interestPic}></Image>
        <Text style={styles.interestFont}>{item.name}</Text>
      </TouchableOpacity>
  );
  return(
      <RenderedObject/>
  )
}

//Code that is for the container and for formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344e71',
    justifyContent: 'center',
  },

  //Styles for the top bar
  topBar: {
    //alignSelf: 'center',
    justifySelf: 'stretch',
    backgroundColor: '#bc1000',
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  topBarFont: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    jutifyContent: 'center',
    marginHorizontal: 10,
  },

  //Styles for profile page information
  infoBackground: {
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center'
  },
  dmBox: {
    backgroundColor: '#cccccc',
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    //width: '95%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  interestBox: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    width: '95%',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row'
  },

  //Pictures
  profPic: {
    borderRadius: 30,
    alignSelf: 'center',
    justifySelf: 'center',
    height: 190,
    aspectRatio: 1,
    marginTop: 10,
    marginBottom: 5,
  },
  dmPic: {
    width: 50,
    aspectRatio: 1,
    borderWidth: 5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  editPic: {
    width: 50,
    aspectRatio: 1,
    borderRadius:1000,
    borderWidth: 5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  interestPic: {
    width: 70,
    aspectRatio: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },

  //Fonts
  dmFont: {
    color: 'black',
    fontSize: 20,
    marginHorizontal: 10,
  },
  nameFont: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  bodyFont: {
    color: 'black',
    fontSize: 22,
    marginHorizontal: 10,
    //marginBottom: 10,
  },
  bodyFontBottom: {
    color: 'black',
    fontSize: 22,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  interestFont: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  editBox: {
    backgroundColor: '#ffffff', //'#cccccc',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    //width: '95%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },

  //Shadows (not working)
  //shadows for iOS
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  //shadows for Android
  elevation: {
    elevation: 20,
    shadowColor: 'black',
  },
});
