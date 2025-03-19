import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import LikeScreen from './src/screens/LikeScreen';

const Tab = createBottomTabNavigator();
const renderTabIcon = (IconComponent, name, size) => (
  <IconComponent name={name} size={size} color={'white'} />
);

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#6851d2',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({size}) => renderTabIcon(AntDesign, 'home', size),
          }}
        />
        <Tab.Screen
          name="Collection"
          component={CollectionScreen}
          options={{
            tabBarIcon: ({size}) =>
              renderTabIcon(FontAwesome5, 'th-large', size),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({size}) => renderTabIcon(AntDesign, 'search1', size),
          }}
        />
        <Tab.Screen
          name="Liked"
          component={LikeScreen}
          options={{
            tabBarIcon: ({size}) => renderTabIcon(AntDesign, 'hearto', size),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingStart: 30,
  },
});

export default App;
