import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

import {fonts, fontSizes, theme} from '../theme/theme';
import {launchCamera} from 'react-native-image-picker';
import Plus from '../../assets/images/plus.svg';
import Header from '../components/Header/Header';
import SubmitButton from '../components/SubmitForm/SubmitButton';
import InputField from '../components/InputField';
import GetLocation from 'react-native-get-location';
import {useDispatch, useSelector} from 'react-redux';

const FormDataScreen = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.signin.userData);

  const pickImage = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, response => {
      if (!response.didCancel) {
        setImageUri(response.assets[0]);
      }
    });
  };

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLatitude(location.latitude.toString());
        setLongitude(location.longitude.toString());
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const handleRemoveImage = () => {
    setImageUri(null);
  };

  const handleSubmitButton = () => {
    dispatch({
      type: 'form/submitForm',
      payload: {
        latitude: latitude,
        longitude: longitude,
        file: imageUri,
        token: userData.token,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.black} />
      <View style={styles.blackBackground}>
        <Header
          title="Upload Data"
          uri="../../../assets/images/user-picture.png"
        />
      </View>
      <View style={styles.whiteSheet}>
        <Text
          style={{
            color: theme.colors.black,
            marginTop: 40,
            textAlign: 'left',
            width: '70%',
            fontFamily: fonts.medium,
            fontSize: fontSizes.medium,
          }}>
          Latitude:
        </Text>
        <View style={[styles.inputContainer, {}]}>
          <InputField
            placeholder="Enter"
            value={latitude}
            onChangeText={text => setLatitude(text)}
          />
        </View>
        <Text
          style={{
            color: theme.colors.black,
            textAlign: 'left',
            width: '70%',
            fontFamily: fonts.medium,
            fontSize: fontSizes.medium,
          }}>
          Longitude:
        </Text>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Enter"
            value={longitude}
            onChangeText={text => setLongitude(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.getLocationButton}
          onPress={getLocation}>
          <Text style={styles.getLocationButtonText}>Get Location</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.circleContainer1}>
        <View style={[styles.halfCircle, styles.upperHalfCircle]} />
        <View style={[styles.halfCircle, styles.lowerHalfCircle]} />
        <View style={styles.circle}>
          <View style={[styles.tickContainer, styles.tickContainerShadow]}>
            {imageUri ? (
              <View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={handleRemoveImage}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
                <Image
                  source={{uri: imageUri.uri}}
                  style={styles.imagePreview}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={pickImage}>
                <Plus color={'black'} />
                <Text
                  style={{color: theme.colors.black, fontFamily: fonts.medium}}>
                  Select Image
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <SubmitButton
        handleSubmitButton={handleSubmitButton}
        text={'Submit'}
        color={theme.colors.black}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackBackground: {
    backgroundColor: theme.colors.black,
    height: '80%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  whiteSheet: {
    backgroundColor: theme.colors.white,
    height: '53%',
    width: '90%',
    position: 'absolute',
    top: '23.05%',
    left: '5%',
    right: '5%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 5,
  },
  imagePickerButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  imagePickerButtonText: {
    color: theme.colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  imagePreview: {
    width: 160,
    height: 160,
    borderRadius: 160,
  },
  getLocationButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  getLocationButtonText: {
    color: theme.colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
  },
  circleContainer1: {
    width: 200,
    height: 200,
    borderRadius: 200,
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  halfCircle: {
    width: '100%',
    height: '50%',
    position: 'absolute',
  },
  upperHalfCircle: {
    backgroundColor: theme.colors.black,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    top: 0,
  },
  lowerHalfCircle: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    bottom: 0,
  },
  circle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  tickContainer: {
    backgroundColor: theme.colors.white,
    width: 160,
    height: 160,
    borderRadius: 160,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  tickContainerShadow: {
    elevation: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 13,
    right: 14,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2
  },
  removeButtonText: {
    color: theme.colors.white,
    fontSize: 14,
  },
});

export default FormDataScreen;
