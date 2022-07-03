import { StyleSheet } from 'react-native';

import vw from '../../utils/size-dynamic';
import { colors } from '../../constants/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  wrapperHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHeaderLeft: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  textHeaderLeft: {
    fontSize: vw(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  button: {
    width: vw(180),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW,
    borderRadius: 5,
  },
  textButton: {
    fontSize: vw(16),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  text: {
    fontSize: vw(14),
    textAlign: 'center',
    color: colors.BLACK,
    marginTop: vw(5),
  },
});

export default styles;
