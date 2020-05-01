import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const header = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <View style={styles.backIcon}>
          <TouchableOpacity
            style={{ width: 30, height: 30 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 8 }}>
        <Text style={{ fontSize: 20, color: '#FFFFFF', textAlign: 'center' }}>
          {title}
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.backIcon}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
};

export default header;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#ED4430',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
