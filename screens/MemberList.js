import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';

import { Surface } from "@react-native-material/core";;
import {RFPercentage} from "react-native-responsive-fontsize";

const DATA = [
  {
    id: '1',
    name: 'Casey Miller',
    img: require('../assets/casey.png'),
  },
  {
    id: '2',
    name: 'Sandra Williams',
    img: require('../assets/sandra.png'),
  },
  {
    id: '3',
    name: 'Philip Jones',
    img: require('../assets/Philip.png'),
  }
];

export default class MemberList extends React.Component{
  render (){
    const Item = ({item}) => (
        <TouchableOpacity>
          <Surface
              elevation={20}
              category="medium"
              style={{ alignSelf: 'center', width: '80%', aspectRatio: 4, marginBottom: 20, borderRadius: 10}}
          >
            <View style={{flex: 1, flexDirection: "row"}}>
              <View style={{flex: 1, justifyContent:'center'}}>
                <Image
                    source= {item.img} style={styles.avatars}/>
              </View>
              <View style={{flex: 3, justifyContent:'center'}}>
                <Text style={styles.groupNameText}>{item.name}</Text>
                <Text style = {styles.description}>{item.description}</Text>
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
    );

    return(
        <SafeAreaView style={styles.container}>
          <Text style={styles.categories}>Members</Text>
          <FlatList
              data={DATA}
              renderItem={({item}) => <Item item={item}/>}
              keyExtractor={item => item.id}
          />
        </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
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
    //fontSize: '40%',
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
    height: '75%',
    aspectRatio:1,
    borderRadius: 10000,
    marginTop: '5%'
  },
  groupNameText:{
    textAlign: 'left',
    fontSize: RFPercentage(3),
    fontWeight:'bold'
  },
  memberCount: {
    textAlign:'center',
    paddingTop: '2%',
    //fontSize:'20%',
    color: '#999191',
    fontWeight:'bold'
  },
  description:{
    paddingLeft:'2%',
    //fontSize: '20%',
    color: '#999191'
  }
});