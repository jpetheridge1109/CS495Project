import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity, Image, ScrollView, ImageBackground
} from 'react-native';

import { Surface } from "@react-native-material/core";
import { Button } from '@rneui/themed';

export default class Interest_page extends React.Component{
  render (){
    return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Surface
                elevation={20}
                category="medium"
                style={{ alignSelf: 'center', width: '70%', aspectRatio: 1.5, marginBottom: 20, borderRadius: 10}}
            >
              <Image
                  source = {require('../assets/bike.png')}
                  style = {styles.groupPic}/>
              <Text style = {styles.text}>Mountain Biking</Text>
              <Text style = {styles.groupDetails}>Created March 18, 2020</Text>
              <Text style = {styles.description}>We organize group rides for mountain and gravel biking in Tuscaloosa. We typically meet at Sokol Park on the weekends. All skill levels are welcome!</Text>
            </Surface>

            <Surface
                elevation={20}
                category="medium"
                style={{ alignSelf: 'center', width: '90%', aspectRatio: 6, marginBottom: 20, borderRadius: 10}}
            >
              <Text style = {{paddingLeft:'3%', paddingBottom:'1%', fontSize:'15%',fontWeight:'bold'}}>Members: 32</Text>
              <View style={{flex: 1, flexDirection: "row", alignContent: 'space-between'}}>
                <View style = {{flex:1}}>
                  <TouchableOpacity style = {styles.memberTouchable}>
                    <Image source = {require('../assets/casey.png')} style = {styles.avatars}/>
                  </TouchableOpacity>
                  <Text style = {styles.memberName}>Casey</Text>
                </View>
                <View style = {{flex:1}}>
                  <TouchableOpacity style = {styles.memberTouchable}>
                    <Image source = {require('../assets/sandra.png')} style = {styles.avatars}/>
                  </TouchableOpacity>
                  <Text style = {styles.memberName}>Sandra</Text>
                </View>
                <View style = {{flex:1}}>
                  <TouchableOpacity style = {styles.memberTouchable}>
                    <Image source = {require('../assets/Philip.png')} style = {styles.avatars}/>
                  </TouchableOpacity>
                  <Text style = {styles.memberName}>Philip</Text>
                </View>
                <View style = {{flex:1}}>
                  <TouchableOpacity style = {styles.memberTouchable}>
                    <Image source = {require('../assets/Rachel.png')} style = {styles.avatars}/>
                  </TouchableOpacity>
                  <Text style = {styles.memberName}>Rachel</Text>
                </View>
                <View style = {{flex:1}}>
                  <TouchableOpacity style = {styles.memberTouchable}>
                    <Image source = {require('../assets/john.png')} style = {styles.avatars}/>
                  </TouchableOpacity>
                  <Text style = {styles.memberName}>John</Text>
                </View>
                <View style = {{flex:1}}>
                  <TouchableOpacity style = {styles.memberTouchable} onPress={() => this.props.navigation.navigate('Members_Page')}>
                    <Image source = {require('../assets/view-more.png')} style = {styles.avatars}/>
                  </TouchableOpacity>
                  <Text style = {styles.memberName}>View All</Text>
                </View>
              </View>
            </Surface>

            <Surface
                elevation={20}
                category="medium"
                style={{ alignSelf: 'center', width: '90%', aspectRatio: 4, marginBottom: 20, borderRadius: 10}}
            >
              <Text style={{    textAlign: 'center', fontSize: '20%', paddingTop: '1%', paddingBottom:'1%', fontWeight:'bold'}}>Upcoming Events</Text>
              <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>
                <TouchableOpacity style = {{flex:1}}>
                  <Surface
                      elevation={6}
                      category={"medium"}
                      style={styles.eventTile}
                  >
                    <Text style = {styles.eventName}>MTB At Sokol Park</Text>
                    <Text style = {styles.eventDetails}>When: 3/10/2023 at 3:00pm </Text>
                    <Text style = {styles.eventDetails}>Location: Sokol Park</Text>
                    <Text style = {styles.eventDetails}>10 Members going</Text>
                  </Surface>
                </TouchableOpacity>
                <TouchableOpacity style = {{flex:1}}>
                  <Surface
                      elevation={6}
                      category={"medium"}
                      style={styles.eventTile}
                  >
                    <Text style = {styles.eventName}>Group Lunch</Text>
                    <Text style = {styles.eventDetails}>When: 3/11/2023 at 12:00pm </Text>
                    <Text style = {styles.eventDetails}>Location: Ferguson Center</Text>
                    <Text style = {styles.eventDetails}>5 Members going</Text>
                  </Surface>
                </TouchableOpacity>
                <TouchableOpacity style = {{flex:1}}>
                  <Surface
                      elevation={6}
                      category={"medium"}
                      style={styles.eventTile}
                  >
                    <Text style = {styles.eventName}>MTB At Oak Mountain</Text>
                    <Text style = {styles.eventDetails}>When: 3/15/2023 at 3:00pm </Text>
                    <Text style = {styles.eventDetails}>Location: Oak Mountain State Park</Text>
                    <Text style = {styles.eventDetails}>5 Members going</Text>
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
                <Text style = {{textAlign:'center', fontWeight:'bold', fontSize:'20%', color:'white', paddingTop:'2%'}}>Join to see chat</Text>
              </ImageBackground>
            </View>

          </ScrollView>

        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
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
    fontSize: '40%',
    color: '#343333',
    fontWeight:'bold'
  },
  description:{
    paddingTop:'2%',
    paddingLeft:'2%',
    paddingRight:'2%',
    fontSize: '18%',
    color: '#999191',
  },
  groupDetails:{
    textAlign: 'center',
    fontSize: '18%',
    fontWeight:'bold'
  },
  memberName:{
    textAlign: 'center',
    fontSize: '18%',
    paddingTop: '2%',
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
    fontSize:'15%'
  },
  eventName:{
    textAlign:'center',
    fontWeight:'bold',
    paddingBottom:'2%',
    fontSize:'18%'
}
});