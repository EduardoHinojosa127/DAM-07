import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import UserList from './screens/UserList';
import CreateUserScreen from './screens/createUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import EditUserScreen from './screens/EditUserScreen';

const Stack = createStackNavigator()

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='UserList' component={UserList}/>
      <Stack.Screen name='CreateUserScreen' component={CreateUserScreen}/>  
      <Stack.Screen name='UserDetailScreen' component={UserDetailScreen}/>
      <Stack.Screen name='EditUserScreen' component={EditUserScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}


