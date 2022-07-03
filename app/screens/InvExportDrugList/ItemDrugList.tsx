import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BLACK, MAIN_COLOR, IMAGE_DRUG } from '../../constants';
import vw from '../../utils/size-dynamic';
import { ModalCustom } from '../../elements/ModalCustom';

type Props = {
  item: any;
  itemSelected?: any;
  addProduct?: any;
  updateProduct?: any;
  renderModal?: any;
  selected?: boolean;
  listProductExport?: any;
  onPress?: any;
};

type State = {
  indexDropdown: number;
};

class ItemDrugList extends React.PureComponent<Props, State> {
  state: State = {
    indexDropdown: 0,
  };

  _onPress = () => {
    const { item, onPress } = this.props;
    const { indexDropdown } = this.state;
    onPress(item, indexDropdown);
  };

  render() {
    const { item, itemSelected, selected } = this.props;
    const { indexDropdown } = this.state;
    const options = item.units.map((e: any) => e.unit_name);
    return (
      <TouchableOpacity style={styles.container} onPress={this._onPress}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={IMAGE_DRUG} />
        </View>

        <View style={styles.inforContainer}>
          <Text style={styles.textBold} numberOfLines={1}>
            {item.drg_drug_name}
          </Text>
          <Text style={styles.textPrice}>
            {item.units[indexDropdown] && item.units[indexDropdown].price
              ? `${item.units[indexDropdown].price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/, '$1.')} VNĐ`
              : 'Nhập giá ngay'}
          </Text>
          <View style={styles.lineBottom}>
            <Text style={styles.text}>Còn</Text>
            <TextInput
              style={styles.inputContainer}
              underlineColorAndroid={'rgba(0,0,0,0)'}
              keyboardType={'numeric'}
              selectionColor={'#828282'}
              value={
                typeof item.units[indexDropdown].inv_qty === 'number'
                  ? item.units[indexDropdown].inv_qty.toString()
                  : item.units[indexDropdown].inv_qty
              }
              editable={false}
            />
            <ModalCustom
              options={options}
              style={{ width: vw(70) }}
              onSelected={(index: number, value: string) => this.setState({ indexDropdown: index })}
              value={item.units[indexDropdown].unit_name}
              containerStyle={styles.modalContainer}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity onPress={this._onPress}>
            {selected ? (
              <Text style={[styles.textBold, { color: MAIN_COLOR }]}>Sửa</Text>
            ) : (
              <Text style={[styles.textBold, { color: MAIN_COLOR }]}>Nhập SL</Text>
            )}
          </TouchableOpacity>
          {itemSelected ? (
            <Text style={styles.textPrice}>{`Xuất: ${itemSelected.quantity} ${itemSelected.unit_name}`}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default ItemDrugList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: vw(5),
    marginBottom: vw(5),
    padding: vw(5),
  },
  imageContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inforContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: vw(5),
  },
  optionContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  image: {
    width: vw(60),
    height: vw(60),
  },
  line_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    color: BLACK,
    fontSize: vw(12),
  },
  textPrice: {
    color: '#EB5757',
    fontSize: vw(14),
    fontWeight: 'bold',
  },
  textBold: {
    color: BLACK,
    fontWeight: 'bold',
    fontSize: vw(12),
  },
  textButton: {
    color: '#FFF',
    fontSize: vw(16),
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    borderRadius: vw(3),
    paddingHorizontal: vw(5),
    paddingVertical: vw(2),
  },
  lineBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    borderColor: '#E0E0E0',
    backgroundColor: '#f2f2f2',
    borderWidth: vw(0.5),
    borderRadius: vw(3),
    padding: 0,
    textAlign: 'center',
    fontSize: vw(12),
    height: vw(20),
    fontWeight: 'bold',
    color: BLACK,
    width: vw(40),
    marginLeft: vw(3),
  },
  modalContainer: {
    height: vw(20),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: vw(5),
    borderRadius: vw(2),
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    paddingLeft: vw(3),
  },
  dropdownStyle: {
    width: vw(70),
    maxHeight: vw(120),
    borderRadius: vw(3),
    marginLeft: vw(5),
  },
  //modal
  backgroundModal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInsideView: {
    backgroundColor: 'white',
    height: vw(150),
    width: '90%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  titleModal: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: vw(14),
    textAlign: 'center',
  },
  containerModalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vw(10),
  },
  textInputRight: {
    width: '45%',
    height: vw(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInputModal: {
    width: '80%',
    height: vw(40),
    borderRadius: vw(5),
    borderWidth: vw(1),
    borderColor: '#828282',
    paddingLeft: vw(5),
  },
  buttonAccept: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(10),
    backgroundColor: MAIN_COLOR,
    borderRadius: vw(5),
  },
  closeButton: {
    width: vw(10),
    height: vw(10),
    tintColor: '#000',
    position: 'absolute',
    top: vw(5),
    right: vw(5),
  },
  hitSlop: {
    top: vw(20),
    bottom: vw(20),
    left: vw(20),
    right: vw(20),
  },
});
