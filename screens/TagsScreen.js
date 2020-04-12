import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Emoji } from 'emoji-mart-native';
import * as firebase from 'firebase';


export default function TagsScreen({
  navigation,
}) {

  const [tags, setTags] = React.useState();

  React.useEffect(() => {
    firebase.database().ref(`tags`).on('value', (snapshot) => {
      setTags(snapshot.val());
    });
  },[])

  const onPress = (tag) => () => navigation.navigate('Tag', {id: tag});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {tags && Object.keys(tags).map(tag => <TouchableOpacity key={tag} style={styles.tag} onPress={onPress(tag)}>
          <View style={styles.innerTag}>
            <View style={styles.emojiwrap}>
              <Emoji emoji={tag} size={12} native={true} onPress={onPress(tag)}/>
            </View>
            {Object.keys(tags[tag]).length > 1 ? <Text style={styles.countText}>{Object.keys(tags[tag]).length}</Text> : null}
          </View>
        </TouchableOpacity>)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    height: 30,
    width: 54,
    justifyContent: 'center',
  },
  innerTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 13,
    borderColor: '#dddddd',
    height: 26,
    width: 50,
    backgroundColor:'#fcfcfc'
  },
  emojiwrap: {
    paddingTop: 8,
  },
  countText: {
    fontSize: 10,
  }
});
