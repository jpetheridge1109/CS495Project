import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image, ActivityIndicator
} from 'react-native';

import { Surface } from "@react-native-material/core";
import { Divider } from '@rneui/themed';
import {RFPercentage} from "react-native-responsive-fontsize";
import {find} from '../db.js'
import { useContext } from "react";
import { UserContext } from "../context/UserProvider"
let DATA = [];

export default function MyGroups({route, navigation}){
  //states
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useContext(UserContext);
  console.log(state.userID);
  useEffect( () => {
    (async () => {
      let response = await find("group", { "members": { "$in" : [{"$oid": state.userID}]} });
      DATA = response.documents;
      setIsLoading(false);      //update screen after data retrievalrr
    })();
  });

  const RenderedObject = () => {
    if (isLoading) {
      return <SafeAreaView style={styles.container}>
        <Text style={styles.categories}>My Groups</Text>
        <View>
          <ActivityIndicator  size='large' color="#00ff00" />
        </View>
      </SafeAreaView>
    }

    return(
        <SafeAreaView style={styles.container}>
          <Text style={styles.categories}>My Groups</Text>
          <FlatList
              data={DATA}
              renderItem={({item}) => <Item item={item}/>}
              keyExtractor={item => item._id}
          />
        </SafeAreaView>
    )
  }

  const Item = ({item}) => (
      <TouchableOpacity onPress={() => navigation.navigate('Interest_Home_Page',{groupId:item._id})}>
        <Surface
            elevation={20}
            category="medium"
            style={{ alignSelf: 'center', width: '90%', aspectRatio: 2, marginBottom: 20, borderRadius: 10}}
        >
          <View style={{flex: 1, flexDirection: "row"}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Image
                  source= {{uri:item.img}} style={styles.avatars}/>
              <Text style={styles.memberCount}>{item.members.length} members</Text>
            </View>
            <Divider orientation = 'vertical' width = {2}/>
            <View style={{flex: 3}}>
              <Text style={styles.groupNameText}>{item.name}</Text>
              <Text style = {styles.description}>{item.description}</Text>
            </View>
          </View>
        </Surface>
      </TouchableOpacity>
  );
  return(
      <RenderedObject/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#344e71'
  },
  item: {
    width: '35%',
    aspectRatio: 1,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius:30,
    justifyContent: 'center'
  },
  categories:{
    paddingTop: 20,
    textAlign: 'center',
    fontSize: RFPercentage(5),
    color: '#e9dfdf',
    paddingBottom:20
  },
  text:{
    paddingTop: '2%',
    pattingBottom: '2%',
    textAlign: 'center',
    color: '#343333',
  },
  image:{
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center'
  },
  avatars:{
    alignSelf: 'center',
    justifySelf: 'center',
    height: '45%',
    aspectRatio:1,
    borderRadius: 10000,
    marginTop: '5%'
  },
  groupNameText:{
    alignSelf: 'center',
    fontSize: RFPercentage(3),
    fontWeight:'bold'
  },
  memberCount: {
    alignSelf:'center',
    paddingTop: '2%',
    fontSize: RFPercentage(2),
    color: '#999191',
    fontWeight:'bold'
  },
  description:{
    paddingLeft:'2%',
    paddingRight:'2%',
    fontSize: RFPercentage(2),
    color: '#999191',
  }
});

