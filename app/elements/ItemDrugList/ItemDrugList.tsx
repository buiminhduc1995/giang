import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import vw from '../../utils/size-dynamic';
import { ModalCustom } from '../ModalCustom';
import MoneyFormat from '../../utils/MoneyFormat';
import { colors, ICON_TRASH } from '../../constants/themes';

interface Props {
  sourceImage: any;
  nameDrug: string;
  price: number;
  VAT?: number;
  quantity?: number;
  unit_name?: string;
  expirationDate?: Date | string;
  productionDate?: Date | string;
  totalPrice?: number;
  status?: string;
  createExportion?: boolean;
  onChangeQuantity?: any;
  onPressDelete?: (params: any) => any;
  units?: any[];
  modalOptions?: any[];
  onChangeModalSelection?: any;
  valueModal: string;
}

export const ItemDrugList: React.FC<Props> = (props: Props) => {
  const {
    sourceImage,
    nameDrug,
    price,
    VAT,
    quantity,
    onChangeQuantity,
    unit_name,
    expirationDate,
    productionDate,
    totalPrice,
    status,
    createExportion,
    onPressDelete,
    units,
    modalOptions,
    onChangeModalSelection,
    valueModal,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={sourceImage} style={styles.image} />
      </View>
      <View style={styles.inforContainer}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{nameDrug}</Text>
        <Text style={styles.text}>
          {MoneyFormat(price)}
          {VAT ? <Text>(VAT {VAT}%)</Text> : null}
        </Text>
        {quantity && !createExportion ? (
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Số lượng: </Text>
            <Text style={styles.textInputContainer}>{quantity}</Text>
            <Text style={styles.text}>
              {' '}
              {unit_name}
              {expirationDate ? <Text>. Hạn sử dụng: {expirationDate}</Text> : null}
            </Text>
          </View>
        ) : null}
        {productionDate ? <Text style={styles.text}>Lô sản xuất: {productionDate}</Text> : null}
        {totalPrice ? <Text style={styles.text}>Tổng tiền:{MoneyFormat(totalPrice)}</Text> : null}
        {createExportion ? (
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: vw(10) }}>Nhập SL </Text>
              <TextInput
                style={[styles.textInputContainer, { padding: 1.5 }]}
                selectionColor="white"
                onChangeText={onChangeQuantity}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                keyboardType={'numeric'}
                value={quantity ? quantity.toString() : ''}
                editable={true}
              />
              <ModalCustom
                options={modalOptions ? modalOptions : []}
                style={{ width: vw(70) }}
                onSelected={(value, index) => onChangeModalSelection(value)}
                value={valueModal}
                containerStyle={styles.modalContainer}
                dropdownStyle={styles.dropdownStyle}
              />
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
              <Image source={ICON_TRASH} style={styles.iconTrash} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: vw(5),
    backgroundColor: colors.WHITE,
    borderRadius: vw(5),
    marginBottom: vw(10),
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inforContainer: {
    flex: 3.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: vw(5),
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
    color: colors.BLACK,
    fontSize: vw(12),
    marginBottom: vw(3),
  },
  textButton: {
    fontSize: vw(12),
    color: colors.WHITE,
    backgroundColor: colors.MAIN_COLOR,
    borderRadius: vw(3),
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: vw(5),
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: colors.MAIN_COLOR,
    paddingLeft: vw(3),
  },
  dropdownStyle: {
    width: vw(70),
    maxHeight: vw(120),
    borderRadius: vw(3),
    marginLeft: vw(5),
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputContainer: {
    borderColor: colors.BORDER_COLOR,
    backgroundColor: colors.BACKGROUND_BOX_INPUT,
    borderWidth: 0.5,
    borderRadius: vw(3),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: vw(12),
    height: vw(20),
    fontWeight: 'bold',
    color: colors.BLACK,
    width: vw(40),
  },
  iconTrash: {
    width: vw(20),
    height: vw(20),
    tintColor: colors.MAIN_COLOR,
  },
});
