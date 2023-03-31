import React, { component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview'

const PrivacyWebView = () => {
    return (
        <View style={styles.container}>
        <WebView
            style={{ flex: 1, marginTop: 20 }}
            originWhitelist={['*']}
            source={require('../external/privacy.html')}
            javaScriptEnabled={true}
            domStorageEnabled={true}                
        />
        </View>
    )
}

export default function Privacy(){
    return (
        <View style={styles.container}>
        <WebView
            style={{ flex: 1, marginTop: 20 }}
            originWhitelist={['*']}
            source={require('../external/privacy.html')}
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

