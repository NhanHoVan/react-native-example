import {Dimensions, Platform, StatusBar} from 'react-native';

const COLORS = {
  primary: "#FD6423",
  secondary: "#343434",
  black: "#000000",
  gray: "#9A9A9A",
  gray2: "#C1C0C8",
  gray3: "#DADADA",
  gray4: "#E2E2E2",
  dimGray: "#696969",
  green: "#039400",
  lightgreen: '#D7FFB8',
  red: "#FF0000",
  lightred: "#FFCCCB",
  white: "#FFFFFF",
  lightWhite: "#FAFAFC",
  darkorange: "#C64A25",
  yellow: "#ffff00",
  dim: "#00000080"
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 38,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const LOGO_SOURCE = require('../public/Images/nophoto.png');

const BACKGROUND_SOURCE = require('../public/Images/background.png');

const NOPHOTO_SOURCE = require('../public/Images/nophoto.png');

const NODATA_SOURCE = require('../public/Images/nodata.png');

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

const WINDOW_HEIGHT = Dimensions.get('window').height;

const SCREEN_H = (Platform.OS === 'ios') ? WINDOW_HEIGHT : WINDOW_HEIGHT + STATUS_BAR_HEIGHT;

const SCREEN_W = Dimensions.get('window').width;

export { COLORS, SIZES, SHADOWS, BACKGROUND_SOURCE, NOPHOTO_SOURCE, SCREEN_H, SCREEN_W, NODATA_SOURCE, LOGO_SOURCE };
