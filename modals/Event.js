import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Modal, Alert } from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RSVPList from '../screens/RSVPList';

const Stack = createStackNavigator();

export default function Event() {
  return(
      <Stack.Navigator initialRouteName = "Start">
        <Stack.Screen name = "Start" component = {Start}/>
        <Stack.Screen name = "RSVP List" component = {RSVPList}/>
      </Stack.Navigator>
  );
}
function Start({navigation}){
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const handleRSVPListPress = () => {
    setEventModalVisible(false);
    navigation.navigate('RSVP List');
  };

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

  return (
      <View style={styles.container}>
        <Modal
            animationType = "fade"
            transparent = {true}
            visible = {eventModalVisible}
            onRequestClose = {() => {
              Alert.alert('Modal has been closed.');
              setEventModalVisible(!eventModalVisible)
            }}>
          <View style = {styles.modalWrapper}>
            <View style = {styles.modalView}>
              <Text style = {styles.modalText}>Event Name</Text>
              <View style = {{flexDirection: 'row', marginBottom: 20}}>
                <Text style = {styles.modalLeftText}>Date of Event</Text>
                <Text style = {styles.modalRightText}>Place of Event</Text>
              </View>
              <View style = {{flexDirection: 'row', marginBotom: 20}}>
                <Text style = {styles.modalLeftText}>Time of Event</Text>
                <Text style = {styles.modalRightText}>Event Organizer</Text>
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
                  onPress = {() => setEventModalVisible(!eventModalVisible)}>
                <Text style = {styles.textStyle}>Hide This Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
            style = {[styles.button, styles.buttonOpen]}
            onPress = {() => setEventModalVisible(true)}>
          <Text style = {styles.textStyle}>This would be an event to click on</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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