import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    backgroundColor: themes.colors.WHITE,
    borderRadius: vw(5),
    marginBottom: vw(10),
  },
  inforContainer: {
    flex: 3.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: vw(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vw(3),
  },
  txt: {
    fontSize: vw(12),
    color: themes.colors.BLACK,
    marginBottom: vw(3),
  },
  textInput: {
    borderColor: themes.colors.BORDER_COLOR,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderWidth: 0.5,
    borderRadius: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: vw(10),
    height: 20,
    fontWeight: 'bold',
    color: themes.colors.BLACK,
    width: 40,
    padding: 1,
  },
  // modal
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInsideView: {
    backgroundColor: themes.colors.WHITE,
    height: vw(330),
    width: '90%',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    height: vw(30),
    backgroundColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRightColor: themes.colors.WHITE,
    borderRightWidth: 1,
    marginTop: vw(10),
  },
  nameDrug: {
    fontSize: vw(16),
    color: themes.colors.COLOR_INPUT,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtButton: {
    fontWeight: 'bold',
    fontSize: vw(14),
  },
  containerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLeft: {
    flex: 3,
  },
  rowRight: {
    flex: 7,
  },
  txtInput: {
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    height: 40,
    width: '100%',
    paddingLeft: 5,
    flex: 4,
  },

  txtSelectTime: {
    paddingLeft: 5,
    fontSize: vw(13),
  },
  checkbox: {
    height: vw(15),
    width: vw(15),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wapperCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
    marginTop: 20,
  },
  stylesModal: {
    width: vw(150),
    maxHeight: vw(120),
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: -vw(100),
    marginRight: -vw(10),
    // Shadow
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
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: themes.colors.BLACK_BASIC,
    paddingHorizontal: vw(15),
  },
  iconDropDown: {
    width: 7,
    height: 7,
    tintColor: themes.colors.BLACK_BASIC,
    position: 'absolute',
    right: 5,
  },
  iconStar: {
    position: 'absolute',
    right: 10,
    marginTop: 0,
    color: 'red',
  },
  wapperInputFilter: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    flex: 1,
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    justifyContent: 'space-around',
  },
  txtSelected: {
    marginRight: 5,
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  containerCheckBox: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconCheck: {
    width: 10,
    height: 10,
  },
  containerButton: {
    flexDirection: 'row',
    flex: 6,
    alignItems: 'center',
    position: 'absolute',
    bottom: vw(10),
    left: vw(10),
  },
  iconClose: {
    width: 10,
    height: 10,
    tintColor: themes.colors.RED,
  },
  wapperButtonCancle: {
    position: 'absolute',
    right: 0,
    marginTop: 10,
    marginRight: 10,
  },
  buttonUpdate: {
    position: 'absolute',
    right: vw(0),
    top: vw(0),
  },
  containerDropDown: {
    flex: 1,
    height: 40,
    alignItems: 'center',
  },
});

export default styles;
