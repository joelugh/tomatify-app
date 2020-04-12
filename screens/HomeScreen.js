import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
} from 'react-native';
import * as firebase from 'firebase';

import PomList from '../components/PomList';

export default function HomeScreen({
  navigation
}) {

  const [poms, setPoms] = React.useState([])

  React.useEffect(() => {
    firebase.database().ref('recent/all').on('value', (snapshot) => {
      const recentPoms = snapshot.val();
      setPoms(recentPoms);
    });
  },[])

  const renderHeader = () => (
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/images/logo100.png')}
        style={styles.logoImage}
      />
      <Text style={styles.titleText}>Pomodoro playlists:</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PomList ids={poms} navigation={navigation} renderHeader={renderHeader}/>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center',
  },
});
