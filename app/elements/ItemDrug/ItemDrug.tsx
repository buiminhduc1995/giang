import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SHADOW, IMAGE_DRUG } from '../../constants';
import vw from '../../utils/size-dynamic';
import CheckImage, { CheckUrl } from '../../utils/CheckImage';
import appConfig from '../../config/index';

interface Props {
  srcImage?: any;
  onPress?: any;
  disabled?: boolean;
  children?: any;
}

export const ItemDrug: React.FC<Props> = (props: Props) => {
  const { srcImage, onPress, disabled } = props;
  let productImg = CheckImage(srcImage) && srcImage;
  if (CheckUrl(productImg)) {
    productImg = productImg;
  } else if (CheckImage(productImg) && !CheckUrl(productImg)) {
    productImg = appConfig.baseWebURL + '/' + productImg;
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
      <View style={styles.imageContainer}>
        <Image source={productImg ? productImg : IMAGE_DRUG} style={styles.image} />
      </View>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: vw(5),
    backgroundColor: '#FFF',
    marginBottom: vw(10),
    minHeight: vw(50),
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
});
