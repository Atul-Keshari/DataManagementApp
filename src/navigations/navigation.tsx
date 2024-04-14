
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from '../screens/SignupScreen';
import {useSelector} from 'react-redux';
import SigninScreen from '../screens/LoginScreen';
import FormDataScreen from '../screens/SubmitForm';
import UserDataScreen from '../screens/UserDataScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const data = useSelector(state => state.signin.userData);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {data ? (
          <>
            <Stack.Screen
              name="SubmitForm"
              options={{headerShown: false}}
              component={FormDataScreen}
            />
            <Stack.Screen
              name="UserDataScreen"
              options={{headerShown: false}}
              component={UserDataScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signup"
              options={{headerShown: false}}
              component={SignupScreen}
            />
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={SigninScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
