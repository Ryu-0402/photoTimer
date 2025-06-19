import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions,TouchableWithoutFeedback } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTimerSettings } from "../stores/useTimerSettings";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import { Audio} from 'expo-av';
import Cyber13_1Mp3 from '../../../assets/sounds/Cyber13-1.mp3';


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const TimerScreen = () => {
  const router = useRouter();
  const { h, m, s } = useLocalSearchParams();
  const totalSeconds = Number(h) * 3600 + Number(m) * 60 + Number(s);
  const [remainingTime, setRemainingTime] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const { imageUri, selectedColor } = useTimerSettings();
  const duration = useRef<number>(0);
  const startTime= useRef<number>(Date.now());
  const pauseTime = useRef<number | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const vibrationInterval = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const hasScheduledNotification = useRef(false); 


  
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, // 追加（iOS用）
    shouldShowList: true,   // 追加（iOS用）
  }),
});

  useEffect(() => {
    ScreenOrientation.unlockAsync();
    startTimer();
    return () => {
      stopTimer();
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const startTimer = async () => {
  if (!hasScheduledNotification.current) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "タイマー終了",
        body: "設定した時間が経過しました。",
        sound: false,
        badge: 1,
      },
      trigger: {
        seconds: totalSeconds,
        type: "timeInterval",
        repeats: false,
      } as Notifications.TimeIntervalTriggerInput,
    });
    hasScheduledNotification.current = true;
  }

  timerInterval.current = setInterval(async() => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime.current - duration.current) / 1000);
    const remaining = totalSeconds - elapsed;

    if (remaining <= 0) {
      setRemainingTime(0);
      setIsRunning(false);
      stopTimer();

      // await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      //   setTimeout(() => {
      //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      //   }, 50);
      
      vibrationInterval.current = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }, 300);

      const playSound = async () => {
        const {sound } = await Audio.Sound.createAsync(
          Cyber13_1Mp3,
          { shouldPlay: true,
            isLooping: true, // ループ再生
           }
        );
        soundRef.current = sound;
        await sound.playAsync();
      }
      playSound();
    } else {
      setRemainingTime(remaining);
    }
  }, 50);
};

const stopTimer = () => {
  if (timerInterval.current) {
    clearInterval(timerInterval.current);
    timerInterval.current = null;
  }
};

const stopVibration = () => {
  if (vibrationInterval.current) {
    clearInterval(vibrationInterval.current);
    vibrationInterval.current = null;
  }
  if (soundRef.current) {
    soundRef.current.stopAsync();
    soundRef.current.unloadAsync();
    soundRef.current = null;
  }
};  
  
const toggleRunning = async () => {
  if (isRunning) {
    stopTimer();
    pauseTime.current = Date.now();
    setIsRunning(false);

    await Notifications.cancelAllScheduledNotificationsAsync();
    hasScheduledNotification.current = false;
  } else {
    if (pauseTime.current) {
      duration.current +=  Date.now() - pauseTime.current;
      pauseTime.current = null;
    }

    const now = Date.now();
    const elapsed = Math.floor((now - startTime.current - duration.current) / 1000);
    const remaining = totalSeconds - elapsed;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "タイマー終了",
        body: "タイマーが終了しました。",
        sound:true,
        badge: 1,
      },
      trigger:{
        seconds:remaining - 0.25,
        type: "timeInterval" as any, // 追加
      },
    })

    hasScheduledNotification.current = true;

    startTimer();
    setIsRunning(true);
  }
};

  const formatTime = (seconds: number) => {
    const hh = String(Math.floor(seconds / 3600));
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    if (hh === "0") {
      return `${mm}:${ss}`;
    } else return `${hh}:${mm}:${ss}`;
  };

  return (
<TouchableWithoutFeedback onPress={stopVibration}>
    <View className="flex-1 items-center justify-between bg-black">
      {imageUri && ( // background image
        <Image
          source={{ uri: imageUri }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}

      <View // time
        className=""
      >
        <Text
          className=""
          style={{
            fontSize: screenWidth * 0.23,
            color: selectedColor,
            marginTop: screenHeight * 0.1,
          }}
        >
          {formatTime(remainingTime)}
        </Text>
      </View>

      <View className="flex-row justify-between w-full">
        <TouchableOpacity // cancel button
          className="opacity-50"
          onPress={async() =>{
            await Notifications.cancelAllScheduledNotificationsAsync();
            stopVibration() 
            router.push("../")}}
        >
          <Text
            className="text-white"
            style={{
              fontSize: screenWidth * 0.08,
              marginBottom: screenHeight * 0.02,
            }}
          >
            キャンセル
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="opacity-50" onPress={toggleRunning}>
          {isRunning ? (
            <Text
              className="text-yellow-600"
              style={{
                fontSize: screenWidth * 0.08,
                marginBottom: screenHeight * 0.02,
              }}
            >
              一時停止
            </Text>
          ) : (
            <Text
              className="text-green-400"
              style={{
                fontSize: screenWidth * 0.08,
                marginRight: screenWidth * 0.05,
                marginBottom: screenHeight * 0.02,
              }}
            >
              再開
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
  );
};
export default TimerScreen;
