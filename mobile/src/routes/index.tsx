import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import AddCardScreen from '../pages/AddCardScreen';
import ConfirmCardScreen from '../pages/ConfirmCardScreen';
import CardListScreen from '../pages/CardListScreen';
import HeaderTitle from '../components/HeaderTitle';
import PayScreen from '../pages/PayScreen';
import HeaderButton from '../components/HeaderButton';

const Stack = createNativeStackNavigator();

export const commonScreenOptions = () => {
  const navigation = useNavigation();
  return{
  headerTransparent: true,
  headerTitleAlign: 'center' as any,
  headerBackVisible: false,
  headerLeft: () => (
    <HeaderButton
      testId='backButton'
      name="ios-arrow-back-sharp"
      onPress={() => navigation.goBack()}
    />
  ) as ReactNode,
  headerRight: () => (
    <HeaderButton
      testId='addButton'
      name="ios-add-sharp"
      onPress={() => navigation.navigate('AddCardScreen')}
    />
  ) as ReactNode,
}};

const Routes = () => {
  return (

      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCardScreen"
          component={AddCardScreen}
          options={{
            ...commonScreenOptions(),
            headerRight: () => null as ReactNode,
            headerTitle: () => (
              <HeaderTitle
                color='#12C2E9'
                title="cadastro"
                testId= 'headerTitle'
              />
            ) as ReactNode,
          }}
        />
        <Stack.Screen
          name="ConfirmCardScreen"
          component={ConfirmCardScreen}
          options={{
            ...commonScreenOptions(),
            headerRight: () => null as ReactNode,
            headerTitle: () => (
              <HeaderTitle
                color='#12C2E9'
                title="cadastro"
                testId='addCard'
              />
            ) as ReactNode,
          }}
        />
        <Stack.Screen
          name="CardListScreen"
          component={CardListScreen}
          options={{
            ...commonScreenOptions(),
            headerTransparent: false,
            headerTitle: () => (
              <HeaderTitle
                color='#142995'
                title="Wallet Test"
                testId='walletTestTitle'
              />
            ) as ReactNode,
          }}
        />
        <Stack.Screen
          name="PayScreen"
          component={PayScreen}
          options={{
            ...commonScreenOptions(),
            headerTransparent: false,
            headerTitle: () => (
              <HeaderTitle
                color='#142995'
                title="Wallet Test"
                testId='walletTestTitle'
              />
            ) as ReactNode,
          }}
        />
      </Stack.Navigator>

  );
};

export default Routes;
