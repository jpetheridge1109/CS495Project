// Displays the "BlockedContacts" screen within the Settings Page

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function BlockedContacts() {
  const [blockedContacts, setBlockedContacts] = useState(['John', 'Sarah', 'Mike']);

  const handleUnblockPress = (index) => {
    Alert.alert(
      'Are you sure you want to unblock this person?',
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const newBlockedContacts = [...blockedContacts];
            newBlockedContacts.splice(index, 1);
            setBlockedContacts(newBlockedContacts);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {blockedContacts.map((name, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity style={styles.unblockButton} onPress={() => handleUnblockPress(index)}>
            <Text style={styles.unblockButtonText}>Unblock</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  name: {
    fontSize: 24,
  },
  unblockButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  unblockButtonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
