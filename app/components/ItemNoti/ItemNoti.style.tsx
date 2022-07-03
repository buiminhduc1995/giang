import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
export default StyleSheet.create({
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
    fontSize: vw(14),
    color: themes.colors.BLACK_BASIC,
  },
  txtDate: {
    fontSize: vw(13),
  },
  imageItem: {
    width: vw(90),
    height: vw(90),
    marginLeft: vw(10),
  },
});
