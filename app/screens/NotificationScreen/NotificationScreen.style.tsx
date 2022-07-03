import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic/';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  txtBack: {
    fontSize: vw(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  wapperListCustomer: {
    // backgroundColor: '#F0EDEE',
    flex: 1,
    // paddingBottom: 10,
    // paddingTop: 5,
  },
  imageItem: {
    width: vw(90),
    height: vw(90),
    marginLeft: vw(10),
  },
  containerItem: {
    flexDirection: 'row',
    height: vw(120),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: vw(5),
  },
  content: {
    flex: 1,
    height: vw(100),
    justifyContent: 'space-between',
    marginLeft: vw(10),
    marginRight: vw(5),
  },
  txtTitle: {
    // fontWeight: 'bold',
    fontSize: vw(14),
    color: 'black',
  },
  txtDate: {
    fontSize: vw(13),
  },
});
