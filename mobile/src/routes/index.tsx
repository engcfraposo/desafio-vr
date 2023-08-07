import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../pages/HomeScreen';
import AddCardScreen from '../pages/AddCardScreen';
import ConfirmCardScreen from '../pages/ConfirmCardScreen';
import CardListScreen from '../pages/CardListScreen';
import HeaderTitle from '../components/HeaderTitle';
import PayScreen from '../pages/PayScreen';
import HeaderButton from '../components/HeaderButton';

const Stack = createNativeStackNavigator();

const commonScreenOptions = ({ navigation }) => ({
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerBackVisible: false,
  headerLeft: () => (
    <HeaderButton
      name="ios-arrow-back-sharp"
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: () => (
    <HeaderButton
      name="ios-add-sharp"
      onPress={() => navigation.navigate('AddCardScreen')}
    />
  ),
});

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCardScreen"
          component={AddCardScreen}
          options={({ navigation }) => ({
            ...commonScreenOptions({ navigation }),
            headerRight: null,
            headerTitle: () => (
              <HeaderTitle
                color='#12C2E9'
                title="cadastro"
              />
            ),
          })}
        />
        <Stack.Screen
          name="ConfirmCardScreen"
          component={ConfirmCardScreen}
          options={({ navigation }) => ({
            ...commonScreenOptions({ navigation }),
            headerRight: null,
            headerTitle: () => (
              <HeaderTitle
                color='#12C2E9'
                title="cadastro"
              />
            ),
          })}
        />
        <Stack.Screen
          name="CardListScreen"
          component={CardListScreen}
          options={({ navigation }) => ({
            ...commonScreenOptions({ navigation }),
            headerTransparent: false,
            headerTitle: () => (
              <HeaderTitle
                color='#142995'
                title="Wallet Test"
              />
            ),
          })}
        />
        <Stack.Screen
          name="PayScreen"
          component={PayScreen}
          options={({ navigation }) => ({
            ...commonScreenOptions({ navigation }),
            headerTransparent: false,
            headerTitle: () => (
              <HeaderTitle
                color='#142995'
                title="Wallet Test"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
