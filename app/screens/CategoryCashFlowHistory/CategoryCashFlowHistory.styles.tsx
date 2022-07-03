import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
import { header, body, title } from '../../constants/themes';
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
    ...header,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtCodeTrade: {
    ...title,
  },
  txtDetailTrade: {
    ...body,
    color: themes.colors.BLACK_BASIC,
  },
  center: {
    flexWrap: 'wrap',
    height: vw(60),
    justifyContent: 'space-between',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: vw(60),
  },
  buttonItem: {
    paddingHorizontal: vw(10),
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    color: themes.colors.WHITE,
    ...body,
  },
  txtAmount: {
    color: themes.colors.RED,
    ...body,
  },
  wapperList: {
    flexGrow: 1,
    backgroundColor: themes.colors.WHITE,
    marginHorizontal: vw(5),
  },
});
