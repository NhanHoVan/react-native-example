# React Native Example

A sample React Native project built using Expo, designed to demonstrate the implementation of core React Native features and libraries. This project is perfect for learning and building mobile applications for Android, iOS, and the web.

## Features

- **Multi-Platform Support**: Build apps for Android, iOS, and the web.
- **Navigation**: Powered by `@react-navigation/native` and `@react-navigation/stack`.
- **Secure Storage**: Leverages `expo-secure-store` for secure key-value storage.
- **Internationalization**: Supports multiple languages using `i18n-js`.
- **Media Handling**: Includes `expo-av` for audio/video support and `expo-speech` for text-to-speech functionality.
- **Custom UI Components**: Includes `react-native-elements` and `react-native-vector-icons` for rich UI design.
- **Dropdown and Sliders**: Utilizes `react-native-dropdown-picker` and `@react-native-community/slider`.

## Requirements

- Node.js
- Expo CLI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NhanHoVan/react-native-example.git
   cd react-native-example
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the development server:
```bash
npm start
```

### Run on Android:
```bash
npm run android
```

### Run on iOS:
```bash
npm run ios
```

### Run on Web:
```bash
npm run web
```

## Project Structure

```
│   app.json
│   App.tsx
│   babel.config.js
│   package.json
│   README.md
├───assets
├───data
└───src
    ├───components
    ├───config
    ├───locales
    ├───pages
    ├───public
    ├───types
    └───utils
```

## Key Dependencies

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [React Native Elements](https://reactnativeelements.com/)
- [i18n-js](https://github.com/fnando/i18n-js)

## Development

### Code Formatting:
Run Prettier and ESLint to format and lint the code:
```bash
npm run format
npm run lint
```

## License

This project is private and not intended for redistribution.
