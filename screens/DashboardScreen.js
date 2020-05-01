import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/header';
import { PieChart } from 'react-native-chart-kit';
import { useQuery } from 'react-apollo';
import { GET_COUNTRY_DATA } from '../components/Query';
import { FlatList } from 'react-native-gesture-handler';
import { statsData, formatNum } from '../components/global';

const DashboardScreen = ({ route, navigation }) => {
  const { countryName } = route.params;
  const { data: countryData, loading, error } = useQuery(GET_COUNTRY_DATA, {
    variables: { countryName },
  });

  if (error) {
    console.log(error);
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={countryName} />
      <View>
        <View style={{ alignItems: 'center', paddingVertical: 5 }}>
          <Text style={{ fontSize: 15 }}>
            Graphical Representation of Cases
          </Text>
        </View>

        <View>
          {loading ? (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#ED4430" />
            </View>
          ) : countryData ? (
            <View>
              <PieChart
                data={[
                  {
                    color: '#FBBE30',
                    legendFontColor: 'gray',
                    legendFontSize: 12,
                    name: 'Tests',
                    value: countryData.country.result.tests,
                  },
                  {
                    color: '#4081F1',
                    legendFontColor: 'gray',
                    legendFontSize: 12,
                    name: 'Cases',
                    value: countryData.country.result.cases,
                  },
                  {
                    color: '#EA4335',
                    legendFontColor: 'gray',
                    legendFontSize: 12,
                    name: 'Deaths',
                    value: countryData.country.result.deaths,
                  },
                  {
                    color: '#51AB5A',
                    legendFontColor: 'gray',
                    legendFontSize: 12,
                    name: 'Recovered',
                    value: countryData.country.result.recovered,
                  },
                  {
                    color: '#EEEEEE',
                    legendFontColor: 'gray',
                    legendFontSize: 12,
                    name: 'Active',
                    value: countryData.country.result.active,
                  },
                  {
                    color: '#DDDDDD',
                    legendFontColor: 'gray',
                    legendFontSize: 12,
                    name: 'Critical',
                    value: countryData.country.result.critical,
                  },
                ]}
                accessor="value"
                backgroundColor="transparent"
                width={Dimensions.get('window').width - 16}
                height={200}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
              />
              <View style={styles.summary}>
                <FlatList
                  data={statsData}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <View
                      style={[styles.card, { backgroundColor: item.bgColor }]}
                    >
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
                          ? (item.value = formatNum(
                              countryData.country.result.cases
                            ))
                          : item.title == 'Total Deaths'
                          ? (item.value = formatNum(
                              countryData.country.result.deaths
                            ))
                          : item.title == 'Total Recovered'
                          ? (item.value = formatNum(
                              countryData.country.result.recovered
                            ))
                          : item.title == 'Total Tested'
                          ? (item.value = formatNum(
                              countryData.country.result.tests
                            ))
                          : 0}
                      </Text>
                    </View>
                  )}
                />
                <View></View>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
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
  summary: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
