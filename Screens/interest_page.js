import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity, Image
} from 'react-native';

import { Surface } from "@react-native-material/core";

const DATA = [
  {
    id: '1',
    color: '#9285ef',
    name: 'Mountain Biking',
    img: require('../assets/bike.png'),
    numMembers: 20,
    description: 'We organize group rides for mountain and gravel biking in Tuscaloosa. We typically meet at Sokol Park on the weekends. All skill levels are welcome!'
  },
  {
    id: '2',
    color: '#76a9f8',
    name: 'French Students at UA',
    img: require('../assets/Flag_of_France.png'),
    numMembers: 32,
    description: 'We are French Students currently studying abroad at UA. We know life abroad can be stressful, so our goal is to help other French students find new friends on the other side of the pond. Come join us to eat, play, and have fun!'
  },
  {
    id: '3',
    color: '#f8d4b2',
    name: 'Monopoly',
    img: require('../assets/monopoly.png'),
    numMembers: 15,
    description: 'Like playing Monopoly? If so, this group is for you. We organize game nights and tournaments every week!'
  }
];

const Item = ({item}) => (
    <TouchableOpacity >
      <Surface
          elevation={20}
          category="medium"
          style={{ alignSelf: 'center', width: '90%', aspectRatio: 5, marginBottom: 20, borderRadius: 10}}
      >
      </Surface>
    </TouchableOpacity>

);


export default class Interest_page extends React.Component{
  render (){
    return(
        <SafeAreaView style={styles.container}>
          <Text style={styles.categories}>Groups</Text>
            <Surface
                elevation={20}
                category="medium"
                style={{ alignSelf: 'center', width: '70%', aspectRatio: 1.5, marginBottom: 20, borderRadius: 10}}
            >
              <Image
              source = {require('../assets/bike.png')}
              style = {styles.groupPic}/>
              <Text style = {styles.text}>Mountain Biking</Text>
              <Text style = {styles.groupDetails}>Created March 18, 2020     32 Members</Text>
              <Text style = {styles.description}>We organize group rides for mountain and gravel biking in Tuscaloosa. We typically meet at Sokol Park on the weekends. All skill levels are welcome!</Text>
            </Surface>

          <Surface
              elevation={20}
              category="medium"
              style={{ alignSelf: 'center', width: '90%', aspectRatio: 6, marginBottom: 20, borderRadius: 10}}
          >
            <View style={{flex: 1, flexDirection: "row", justifyContent: 'left', paddingRight:'20%'}}>
              <View style = {{flex:1}}>
                <Image source = {require('../assets/avatar.png')} style = {styles.avatars}/>
              </View>
              <View style = {{flex:1}}>
                <Image source = {require('../assets/avatar.png')} style = {styles.avatars}/>
              </View>
              <View style = {{flex:1}}>
                <Image source = {require('../assets/avatar.png')} style = {styles.avatars}/>
              </View>
              <View style = {{flex:1}}>
                <Image source = {require('../assets/avatar.png')} style = {styles.avatars}/>
              </View>
              <View style = {{flex:1}}>
                <Image source = {require('../assets/avatar.png')} style = {styles.avatars}/>
              </View>
            </View>

          </Surface>
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
    alignSelf: 'center',
    justifySelf: 'center',
    height: '80%',
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
  }
});