import React,{useState} from 'react';
import { Text, View,TouchableOpacity} from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import {useRouter} from 'expo-router';


const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const seconds = Array.from({ length: 60 }, (_, i) => i);

const HomeScreen = () => {
  const router = useRouter();
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(5);
  const [selectedSecond, setSelectedSecond] = useState(0);
  
  return (
    <View className='flex-1 items-center justify-center bg-black'>
      <View //h m s
      className="flex-row bg-black w-full items-center justify-center mt-9"
      style={{ columnGap: 75 }}>
        <Text 
        className=' text-green-300'
        style={{fontSize:45}}>h</Text>
        <Text 
        className=' text-green-300'
        style={{fontSize:45}}>m</Text>
        <Text 
        className=' text-green-300'
        style={{fontSize:45}}>s</Text>  
      </View>
      
      <View //pickers 
      className="flex-row bg-black-200 gap-10 ">
        <WheelPickerExpo
          height={200}
          width={70}
          initialSelectedIndex={0}
          items={hours.map((num) => ({ label: num.toString(), value:num }))}
          onChange={({ index }:{index:number}) => setSelectedHour(index)}
        />
        <WheelPickerExpo
          height={200}
          width={70}
          initialSelectedIndex={5}
          items={minutes.map((num) => ({ label: num.toString(), value:num }))}
          onChange={({ index }:{index:number}) => setSelectedMinute(index)}
        />
        <WheelPickerExpo
          height={200}
          width={70}
          initialSelectedIndex={0}
          items={seconds.map((num) => ({ label: num.toString(), value:num }))}
          onChange={({ index }:{index:number}) => setSelectedSecond(index)}
        />
      </View>

     <TouchableOpacity // start button
        className='bg-green-800 px-14 py-16 rounded-full mt-10'
        onPress={() => router.push({
          pathname:'/timer',
          params: {
            h: selectedHour.toString(),
            m: selectedMinute.toString(),
            s: selectedSecond.toString(),
          },
        })}>
        <Text className='text-green-300'>開始</Text>
      </TouchableOpacity>

      <TouchableOpacity // setting button
        className='bg-green-800 px-14 py-16 mt-10'
        onPress={() => router.push('/settings')}>
        <Text className='text-green-300'>設定</Text>
      </TouchableOpacity>
      

    </View>
  );
};

export default HomeScreen;

