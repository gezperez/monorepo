import { LogBox, Text, TextInput } from 'react-native'

// WORKAROUND: To avoid "Unhandled JS Exception: Invariant Violation..." error https://github.com/kmagiera/react-native-gesture-handler/issues/320
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import '@react-native-firebase/crashlytics'

// Avoid long setTimeout RN warning
// check: https://github.com/facebook/react-native/issues/12981
LogBox.ignoreLogs(['Setting a timer'])

// Avoid warn in every interaction introduced by 0.61
// https://github.com/kmagiera/react-native-gesture-handler/issues/746
LogBox.ignoreLogs(['RCTRootView cancelTouches'])

LogBox.ignoreLogs(['RNReactNativeHapticFeedback is not available'])

// Lets ignore them until the external dependencies fix the warnings
LogBox.ignoreLogs(['Require cycle: node_modules/react-native-maps/lib/components/MapView.js'])
LogBox.ignoreLogs(['Require cycle: ../../node_modules/rn-fetch-blob/index.js'])

Text.defaultProps = {
  ...Text.defaultProps,
  maxFontSizeMultiplier: 1.5,
}

TextInput.defaultProps = {
  ...TextInput.defaultProps,
  maxFontSizeMultiplier: 1.5,
}

require('~/App')
