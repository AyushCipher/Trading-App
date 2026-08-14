jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    getBoolean: jest.fn(),
    contains: jest.fn(),
  })),
}));

jest.mock('react-native-biometrics', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    isSensorAvailable: jest.fn(() => Promise.resolve({ available: false })),
    simplePrompt: jest.fn(() => Promise.resolve({ success: false })),
  })),
  BiometryTypes: { TouchID: 'TouchID', FaceID: 'FaceID', Biometrics: 'Biometrics' },
}));

jest.mock('react-native-orientation-locker', () => ({
  lockToPortrait: jest.fn(),
  lockToLandscape: jest.fn(),
  unlockAllOrientations: jest.fn(),
  addOrientationListener: jest.fn(),
  removeOrientationListener: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(),
    signOut: jest.fn(),
  },
}));

jest.mock('@invertase/react-native-apple-authentication', () => ({
  appleAuth: {
    performRequest: jest.fn(),
    isSupported: false,
  },
  AppleButton: 'AppleButton',
}));

jest.mock('lottie-react-native', () => 'LottieView');

jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

jest.mock('@react-native-community/checkbox', () => 'CheckBox');
jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');
jest.mock('react-native-modal-datetime-picker', () => 'DateTimePickerModal');
