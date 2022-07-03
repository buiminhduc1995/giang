import { StyleSheet, Platform } from 'react-native';
import { MAIN_COLOR, BLACK } from '../../constants';
import vw from '../../utils/size-dynamic';
import { colors } from '../../constants/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stylesModal: {
    width: vw(150),
    // height: 'auto',
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
  txtModal: {
    fontSize: vw(10),
    color: MAIN_COLOR,
    fontFamily: 'Arial',
  },
  imageModal: {
    width: vw(16),
    height: vw(16),
    resizeMode: 'contain',
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    paddingHorizontal: vw(15),
  },
  contentContainerEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wapperSectionList: {
    paddingHorizontal: vw(10),
    backgroundColor: '#F0EDEE',
    flex: 1,
  },
  wrapperEmptyList: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingBottom: vw(5),
  },
  containerDataEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  txtListEmpty: {
    fontSize: vw(16),
    color: colors.MAIN_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputSearchBox: {
    color: '#333333',
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
    fontSize: vw(14),
  },
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    marginHorizontal: vw(10),
    marginVertical: vw(5),
    paddingHorizontal: vw(10),
    flex: 1,
  },
  iconSearchBox: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  wapperSearchBox: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wapperModalBox: {
    alignItems: 'center',
  },
  iconFilter: {
    width: vw(15),
    height: vw(15),
    tintColor: colors.WHITE,
  },
  wapperHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: vw(10),
  },
  buttonCreate: {
    width: '100%',
    height: vw(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    borderRadius: 5,
    marginBottom: vw(3),
  },
  txtHeaderRight: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  text: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: BLACK,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(5),
    paddingVertical: vw(3),
    paddingHorizontal: vw(5),
    borderRadius: vw(3),
  },
  iconRight: {
    width: vw(10),
    height: vw(10),
    tintColor: MAIN_COLOR,
  },
});

export default styles;
