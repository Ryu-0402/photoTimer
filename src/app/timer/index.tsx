import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTimerSettings } from "../stores/useTimerSettings";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Notifications from 'expo-notifications';

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

  useEffect(() => {
    ScreenOrientation.unlockAsync();
    startTimer();
    return () => {
      stopTimer();
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  const startTimer = () => {
    timerInterval.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime.current - duration.current) / 1000);
      const remaining = totalSeconds - elapsed;

      if (remaining <= 0) {
        setRemainingTime(0);
        setIsRunning(false);
        stopTimer();
        Notifications.scheduleNotificationAsync({
          content: {
            title: "タイマー終了",
            body: "設定した時間が経過しました。",
          },
          trigger: null, 
        }).then(() => console.log("Notification scheduled"));
        
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
  
  const toggleRunning = () => {
  if (isRunning) {
    stopTimer();
    pauseTime.current = Date.now();
    setIsRunning(false);
  } else {
    if (pauseTime.current) {
      duration.current +=  Date.now() - pauseTime.current;
      pauseTime.current = null;
    }
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
          onPress={() => router.push("../")}
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
  );
};

export default TimerScreen;
