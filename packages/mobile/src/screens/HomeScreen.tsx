import React from 'react'
import { TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'

import { useStore } from '~/store'

const HomeScreen = () => {
  const { authStore } = useStore()

  console.log('aca', authStore)

  return (
    <TouchableOpacity onPress={() => authStore.signIn()} style={{ width: 100, height: 1000, backgroundColor: 'red' }} />
  )
}

export default observer(HomeScreen)
