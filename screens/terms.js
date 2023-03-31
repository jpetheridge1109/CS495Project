import React, { component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview'

const TermsWebView = () => {
    return (
        <View style={styles.container}>
        <WebView
            style={{ flex: 1, marginTop: 20 }}
            originWhitelist={['*']}
            source={require('../external/termsAndConditions.html')}
            javaScriptEnabled={true}
            domStorageEnabled={true}                
        />
        </View>
    )
}

export default function Terms() {
    return (
        <View style={styles.container}>
        <WebView
            style={{ flex: 1, marginTop: 20 }}
            originWhitelist={['*']}
            source={require('../external/termsAndConditions.html')}
            javaScriptEnabled={true}
            domStorageEnabled={true}                
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})

