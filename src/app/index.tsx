import React, { useState,useEffect, use, useRef } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Notifications from "expo-notifications";
import * as Haptics from "expo-haptics";

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const seconds = Array.from({ length: 60 }, (_, i) => i);
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");


const HomeScreen = () => {
  const router = useRouter();
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(5);
  const [selectedSecond, setSelectedSecond] = useState(0);
  const isNavigating = useRef(false);

  useEffect(() => {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          const requwestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
              alert('通知の許可が必要です。設定から許可してください。');
            }
          };
          requwestPermissions();
          return () => {
              ScreenOrientation.unlockAsync();
          };
        },[]);
  
  useEffect(() => {
    Haptics.selectionAsync();
  }
, [selectedHour, selectedMinute, selectedSecond]);       

  return (<View className="flex-1 items-center justify-center bg-black relative">
    
      <View className="absolute top-0 items-center justify-center">
       
        <View //h m s
          className="flex-1 flex-row bg-black items-center justify-center"
          style={{
            columnGap: screenWidth * 0.18,
            marginTop: screenHeight * 0.05,
          }}
        >
          <Text
            className=" text-white font-thin"
            style={{ fontSize: screenWidth * 0.2 }}
          >
            h
          </Text>
          <Text
            className=" text-white font-thin"
            style={{ fontSize: screenWidth * 0.2 }}
          >
            m
          </Text>
          <Text
            className=" text-white font-thin"
            style={{ fontSize: screenWidth * 0.2 }}
          >
            s
          </Text>
        </View>

        <View //pickers
          className="flex-1 flex-row bg-black"
          style={{
            columnGap: screenWidth * 0.05,
          }}
        >
          <WheelPickerExpo
            backgroundColor="#000000"
            selectedStyle={{
              borderColor: "#00cc00",
              borderWidth: 0.5,
            }}
            height={screenHeight * 0.5}
            width={screenWidth * 0.25}
            initialSelectedIndex={0}
            items={hours.map((num) => ({ label: num.toString(), value: num }))}
            onChange={({ index }: { index: number }) => setSelectedHour(index)}
          />
          <WheelPickerExpo
            backgroundColor="#000000"
            selectedStyle={{
              borderColor: "#00cc00",
              borderWidth: 0.5,
            }}
            height={screenHeight * 0.5}
            width={screenWidth * 0.25}
            initialSelectedIndex={5}
            items={minutes.map((num) => ({
              label: num.toString(),
              value: num,
            }))}
            onChange={({ index }: { index: number }) =>
              setSelectedMinute(index)
            }
          />
          <WheelPickerExpo
            backgroundColor="#000000"
            selectedStyle={{
              borderColor: "#00cc00",
              borderWidth: 0.5,
            }}
            height={screenHeight * 0.5}
            width={screenWidth * 0.25}
            initialSelectedIndex={0}
            items={seconds.map((num) => ({
              label: num.toString(),
              value: num,
            }))}
            onChange={({ index }: { index: number }) =>
              setSelectedSecond(index)
            }
          />
        </View>
      </View>
      
      <View
        className="flex-row absolute bottom-0 justify-between w-full"> 
        <TouchableOpacity // setting button
          className=""
          style={{ marginLeft: screenWidth * 0.03}}
          onPress={() =>{
            if (isNavigating.current) return;
            isNavigating.current = true;

            router.push({
              pathname: "/settings",
              params: {
                h: selectedHour.toString(),
                m: selectedMinute.toString(),
                s: selectedSecond.toString(),
              },
          });
          setTimeout(() => {
            isNavigating.current = false;
          }, 500);
        }}
        >
          <Text 
          className="text-white"
          style={{
            fontSize:screenWidth*0.12,
          }}>設定</Text>
        </TouchableOpacity> 

        <TouchableOpacity // start button
          className="rounded-full"
          style={{ marginRight: screenWidth * 0.03}}
          onPress={() =>{
            if (selectedHour === 0 && selectedMinute === 0 && selectedSecond === 0) {
              return;
            }
            if (isNavigating.current) return;
            isNavigating.current = true;
            router.push({
              pathname: "/timer",
              params: {
                h: selectedHour.toString(),
                m: selectedMinute.toString(),
                s: selectedSecond.toString(),
              },
            })
            setTimeout(() => {
              isNavigating.current = false;
            }, 500);
          }}
        >
          <Text 
            className="text-green-400"
            style={{fontSize:screenWidth * 0.12}}>開始</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
