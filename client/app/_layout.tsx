import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

export default function RootLayout() {



  return (
    <>
      <Stack>
        <StatusBar style='light' />

        <Stack.Screen name="(tabs)"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="orderDetail/[id]"
          options={{
            title: 'order details',
            headerStyle: {
              backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',

            headerTitleStyle: {
              color: '#f5f5f5',
              fontSize: 16
            }
          }}

        />
      </Stack>

      <Toast />

    </>
  )
}
