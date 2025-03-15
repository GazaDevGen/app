import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffcc00',
        headerStyle: {
          backgroundColor: '#25292e',

        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',

        },
        headerTitleStyle: {
          color: '#f5f5f5',
          fontSize: 14
        },
         tabBarLabelStyle: {
          fontSize: 8, // Change the font size of tab labels
          fontWeight: 'bold', // Optional: Make it bold
        },
      }}

    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Am-Shady-Center',
          tabBarIcon: ({ focused, color }) => <Ionicons color={color} name={focused ? "home-sharp" : "home-outline"} size={20} />
        }} />
      <Tabs.Screen
        name="createOrder"
        options={{
          title: 'اضافة طلب',
          tabBarIcon: ({ focused, color }) => <Ionicons color={color} name={focused ? "person-add" : "person-add-outline"} size={22} />
        }} />

    </Tabs>
  );
}