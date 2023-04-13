import React, {useContext, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfSetName from './screens/ProfSet_Name.js'
import ProfSetDetails from './screens/ProfSet_Details.js'
import ProfSetAboutMe from './screens/ProfSet_AboutMe.js'
import {findOne, insertOne} from "./db";
import {AppContext} from "./AppContext";

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
  const [loginError, setLoginError] = useState(false); // added state variable
  const navigation = useNavigation();

  const handleLogin = async () => {
    // After the login is successful, navigate to the home screen.
    const response = await findOne('user',{"email": email.toLowerCase(), "password": password})
    if(response.document == null){
      setLoginError(true); // show the error message
      console.log("Invalid username or password");
    }
    else{
      //const {userID, setUserID} = useContext(AppContext)
      const user = response.document._id;
      global.userID = user;
      console.log("User " + user + " successfully logged in")
      navigation.navigate('Find a Group', {user:user});
    }
    // let object =
    //     {
    //       "name": "John Sample",
    //       "age": 42
    //     }
    // const insertResponse = await insertOne('user_test', object);
    // console.log(insertResponse);
  };

  const handleSignIn = () => {
    navigation.navigate('Name');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        {loginError && ( // show the error message if loginError is true
          <Text style={styles.errorText}>Incorrect Username or Password, Please Try Again!</Text>
        )}
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signupLink}>Sign up here</Text>
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
  errorText: {
    color: 'red',
    marginTop: 30,
  },
});
