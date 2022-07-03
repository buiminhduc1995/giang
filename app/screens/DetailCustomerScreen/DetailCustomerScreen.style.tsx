import { StyleSheet, Platform } from 'react-native';
import { MAIN_COLOR } from '../../constants/';
import vw from '../../utils/size-dynamic';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wapper: {
    backgroundColor: '#F0EDEE',
    // paddingHorizontal: 10,
    flex: 1,
  },
  buttonEdit: {
    flexDirection: 'row',
    height: 20,
    width: 54,
    justifyContent: 'space-around',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 20,
  },
  txt: {
    fontSize: 12,
  },
  txtTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  wapperLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  button: {
    backgroundColor: MAIN_COLOR,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '90%',
  },
  txtButton: {
    fontSize: vw(15),
    color: 'white',
  },
  txtDetail: {
    fontSize: 12,
    color: '#828282',
  },
  wapperTotal: {
    height: 50,
    borderColor: '#F2C94C',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 12,
    backgroundColor: '#FDF8EB',
  },
  styleModal: {
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
  txtInput: {
    fontSize: 13,
    fontWeight: 'bold',
    flex: 6,
    height: 30,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },
  boderBottomLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 7,
    height: 30,
  },
  wapperTotalOrder: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#A9E498',
  },
  wapperLayout: {
    paddingHorizontal: 10,
  },
  containerFooter: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
