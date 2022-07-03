import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR } from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F4F4F',
    paddingLeft: 10,
    paddingTop: 17,
  },
  wapperListCustomer: {
    backgroundColor: '#F0EDEE',
    flex: 1,
    paddingBottom: 10,
  },
  dropdownStyle: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: vw(10),
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
    fontFamily: 'Arial',
    paddingHorizontal: vw(15),
  },
  iconFilter: {
    width: vw(16),
    height: vw(16),
    resizeMode: 'contain',
  },
  txtValueDropDown: {
    fontSize: vw(10),
    color: MAIN_COLOR,
    fontFamily: 'Arial',
  },
  wapperValueDropDown: {
    alignItems: 'center',
  },
  styleInput: {
    color: '#333333',
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
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
    color: '#ffffff',
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    margin: vw(10),
    paddingHorizontal: vw(10),
  },
  wapperSearchBox: {
    backgroundColor: 'white',
  },
  txtListEmpty: {
    fontSize: 20,
    color: MAIN_COLOR,
    fontWeight: 'bold',
  },
  containerDataEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
