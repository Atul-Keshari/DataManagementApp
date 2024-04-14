

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {fonts, fontSizes, theme} from '../theme/theme';
import GidhhSvg from '../../assets/images/giddh_icon.svg';
import InputField from '../components/InputField';
import {useDispatch} from 'react-redux';
import {
  validateEmail,
  validatePassword,
} from '../utils/validators';
import { signinRequested } from '../store/signin/signinSlice';
import {useNavigation} from '@react-navigation/native';
const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigation=useNavigation();

  const handleSignin = async () => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!emailValidation.isValid) {
      setError(emailValidation.errorMessage ?? null);
      return;
    }
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errorMessage ?? null);
      return;
    }
    dispatch(signinRequested({email, password}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.black} />
      <View style={styles.logoContainer}>
        <GidhhSvg />
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.inputContainer, {marginTop: 40}]}>
          <InputField
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        {error && <Text style={{}}>{error}</Text>}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignin}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.signInButtonText, {marginRight: 10}]}>
            Don't have a account?
          </Text>
          <TouchableOpacity style={styles.signInButton} onPress={() => {navigation.navigate('Signup');}}>
            <Text
              style={[
                styles.signInButtonText,
                {color: theme.colors.secondary},
              ]}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  logoContainer: {
    paddingTop: '20%',
    paddingBottom: '25%',
    backgroundColor: theme.colors.black,
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    borderTopRightRadius: 50,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 50,
  },
  signupButton: {
    backgroundColor: theme.colors.black,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 20,
    width: '80%',
  },
  signupButtonText: {
    color: theme.colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSizes.large,
    lineHeight: 19,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: theme.colors.LightGray,
  },
  or: {
    marginHorizontal: 10,
    color: theme.colors.gray,
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
  },
  signInButton: {
    marginBottom: 40,
  },
  signInButtonText: {
    color: theme.colors.black,
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 5,
  },
});

export default SigninScreen;
