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

import { Surface } from "@react-native-material/core";
import { Divider } from '@rneui/themed';
import {RFPercentage} from "react-native-responsive-fontsize";


// const DATA = [
//   {
//     id: '1',
//     name: 'Mountain Biking',
//     img: require('../assets/bike.png'),
//     numMembers: 20,
//     description: 'We organize group rides for mountain and gravel biking in Tuscaloosa. We typically meet at Sokol Park on the weekends. All skill levels are welcome!'
//   },
//   {
//     id: '2',
//     name: 'French Students at UA',
//     img: require('../assets/Flag_of_France.png'),
//     numMembers: 32,
//     description: 'We are French Students currently studying abroad at UA. We know life abroad can be stressful, so our goal is to help other French students find new friends on the other side of the pond. Come join us to eat, play, and have fun!'
//   },
//   {
//     id: '3',
//     name: 'Monopoly',
//     img: require('../assets/monopoly.png'),
//     numMembers: 15,
//     description: 'Like playing Monopoly? If so, this group is for you. We organize game nights and tournaments every week!'
//   }
// ];
let DATA = [];

export default class InterestCategory extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }
  async getCategory(category) {
    try {
      const response = await fetch('https://us-east-2.aws.data.mongodb-api.com/app/data-upeqz/endpoint/data/v1/action/find',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': 'ujz8gEvjLM3N0sxoWZ40g8S9rvmNxsGAutAbFrNv3ZIJA8Fje7rYsRzyWMLPcQUn',
          Accept: 'application/json',
          'User-Agent': 'PostmanRuntime/7.31.1',
          Host: 'us-east-2.aws.data.mongodb-api.com',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
        },
        body: JSON.stringify({
          dataSource: "CS495",
          database: "db",
          collection: "group",
          filter: { "category": category}
        }),
      });
      const json = await response.json();
      DATA = json.documents;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  }

  componentDidMount() {
    const {categoryName} = this.props.route.params
    console.log(categoryName);
    this.getCategory(categoryName);
  }

  render (){
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
         <SafeAreaView style={styles.container}>
           <Text style={styles.categories}>Groups</Text>
           <FlatList
               data={DATA}
               renderItem={({item}) => <Item item={item}/>}
               keyExtractor={item => item._id}
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