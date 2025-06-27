export default {
  name: "Photoタイマー",
  slug: "photoTimer2",
  version: "1.0.0",
  icon: "./assets/icon.png",
  extra: {
    eas: {
      projectId: "b1897a4c-725f-4b17-ba37-6bce816e8f8f",
    },
  },
  ios: {
    bundleIdentifier: "com.ryu0402.photoTimer",
    supportsTablet: true,
    infoPlist: {
      NSPhotoLibraryUsageDescription: "写真ライブラリにアクセスします",
      NSCameraUsageDescription: "カメラを使用します",
      NSPhotoLibraryAddUsageDescription: "写真を保存するために使用します"
    }
  },
  assetBundlePatterns: ["*/"],
};