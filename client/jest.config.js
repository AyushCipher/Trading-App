module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@invertase|@react-native-google-signin|react-native-.*|lottie-react-native|react-redux|@reduxjs/toolkit|redux-persist|uuid)/)',
  ],
  setupFiles: ['./jest/setup.js'],
};
