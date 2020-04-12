import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default function Tracklist(props) {
  const { tracks } = props;
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <View style={styles.number}><Text>#</Text></View>
        <View style={styles.title}><Text>Title</Text></View>
        <View style={styles.time}><Text>To Go</Text></View>
      </View>
      {tracks.map((track,idx) => (
        <View key={idx} style={styles.row}>
          <View style={styles.number}><Text>{idx + 1}</Text></View>
          <View style={styles.title}><Text numberOfLines={1}>{track.title}</Text></View>
          <View style={styles.time}><Text>{track.remaining}</Text></View>
        </View>
      ))}
    </View>
  );
}

const widths = ['8%', '65%', '20%'];

const styles = StyleSheet.create({
  table: {
    alignSelf: 'stretch',
    marginTop: 20,
    justifyContent: 'center',
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  number: {
    width: widths[0],
  },
  title: {
    width: widths[1],
  },
  time: {
    paddingLeft: 10,
    width: widths[2],
    textAlign: 'right',
  },
});