import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import * as firebase from 'firebase';
import { Emoji } from 'emoji-mart-native';

import PomList from '../components/PomList';

export default function TagScreen({
  navigation,
  route,
}) {

  const {params} = route;
  const {id} = params;

  const [poms, setPoms] = React.useState([])

  React.useEffect(() => {
    firebase.database().ref(`tags/${id}`).on('value', (snapshot) => {
      setPoms(snapshot.val());
    });
  },[id])

  if (!poms) return null;

  const renderHeader = () => {
    return (
      <View style={styles.imageContainer}>
        <Emoji native emoji={id} size={40}/>
        <Text style={styles.titleText}>Pomodoro playlists:</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PomList ids={Object.keys(poms)} navigation={navigation} renderHeader={renderHeader} />
    </SafeAreaView>
  );
}

TagScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center',
  },
});
