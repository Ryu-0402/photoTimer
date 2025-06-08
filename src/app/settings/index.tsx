import React,{useState} from 'react'
import { View,Text,TouchableOpacity,Image,Alert } from 'react-native'
import { useRouter,useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import WheelColorPicker from 'react-native-wheel-color-picker';

const settings = () => {
    const router = useRouter();
    const {h,m,s} = useLocalSearchParams();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');
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
                      className='mt-9'
                      style={{ marginRight: 300}}
                      onPress={() => router.push('../')}>
                      <Text className='bg-transparent text-green-400 text-2xl'>＜ 戻る</Text>
        </TouchableOpacity>

        <View // timer's appearance
        className='flex-row items-center justify-center mt-7'>
            <Text 
             style={{fontSize: 80, color:selectedColor}}>{formatTime()}</Text>
       </View>

        <View className='flex-row items-center justify-between mt-20'>
            
            <TouchableOpacity // picture button
            className='bg-green-800 px-14 py-16 rounded-full mt-10'
            onPress={pickImage}>
            <Text className='text-green-300'>背景画像</Text>
            </TouchableOpacity>

            <TouchableOpacity // color button
            className='bg-green-800 px-14 py-16 rounded-full mt-10'
            onPress={() => setIsColorPickerVisible(!isColorPickerVisible)}>
            <Text className='text-green-300'>文字色</Text>
            </TouchableOpacity>
        </View>

        {isColorPickerVisible && ( // color picker
            <View className='absolute bottom-0 left-0 right-0 p-4'>
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
