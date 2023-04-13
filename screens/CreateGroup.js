import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function CreateGroup() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleCreateGroup = () => {
    navigation.navigate('Find a Group');
    console.log(name, description, image);
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
        <Text style={styles.heading}>Create Group</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Group Name</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter group name"
            value={name}
            onChangeText={setName}
            />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter group description"
            value={description}
            onChangeText={setDescription}
            multiline
            />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Group Image</Text>
            <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={pickImage}
            >
            {image ? (
                <Image style={styles.image} source={{ uri: image.uri }} />
            ) : (
                <Text style={styles.imageUploadText}>Choose an image</Text>
            )}
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
            <Text style={styles.createButtonText}>Create Group</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  imageUploadButton: {
    width: '100%',
    height: 200,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUploadText: {
    fontSize: 16,
    color: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 4,
  },
  createButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
