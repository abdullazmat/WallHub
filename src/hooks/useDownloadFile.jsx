import {useState} from 'react';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {requireWriteExternalStoragePermission} from '../utils/helper';
import {Alert} from 'react-native';

export const useDownloadFile = () => {
  let dirs = ReactNativeBlobUtil.fs.dirs;
  const folderPath = dirs.DownloadDir + '/wallpapers';
  const [downloading, setDownloading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const downloadFile = async (url, fileName) => {
    if (!url) {
      return;
    }
    const isAllowed = await requireWriteExternalStoragePermission();
    if (!isAllowed) {
      Alert.alert(
        'Permission Required',
        'Please grant permsission to downlaod wallpapers',
      );
      return;
    }
    try {
      setDownloading(true);
      const res = await ReactNativeBlobUtil.config({
        path: `${folderPath}/${fileName}.png`,
        fileCache: true,
        appendExt: 'png',
        addAndroidDownloads: {
          notification: true,
          title: 'Download Successful',
          description: 'An image file',
          mediaScannable: true,
        },
      })
        .fetch('GET', url)
        .progress((received, total) => {
          const progressPercentage = Math.floor((received / total) * 100);
          setPercentage(progressPercentage);
        })
        .then(async res => {
          let result =
            await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
              {
                name: fileName,
                parentFolder: 'wallpaper',
                mimeType: 'image/png',
              },
              'Download',
              res.path(),
            );
          Alert.alert(
            'Wallpaper Downloaded',
            ' You wallpaper has been downlaoded successfullt',
            [
              {
                text: 'Dismiss',
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
        });
    } catch (error) {
      console.log('error', error);
    } finally {
      setDownloading(false);
    }
  };
  return {
    downloading,
    percentage,
    downloadFile,
  };
};
