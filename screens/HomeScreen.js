import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import { useQuery } from '@apollo/react-hooks';
import { GET_GLOBAL_DATA } from '../components/Query';
import {
  formatNum,
  countries,
  communicate,
  statsData,
} from '../components/global';

const HomeScreen = ({ navigation }) => {
  const { data: globalData, loading: globalDataLoading } = useQuery(
    GET_GLOBAL_DATA
  );

  const [search, setsearch] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.heroBackground}
        source={require('../assets/images/covid-19-hero.jpg')}
      >
        <View style={styles.hero}>
          <Text style={styles.heroText}>#StayHome #StaySafe</Text>
        </View>
        <View style={styles.searchContainer}>
          <Picker
            style={styles.search}
            onValueChange={(itemValue, itemIndex) => {
              setsearch(itemValue);
            }}
            selectedValue={search}
          >
            <Picker.Item value="" label="Select a country" />
            {countries.map((country) => {
              return (
                <Picker.Item label={country} value={country} key={country} />
              );
            })}
          </Picker>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              search !== ''
                ? navigation.navigate('Dashboard', {
                    countryName: search,
                  })
                : null;
            }}
          >
            <AntDesign name="arrowright" size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#FFF',
                marginBottom: 10,
              }}
            >
              Don't wait, seek help!
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => communicate('tel')}
              style={[styles.callMessageBtn, styles.call]}
            >
              <Feather name="phone-call" size={22} color="#FFF" />
              <Text style={styles.callMessageBtnText}>Call now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => communicate('sms')}
              style={[styles.callMessageBtn, styles.message]}
            >
              <AntDesign name="message1" size={22} color="#FFF" />
              <Text style={styles.callMessageBtnText}>Send SMS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.topCountriesTitle}>Global Statistics</Text>
      </View>
      <View style={styles.summary}>
        {globalDataLoading ? (
          <ActivityIndicator size="large" color="#ED4430" />
        ) : globalData ? (
          <FlatList
            data={statsData}
            numColumns="2"
            renderItem={({ item }) => (
              <View style={[styles.card, { backgroundColor: item.bgColor }]}>
                <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: item.color,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  {item.title == 'Total Cases'
                    ? (item.value = formatNum(globalData.globalTotal.cases))
                    : item.title == 'Total Deaths'
                    ? (item.value = formatNum(globalData.globalTotal.deaths))
                    : item.title == 'Total Recovered'
                    ? (item.value = formatNum(globalData.globalTotal.recovered))
                    : item.title == 'Total Tested'
                    ? (item.value = formatNum(globalData.globalTotal.tests))
                    : 0}
                </Text>
              </View>
            )}
          />
        ) : null}
      </View>
      <View>
        <View style={styles.otherSummary}>
          {globalDataLoading ? (
            <ActivityIndicator size="large" color="#FFF" />
          ) : globalData ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.otherSummaryNum}>
                  {globalData.globalTotal.affectedCountries}
                </Text>
                <Text style={{ color: '#FFF' }}>COUNTRIES AFFECTED</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}
              >
                <View style={{ alignItems: 'center', marginRight: 10 }}>
                  <Text style={styles.otherSummaryNum}>
                    {formatNum(globalData.globalTotal.todayCases)}
                  </Text>
                  <Text style={{ color: '#FFF', fontSize: 12 }}>
                    CASES TODAY
                  </Text>
                </View>
                <View style={{ alignItems: 'center', marginLeft: 10 }}>
                  <Text style={styles.otherSummaryNum}>
                    {formatNum(globalData.globalTotal.todayDeaths)}
                  </Text>
                  <Text style={{ color: '#FFF', fontSize: 12 }}>
                    DEATHS TODAY
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 150,
  },
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  heroBackground: {
    width: '100%',
    paddingVertical: 10,
  },
  heroText: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#DDD',
  },
  call: {
    backgroundColor: '#51AB5A',
  },
  message: {
    backgroundColor: '#4081F1',
  },
  callMessageBtn: {
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  callMessageBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  summary: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  otherSummary: {
    backgroundColor: '#131B3A',
    height: 160,
    marginHorizontal: 15,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  otherSummaryNum: { color: '#FFF', fontSize: 30, fontWeight: 'bold' },
  card: {
    width: 160,
    height: 55,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  searchContainer: {
    margin: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: '#eee',
    fontSize: 16,
    color: 'gray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btn: {
    width: 80,
    height: 35,
    backgroundColor: '#ED4430',
    borderRadius: 5,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  topCountriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});
