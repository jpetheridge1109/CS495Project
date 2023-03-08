import { StyleSheet, Text, View, Pressable, Modal, Alert } from 'react-native';
import React, {useState} from 'react';

export default function RSVPList(){
    return(
        <View style = {styles.container}>
            <Text style = {styles.textStyle}>TESTING TESTING TESTING</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      verticalAlign: 'center',
      margin: 0,
      backgroundColor: 'white',
      borderRadius: 0,
      padding: 35,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    buttonYes: {
      backgroundColor: "#1eb76a",
    },
    buttonCancel: {
      backgroundColor: "#b51f30",
    },
    buttonRSVP: {
      backgroundColor: '#DA8E12',
      justifyContent: 'flex-start',
      flex: 1,
      marginHorizontal: 10,
    },
    buttonViewPpl: {
      backgroundColor: '#DA8E12',
      justifyContent: 'flex-end',
      flex: 1,
      marginHorizontal: 10,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    modalLeftText: {
      flex: 1,
      marginBottom: 15,
      textAlign: 'left',
      justifyContent: 'flex-start',
    },
    modalRightText: {
      flex: 1,
      marginBottom: 15,
      textAlign: 'right',
      justifyContent: 'flex-end',
    },
  });