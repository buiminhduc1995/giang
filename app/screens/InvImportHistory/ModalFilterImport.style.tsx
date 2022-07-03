import { StyleSheet, Dimensions, Platform } from 'react-native';
let { width } = Dimensions.get('window');
import { MAIN_COLOR, themes } from '../../constants';
import vw from '../../utils/size-dynamic';
export default StyleSheet.create({
  container: { flex: 1 },
  viewNoti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wapper: {
    width: '100%',
    paddingHorizontal: vw(5),
  },
  wapperTouch: {
    width: width / 2 - 15,
    height: vw(81),
    margin: vw(5),
    paddingLeft: vw(5),
    borderRadius: vw(5),
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: vw(12),
    color: themes.colors.WHITE,
  },
  txtDanger: {
    color: themes.colors.RED,
    fontSize: vw(14),
  },
  txtDetail: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: vw(12),
    fontWeight: '300',
  },
  icon: {
    width: vw(14),
    height: vw(7),
    marginRight: vw(10),
  },
  touch: {
    width: vw(100),
    height: vw(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wapperNotiDranger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: vw(10),
  },
  wapperModal: {
    marginLeft: vw(10),
  },
  wapperCard: {
    flexDirection: 'row',
    marginTop: vw(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wapperTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vw(10),
  },
  wapperHederRight: {
    width: vw(120),
    height: vw(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.YELLOW,
    borderRadius: vw(5),
    marginRight: vw(10),
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalInsideView: {
    backgroundColor: 'white',
    height: '50%',
    width: '90%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  wapperCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vw(3),
  },
  txtFilter: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: vw(14),
  },
  txtSelectTime: {
    paddingLeft: vw(5),
    fontSize: vw(13),
  },
  buttonCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    height: vw(10),
    width: vw(10),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: vw(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wapperInputFilter: {
    flexDirection: 'row',
    height: vw(40),
    // width: '100%',
    borderRadius: vw(5),
    padding: vw(3),
    borderColor: themes.colors.GRAY,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(10),
  },
  buttonFilter: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
    borderRadius: vw(5),
  },
  txtHeaderLeft: {
    fontSize: vw(18),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  txtHeaderRight: {
    fontSize: vw(12),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  dropdownStyle: {
    width: '50%',
    // height: 'auto',
    maxHeight: vw(120),
    borderRadius: vw(3),
    overflow: 'hidden',
    // marginTop: vw(50),
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
  wapperConditionChart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // marginTop: 10,
    backgroundColor: 'white',
    paddingTop: 3,
    borderTopLeftRadius: vw(5),
    borderTopRightRadius: vw(5),
    height: vw(40),
  },
  txtStatistical: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: vw(14),
    paddingLeft: vw(10),
  },
  buttonAccpect: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(16),
  },
  txtDateTime: {
    fontSize: vw(12),
    color: '#666666',
  },
  buttonFilterModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    padding: vw(3),
    borderRadius: vw(5),
    marginLeft: vw(10),
    width: vw(50),
    justifyContent: 'center',
    height: vw(40),
    marginRight: vw(5),
  },
  iconFilter: {
    width: vw(12),
    height: vw(12),
    tintColor: themes.colors.WHITE,
  },
  buttonNoti: {
    marginRight: 10,
    width: 28,
    height: 28,
    backgroundColor: '#81B356',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberInfo: {
    fontSize: vw(10),
    color: 'white',
    position: 'absolute',
    // top: -3,
    // right: -5,
    fontWeight: 'bold',
  },
  containerNoti: {
    backgroundColor: '#FF7E00',
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -8,
  },
  buttonCancel: {
    position: 'absolute',
    right: 0,
    marginTop: vw(10),
    marginRight: vw(10),
  },
  iconClose: {
    width: vw(10),
    height: vw(10),
    tintColor: themes.colors.RED,
  },
  iconCheck: {
    width: vw(10),
    height: vw(10),
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vw(10),
  },
  txtFilterButton: {
    color: themes.colors.WHITE,
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  iconDropDown: {
    width: vw(14),
    height: vw(14),
    tintColor: themes.colors.BLACK_BASIC,
  },
  dropDownText: {
    fontSize: vw(14),
    fontFamily: themes.fontFamily.fontFamily,
  },
});