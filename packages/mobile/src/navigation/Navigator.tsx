import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AuthStack from './AuthStack'
import HomeStack from './HomeStack'

const Stack = createStackNavigator()

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigator
