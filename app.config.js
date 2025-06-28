export default ({ config }) => ({
  ...config,
  name: "Photoタイマー",
  slug: "photoTimer2",
  version: "1.0.0",
  icon: "./assets/icon.png",
  scheme: "acme",
  userInterfaceStyle: "automatic",
  orientation: "default",
  web: {
    output: "static",
  },
  plugins: [
    [
      "expo-router",
      {
        origin: "https://n",
      },
    ],
  ],
  android: {
    package: "com.anonymous.photoTimer2",
  },
  ios: {
    buildNumber:"3",
    bundleIdentifier: "com.ryu0402.photoTimer",
    supportsTablet: true,
    infoPlist: {
      NSPhotoLibraryUsageDescription: "写真ライブラリにアクセスします",
      NSCameraUsageDescription: "カメラを使用します",
      NSPhotoLibraryAddUsageDescription: "写真を保存するために使用します",
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  extra: {
    router: {
      origin: "https://n",
    },
    eas: {
      projectId: "b1897a4c-725f-4b17-ba37-6bce816e8f8f",
    },
  },
  assetBundlePatterns: ["*/"],
  owner: "ryu0402",
});