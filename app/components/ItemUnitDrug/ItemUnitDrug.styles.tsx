import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants/';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    marginTop: vw(5),
    elevation: 7,
    paddingTop: vw(15),
  },
  right: {
    flex: 1,
    justifyContent: 'center',
  },
  left: {
    position: 'absolute',
    top: vw(0),
    right: vw(0),
  },
  icon: {
    tintColor: themes.colors.MAIN_COLOR,
    width: vw(20),
    height: vw(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: vw(5),
  },
  wapper: {
    flex: 1,
    width: '100%',
    height: vw(40),
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    marginLeft: vw(10),
  },
  leftRow: {
    width: vw(100),
  },
  txt: {
    paddingBottom: vw(2),
  },
  styleModal: {
    width: 150,
    maxHeight: vw(120),
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: -vw(10),
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconCaretDown: {
    width: vw(7),
    height: vw(7),
    tintColor: themes.colors.BLACK,
    position: 'absolute',
    right: vw(5),
    resizeMode: 'contain',
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    paddingHorizontal: vw(15),
  },
  wapperQuanlityDrug: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginLeft: vw(10),
  },
  modal: {
    width: '100%',
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    height: vw(40),
    justifyContent: 'center',
  },
  txtSelected: {
    marginRight: 5,
    fontSize: vw(14),
  },
  txt14: {
    fontSize: vw(14),
  },
  input: {
    paddingLeft: vw(5),
    fontSize:vw(14)
  },
});
