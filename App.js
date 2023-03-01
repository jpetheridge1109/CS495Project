import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Modal, Alert } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [RSVPModalVisible, setRSVPModalVisible] = useState(false);
  const [ViewPPlModalVisible, setViewPplModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType = "fade"
        transparent = {true}
        visible = {eventModalVisible}
        onModalHide = {() => {
          console.debug('hello');
        }}
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
                  onPress = {
                    () => {setEventModalVisible(!eventModalVisible); setRSVPModalVisible(true)}
                  }>
                  <Text style = {styles.textStyle}>RSVP</Text>
                </Pressable>
                <Pressable style = {[styles.button, styles.buttonViewPpl]}
                  onPress = {
                    () => {setViewPplModalVisible(true); setEventModalVisible(!eventModalVisible)}
                  }>
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
      <Modal
        animationType = "fade"
        transparent = {true}
        visible = {RSVPModalVisible}
        onRequestClose = {() => {
          Alert.alert('Modal has been closed.');
          setRSVPModalVisible(!RSVPModalVisible)
        }}>
        <View style = {styles.modalWrapper}>
          <Text style = {styles.textStyle}>Would you like to RSVP for this event?</Text>
          <View style = {{flexDirection: 'row', marginBottom: 20}}>
            <Pressable style = {[styles.button, styles.buttonYes]}
              onPress = {
                () => {setRSVPModalVisible(!RSVPModalVisible); setEventModalVisible(!eventModalVisible)}
                //ADD FUNCTION TO CONFIRM RSVP FOR ACCOUNT TO THIS EVENT
              }>
            <Text style = {styles.textStyle}>Confirm RSVP</Text>
            </Pressable>
            <Pressable style = {[styles.button, styles.buttonCancel]}
              onPress = {
                () => {setRSVPModalVisible(!RSVPModalVisible); setEventModalVisible(!eventModalVisible)}
              }>
              <Text style = {styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>  
      </Modal>
      <Modal
        animationType = "fade"
        transparent = {true}
        visible = {ViewPPlModalVisible}
        onRequestClose = {() => {
          Alert.alert('Modal has been closed.');
          setRSVPModalVisible(!ViewPPlModalVisible)
        }}>
        <View style = {styles.modalWrapper}>
          <Text style = {styles.textStyle}>Below is a list of people</Text>
          <Pressable style = {[styles.button, styles.buttonCancel]}
            onPress = {
              () => {setViewPplModalVisible(!ViewPPlModalVisible); setEventModalVisible(!eventModalVisible)}
            }>
          <Text style = {styles.textStyle}>Close People RSVP'ed</Text>
          </Pressable>
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