import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { header, colors } from '../../constants/themes';

const styles = StyleSheet.create({
  //Header
  wrapperHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHeaderLeft: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  titleHeaderLeft: {
    ...header,
    fontWeight: 'bold',
  },
  containerNumberProduct: {
    backgroundColor: '#FF7E00',
    height: 17,
    width: 17,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -7,
    right: -5,
  },
  iconCart: {
    width: vw(25),
    height: vw(25),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  numberProduct: {
    fontSize: vw(12),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  //Main
  container: {
    flex: 1,
    backgroundColor: '#DADADA',
  },
  wrapperCamera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  camera: {
    flex: 7.5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTaken: {
    width: 300,
    height: 300,
    zIndex: 1,
    position: 'absolute',
  },
  flipButton: {
    backgroundColor: colors.MAIN_COLOR,
    height: '60%',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(8),
  },
  flipText: {
    color: '#FFF',
    fontSize: vw(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  borderIcon: {
    height: vw(15),
    width: vw(15),
    position: 'absolute',
  },
  item: {
    flex: 2.5,
    paddingTop: vw(10),
    paddingHorizontal: vw(-10),
  },
  textNull: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
    marginTop: vw(15),
  },
  wrapperButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;
