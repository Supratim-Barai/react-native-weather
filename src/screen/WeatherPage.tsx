import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';
import {Icon, Input} from 'react-native-elements';

const WeatherPage: FC = () => {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState('');

  function getWeather(query: string) {
    const api_key = '2b189ab548653fd7c84fea46797a6351';
    const url_base = 'https://api.openweathermap.org/data/2.5/';
    console.log('calling get api.....');
    return fetch(`${url_base}weather?q=${query}&units=metric&APPID=${api_key}`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        setData(response);
      });
  }

  const image = require('../assets/cold.jpg');
  const image2 = require('../assets/warm.jpg');
  console.log({data});

  return (
    <>
      <View style={styles.container}>
        <Input
          placeholder="Search..."
          onChangeText={value => setSearch(value)}
          rightIcon={
            <Icon
              type="font-awesome"
              name="search"
              size={24}
              color="black"
              onPress={() => getWeather(search)}
            />
          }
        />
        {data?.data?.main && (
          <ImageBackground
            source={data?.data?.main.temp > 20 ? image2 : image}
            style={styles.image}>
            <Text style={styles.text}>
              {data?.data?.name}, {data?.data?.sys.country}
            </Text>
          </ImageBackground>
        )}
      </View>
    </>
  );
};

export default WeatherPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3EBF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});
