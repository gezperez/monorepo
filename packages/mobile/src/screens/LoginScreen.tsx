import React, { useCallback } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { gql, useLazyQuery } from '@apollo/client'
import { observer } from 'mobx-react-lite'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const LoginScreen = () => {
  const [login, { loading }] = useLazyQuery(LOGIN)

  const handleLoginPress = useCallback(() => login(), [login])

  if (loading) {
    return <ActivityIndicator style={styles.loader} />
  }

  return <TouchableOpacity onPress={handleLoginPress} />
}

type Styles = {
  loader: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  loader: {
    flex: 1,
  },
})

export default observer(LoginScreen)
