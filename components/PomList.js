import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
  Text
} from 'react-native';

import Pom from './Pom';

const { width, height } = Dimensions.get('window');

export default function PomList({
  navigation,
  ids,
  renderHeader,
}) {
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(true);
  const [data,setData] = React.useState([]);
  const [lastIdx, setLastIdx] = React.useState(20);

  const renderSeparator = () => (
    <View style={styles.separator}/>
  );

  const renderFooter = () => {
    if (lastIdx >= ids.length) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const fetchMore = () => {
    const poms = ids.slice(0,lastIdx);
    setData(poms);
    setLoading(false);
    setLoadingMore(false);
  }

  const handleLoadMore = () => {
    setLastIdx(lastIdx => lastIdx + 15);
    setLoadingMore(true);
  };

  // refresh after ids change
  React.useEffect(() => {
    if (ids.length > 0) fetchMore();
  },[ids]);

  // fetch for infinite scroll
  React.useEffect(() => {
    if (ids.length > 0 && loadingMore) fetchMore();
  },[loadingMore])

  return !loading ? (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      numColumns={1}
      data={data}
      renderItem={({ item }) => (
        <View key={item} style={styles.listItem}>
          <Pom id={item} navigation={navigation}/>
        </View>
      )}
      ListHeaderComponent={renderHeader}
      //   onRefresh={this._handleRefresh}
      //   refreshing={this.state.refreshing}
      keyExtractor={item => item}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={5}
      initialNumToRender={15}
    />
    ) : (
    <View>
      <Text style={styles.loadingText}>Loading playlists</Text>
      <ActivityIndicator />
    </View>
    );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#EEEEEE",
  },
  footer: {
    position: 'relative',
    width: width,
    height: '50%',
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  contentContainerStyle:{
  },
  listItem: {
    marginVertical: 10,
    width: '100%',
    height: 100,
  },
  loadingText: {
    alignSelf: 'center',
    padding: 20,
  },
})