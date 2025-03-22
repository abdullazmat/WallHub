import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WallPaperScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item;
  return (
    <>
      <StatusBar hidden />
      <ImageBackground
        style={styles.container}
        source={{uri: item.links.download}}
      />
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" color={'white'} size={30} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <AntDesign name="hearto" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="download" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="share" size={30} color={'white'} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121928',
    padding: 25,
  },
  backIconContainer: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#414753',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 220,
    right: 20,
    height: 140,
    justifyContent: 'space-between',
  },
});
export default WallPaperScreen;
