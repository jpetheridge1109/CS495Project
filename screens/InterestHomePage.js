import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Alert, Pressable, Modal
} from 'react-native';

import { Surface } from "@react-native-material/core";
import { Button } from '@rneui/themed';
import { RFPercentage } from "react-native-responsive-fontsize";
import {findOne, aggregation, find, updateOne} from '../db.js'
import {StreamChat} from "stream-chat";
import {chatApiKey, chatUserId, chatUserName} from "../chatConfig";

let image = "placeholder";
let groupName = "";
let createdDate = "";
let description = "";
let memberCount = 0;
let memberIDs = [];
let memberNames = [];
let memberImages = [];
let GROUPID;
let eventNames = [];
let eventDates = [];
let eventTimes = [];
let eventIDs = [];
let eventLocations = [];
let eventOrganizers = [];
let inGroup = false;

export default function InterestHomePage({route, navigation}){
  const [isLoading, setIsLoading] = useState(true);
  const [numEvents, setNumEvents] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState("Event Name");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventID, setEventID] = useState("");
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);

  const getMemberPreviewInfo = async (membersArray) => {
    let response;
    memberNames.length = 0;
    memberImages.length = 0;
    for(let i = 0; i < membersArray.length; i++){
      response = await findOne("user", {"_id": {"$oid":membersArray[i]}});
      memberNames.push(response.document.fname);
      memberImages.push(response.document.img);
    }
    if (memberNames.length == 1 && memberImages.length == 1){         //avoid source being an empty string warning
      memberImages[1] = "placeholder";
      memberImages[2] = "placeholder";
    }
    else if (memberNames.length == 2 && memberImages.length == 2){
      memberImages[2] = "placeholder";
    }
  }

  const getUpcomingEventInfo = async (groupId) => {
    const today = formatDate(new Date())
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = formatDate(tomorrow)
    let epochTomorrow = (new Date(tomorrow.toString()).getTime() / 1000)
    let epochToday = (new Date(today.toString()).getTime() / 1000)
    let response = await aggregation("event", [
      {
        "$match": {
          "$and": [{"group": {"$oid": groupId}},
            {"date": {"$gte": epochToday}}]
        }
      },
      {
        "$sort": {"date": 1}
      },
      {
        "$limit": 2
      }
    ]);
    let upcomingEvents = response.documents

    eventNames.length = 0;
    eventDates.length = 0;
    eventTimes.length = 0;
    eventIDs.length = 0;
    eventLocations.length = 0;
    eventOrganizers.length = 0;

    for(let i = 0; i < upcomingEvents.length; i++){
      eventIDs.push(upcomingEvents[i]._id)
      eventNames.push(upcomingEvents[i].name);
      eventLocations.push(upcomingEvents[i].location)
      eventOrganizers.push(upcomingEvents[i].organizer)
      let date = upcomingEvents[i].date;
      let dateTime = new Date(0);
      dateTime.setSeconds(date);
      eventDates.push(formatDate(dateTime));
      eventTimes.push(formatTime(dateTime));
    }

    if(eventDates.length > 0){
      setNumEvents(eventDates.length);
    }
  }

  useEffect(() => {
    (async () => {
      const groupId = route.params.groupId
      GROUPID = groupId;
      const response = await findOne("group", {"_id": {"$oid":groupId}});
      image = response.document.img;
      groupName = response.document.name;
      description = response.document.description
      createdDate = response.document.created_date
      memberCount = response.document.members.length
      memberIDs = response.document.members
      let response2 = await findOne("group", {"_id": {"$oid":GROUPID}, "members": {"$oid": global.userID}}) //check if the user is the member of the group already
      if(response2.document != null){
        inGroup = true;
      }
      else{
        inGroup = false;
      }

      if(!isPreviewLoaded){               //don't update this if we already have the data for modal purposes
        await getMemberPreviewInfo(memberIDs);
        setIsPreviewLoaded(true);
      }
      await getUpcomingEventInfo(groupId);

      setIsLoading(false) //update screen after data retrieval
    })();
  });

  const handleRSVPListPress = () => {
    setModalVisible(!modalVisible)
    navigation.navigate('RSVP_List',{eventId: eventID})
  };
  const filter = { type: 'messaging', members: { $in: [global.userID] }, id: GROUPID };

  const onJoin = async () => {
    //add user to group in db
    await updateOne('group', {"_id": {"$oid":GROUPID}}, {"$push": {"members": {"$oid": global.userID}}})
    await updateOne('user', {"_id": {"$oid":global.userID}}, {"$push": {"groups": {"$oid": GROUPID}}})

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
      channel = chatClient.channel('messaging',GROUPID,{name: groupName, members:['admin']})    //always add admin to every new group
      await channel.create();
    }
    else{
      channel = chatClient.channel('messaging',GROUPID);
    }

    await channel.addMembers([global.userID], {text: global.userName + ' joined the channel'})    //add member to the channel
   await chatClient.disconnectUser()    //disconnect admin
    setIsLoading(true);
  }

  const createTwoButtonAlert = () =>
      Alert.alert('RSVP Confirm', 'Would you like to RSVP to this event?', [
        {
          text: 'Yes',
          //onPress: () => confirmRSVP
        },
        {
          text: 'No',
          //onPress: () => doSomething
          style: 'cancel',
        },
      ]);

  const EventModal = () => {
    return(<Modal
        animationType = "fade"
        transparent = {true}
        visible = {modalVisible}
        onRequestClose = {() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
      <View style = {styles.modalWrapper}>
        <View style = {styles.modalView}>
          <Text style = {styles.modalText}>{eventName}</Text>
          <View style = {{flexDirection: 'row', marginBottom: 20}}>
            <Text style = {styles.modalLeftText}>Date: {eventDate}</Text>
            <Text style = {styles.modalRightText}>Location: {eventLocation}</Text>
          </View>
          <View style = {{flexDirection: 'row', marginBotom: 20}}>
            <Text style = {styles.modalLeftText}>Time: {eventTime}</Text>
            <Text style = {styles.modalRightText}>Organizer: {eventOrganizer}</Text>
          </View>
          <View style = {{flexDirection: 'row', marginBottom: 20}}>
            <Pressable style = {[styles.button, styles.buttonRSVP]}
                       onPress = {createTwoButtonAlert}>
              <Text style = {styles.textStyle}>RSVP</Text>
            </Pressable>
            <Pressable style = {[styles.button, styles.buttonViewPpl]}
                       onPress = {handleRSVPListPress}>
              <Text style = {styles.textStyle}>View People Attending</Text>
            </Pressable>
          </View>
          <Pressable
              style = {[styles.button, styles.buttonClose]}
              onPress = {() => setModalVisible(!modalVisible)}>
            <Text style = {styles.textStyle}>Hide</Text>
          </Pressable>
        </View>
      </View>
    </Modal>);
  }

  const BlurredChat = () => {
    if(!inGroup){
      return(
          <View style = {{width:'80%', aspectRatio:2, alignSelf:'center' }}>
            <ImageBackground source = {require('../assets/chat_demo_blurred.png')} style={{width:'100%',height:'80%', justifyContent:'center', borderRadius:100}}>
              <Button  buttonStyle={{
                backgroundColor: 'rgba(111, 202, 186, 1)',
                borderRadius: 5,
                width: '20%',
                alignSelf:'center',
                justifySelf: 'center'
              }} onPress={() => onJoin()}>Join</Button>
              <Text style = {{textAlign:'center', fontWeight:'bold', color:'white', paddingTop:'2%',fontSize: RFPercentage(2)}}>Join to see chat and calendar</Text>
            </ImageBackground>
          </View>
      )
    }
   return (<View></View>)
  }


  const Calendar_Chat_Buttons = () => {
    return(
        <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between', width:'90%', aspectRatio:3, alignSelf:'center'}}>
          <TouchableOpacity style = {{flex:1}}  onPress={() => navigation.navigate('Group_Chat',{groupId: GROUPID})} disabled={!inGroup}>
            <Surface
                elevation={20}
                category="medium"
                style={styles.buttonTile}
            >
              <Image source = {require('../assets/chat.png')} style = {styles.buttonImage}/>
              <Text style = {styles.memberName}>Chat</Text>
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity style = {{flex:1}} onPress={() => navigation.navigate('groupCalendar')} disabled={!inGroup}>
            <Surface
                elevation={20}
                category="medium"
                style={styles.buttonTile}
            >
              <Image source = {require('../assets/calendar.png')} style = {styles.buttonImage}/>
              <Text style = {styles.memberName}>Calendar</Text>
            </Surface>
          </TouchableOpacity>
        </View>
    )
  }

  const Group_Info = () => {
    return(
        <View><Surface
            elevation={20}
            category="medium"
            style={{ alignSelf: 'center', width: '80%', aspectRatio: 0.8, marginBottom: 20, borderRadius: 10}}
        >
          <Image
              source = {{uri:image}}
              style = {styles.groupPic}/>
          <Text style = {styles.text}>{groupName}</Text>
          <Text style = {styles.groupDetails}>Created {createdDate}</Text>
          <Text style = {styles.description}>{description}</Text>
        </Surface>

          <Surface
              elevation={20}
              category="medium"
              style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
          >
            <Text style = {{paddingLeft:'3%', paddingBottom:'1%',fontWeight:'bold',fontSize: RFPercentage(2)}}>Members: {memberCount}</Text>
            <View style={{flex: 1, flexDirection: "row", alignContent: 'space-between'}}>
              <View style = {{flex:1}}>
                <TouchableOpacity style = {styles.memberTouchable} onPress={() => navigation.navigate('Member_Profile',{memberId: memberIDs[0], isDefault:false})}>
                  <Image source = {{uri:memberImages[0]}} style = {styles.avatars}/>
                </TouchableOpacity>
                <Text style = {styles.memberName}>{memberNames[0]}</Text>
              </View>
              <View style = {{flex:1}}>
                <TouchableOpacity style = {styles.memberTouchable} onPress={() => navigation.navigate('Member_Profile', {memberId: memberIDs[1], isDefault:false})}>
                  <Image source = {{uri:memberImages[1]}} style = {styles.avatars}/>
                </TouchableOpacity>
                <Text style = {styles.memberName}>{memberNames[1]}</Text>
              </View>
              <View style = {{flex:1}}>
                <TouchableOpacity style = {styles.memberTouchable} onPress={() => navigation.navigate('Member_Profile', {memberId: memberIDs[2], isDefault:false})}>
                  <Image source = {{uri:memberImages[2]}} style = {styles.avatars}/>
                </TouchableOpacity>
                <Text style = {styles.memberName}>{memberNames[2]}</Text>
              </View>
              <View style = {{flex:1}}>
                <TouchableOpacity style = {styles.memberTouchable} onPress={() => navigation.navigate('Members_Page',{groupId:GROUPID})}>
                  <Image source = {require('../assets/view-more.png')} style = {styles.avatars}/>
                </TouchableOpacity>
                <Text style = {styles.memberName}>View All</Text>
              </View>
            </View>
          </Surface></View>
        )

  }

  const RenderedObject = () => {
    if (isLoading) {
      return <SafeAreaView style={styles.container}>
        <View>
          <ActivityIndicator  size='large' color="#00ff00" />
        </View>
      </SafeAreaView>
    }

    else if(numEvents === 0){
      return(
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <Group_Info/>
              <Surface
                  elevation={20}
                  category="medium"
                  style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
              >
                <Text style={{textAlign: 'center', paddingTop: '1%', paddingBottom:'1%', fontWeight:'bold', fontSize: RFPercentage(2)}}>Upcoming Events</Text>
                <Text style={{textAlign: 'center', paddingTop: '3%', paddingBottom:'1%', fontSize: RFPercentage(2)}}>No Events</Text>
              </Surface>
              <Calendar_Chat_Buttons/>
             <BlurredChat/>
            </ScrollView>
          </SafeAreaView>
      );
    }

    else if(numEvents === 1){
      return(
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <EventModal></EventModal>
              <Group_Info/>
              <Surface
                  elevation={20}
                  category="medium"
                  style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
              >
                <Text style={{textAlign: 'center', paddingTop: '1%', paddingBottom:'1%', fontWeight:'bold', fontSize: RFPercentage(2)}}>Upcoming Events</Text>
                <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>
                  <TouchableOpacity style = {{flex:1}} onPress={() => {
                    setEventName(eventNames[0])
                    setEventDate(eventDates[0]);
                    setEventTime(eventTimes[0])
                    setEventLocation(eventLocations[0])
                    setEventOrganizer(eventOrganizers[0])
                    setEventID(eventIDs[0])
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <Surface
                        elevation={6}
                        category={"medium"}
                        style={styles.eventTile}
                    >
                      <Text style = {styles.eventName}>{eventNames[0]}</Text>
                      <Text style = {styles.eventDetails}>{eventDates[0]} at {eventTimes[0]}</Text>
                    </Surface>
                  </TouchableOpacity>
                </View>
              </Surface>
              <Calendar_Chat_Buttons/>
              <BlurredChat/>
            </ScrollView>
          </SafeAreaView>
      );
    }

    return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <EventModal></EventModal>
           <Group_Info/>
            <Surface
                elevation={20}
                category="medium"
                style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
            >
              <Text style={{textAlign: 'center', paddingTop: '1%', paddingBottom:'1%', fontWeight:'bold', fontSize: RFPercentage(2)}}>Upcoming Events</Text>
              <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>
                <TouchableOpacity style = {{flex:1}} onPress={() => {
                  setEventName(eventNames[0])
                  setEventDate(eventDates[0]);
                  setEventTime(eventTimes[0])
                  setEventLocation(eventLocations[0])
                  setEventOrganizer(eventOrganizers[0])
                  setEventID(eventIDs[0])
                  setModalVisible(!modalVisible)
                }
                }>
                  <Surface
                      elevation={6}
                      category={"medium"}
                      style={styles.eventTile}
                  >
                    <Text style = {styles.eventName}>{eventNames[0]}</Text>
                    <Text style = {styles.eventDetails}>{eventDates[0]} at {eventTimes[0]}</Text>
                  </Surface>
                </TouchableOpacity>
                <TouchableOpacity style = {{flex:1}} onPress={() => {
                  setEventName(eventNames[1])
                  setEventDate(eventDates[1]);
                  setEventTime(eventTimes[1])
                  setEventLocation(eventLocations[1])
                  setEventOrganizer(eventOrganizers[1])
                  setEventID(eventIDs[1])
                  setModalVisible(!modalVisible)
                }
                }>
                  <Surface
                      elevation={6}
                      category={"medium"}
                      style={styles.eventTile}
                  >
                    <Text style = {styles.eventName}>{eventNames[1]}</Text>
                    <Text style = {styles.eventDetails}>{eventDates[1]} at {eventTimes[1]}</Text>
                  </Surface>
                </TouchableOpacity>
              </View>
            </Surface>
           <Calendar_Chat_Buttons/>
            <BlurredChat/>
          </ScrollView>
        </SafeAreaView>
    );
  }
  return(<RenderedObject/>)
}


function formatDate(date){
  return date.toLocaleDateString('en-US')
}

function formatTime(date){
  return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: '#344e71'
  },
  item: {
    width: '35%',
    aspectRatio: 1,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius:30,
    justifyContent: 'center'
  },
  groupPic:{
    alignSelf: 'center',
    justifySelf: 'center',
    height: '50%',
    aspectRatio:1,
    borderRadius: 10000,
    marginTop: '5%',
  },
  avatars:{
    height: '100%',
    aspectRatio:1,
    borderRadius: 10000,
    marginTop: '5%',
  },
  buttonImage:{
    height: '50%',
    aspectRatio:1,
    alignSelf: 'center',
    justifySelf: 'center',
    marginTop:'5%',
  },
  text:{
    paddingTop: '2%',
    pattingBottom: '2%',
    textAlign: 'center',
    color: '#343333',
    fontWeight:'bold',
    fontSize: RFPercentage(3)
  },
  description:{
    paddingTop:'2%',
    paddingLeft:'2%',
    paddingRight:'2%',
    fontSize: RFPercentage(2),
    color: '#999191',
  },
  groupDetails:{
    textAlign: 'center',
    fontSize: RFPercentage(2),
    fontWeight:'bold'
  },
  memberName:{
    textAlign: 'center',
    fontSize: RFPercentage(2),
    paddingTop: '5%',
    fontWeight:'bold'
  },
  memberTouchable:{
    alignSelf:'center',
    borderRadius:10000,
    aspectRatio:1,
    height:'70%'
  },
  eventTile:{
    height:'90%',
    aspectRatio:1.8,
    alignSelf:'center'
  },

  buttonTile:{
    height:'60%',
    aspectRatio:1.5,
    alignSelf:'center',
    justifyContent: 'center'
  },
  eventDetails:{
    paddingLeft: '5%',
    paddingBottom:'3%',
    fontSize: RFPercentage(2)
  },
  eventName:{
    textAlign:'center',
    fontWeight:'bold',
    paddingBottom:'2%',
    fontSize: RFPercentage(2)
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    verticalAlign: 'center',
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonYes: {
    backgroundColor: "#1eb76a",
  },
  buttonCancel: {
    backgroundColor: "#b51f30",
  },
  buttonRSVP: {
    backgroundColor: '#DA8E12',
    justifyContent: 'flex-start',
    flex: 1,
    marginHorizontal: 10,
  },
  buttonViewPpl: {
    backgroundColor: '#DA8E12',
    justifyContent: 'flex-end',
    flex: 1,
    marginHorizontal: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalLeftText: {
    flex: 1,
    marginBottom: 15,
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  modalRightText: {
    flex: 1,
    marginBottom: 15,
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
});