import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from "react";

let firstName = 'First';
let lastName = 'Last';
let age = 0;
let grade = 'Grade'
let major = 'Major';
let aboutMe = 'n/a';
let interests = []

export default function ProfileEditor() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={require('../assets/profile_picture_demo.jpg')} style={styles.profPic}></Image>

        <View style={styles.infoBackground}>
          <Text style={styles.nameFont}>{firstName} {lastName}</Text>
          <Text style={styles.bodyFont}>Age: {age}</Text>
          <Text style={styles.bodyFont}>Grade: {grade}</Text>
          <Text style={styles.bodyFontBottom}>Major: {major}</Text>
        </View>

        <View style={styles.infoBackground}>
          <Text style={styles.nameFont}>About Me:</Text>
          <Text style={styles.bodyFontBottom}>{aboutMe}</Text>
        </View>

        <View style={styles.infoBackground}>
        </View>
      </ScrollView>
      <StatusBar style='auto'/>
    </View>
  );
}

//Code that is for the container and for formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344e71',
    //alignItems: 'center',
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
    backgroundColor: '#ffffff', //'#e6e6e6',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center'
  },
  dmBox: {
    backgroundColor: '#e6e6e6', //'#cccccc',
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    //width: '95%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  interestBox: {
    backgroundColor: '#e6e6e6', //'#cccccc',
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
    //borderRadius: 10,
    //alignSelf:'center',
    width: 50,
    aspectRatio: 1,
    borderWidth: 5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  interestPic: {
    //height: 50,
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
});
