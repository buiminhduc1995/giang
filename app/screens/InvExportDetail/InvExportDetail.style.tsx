import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { BLACK, BACKGROUND_COLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  wrapHeader: {
    flexDirection: 'row',
    padding: vw(10),
    backgroundColor: BACKGROUND_COLOR,
  },
  wrapHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageHearderLeft: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  textHeaderLeft: {
    fontSize: vw(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonHeaderRight: {
    width: '100%',
    height: vw(30),
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: vw(5),
  },
  textHeaderRight: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#FFF',
  },
  wrapContent: {
    flex: 1,
    padding: vw(10),
  },
  title: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: BLACK,
    marginBottom: vw(5),
    fontFamily: 'Arial',
  },
  inforContainer: {
    marginBottom: vw(10),
    backgroundColor: 'white',
    borderRadius: vw(5),
  },
  item: {
    width: '100%',
    height: vw(35),
    flexDirection: 'row',
    paddingHorizontal: vw(10),
    alignItems: 'center',
  },
  field: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: BLACK,
    width: '30%',
    lineHeight: vw(35),
  },
  content: {
    width: '70%',
    color: BLACK,
    fontSize: vw(14),
    fontFamily: 'Arial',
    lineHeight: vw(35),
    textAlignVertical: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: BACKGROUND_COLOR,
  },
  imageIndicator: {
    alignSelf: 'center',
    width: vw(25),
    height: vw(40),
  },
  textIndicator: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '600',
  },
  productListContainer: {
    flex: 1,
    borderRadius: vw(5),
    marginBottom: vw(5),
    backgroundColor: '#FFF',
  },
  button: {
    width: vw(60),
    height: vw(60),
    backgroundColor: 'red',
    borderRadius: vw(30),
    position: 'absolute',
    bottom: vw(20),
    right: vw(20),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#333',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
      },
      android: {
        elevation: 24,
      },
    }),
  },
  txtAnimation: {
    fontSize: vw(12),
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
