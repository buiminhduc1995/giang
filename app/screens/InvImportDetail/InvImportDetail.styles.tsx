import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, themes } from '../../constants/';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  txtHeaderLeft: {
    fontSize: vw(18),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  containerFuntionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: vw(5),
    paddingTop: vw(5),
    // marginBottom: vw(5),
  },
  containerTitle: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    paddingHorizontal: vw(5),
  },
  txtTitle: {
    fontSize: vw(16),
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
  txtFuntion: {
    fontSize: vw(14),
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    width: vw(60),
    height: vw(60),
    bottom: vw(20),
    right: vw(20),
    borderRadius: vw(30),
  },
  button: {
    width: vw(60),
    height: vw(60),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.1,
    // shadowOffset: { x: 2, y: 0 },
    shadowRadius: vw(2),
    borderRadius: vw(30),
    position: 'absolute',
    bottom: vw(20),
    right: vw(20),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    // shadowOpacity: 0.30,
    // shadowRadius: 4.65,

    elevation: 8,
  },
  other: {
    backgroundColor: themes.colors.RED,
  },
  update: {
    backgroundColor: themes.colors.BLUE,
  },
  payText: {
    backgroundColor: themes.colors.MAIN_COLOR,
  },
  pay: {
    backgroundColor: themes.colors.YELLOW,
  },
  label: {
    color: themes.colors.WHITE,
    position: 'absolute',
    fontSize: vw(14),
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  txtAnimation: {
    fontSize: vw(12),
    color: themes.colors.WHITE,
    fontWeight: 'bold',
  },
  txtLeft: {
    fontWeight: 'bold',
    color: themes.colors.BLACK,
    fontSize: vw(12),
    lineHeight: vw(25),
  },
  txtRight: {
    color: themes.colors.BLACK,
    fontSize: vw(14),
    lineHeight: vw(25),
  },
  wapperItem: {
    backgroundColor: themes.colors.WHITE,
    marginHorizontal: vw(5),
    borderRadius: vw(5),
  },
});
