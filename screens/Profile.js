import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';

/* NEXT STEPS:
-Add settings button to top bar
-Fix shadows
*/
export default function Profile() {
  return (
    <View style={styles.container}>

    {/* Gonna keep the Commonality header off for now, the header is gonna be a Group List implemented next sprint */}
    {/*  
      <View style={styles.topBar}>
        <Text style={styles.topBarFont}>Commonality</Text>
      </View>
    */}

      <ScrollView>
        <Image source={require('../assets/profile_picture_demo.jpg')} style={styles.profPic}></Image>

        <View style={styles.infoBackground}>
          <Text style={styles.nameFont}>Jacob Pearson</Text>
          <Text style={styles.bodyFont}>Age: 21</Text>
          <Text style={styles.bodyFont}>Grade: Junior</Text>
          <Text style={styles.bodyFontBottom}>Major: Computer Science</Text>
          <TouchableOpacity style={styles.dmBox}>
            <Image source={require('../assets/mail-icon.png')} style={styles.dmPic}></Image>
            <Text style={styles.dmFont}>Direct Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBackground}>
          <Text style={styles.nameFont}>About Me:</Text>
          <Text style={styles.bodyFontBottom}>This is where the about section will go. Students can go into more detail about their interests here. The actual interests listed below are clickable, and will have functionality to go to interest pages.</Text>
        </View>

        <View style={styles.infoBackground}>
          <Text style={styles.nameFont}>Interests:</Text>

          <TouchableOpacity style={styles.interestBox}>
            <Image source={require('../assets/bike.png')} style={styles.interestPic}></Image>
            <Text style={styles.interestFont}>Mountain Biking</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interestBox}>
            <Image source={require('../assets/musical-note.png')} style={styles.interestPic}></Image>
            <Text style={styles.interestFont}>Music</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interestBox}>
            <Image source={require('../assets/camera.png')} style={styles.interestPic}></Image>
            <Text style={styles.interestFont}>Photography</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interestBox}>
            <Image source={require('../assets/game-console.png')} style={styles.interestPic}></Image>
            <Text style={styles.interestFont}>Video Games</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      <StatusBar style='auto'/>
    </View>
  );
}

//Code that is for the container and for formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    //alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },

  //Styles for the top bar
  topBar: {
    //alignSelf: 'center',
    justifySelf: 'stretch',
    backgroundColor: '#bc1000',
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  topBarFont: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    jutifyContent: 'center',
    marginHorizontal: 10,
  },

  //Styles for profile page information
  infoBackground: {
    backgroundColor: '#e6e6e6',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center'
  },
  dmBox: {
    backgroundColor: '#cccccc',
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    //width: '95%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  interestBox: {
    backgroundColor: '#cccccc',
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    width: '95%',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row'
  },

  //Pictures
  profPic: {
    borderRadius: 30,
    alignSelf: 'center',
    justifySelf: 'center',
    height: 190,
    aspectRatio: 1,
    marginTop: 10,
    marginBottom: 5,
  },
  dmPic: {
    //borderRadius: 10,
    //alignSelf:'center',
    width: 50,
    aspectRatio: 1,
    borderWidth: 5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  interestPic: {
    //height: 50,
    width: 70,
    aspectRatio: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },

  //Fonts
  dmFont: {
    color: 'black',
    fontSize: 20,
    marginHorizontal: 10,
  },
  nameFont: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  bodyFont: {
    color: 'black',
    fontSize: 22,
    marginHorizontal: 10,
    //marginBottom: 10,
  },
  bodyFontBottom: {
    color: 'black',
    fontSize: 22,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  interestFont: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  //Shadows (not working)
  //shadows for iOS
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  //shadows for Android
  elevation: {
    elevation: 20,
    shadowColor: 'black',
  },
});
