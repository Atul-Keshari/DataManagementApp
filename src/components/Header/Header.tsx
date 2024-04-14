import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import {fonts, fontSizes, theme} from '../../theme/theme';
import ArrBack from '../../../assets/images/back-arrow-navigation-svgrepo-com.svg';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../../store/signin/signinSlice';
interface Props {
  title: string;
  uri:string;
}

const Header: React.FC<Props> = ({title,uri}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signinSuccess(null));
  }
  return (
    <View style={styles.header}>
      {navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrBack height={25} width={30} />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.headerText,
          {textAlign: uri == '' ? 'left' : 'auto', flex: 1},
        ]}>
        {title}
      </Text>
      {uri == '' ? (
        <TouchableOpacity onPress={handleLogout}>
          <Image
            style={styles.userImage}
            source={require('../../../assets/images/icons8-logout-50.png')}></Image>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('UserDataScreen')}
          style={styles.userIcon}>
          <Image
            source={require('../../../assets/images/user-picture.png')}
            style={styles.userImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align children horizontally
    paddingLeft: 15,
    paddingVertical: 20,
    backgroundColor: theme.colors.black,
    alignItems: 'center',
  },
  headerText: {
    color: theme.colors.white,
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    marginLeft: 20,
    marginBottom: 4,
    lineHeight: 19,
  },
  userIcon: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:5,
  },
  userImage: {
    width: 23,
    height: 23,
    marginBottom:3
  },
});

export default Header;
