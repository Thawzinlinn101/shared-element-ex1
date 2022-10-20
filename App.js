import React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Easing } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import List from './src/container/List';
import Detail from './src/container/Detail';
enableScreens();

const Stack = createSharedElementStackNavigator();

export default function index({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={() => ({
            // headerShown: false,
            gestureEnabled: false,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: { duration: 500, easing: Easing.inOut(Easing.ease) },
              },
              close: {
                animation: 'timing',
                config: { duration: 500, easing: Easing.inOut(Easing.ease) },
              },
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                }
              }
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  }
});