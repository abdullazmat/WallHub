import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

export const requireWriteExternalStoragePermission = async () => {
  if (Number(Platform.Version) < 33) {
    return true;
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to save wallpaper',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      Alert.alert(
        'Permission Required',
        'This app needs access to your storage to download wallpaper',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Ask Permission Again',
            onPress: () => requireWriteExternalStoragePermission(),
          },
        ],
      );
    }
    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Permission Required',
        'Please enable permission in your device setting to download wallpaper',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Setting',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('write storage permission granted');
      return true;
    }
  }
};
