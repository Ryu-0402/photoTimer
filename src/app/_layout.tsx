import * as Sentry from "@sentry/react-native";

try{
Sentry.init({
  dsn:"https://5bb9de4cb127fef9592f2ef6312cfdda@o4509574011092992.ingest.us.sentry.io/4509574012207104",
  debug:true,
  enableNative:true,
})
} catch (error){
  console.warn("sentry失敗",error)
};


// throw new Error("sentryエラーテスト")

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    Digital7: require("../../assets/fonts/ds-digi.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </>
  );
};

export default Layout;
