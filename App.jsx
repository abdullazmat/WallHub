/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
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
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 80,
            position: 'absolute',
            marginLeft: 20,
            marginRight: 20,
            bottom: 40,
            borderRadius: 30,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarBackground: () => {
            return (
              <LinearGradient
                colors={['#8C69FF', '#3B3599']}
                style={{flex: 1, borderRadius: 30}}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 0,
                  y: 1,
                }}
              />
            );
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#CCCCCC',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, focused, size}) => {
              return (
                <AntDesign name="home" color={color} size={focused ? 30 : 20} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Collections"
          component={CollectionScreen}
          options={{
            tabBarIcon: ({color, focused, size}) => {
              return (
                <FontAwesome5
                  name="th-large"
                  color={color}
                  size={focused ? 30 : 20}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({color, focused, size}) => {
              return (
                <AntDesign
                  name="search1"
                  color={color}
                  size={focused ? 30 : 20}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Likes"
          component={LikeScreen}
          options={{
            tabBarIcon: ({color, focused, size}) => {
              return (
                <AntDesign
                  name="hearto"
                  color={color}
                  size={focused ? 30 : 20}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
