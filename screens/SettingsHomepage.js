// Displays the main Settings page

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import About from './About';
import Notifications from './Notifications';
import BlockedContacts from './BlockedContacts';

const Stack = createStackNavigator();

export default function SettingsHomepage() {
  return (
      <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Blocked Contacts" component={BlockedContacts} />
      </Stack.Navigator>
  );
}

function Settings({ navigation }) {
  const [isLogOutConfirmationVisible, setIsLogOutConfirmationVisible] = useState(false);

  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications');
  };

  const handleBlockedContactsPress = () => {
    navigation.navigate('Blocked Contacts');
  };

  const handleContactUsPress = () => {
    Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScE462nOMYWvQZr8jyaXPhSEbOcJi4iOv3-sLpL27F_lL21eg/viewform?usp=sf_link');
  };

  const handleLogOutPress = () => {
    setIsLogOutConfirmationVisible(true);
  };

  const handleLogOutConfirmation = (confirmed) => {
    setIsLogOutConfirmationVisible(false);
    if (confirmed) {
      navigation.navigate("Login Page");
      console.log("User " + global.userID + " successfully logged out")
      global.userID = "";
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.subSection]}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAboutPress}>
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNotificationsPress}>
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleBlockedContactsPress}>
            <Text style={styles.buttonText}>Blocked Contacts</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.section, styles.subSection]}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleContactUsPress}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogOutPress}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
          {isLogOutConfirmationVisible && (
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={[styles.modalButton, styles.modalCancelButton]} onPress={() => handleLogOutConfirmation(false)}>
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.modalConfirmButton]} onPress={() => handleLogOutConfirmation(true)}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  section: {
    marginBottom: 20,
  },
  subSection: {
    flex: 1,
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalCancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalCancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },  
});
