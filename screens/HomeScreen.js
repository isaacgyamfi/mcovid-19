import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { GET_TOP_CASES, GET_GLOBAL_DATA } from '../components/Query';

const HomeScreen = () => {
  const { data: sortedData, loading: sortedDataLoading } = useQuery(
    GET_TOP_CASES
  );
  const { data: globalData, loading: globalDataLoading } = useQuery(
    GET_GLOBAL_DATA
  );

  const formatNum = (num) => {
    let num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  };

  const [globalDataState] = useState([
    {
      key: '1',
      title: 'Total Cases',
      value: 0,
      color: '#4081F1',
    },
    {
      key: '2',
      title: 'Total Deaths',
      value: 0,
      color: '#EA4335',
    },
    {
      key: '3',
      title: 'Total Recovered',
      value: 0,
      color: '#51AB5A',
    },
    {
      key: '4',
      title: 'Total Tested',
      value: 0,
      color: '#FBBE30',
    },
  ]);

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
          <TextInput style={styles.search} placeholder="Search Country" />
          <TouchableOpacity style={styles.btn}>
            <View>
              <Text style={styles.btnText}>View</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.summary}>
        {globalDataLoading ? (
          <ActivityIndicator size="large" color="#ED4430" />
        ) : globalData ? (
          <FlatList
            data={globalDataState}
            numColumns="2"
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text
                  style={{ color: '#ED4430', fontSize: 13, fontWeight: 'bold' }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: item.color, fontSize: 20 }}>
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
      <View style={{ paddingHorizontal: 10, height: 250 }}>
        <Text style={styles.topCountriesTitle}>Countries with high cases</Text>
        <View style={styles.topCountries}>
          <Text style={{ flex: 7, fontSize: 12, fontWeight: 'bold' }}>
            Country
          </Text>
          <Text style={{ flex: 4, fontSize: 12, fontWeight: 'bold' }}>
            Cases
          </Text>
          <Text style={{ flex: 3, fontSize: 12, fontWeight: 'bold' }}>
            Today
          </Text>
          <Text style={{ flex: 4, fontSize: 12, fontWeight: 'bold' }}>
            Recovered
          </Text>
          <Text style={{ flex: 3, fontSize: 12, fontWeight: 'bold' }}>
            Deaths
          </Text>
        </View>
        <View>
          {sortedDataLoading ? (
            <Text>Loading</Text>
          ) : sortedData ? (
            <FlatList
              data={sortedData.countries}
              keyExtractor={(item) => item.countryInfo._id}
              renderItem={({ item }) => (
                <View style={styles.topCountries}>
                  <View style={{ flex: 2, marginVertical: 5 }}>
                    <Image
                      style={{ width: 25, height: 15 }}
                      source={{ uri: item.countryInfo.flag }}
                    />
                  </View>
                  <View style={{ flex: 5, marginVertical: 5 }}>
                    <Text style={{ fontSize: 13 }}>{item.country}</Text>
                  </View>
                  <View style={{ flex: 4, marginVertical: 5 }}>
                    <Text style={{ fontSize: 13 }}>
                      {formatNum(item.result.cases)}
                    </Text>
                  </View>
                  <View style={{ flex: 3, marginVertical: 5 }}>
                    <Text style={{ fontSize: 13 }}>
                      {formatNum(item.result.todayCases)}
                    </Text>
                  </View>
                  <View style={{ flex: 4, marginVertical: 5 }}>
                    <Text style={{ fontSize: 13 }}>
                      {formatNum(item.result.recovered)}
                    </Text>
                  </View>
                  <View style={{ flex: 3, marginVertical: 5 }}>
                    <Text style={{ fontSize: 13 }}>
                      {formatNum(item.result.deaths)}
                    </Text>
                  </View>
                </View>
              )}
            />
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
    height: 100,
  },
  heroBackground: {
    width: '100%',
    paddingVertical: 10,
  },
  heroText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#DDD',
  },
  summary: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  card: {
    width: 160,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#ED4430',
    borderWidth: 1,
    borderRadius: 5,
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
    width: 100,
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
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  topCountriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  topCountries: {
    flexDirection: 'row',
  },
});
