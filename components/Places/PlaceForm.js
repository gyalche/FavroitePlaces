import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../../UI/Button';
import { Place } from '../../model/place';

export default function PlaceForm({ createPlaceHandler }) {
  const [enteredTitle, setEnteredTitle] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [selectdImage, setSelectdImage] = useState();
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectdImage(imageUri);
  }

  function pickLocationHandler(location) {
    setPickedLocation(location);
  }

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectdImage, pickedLocation);
    createPlaceHandler(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 5,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
