import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AuthStack from './AuthStack'
import GenericStack from './GenericStack'
import HomeStack from './HomeStack'
import { navigationRef } from './RootNavigator'

const Stack = createStackNavigator()

const Navigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="GenericStack" component={GenericStack} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigator
