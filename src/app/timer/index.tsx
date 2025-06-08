import React, { useEffect, useState } from 'react'
import {Text, View,TouchableOpacity, Image} from 'react-native'
import {useLocalSearchParams, useRouter} from 'expo-router'
import { useTimerSettings } from '../stores/useTimerSettings';


const TimerScreen = () => {
  const router = useRouter();
  const {h,m,s} = useLocalSearchParams();
  const totalSeconds = Number(h) * 3600 + Number(m) * 60 + Number(s);
  const [remainingTime, setRemainingTime] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const {imageUri, selectedColor} = useTimerSettings();
  const [duration] = useState(totalSeconds);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  useEffect(() => {
    if (!isRunning || remainingTime <= 0) return;
    const timer = setInterval(() => {
      setRemainingTime(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning ,remainingTime]);

  const toggleRunning = () => {
    setIsRunning(prev => !prev);
  };

  const formatTime = (seconds: number) => {
    const hh = String(Math.floor(seconds / 3600));
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    if (hh === '0') {
      return `${mm}:${ss}`;
    }else
      return `${hh}:${mm}:${ss}`;
  };

  return (
    <View className="flex-1 items-center justify-between bg-blue-100">
      {imageUri && ( // background image
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      )}

      <View // time
        className=' my-20 '>
        <Text 
        className=''
        style={{fontSize: 80, color: selectedColor}}>
        {formatTime(remainingTime)}
        </Text>
      </View>

      <View className='flex-row justify-between w-full'>
      <TouchableOpacity // cancel button
              className='bg-green-800 px-5 py-3'
              onPress={() => router.push('../')}>
              <Text className='text-green-300'>キャンセル</Text>
      </TouchableOpacity>

      <TouchableOpacity // stop restart button
              className='bg-green-800 px-5 py-3'
              onPress={toggleRunning}>
              <Text className='text-green-300'>
                {isRunning ? '一時停止' : '再開'}
              </Text>
      </TouchableOpacity>
      </View>
     
    </View>
  )
}

export default TimerScreen
