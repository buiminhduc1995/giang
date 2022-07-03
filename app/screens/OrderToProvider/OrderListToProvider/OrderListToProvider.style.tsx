import { StyleSheet, RecyclerViewBackedScrollView } from 'react-native';
import vw from '../../../utils/size-dynamic';
import { BACKGROUND_COLOR, BLACK, MAIN_COLOR, themes } from '../../../constants';

export const styles = StyleSheet.create({
  /////////////////////
  container: {
    flex: 1,
    backgroundColor: themes.colors.BACKGROUND_COLOR,
  },
  title: {
    fontSize: vw(16),
    color: themes.colors.BLACK,
    fontWeight: 'bold',
    marginLeft: vw(10),
    lineHeight: vw(30),
  },
  text: {
    fontSize: vw(12),
    color: themes.colors.BLACK,
    lineHeight: vw(23),
  },
  //header
  wrapperHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  titleHeader: {
    fontSize: vw(18),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  containerNumberProduct: {
    backgroundColor: themes.colors.YELLOW,
    height: vw(17),
    width: vw(17),
    borderRadius: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: vw(-7),
    right: vw(-5),
  },
  iconCart: {
    width: vw(25),
    height: vw(25),
    resizeMode: 'contain',
    tintColor: themes.colors.WHITE,
  },
  numberProduct: {
    fontSize: vw(12),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
    textAlign: 'center',
  },
  //infor order
  containerInfo: {
    backgroundColor: themes.colors.WHITE,
    paddingHorizontal: vw(10),
  },
  emptyList: {
    flexGrow: 1,
    backgroundColor: themes.colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicator: {
    alignSelf: 'center',
    width: vw(25),
    height: vw(40),
  },
  textIndicator: {
    textAlign: 'center',
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: '600',
    marginTop: vw(10),
    fontSize: vw(12),
  },
  textInputBox: {
    fontSize: vw(12),
    flex: 1,
    textAlignVertical: 'top',
    padding: vw(4),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: vw(1),
    marginBottom: vw(5),
  },
  //listOrder
  containerListOrder: {
    flexGrow: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  //price
  containerPrice: {
    backgroundColor: themes.colors.WHITE,
    marginVertical: vw(7),
    paddingVertical: vw(7),
  },
  lineStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(10),
    alignItems: 'center',
  },
  //button
  containerButton: {
    paddingTop: vw(7),
    backgroundColor: themes.colors.WHITE,
  },
  button: {
    height: vw(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(10),
    marginVertical: vw(7),
    marginHorizontal: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
  },
  //button add product
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.YELLOW,
    borderRadius: vw(5),
    paddingHorizontal: vw(7),
    paddingVertical: vw(5),
  },
  textAdd: {
    fontSize: vw(12),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
});
