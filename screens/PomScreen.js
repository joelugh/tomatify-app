import * as React from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  Linking,
  Button,
  Dimensions,
} from 'react-native';
import { selectPomData } from '../utils';
import Tags from '../components/Tags';
import Tracklist from '../components/Tracklist';

const screenHeight = Dimensions.get('window').height

export default function PomScreen({
  navigation,
  route,
}) {

  const {params} = route;
  const {id} = params;

  const [pom, setPom] = React.useState();

  React.useEffect(() => {
    firebase.database().ref(`pom/${id}`).on('value', (snapshot) => {
      const pom = snapshot.val();
      if (pom) setPom(pom);
    });
  },[id])

  if (!pom) return null;

  const {
    title = '',
    userName = '',
    description = '',
    duration = 0,
    imageSrc = '',
    lastModified = '',
    tracks = [],
  } = pom ? selectPomData(pom) : {};

  const onPress = () => Linking.openURL(id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview} contentContainerStyle={styles.contentContainer}>
        <Image
          source={{ uri: imageSrc }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.titleText} onPress={onPress}>{title}</Text>
          <Text style={styles.durationText}>{`${duration} mins`}</Text>
          <Text style={styles.userText}>{`${userName}`}</Text>
          <Tags id={id} navigation={navigation} />
        </View>
        <Text style={styles.description}>{description}</Text>
        <Tracklist tracks={tracks} />
        <View style={styles.button}>
          <Button title="Play Now" onPress={onPress}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

PomScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: screenHeight,
  },
  scrollview: {
    flexDirection: 'column',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 10,
    paddingVertical: 50,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
    marginTop: 3,
  },
  details: {
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
  },
  titleText: {
    padding: 4,
    fontSize: 24,
  },
  durationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#111111',
  },
  userText: {
    fontSize: 16,
    padding: 4,
    paddingBottom: 10,
  },
  description: {
    alignSelf: "stretch",
    paddingLeft: 20,
    fontSize: 12,
    textAlign: 'left',
  },
  button: {
    marginTop: 25,
  }
});
