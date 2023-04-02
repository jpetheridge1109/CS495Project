import React, {useEffect, useState} from "react";
import {findOne} from "../db";
import {
  ActivityIndicator, Image,
  SafeAreaView,
  ScrollView, StyleSheet, Text,
  TouchableOpacity,
  View
} from "react-native";
import {StatusBar} from "expo-status-bar";

/* NEXT STEPS:
-Add settings button to top bar
-Fix shadows
*/
let name = "";
let age = "";
let grade = "";
let major = "";
let aboutMe = "";
let interestIds = [];
let profilePic = "placeholder"
let interests = []


export default function ProfileOther({route, navigation}){

  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserId] = useState(global.userID);

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
      let response = await findOne("user", {"_id": {"$oid":memberId}});
      interestIds.length = 0;

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
            </View>

            <View style={styles.infoBackground}>
              <Text style={styles.nameFont}>About Me:</Text>
              <Text style={styles.bodyFontBottom}>{aboutMe}</Text>
            </View>

            <View style={styles.infoBackground}>
              <Text style={styles.nameFont}>Interests:</Text>

              <TouchableOpacity style={styles.interestBox}>
                <Image source={require('../assets/bike.png')} style={styles.interestPic}></Image>
                <Text style={styles.interestFont}>Mountain Biking</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.interestBox}>
                <Image source={require('../assets/musical-note.png')} style={styles.interestPic}></Image>
                <Text style={styles.interestFont}>Music</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.interestBox}>
                <Image source={require('../assets/camera.png')} style={styles.interestPic}></Image>
                <Text style={styles.interestFont}>Photography</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.interestBox}>
                <Image source={require('../assets/game-console.png')} style={styles.interestPic}></Image>
                <Text style={styles.interestFont}>Video Games</Text>
              </TouchableOpacity>

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
