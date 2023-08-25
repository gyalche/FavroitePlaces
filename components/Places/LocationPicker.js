import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import OutlineButton from '../../UI/OutlineButton';
import { Colors } from '../../constants/colors';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
export default function LocationPicker() {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [mapLocation, setMapLocation] = useState();
  async function verifyPermission() {
    if (locationPermissionInformation === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant the location permission to use this app'
      );
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const verify = verifyPermission();
    if (!verify) return;
    const location = await getCurrentPositionAsync();
  }
  function pickOnMapHandler() {}
  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="location" onPress={pickOnMapHandler}>
          Pick Up Map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: '200px',
    verticalMargin: 8,
    justifyContent: 'center',
    alignItem: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
