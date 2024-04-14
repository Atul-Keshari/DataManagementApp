// SignupScreen.js

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {fonts, fontSizes, theme} from '../theme/theme';
import GidhhSvg from '../../assets/images/giddh_icon.svg';
import InputField from '../components/InputField';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../utils/validators';
import {signupRequested} from '../store/signup/signupSlice';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userSuccess = useSelector(state => state.signup.userData);

  useEffect(() => {
    if (userSuccess) {
      setIsLoading(false);
      navigation.navigate('Login');
    }
  }, [userSuccess]);

  const handleSignup = async () => {
    setIsLoading(true); 

    const emailValidation = validateEmail(email);
    const nameValidation = validateName(name);
    const passwordValidation = validatePassword(password);

    if (!emailValidation.isValid) {
      setError(emailValidation.errorMessage ?? null);
      setIsLoading(false); // Close loader
      return;
    }
    if (!nameValidation.isValid) {
      setError(nameValidation.errorMessage ?? null);
      setIsLoading(false); // Close loader
      return;
    }
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errorMessage ?? null);
      setIsLoading(false); // Close loader
      return;
    }
    dispatch(signupRequested({email, name, password}));
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
            placeholder="Name"
            onChangeText={text => setName(text)}
            value={name}
          />
        </View>
        <View style={styles.inputContainer}>
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
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.signInButtonText, {marginRight: 10}]}>
            Already have an account?
          </Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={[
                styles.signInButtonText,
                {color: theme.colors.secondary},
              ]}>
              Signin
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

export default SignupScreen;