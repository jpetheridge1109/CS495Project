import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

import { Surface } from "@react-native-material/core";;
import {RFPercentage} from "react-native-responsive-fontsize";
import {findOne} from "../db";

let DATA = [];
export default class MemberList extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }
  async getMemberInfo(membersArray){
    let response;
    DATA.length = 0;
    for(let i = 0; i < membersArray.length; i++){
      response = await findOne("user", {"_id": {"$oid":membersArray[i]}});
      DATA.push(response.document)
    }
  }


  async componentDidMount() {
    this.setState({isLoading: true});      //update screen after data retrieval
    const {groupId} = this.props.route.params
    const response = await findOne("group", {"_id": {"$oid":groupId}});
    let memberIDs = response.document.members;
    await this.getMemberInfo(memberIDs)
    this.setState({isLoading: false});      //update screen after data retrieval
  }
  render (){
    const RenderedObject = () => {
      if (this.state.isLoading) {
        return <SafeAreaView style={styles.container}>
          <Text style={styles.categories}>Members</Text>
          <View>
            <ActivityIndicator  size='large' color="#00ff00" />
          </View>
        </SafeAreaView>
      }

      return(
          <SafeAreaView style={styles.container}>
            <Text style={styles.categories}>Members</Text>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item item={item}/>}
                keyExtractor={item => item.id}
            />
          </SafeAreaView>
      )
    }

    const Item = ({item}) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Member_Profile', {memberId: item._id, isDefault:false})}>
          <Surface
              elevation={20}
              category="medium"
              style={{ alignSelf: 'center', width: '80%', aspectRatio: 4, marginBottom: 20, borderRadius: 10}}
          >
            <View style={{flex: 1, flexDirection: "row"}}>
              <View style={{flex: 1, justifyContent:'center'}}>
                <Image
                    source= {{uri:item.img}} style={styles.avatars}/>
              </View>
              <View style={{flex: 3, justifyContent:'center'}}>
                <Text style={styles.groupNameText}>{item.fname} {item.lname}</Text>
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
    );


    return (
        <RenderedObject/>
    )
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
  },
  activityIndicator:{
    alignSelf: 'center'
  }
});