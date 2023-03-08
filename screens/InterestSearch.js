import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RFPercentage} from "react-native-responsive-fontsize";

const DATA = [
  {
    id: '1',
    color: '#9285ef',
    name: 'Sports',
    img: require('../assets/balls-sports.png')
  },
  {
    id: '2',
    color: '#76a9f8',
    name: 'Video Games',
    img: require('../assets/game-console.png')
  },
  {
    id: '3',
    color: '#f8d4b2',
    name: 'Food',
    img: require('../assets/diet.png')
  },
  {
    id: '4',
    color: '#6fd6d3',
    name: 'Music',
    img: require('../assets/musical-note.png')
  },
  {
    id: '5',
    color: '#fb8ba4',
    name: 'Pets',
    img: require('../assets/pets.png')
  },
  {
    id: '6',
    color: '#da8cf1',
    name: 'Shopping',
    img: require('../assets/shopping-cart.png')
  },
  {
    id: '7',
    color: '#2ed38f',
    name: 'Workout',
    img: require('../assets/dumbbell.png')
  },
  {
    id: '8',
    color: '#e58b8a',
    name: 'Academic',
    img: require('../assets/education.png')
  },
  {
    id: '9',
    color: '#a5def9',
    name: 'Reading',
    img: require('../assets/read.png')
  },
  {
    id: '10',
    color: '#c1b4be',
    name: 'Volunteering',
    img: require('../assets/help.png')
  },
  {
    id: '11',
    color: '#baffc9',
    name: 'Outdoors',
    img: require('../assets/outdoors.png')
  },
  {
    id: '12',
    color: '#FAFFC7',
    name: 'LQBTQ+',
    img: require('../assets/progress.png')
  },
  {
    id: '13',
    color: '#FD8A8A',
    name: 'International',
    img: require('../assets/earth.png')
  },
  {
    id: '14',
    color: '#A8D1D1',
    name: 'Movies',
    img: require('../assets/popcorn.png')
  },
  {
    id: '15',
    color: '#ffdfba',
    name: 'Photography',
    img: require('../assets/camera.png')
  },
  {
    id: '15',
    color: '#FDFDBD',
    name: 'Board Games',
    img: require('../assets/board-game.png')
  },
];



const updateSearch = (search) => {
  this.setState({ search });
};

export default class InterestSearch extends React.Component{
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };
  render (){
    const { search } = this.state;
    const Item = ({item}) => (
        <TouchableOpacity style={[styles.item,{backgroundColor: item.color}]} onPress={() => this.props.navigation.navigate('Specific_Interests')}>
          <Text style={styles.text}>{item.name}</Text>
          <Image
              source= {item.img} style = {styles.image}/>
        </TouchableOpacity>
    );
    return(
        <SafeAreaView style={styles.container}>
          <Text style={styles.categories} >Categories</Text>
          <FlatList
              columnWrapperStyle={{justifyContent: 'space-evenly'}}
              data={DATA}
              numColumns={2}
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
    paddingTop: StatusBar.currentHeight + 10 || 0,
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
    fontSize: RFPercentage(3),
    color: '#343333',
    fontWeight:'bold'
  },
  image:{
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center'
  }
});
