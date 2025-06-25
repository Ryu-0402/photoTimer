export default ({ config }) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      infoPlist: {
        NSPhotoLibraryUsageDescription: "写真ライブラリにアクセスします",
        NSCameraUsageDescription: "カメラを使用します",
        NSPhotoLibraryAddUsageDescription: "写真を保存するために使用します"
      },
    },
  };
};