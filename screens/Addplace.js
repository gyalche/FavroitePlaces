import { View, Text } from 'react-native';
import React from 'react';
import PlaceForm from '../components/Places/PlaceForm';

export default function Addplace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate('AllPlaces', {
      place: place,
    });
  }
  return <PlaceForm createPlaceHandler={createPlaceHandler} />;
}
