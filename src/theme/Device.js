import {Dimensions} from 'react-native';
import Fonts from 'theme/Fonts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const onDetectStyle = (type = '') => {
  const detectValue = type.split('-');
  const TEXT_TRANSFORM = {
    U: 'uppercase',
    L: 'lowercase',
    C: 'capitalize',
    N: 'none',
  };

  return {
    fontFamily: Fonts[(detectValue[0] || 'REGULAR').toUpperCase()],
    fontSize: +detectValue[1] || 14,
    textTransform: TEXT_TRANSFORM[detectValue[2] || 'N'],
  };
};

export {SCREEN_HEIGHT, SCREEN_WIDTH, onDetectStyle};
