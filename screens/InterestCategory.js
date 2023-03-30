import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image, ActivityIndicator
} from 'react-native';

import { Surface } from "@react-native-material/core";
import { Divider } from '@rneui/themed';
import {RFPercentage} from "react-native-responsive-fontsize";
import {find} from '../db.js'
let DATA = [];

export default class InterestCategory extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});      //update screen after data retrieval
    const {categoryName} = this.props.route.params
    console.log(categoryName);
    const response = await find("group", { "category": categoryName});
    DATA = response.documents;
    this.setState({isLoading: false});      //update screen after data retrieval
  }

  render (){
    const RenderedObject = () => {
      if (this.state.isLoading) {
        return <SafeAreaView style={styles.container}>
          <Text style={styles.categories}>Groups</Text>
          <View>
            <ActivityIndicator  size='large' color="#00ff00" />
          </View>
        </SafeAreaView>
      }

      return(
          <SafeAreaView style={styles.container}>
            <Text style={styles.categories}>Groups</Text>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item item={item}/>}
                keyExtractor={item => item._id}
            />
          </SafeAreaView>
      )
    }
    const Item = ({item}) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Interest_Home_Page',{groupId:item._id})}>
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