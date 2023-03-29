import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const grades = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'Doctoral'];

export default function ProfSet_Details({ route }) {
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [major, setMajor] = useState('');
  const [ageError, setAgeError] = useState('');
  const [gradeError, setGradeError] = useState('');
  const [majorError, setMajorError] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const { firstName, lastName, email, password } = route.params;

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

  const handleNext = () => {
    let isValid = true;

    if(!isInt(age) || age < 10 || age > 99) {
      setAgeError('Please input a valid age');
      isValid = false;
    } else {
      setAgeError('');
    }

    if (!selectedOption) {
      setGradeError('Please select your grade');
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
        image,
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (pickerResult.canceled === true) {
      return;
    }

    setImage(pickerResult.assets[0].uri);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile Setup: Details</Text>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Select a profile picture</Text>
          )}
        </TouchableOpacity>
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
          placeholder="Major"
          onChangeText={setMajor}
          value={major}
        />
        {majorError ? (<Text style={styles.error}>{majorError}</Text>) : null}
        <TouchableOpacity style={styles.input} onPress={() => setShowOptions(!showOptions)}>
          <Text style={styles.inputText}>{selectedOption || 'Select a Grade'}</Text>
        </TouchableOpacity>
        {showOptions && (
          <View style={styles.optionsContainer}>
            {grades.map((grade) => (
              <TouchableOpacity key={grade} style={styles.option} onPress={() => handleOptionPress(grade)}>
                <Text>{grade}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {gradeError ? (<Text style={styles.error}>{gradeError}</Text>) : null}
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  imagePlaceholder: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    position: 'absolute',
    flex: 1,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: 200,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    paddingVertical: 5,
  },
  inputText: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
