import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
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
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30,
  },
  containerFuntionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
    paddingTop: 5,
    marginBottom: vw(10),
  },
  containerTitle: {
    height: 40,
    width: '100%',
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    paddingHorizontal: 5,
  },
  txtTitle: {
    fontSize: vw(16),
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
  txtFunction: {
    fontSize: vw(14),
  },
  wapperButton: {
    width: '100%',
    padding: vw(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themes.colors.WHITE,
    height: vw(50),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  button: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    height: vw(30),
    borderRadius: vw(5),
  },
  txtButton: {
    fontSize: vw(14),
    fontWeight: '400',
  },
  productListContainer: {
    borderRadius: vw(5),
    marginBottom: vw(5),
    backgroundColor: themes.colors.WHITE,
  },
});
