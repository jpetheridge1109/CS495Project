import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfSet_AboutMe({ route }) {
  const [aboutMe, setAboutMe] = useState('');
  const navigation = useNavigation();
  const { firstName, lastName, email, password, age, grade, major } = route.params;

  const handleNext = () => {
    Alert.alert('Are you sure you finished setting up your profile?','',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('Find a Group')
          //Send all variables to DB here
        }
      ],
      { cancelable: false }
    );
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
});
