
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfSet_Details({ route }) {
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [major, setMajor] = useState('');
  const [ageError, setAgeError] = useState('');
  const [gradeError, setGradeError] = useState('');
  const [majorError, setMajorError] = useState('');
  const navigation = useNavigation();
  const { firstName, lastName, email, password } = route.params;

  const handleNext = () => {
    let isValid = true;

    if(age < 10 || age > 99) {
      setAgeError('Please input a valid age');
      isValid = false;
    } else {
      setAgeError('');
    }

    if (!grade) {
      setGradeError('Please input your grade');
      isValid = false;
    } else {
      setGradeError('');
    }

    if (!major) {
      setMajorError('Please input your major');
      isValid = false;
    } else {
      setMajorError('');
    }

    if(isValid) {
      navigation.navigate('About Me', {
        firstName: JSON.stringify(firstName),
        lastName: JSON.stringify(lastName),
        email: JSON.stringify(email),
        password: JSON.stringify(password),
        age,
        grade,
        major,
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile Setup: Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
        />
        {ageError ? (<Text style={styles.error}>{ageError}</Text>) : null}
        <TextInput
          style={styles.input}
          placeholder="Grade"
          onChangeText={setGrade}
          value={grade}
        />
        {gradeError ? (<Text style={styles.error}>{gradeError}</Text>) : null}
        <TextInput
          style={styles.input}
          placeholder="Major"
          onChangeText={setMajor}
          value={major}
        />
        {majorError ? (<Text style={styles.error}>{majorError}</Text>) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
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
