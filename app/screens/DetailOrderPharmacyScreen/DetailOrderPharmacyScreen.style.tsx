import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { MAIN_COLOR, BLACK, BACKGROUND_COLOR } from '../../constants/index';
export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: BACKGROUND_COLOR,
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  txtHeader: {
    fontSize: vw(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  iconTitle: {
    width: vw(20),
    height: vw(20),
    resizeMode: 'contain',
  },
  containerTitle: {
    width: '100%',
    paddingHorizontal: vw(5),
    height: vw(35),
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: vw(10)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listProduct: {
    paddingHorizontal: vw(5),
    paddingVertical: vw(10),
  },
  txtTitle: {
    fontSize: vw(14),
    color: BLACK,
    fontWeight: 'bold',
    // marginLeft: vw(10)
  },
  number: {
    fontSize: vw(12),
  },
  txtCode: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: 'black',
  },
  time: {
    fontSize: vw(12),
    color: 'black',
  },
  status: {
    fontSize: vw(12),
    color: 'black',
  },
  line: {
    width: vw(2),
    height: vw(300),
    backgroundColor: "#2E2E2E",
    alignItems: 'center',
    marginTop: vw(25)
  },
  containerProgress: {
    width: '100%',
    padding: vw(10),
    height: vw(400),
    flexDirection: 'row',
    marginBottom: vw(20),
    backgroundColor: 'white'
  },
  circle: {
    width: vw(10),
    height: vw(10),
    marginBottom: vw(40),
    borderRadius: vw(5)
  },
  containerText: {
    width: '100%',
    height: vw(300),
    marginHorizontal: vw(10),
  },
  wapperTxt: {
    width: '100%',
    height: vw(50),
    borderBottomColor: BLACK,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  h3: {
    // color: 'black',
    fontSize: vw(14)
  },
  h2: {
    // color: 'black',
    fontSize: vw(12)
  },
  icon: {
    width: vw(10),
    height: vw(10),
    resizeMode: 'contain',
  }
});
