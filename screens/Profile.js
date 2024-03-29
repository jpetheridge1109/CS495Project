import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView, ActivityIndicator, FlatList
} from 'react-native';
import {find, findOne} from "../db";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserProvider";

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

export default function Profile({navigation}){
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [grade, setGrade] = useState("");
  // const [major, setMajor] = useState("");
  // const [aboutMe, setAboutMe] = useState("");
  // const [profilePic, setProfilePic] = useState("place");
  // const [interestIds, seInterestIds] = useState([]);
  // const [interests, setInterests] = useState([]);
  const {state} = useContext(UserContext)
  // const [userID, setUserID] = useState(state.userID)



  const getInterestInfo = async (interestIds) => {
    let response;
    interests.length = 0
    for(let i = 0; i < interestIds.length; i++){
      response = await findOne("group", {"_id": {"$oid":interestIds[i]}});
      interests.push(response.document)
    }
  }

  useEffect(() => {
    console.log("updating...")
    let response;
    (async () => {
      response = await findOne("user", {"_id": {"$oid":state.userID}});
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

          <ScrollView overScrollMode={"auto"}>
            <TouchableOpacity style={styles.editBox} onPress={() => navigation.navigate('ProfileEditor')}>
              <Image source={require('../assets/profile_edit_icon.jpg')} style={styles.editPic}></Image>
              <Text style={styles.dmFont}>Edit Profile</Text>
            </TouchableOpacity>
            <Image source={{uri:state.profilePic}}
                   style={styles.profPic}></Image>

            <View style={styles.infoBackground}>
              <Text style={styles.nameFont}>{state.username}</Text>
              <Text style={styles.bodyFont}>Age: {state.age}</Text>
              <Text style={styles.bodyFont}>Grade: {state.grade}</Text>
              <Text style={styles.bodyFontBottom}>Major: {state.major}</Text>
            </View>

            <View style={styles.infoBackground}>
              <Text style={styles.nameFont}>About Me:</Text>
              <Text style={styles.bodyFontBottom}>{state.aboutMe}</Text>
            </View>

            <View style={styles.infoBackground}>
              <Text style={styles.nameFont}>Interests:</Text>
              {
                state.interests.map((item) => <Item item={item} key={item._id}/>)
              }
            </View>
          </ScrollView>
          <StatusBar style='auto'/>
        </View>
    )
  }
  const Item = ({item}) => {
    console.log("Hi")
    //console.log(item)
    return(
        <TouchableOpacity style={styles.interestBox}>
      <Image source={{uri:item.img}} style={styles.interestPic}></Image>
      <Text style={styles.interestFont}>{item.name}</Text>
    </TouchableOpacity>
    )
  }
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
    marginTop: 40,
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
