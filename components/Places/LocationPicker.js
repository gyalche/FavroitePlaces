import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import OutlineButton from '../../UI/OutlineButton';
import { Colors } from '../../constants/colors';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
export default function LocationPicker({ onPickLocation }) {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [mapLocation, setMapLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedlat,
        lng: route.params.pickedlng,
      };
      setMapLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

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
    setMapLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    onPickLocation(location);
  }
  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location picked yet.</Text>;
  if (mapLocation) {
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(mapLocation.lat, mapLocation.lng),
        }}
        style={styles.image}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
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
  image: {
    width: '100%s',
    height: '100%',
  },
});
