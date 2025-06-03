import { Text } from 'react-native';
import {Stack} from "expo-router";
import { StatusBar } from 'expo-status-bar';
import "../global.css";

const Layout = () => (<>
<Stack>
    <Stack.Screen 
      name="settings" 
      options={{
        headerShown: false,
        }}/>
</Stack>

<StatusBar style="auto"/>
</>);

export default Layout;
