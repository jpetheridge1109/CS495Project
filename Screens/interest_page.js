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
import { RFPercentage } from "react-native-responsive-fontsize";


export default class Test extends React.Component{
  render (){
    return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Surface
                elevation={20}
                category="medium"
                style={{ alignSelf: 'center', width: '80%', aspectRatio: 1, marginBottom: 20, borderRadius: 10}}
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
                style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
            >
              <Text style = {{paddingLeft:'3%', paddingBottom:'1%',fontWeight:'bold',fontSize: RFPercentage(2)}}>Members: 32</Text>
              <View style={{flex: 1, flexDirection: "row", alignContent: 'space-between'}}>
                <View style = {{flex:1}}>
                  <TouchableOpacity style = {styles.memberTouchable}>
                    <Image source = {require('../assets/casey.png')} style = {styles.avatars}/>
                  </TouchableOpacity>
                  <Text style = {styles.memberName}>Casey</Text>
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
                style={{ alignSelf: 'center', width: '90%', aspectRatio: 3, marginBottom: 20, borderRadius: 10}}
            >
              <Text style={{textAlign: 'center', paddingTop: '1%', paddingBottom:'1%', fontWeight:'bold', fontSize: RFPercentage(2)}}>Upcoming Events</Text>
              <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>
                <TouchableOpacity style = {{flex:1}}>
                  <Surface
                      elevation={6}
                      category={"medium"}
                      style={styles.eventTile}
                  >
                    <Text style = {styles.eventName}>MTB At Sokol Park</Text>
                    <Text style = {styles.eventDetails}>3/10/2023 at 3:00pm </Text>
                  </Surface>
                </TouchableOpacity>
                <TouchableOpacity style = {{flex:1}}>
                  <Surface
                      elevation={6}
                      category={"medium"}
                      style={styles.eventTile}
                  >
                    <Text style = {styles.eventName}>Group Lunch</Text>
                    <Text style = {styles.eventDetails}>3/11/2023 at 12:00pm </Text>
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
    paddingTop: '8%',
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