// Displays the "About" screen within the Settings Page

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview'

export default function About() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsAndConditionsPress = () => {
    <WebView
      style={{flex: 1, marginTop: 20}}
      originWhitelist={['*']}
      source={'./termsAndConditions.html'}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
    //Linking.openURL('./termsAndConditions.html');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About</Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <Text style={styles.attribute}>Name: John Doe</Text>
        <Text style={styles.attribute}>Email: john.doe@example.com</Text>
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordLabel}>Password:</Text>
          <TouchableOpacity
            style={styles.passwordToggleButton}
            onPress={togglePasswordVisibility}>
            <Text style={styles.passwordToggleLabel}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.attribute}>
          {showPassword ? 'password123' : '********'}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>App Information</Text>
        <Text style={styles.attribute}>OS Version: 1.0</Text>
        <TouchableOpacity onPress={handleTermsAndConditionsPress}>
          <Text style={[styles.attribute, styles.underline]}>Terms and Conditions</Text>
        </TouchableOpacity>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordLabel: {
    fontSize: 24,
    marginRight: 10,
  },
  passwordToggleButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 5,
  },
  passwordToggleLabel: {
    fontSize: 18,
    color: 'white',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
