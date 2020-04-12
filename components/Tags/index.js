import * as React from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { Emoji } from 'emoji-mart-native';

export const special = {
  "fire": true,
  "cd": true,
  "microphone": true,
  "hatching_chick": true,
  "100": true,
}

export default function Tags({
  id,
  navigation,
}) {

  const [tags, setTags] = React.useState();

  React.useEffect(() => {
    firebase.database().ref(`tagsById/${id}`).on('value', (snapshot) => {
      setTags(snapshot.val());
    });
  },[id]);

  if (!tags) return null;

  const onPress = (tag) => () => navigation.navigate('Tag', {id: tag});

  const specialTags = !tags ? [] : Object.keys(tags).filter(tag=>special[tag]);
  const otherTags = !tags ? [] : Object.keys(tags).filter(tag=>!special[tag]);

  return <View style={styles.container}>
    {otherTags.map(tag => <TouchableOpacity key={tag} style={styles.tag} onPress={onPress(tag)}><View style={styles.innerTag}>
      <Emoji emoji={tag} size={12} native={true} onPress={onPress(tag)}/>
    </View>
    </TouchableOpacity>)}
  </View>

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tag: {
    height: 30,
    width: 54,
    justifyContent: 'center',
  },
  innerTag: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    height: 26,
    width: 50,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: '#dddddd',
    backgroundColor:'#fcfcfc'
  }
});