import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';

import Tags from './Tags';
import { selectPomData } from '../utils';

export default function Pom({
  id,
  navigation,
}) {

  const [pom, setPom] = React.useState();

  React.useEffect(() => {
    firebase.database().ref(`pom/${id}`).on('value', (snapshot) => {
      const pom = snapshot.val();
      if (pom) setPom(pom);
    });
  },[id])

  if (!pom) return null;

  const onPress = () => navigation.navigate('Pom', {id});

  const {
    title = '',
    userName = '',
    description = '',
    duration = 0,
    imageSrc = '',
    lastModified = '',
    tracks = [],
  } = pom ? selectPomData(pom) : {};

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: imageSrc }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.userText}>{`${userName} — ${duration} mins`}</Text>
        <Text style={styles.lastModifiedText}>{lastModified}</Text>
        <Tags id={id} navigation={navigation} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    height: 100
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginTop: 3,
  },
  details: {
    padding: 5,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  userText: {
    fontSize: 12,
  },
  lastModifiedText: {
    fontSize: 10,
    color: '#111111',
    padding: 2,
  },
});
