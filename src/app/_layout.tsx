import { Text } from 'react-native';
import {Stack} from "expo-router";
import { StatusBar } from 'expo-status-bar';
import "../global.css";

const Layout = () => (<>
<Stack screenOptions={{ headerShown: false }}>
  {/* <Stack.Screen
    name="settings/index"
    options={{
      headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'green',
        headerBackTitle: '戻る',
    }}
  /> */}
</Stack>

<StatusBar style="auto"/>
</>);

export default Layout;
