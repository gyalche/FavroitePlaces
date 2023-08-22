import { View, Text, Button } from 'react-native';
import React from 'react';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlineButton from '../../UI/OutlineButton';
export default function ImagePicker() {
  const [clickImage, setClickImage] = useState('');
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant camera permission'
      );
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setClickImage(image.uri);
  }

  let imagePreview = <Text>No Imag taken yet.</Text>;
  if (clickImage) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{
          uri: clickImage,
        }}
      />
    );
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: '200px',
    verticalMargin: 8,
    justifyContent: 'center',
    alignItem: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
