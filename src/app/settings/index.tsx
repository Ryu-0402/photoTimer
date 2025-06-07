import React,{useState} from 'react'
import { View,Text,TouchableOpacity,Image,Alert } from 'react-native'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

const settings = () => {
    const router = useRouter();
    const [imageUri, setImageUri] = useState<string | null>(null);

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

        <View className='flex-row items-center justify-center mt-7'>
            <Text 
             className='text-white'
             style={{fontSize: 80, color: 'white'}}>00:00:00</Text>
            </View>

        <View className='flex-row items-center justify-between mt-20'>
            
            <TouchableOpacity // picture button
            className='bg-green-800 px-14 py-16 rounded-full mt-10'
            onPress={pickImage}>
            <Text className='text-green-300'>背景画像</Text>
            </TouchableOpacity>

            <TouchableOpacity // color button
            className='bg-green-800 px-14 py-16 rounded-full mt-10'>
            <Text className='text-green-300'>文字色</Text>
            </TouchableOpacity>

        </View>    
    </View>
  )
}
  

export default settings;
