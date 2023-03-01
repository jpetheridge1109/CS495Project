// About.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About</Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <Text style={styles.attribute}>Name: John Doe</Text>
        <Text style={styles.attribute}>Email: john.doe@example.com</Text>
        <Text style={styles.attribute}>Password: ********</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>App Information</Text>
        <Text style={styles.attribute}>OS Version: iOS 15.2</Text>
        <Text style={styles.attribute}>Terms and Conditions: Accept</Text>
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
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  attribute: {
    fontSize: 24,
    marginBottom: 10,
  },
});
