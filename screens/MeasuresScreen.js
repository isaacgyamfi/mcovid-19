import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/header';
import { Linking } from 'expo';

const preventMeasures = [
  {
    key: '1',
    title: 'Wash hands regularly',
    image: require('../assets/images/iconfinder_wash_hands_regulary_5964550.png'),
  },
  {
    key: '2',
    title: 'Avoid handshakes',
    image: require('../assets/images/iconfinder_handshake_avoid_contact_5964542.png'),
  },
  {
    key: '3',
    title: 'Avoid crowded places',
    image: require('../assets/images/iconfinder___avoid_public_crowd_5925235.png'),
  },
  {
    key: '4',
    title: 'Put on a facial mask',
    image: require('../assets/images/iconfinder_facial_mask_coronavirus_5964544.png'),
  },
  {
    key: '5',
    title: 'Social distancing',
    image: require('../assets/images/iconfinder_keep_distance_social_1_5964546_(2).png'),
  },
  {
    key: '6',
    title: 'Stay at home',
    image: require('../assets/images/iconfinder_stay_home_coronovirus_5964549.png'),
  },
];

const handlePress = () => {
  const url = 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019';
  Alert.alert('Find out more', 'Visit the WHO to find out more', [
    {
      text: 'Open',
      onPress: () => Linking.openURL(url),
    },
    {
      text: 'Cancel',
      style: 'cancel',
    },
  ]);
};

const MeasuresScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Preventive Measures" navigation={navigation} />
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FlatList
          data={preventMeasures}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.measures}>
              <Image style={{ height: 100, width: 100 }} source={item.image} />
              <Text
                style={{
                  color: 'gray',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Text>
            </View>
          )}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.visitLink} onPress={handlePress}>
          <Text
            style={{ color: '#FFF', textAlign: 'center', fontWeight: 'bold' }}
          >
            Read more
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MeasuresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  measures: {
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
  visitLink: {
    borderRadius: 5,
    backgroundColor: '#4081F1',
    flexDirection: 'row',
    padding: 15,
    marginTop: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
