import React from 'react';
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
  FlatList
} from 'react-native';

import { Surface } from "@react-native-material/core";
import { Button } from '@rneui/themed';
import { RFPercentage } from "react-native-responsive-fontsize";
import {findOne, find, aggregation} from '../db.js'

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

export default class Test extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      numEvents:0
    };
  }

  async getMemberPreviewInfo(membersArray){
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
    console.log(membersArray.length);
  }

  async getUpcomingEventInfo(groupId) {
    const today = this.formatDate(new Date())
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = this.formatDate(tomorrow)
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
    console.log(upcomingEvents);

    eventNames.length = 0;
    eventDates.length = 0;
    eventTimes.length = 0;

    for(let i = 0; i < upcomingEvents.length; i++){
      eventNames.push(upcomingEvents[i].name);
      let date = upcomingEvents[i].date;
      let dateTime = new Date(0);
      dateTime.setSeconds(date);
      eventDates.push(this.formatDate(dateTime));
      eventTimes.push(this.formatTime(dateTime));
    }

    if(eventDates.length > 0){
      this.setState({numEvents:eventDates.length})
    }
  }

  formatDate(date){
    return date.toLocaleDateString('en-US')
  }

  formatTime(date){
    return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
  }

  async componentDidMount() {
    this.setState({isLoading: true});  //update screen after data retrieval
    const {groupId} = this.props.route.params
    console.log(groupId)
    GROUPID = groupId;
    const response = await findOne("group", {"_id": {"$oid":groupId}});
    image = response.document.img;
    groupName = response.document.name;
    description = response.document.description
    createdDate = response.document.created_date
    memberCount = response.document.members.length
    console.log(memberCount)
    memberIDs = response.document.members
    await this.getMemberPreviewInfo(memberIDs)
    console.log(await this.getUpcomingEventInfo(groupId));
    this.setState({isLoading: false});  //update screen after data retrieval
  }

  render (){
    const RenderedObject = () => {
      if (this.state.isLoading) {
        return <SafeAreaView style={styles.container}>
          <View>
            <ActivityIndicator  size='large' color="#00ff00" />
          </View>
        </SafeAreaView>
      }

      else if(this.state.numEvents === 0){
        return(
            <SafeAreaView style={styles.container}>
              <ScrollView>
                <Surface
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
                      <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile',{memberId: memberIDs[0], isDefault:false})}>
                        <Image source = {{uri:memberImages[0]}} style = {styles.avatars}/>
                      </TouchableOpacity>
                      <Text style = {styles.memberName}>{memberNames[0]}</Text>
                    </View>
                    <View style = {{flex:1}}>
                      <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile',{memberId: memberIDs[1], isDefault:false})}>
                        <Image source = {{uri:memberImages[1]}} style = {styles.avatars}/>
                      </TouchableOpacity>
                      <Text style = {styles.memberName}>{memberNames[1]}</Text>
                    </View>
                    <View style = {{flex:1}}>
                      <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile',{memberId: memberIDs[2], isDefault:false})}>
                        <Image source = {{uri:memberImages[2]}} style = {styles.avatars}/>
                      </TouchableOpacity>
                      <Text style = {styles.memberName}>{memberNames[2]}</Text>
                    </View>
                    <View style = {{flex:1}}>
                      <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Members_Page',{groupId:GROUPID})}>
                        <Image source = {require('../assets/view-more.png')} style = {styles.avatars}/>
                      </TouchableOpacity>
                      <Text style = {styles.memberName}>View All</Text>
                    </View>
                  </View>
                </Surface>

                <Surface
                    elevation={20}
                    category="medium"
                    style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
                >
                  <Text style={{textAlign: 'center', paddingTop: '1%', paddingBottom:'1%', fontWeight:'bold', fontSize: RFPercentage(2)}}>Upcoming Events</Text>
                  <Text style={{textAlign: 'center', paddingTop: '3%', paddingBottom:'1%', fontSize: RFPercentage(2)}}>No Events</Text>
                </Surface>
                <View style = {{width:'80%', aspectRatio:2, alignSelf:'center' }}>
                  <ImageBackground source = {require('../assets/chat_demo_blurred.png')} style={{width:'100%',height:'80%', justifyContent:'center', borderRadius:100}}>
                    <Button  buttonStyle={{
                      backgroundColor: 'rgba(111, 202, 186, 1)',
                      borderRadius: 5,
                      width: '20%',
                      alignSelf:'center',
                      justifySelf: 'center'
                    }}>Join</Button>
                    <Text style = {{textAlign:'center', fontWeight:'bold', color:'white', paddingTop:'2%',fontSize: RFPercentage(2)}}>Join to see chat</Text>
                  </ImageBackground>
                </View>
              </ScrollView>
            </SafeAreaView>
        );
      }

      else if(this.state.numEvents === 1){
        return(
            <SafeAreaView style={styles.container}>
              <ScrollView>
                <Surface
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
                      <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile', {memberId: memberIDs[0], isDefault:false})}>
                        <Image source = {{uri:memberImages[0]}} style = {styles.avatars}/>
                      </TouchableOpacity>
                      <Text style = {styles.memberName}>{memberNames[0]}</Text>
                    </View>
                    <View style = {{flex:1}}>
                      <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile', {memberId: memberIDs[1], isDefault:false})}>
                        <Image source = {{uri:memberImages[1]}} style = {styles.avatars}/>
                      </TouchableOpacity>
                      <Text style = {styles.memberName}>{memberNames[1]}</Text>
                    </View>
                    <View style = {{flex:1}}>
                      <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile',{memberId: memberIDs[2], isDefault:false})}>
                        <Image source = {{uri:memberImages[2]}} style = {styles.avatars}/>
                      </TouchableOpacity>
                      <Text style = {styles.memberName}>{memberNames[2]}</Text>
                    </View>
                    <View style = {{flex:1}}>
                      <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Members_Page',{groupId:GROUPID})}>
                        <Image source = {require('../assets/view-more.png')} style = {styles.avatars}/>
                      </TouchableOpacity>
                      <Text style = {styles.memberName}>View All</Text>
                    </View>
                  </View>
                </Surface>

                <Surface
                    elevation={20}
                    category="medium"
                    style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
                >
                  <Text style={{textAlign: 'center', paddingTop: '1%', paddingBottom:'1%', fontWeight:'bold', fontSize: RFPercentage(2)}}>Upcoming Events</Text>
                  <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>
                    <TouchableOpacity style = {{flex:1}} onPress={() => this.props.navigation.navigate('Start')}>
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
                <View style = {{width:'80%', aspectRatio:2, alignSelf:'center' }}>
                  <ImageBackground source = {require('../assets/chat_demo_blurred.png')} style={{width:'100%',height:'80%', justifyContent:'center', borderRadius:100}}>
                    <Button  buttonStyle={{
                      backgroundColor: 'rgba(111, 202, 186, 1)',
                      borderRadius: 5,
                      width: '20%',
                      alignSelf:'center',
                      justifySelf: 'center'
                    }}>Join</Button>
                    <Text style = {{textAlign:'center', fontWeight:'bold', color:'white', paddingTop:'2%',fontSize: RFPercentage(2)}}>Join to see chat</Text>
                  </ImageBackground>
                </View>
              </ScrollView>
            </SafeAreaView>
        );
      }

      return(
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <Surface
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
                    <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile',{memberId: memberIDs[0], isDefault:false})}>
                      <Image source = {{uri:memberImages[0]}} style = {styles.avatars}/>
                    </TouchableOpacity>
                    <Text style = {styles.memberName}>{memberNames[0]}</Text>
                  </View>
                  <View style = {{flex:1}}>
                    <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile', {memberId: memberIDs[1], isDefault:false})}>
                      <Image source = {{uri:memberImages[1]}} style = {styles.avatars}/>
                    </TouchableOpacity>
                    <Text style = {styles.memberName}>{memberNames[1]}</Text>
                  </View>
                  <View style = {{flex:1}}>
                    <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Member_Profile', {memberId: memberIDs[2], isDefault:false})}>
                      <Image source = {{uri:memberImages[2]}} style = {styles.avatars}/>
                    </TouchableOpacity>
                    <Text style = {styles.memberName}>{memberNames[2]}</Text>
                  </View>
                  <View style = {{flex:1}}>
                    <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Members_Page',{groupId:GROUPID})}>
                      <Image source = {require('../assets/view-more.png')} style = {styles.avatars}/>
                    </TouchableOpacity>
                    <Text style = {styles.memberName}>View All</Text>
                  </View>
                </View>
              </Surface>

              <Surface
                  elevation={20}
                  category="medium"
                  style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
              >
                <Text style={{textAlign: 'center', paddingTop: '1%', paddingBottom:'1%', fontWeight:'bold', fontSize: RFPercentage(2)}}>Upcoming Events</Text>
                <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>
                  <TouchableOpacity style = {{flex:1}} onPress={() => this.props.navigation.navigate('Start')}>
                    <Surface
                        elevation={6}
                        category={"medium"}
                        style={styles.eventTile}
                    >
                      <Text style = {styles.eventName}>{eventNames[0]}</Text>
                      <Text style = {styles.eventDetails}>{eventDates[0]} at {eventTimes[0]}</Text>
                    </Surface>
                  </TouchableOpacity>
                  <TouchableOpacity style = {{flex:1}} onPress={() => this.props.navigation.navigate('Start')}>
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
              <View style = {{width:'80%', aspectRatio:2, alignSelf:'center' }}>
                <ImageBackground source = {require('../assets/chat_demo_blurred.png')} style={{width:'100%',height:'80%', justifyContent:'center', borderRadius:100}}>
                  <Button  buttonStyle={{
                    backgroundColor: 'rgba(111, 202, 186, 1)',
                    borderRadius: 5,
                    width: '20%',
                    alignSelf:'center',
                    justifySelf: 'center'
                  }}>Join</Button>
                  <Text style = {{textAlign:'center', fontWeight:'bold', color:'white', paddingTop:'2%',fontSize: RFPercentage(2)}}>Join to see chat</Text>
                </ImageBackground>
              </View>
            </ScrollView>
          </SafeAreaView>
      );
    }
    return(<RenderedObject/>)
  }
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
  }
});