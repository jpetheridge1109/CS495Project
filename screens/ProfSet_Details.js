import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfSet_Details() {
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [major, setMajor] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('Find a Group');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Setup: Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        onChangeText={setAge}
        value={age}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Grade"
        onChangeText={setGrade}
        value={grade}
      />
      <TextInput
        style={styles.input}
        placeholder="Major"
        onChangeText={setMajor}
        value={major}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
});
