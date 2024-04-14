import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {fonts, fontSizes, theme} from '../theme/theme';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../components/Header/Header';

const UserDataScreen = () => {
  const userData = useSelector(state => state.signin.userData);
  const oData = useSelector(state => state.data.data);
  console.log(oData);
  const dispatch = useDispatch();
  const data = JSON.parse(oData);

  useEffect(() => {
    dispatch({type: 'data/fetchData', payload: {token: userData.token}});
  }, []);

  return (
    <>
      <Header title={`Welcome ${userData.name}`} uri={''}/>
      <View style={styles.container}>
        <View style={styles.whiteSheet}>
          <ScrollView>
            {data &&
              data.map((item, index) => (
                <View style={styles.card} key={index}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Latitude:</Text>
                    <Text style={styles.value}>{item.location.latitude}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Longitude:</Text>
                    <Text style={styles.value}>{item.location.longitude}</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{uri: 'https://via.placeholder.com/150'}}
                        style={styles.image}
                      />
                    </View>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    color: theme.colors.white,
    fontFamily: fonts.medium,
    fontSize: 22,
    marginBottom: 20,
  },
  whiteSheet: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  card: {
    backgroundColor: theme.colors.LightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    color: theme.colors.black,
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    marginRight: 10,
  },
  value: {
    color: theme.colors.black,
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default UserDataScreen;
