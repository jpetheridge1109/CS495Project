import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import About from './About';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SettingsPanel">
        <Stack.Screen name="SettingsPanel" component={SettingsPanel} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SettingsPanel({ navigation }) {
  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  const handleNotificationsPress = () => {
    console.log('Notifications button pressed');
  };

  const handleBlockedContactsPress = () => {
    console.log('Blocked Contacts button pressed');
  };

  const handleContactUsPress = () => {
    console.log('Contact Us button pressed');
  };

  const handleLogOutPress = () => {
    console.log('Log Out button pressed');
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
});
