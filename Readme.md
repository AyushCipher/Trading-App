# Trading App

A modern, lightweight trading application built with React Native 0.83, Node.js, and React.js, featuring real-time trading capabilities with secure authentication mechanisms.

![React Native](https://img.shields.io/badge/React%20Native-0.83-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)
![React](https://img.shields.io/badge/React.js-Latest-61dafb.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

##  Features

###  Security
- **Solid 2FA Mechanism**: Two-factor authentication for enhanced security
- **PIN Lock**: Additional device-level security layer
- **Rate Limitation for OTP**: Prevention of brute-force attacks
- **SMTP Service**: Secure email delivery for notifications and OTP

###  Trading Features
- **Real-time Trading Simulation**: Live trading experience using Socket.io
- **Buy/Sell Operations**: Seamless trading execution
- **Lightweight TradingView Charts**: Efficient and responsive charting
- **Portfolio Management**: Track your investments in real-time

###  Technical Highlights
- **Cross-Platform**: Built with React Native for iOS and Android
- **Real-time Updates**: WebSocket connections for live data
- **Modern Stack**: Latest versions of Node.js and React.js
- **Optimized Performance**: Lightweight and fast performance

##  Technology Stack

### Frontend
- **React Native 0.83**
- **React.js** (Latest)
- **Lightweight TradingView Charts**
- **Socket.io Client**

### Backend
- **Node.js** (Latest)
- **Express.js**
- **Socket.io**
- **JWT Authentication**
- **SMTP Integration**

### Security
- **2FA Implementation**
- **PIN Lock System**
- **Rate Limiting**
- **Encrypted Storage**

##  Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native development environment
- iOS/Android simulator or physical device
- Make sure add Add your envs in .env_template_local (server rename to .env)
- client env.tsx and API.tsx file make sure pointing to correct route and google client ID.


##  Run
- Start your server 
`
npm run dev
`
- Start your chart client 
`
npm start
`
- Finally start your React Native Project
`
npm install 
`

- For Mac Users
`
cd ios && pod install && cd .. && npm run ios
`
- For Win Users
`
npm run android
`


## Support & Connect

<!-- GitHub Star -->
[![GitHub Repo](https://img.shields.io/badge/GitHub-trading__app-181717?style=for-the-badge&logo=github)](https://github.com/Ritik5Prasad/trading_app)

<!-- Buy Me a Coffee -->
<a href="https://www.buymeacoffee.com/ritikprasad" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

<!-- Topmate -->
<a href="https://topmate.io/ritik_prasad" target="_blank">
  <img src="https://img.shields.io/badge/Book%20a%20Session-%2300BFFF.svg?&style=for-the-badge&logo=google-meet&logoColor=white" height="40">
</a>


