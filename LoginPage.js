import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfSetName from './screens/ProfSet_Name.js'
import ProfSetDetails from './screens/ProfSet_Details.js'
import ProfSetAboutMe from './screens/ProfSet_AboutMe.js'
import {findOne} from "./db";

const Stack = createStackNavigator();

export default function LoginPage() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginHome} options = {{ headerTransparent: true, headerTitle:''}}/>
        <Stack.Screen name="Name" component={ProfSetName} options = {{ headerTransparent: true, headerTitle:''}}/>
        <Stack.Screen name="Details" component={ProfSetDetails} options = {{ headerTransparent: true, headerTitle:''}}/>
        <Stack.Screen name="About Me" component={ProfSetAboutMe} options = {{ headerTransparent: true, headerTitle:''}}/>
      </Stack.Navigator>
  );
}

function LoginHome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // After the login is successful, navigate to the home screen.
    const response = await findOne('user',{"email": email.toLowerCase(), "password": password})
    if(response.document == null){
      console.log("Invalid username or password");
    }
    else{
      const userID = response.document._id;
      global.userID = userID;
      console.log("User " + userID + " successfully logged in")
      navigation.navigate('Find a Group', {userID:userID});
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Name');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signupLink}>Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
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
  signupTextContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
