import React,{use, useState} from 'react'
import { View,Text,TouchableOpacity,Image,Alert,Dimensions,TouchableWithoutFeedback } from 'react-native'
import { useRouter,useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import WheelColorPicker from 'react-native-wheel-color-picker';
import { useTimerSettings } from '../stores/useTimerSettings';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const settings = () => {
    const router = useRouter();
    const {h,m,s} = useLocalSearchParams();
    const {imageUri, setImageUri} = useTimerSettings();
    const {selectedColor, setSelectedColor} = useTimerSettings();
    const [isColorPickerVisible, setIsColorPickerVisible] = useState<boolean>(false);


    // Function to pick an image from the gallery
    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };


    const formatTime = () => {
      const mm= String(m).padStart(2, '0');
      const ss= String(s).padStart(2, '0');  
     if (h === '0') {
      return `${mm}:${ss}`;
     }else
      return `${h}:${mm}:${ss}`;
    };

 
  return (
    <View className='bg-black flex-1'>
        
    {imageUri && (
      <Image
        source={{ uri: imageUri }}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      />
    )}
        
        <TouchableOpacity // back button
                      style={{ 
                        marginRight: screenWidth* 0.5,
                        marginTop: screenHeight * 0.05,}}
                      onPress={() => router.push('../')}>
                      <Text 
                       className='bg-transparent text-green-400'
                       style={{fontSize:screenWidth*0.07}}>＜ 戻る</Text>
        </TouchableOpacity>

        <View // timer's appearance
        className='flex-row items-center justify-center'>
            <Text 
             style={{
              fontSize: screenWidth*0.24, 
              color:selectedColor
              }}>{formatTime()}</Text>
       </View>

        <View className='flex-row items-center justify-between mt-20'>
            
            <TouchableOpacity // picture button
            className='bg-gray-600 mt-10 opacity-70 justify-center items-center'
             style={{
              width: screenWidth*0.3,
              height: screenWidth*0.3,
              borderRadius: (screenWidth*0.3)/2,
              marginTop: screenHeight * 0.05,
            }}
            onPress={pickImage}>
            <Text 
              className='text-white'
              style={{fontSize:screenWidth * 0.05}}>背景画像</Text>
            </TouchableOpacity>

            <TouchableOpacity // color button
            className='bg-gray-600 opacity-70 justify-center items-center'
            style={{
              width: screenWidth*0.3,
              height: screenWidth*0.3,
              borderRadius: (screenWidth*0.3)/2,
              marginTop: screenHeight * 0.05,
            }}
            onPress={() => setIsColorPickerVisible(!isColorPickerVisible)}>
            <Text 
              className='text-white font-bold'
              style={{fontSize:screenWidth*0.05}}>文字色</Text>
            </TouchableOpacity>
        </View>

        {isColorPickerVisible && ( // color picker
            <View className='absolute bottom-0 '
                  style={{
                    width: screenWidth*0.9, 
                    height: screenHeight * 0.2,
                    marginBottom: screenHeight * 0.25,
                    alignSelf: 'center',
                    }}>
                <WheelColorPicker
                    color={selectedColor}
                    onColorChange={setSelectedColor}

                />
            </View>
        )}

    </View>
  )
}
  

export default settings;
