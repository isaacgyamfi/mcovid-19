import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SavedScreen from '../screens/SavedScreen';

const MainTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{}} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{}} />
    </Stack.Navigator>
  );
};
const SavedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Saved" component={SavedScreen} options={{}} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{}} />
    </Stack.Navigator>
  );
};
const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{}} />
    </Stack.Navigator>
  );
};

const MainTabNavigation = () => {
  return (
    <MainTab.Navigator
      tabBarOptions={{
        activeTintColor: '#FFF',
        inactiveTintColor: '#FFA66F',
        tabStyle: { backgroundColor: '#ED4430' },
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              focused={focused}
              name="md-home"
              size={26}
              color={color}
            />
          ),
        }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              focused={focused}
              name="md-notifications"
              size={26}
              color={color}
            />
          ),
        }}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};

export default MainTabNavigation;
