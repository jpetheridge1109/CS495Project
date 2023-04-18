import React, {useContext, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {findOne, insertOne} from "../db";
import {UserContext} from "../context/UserProvider";

let interests = [];
export default function ProfSet_AboutMe({ route }) {
  const [aboutMe, setAboutMe] = useState('');
  const [aboutMeError, setAboutMeError] = useState('');
  const navigation = useNavigation();
  const { firstName, lastName, email, password, age, grade, major, image } = route.params;
  const { dispatch } = useContext(UserContext);

  const getInterestInfo = async (interestIds) => {
    let response;
    interests.length = 0
    for(let i = 0; i < interestIds.length; i++){
      response = await findOne("group", {"_id": {"$oid":interestIds[i]}});
      interests.push(response.document)
    }
  }

  const sendToDB = async () => {
    console.log(image);
    let object =
        {
          "fname": firstName,
          "lname": lastName,
          "email": email,
          "password": password,
          "bio": aboutMe,
          "groups": [],
          "events": [],
          "img": image,
          "age": age,
          "class":grade,
          "major":major,
        }
    await insertOne('user', object);
    const response = await findOne('user',{"email": email.toLowerCase(), "password": password})
    if(response.document == null){
      console.log("Invalid username or password");
    }
    else{
      console.log( response.document._id + " logged in")

      await getInterestInfo(response.document.groups)
      dispatch({ type: 'EDIT_USER', payload: {
          username: response.document.fname + " " + response.document.lname,
          age:response.document.age,
          grade: response.document.class,
          major: response.document.major,
          aboutMe: response.document.bio,
          interestIds: response.document.groups,
          profilePic: response.document.img,
          interests:interests,
          userID: response.document._id},
      })
    }

    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('Find a Group')

  }
  const handleNext = () => {
    let isValid = true;

    if(!aboutMe) {
      setAboutMeError('Please input a description');
      isValid = false;
    } else {
      setAboutMeError('');
    }

    if(isValid) {
      Alert.alert('Are you sure you finished setting up your profile?','',
        [
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => sendToDB()
            //Send all variables to DB here

          }
        ],
        { cancelable: false }
      );
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile Setup: About Me</Text>
        <TextInput
          style={styles.input}
          placeholder="Tell us about yourself..."
          multiline
          onChangeText={setAboutMe}
          value={aboutMe}
        />
        {aboutMeError ? (<Text style={styles.error}>{aboutMeError}</Text>) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: -160,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
