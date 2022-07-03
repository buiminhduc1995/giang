import React, { Component } from 'react';
import { Image, Text, View, Platform, StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { ICON_CARET_DOWN, MAIN_COLOR, BACKGROUND_COLOR } from '../../constants';
import ModalDropdown from 'react-native-modal-dropdown';

interface Props {
  options: string[];
  style: object;
  onSelected: any;
  value: string;
  dropdownStyle?: object;
  containerStyle?: object;
  defaultValue?: string;
  disabled: boolean;
}

export class ModalCustom extends React.PureComponent<Props> {
  static defaultProps = {
    option: [],
    style: {
      width: vw(70),
      height: vw(30),
    },
    onSelected: () => {},
    disabled: false,
  };
  render() {
    const { options, style, dropdownStyle, defaultValue, onSelected, value, containerStyle, disabled } = this.props;
    const heightImage = style.height
      ? style.height * 0.4
      : containerStyle.height
      ? containerStyle.height * 0.4
      : vw(30);
    const height = {
      height: options || !options.length ? (options.length >= 4 ? 4 * vw(40) : options.length * vw(40)) : vw(40),
    };
    return (
      <ModalDropdown
        style={[style, disabled ? { backgroundColor: BACKGROUND_COLOR } : null]}
        options={options}
        defaultValue={defaultValue}
        defaultIndex={0}
        animated={false}
        dropdownTextHighlightStyle={{
          color: '#666666',
        }}
        dropdownStyle={[styles.dropdownStyle, height, dropdownStyle]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={onSelected}
        disabled={disabled}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.containerStyle, containerStyle]}>
          <Text style={styles.text} numberOfLines={1}>
            {value}
          </Text>
          <View style={[styles.image, { height: heightImage, width: heightImage }]}>
            <Image
              source={ICON_CARET_DOWN}
              style={[styles.iconCaretDown, { height: heightImage, width: heightImage }]}
            />
          </View>
        </View>
      </ModalDropdown>
    );
  }
}

const styles = StyleSheet.create({
  dropdownStyle: {
    width: vw(150),
    marginTop: vw(-25),
    //maxHeight: vw(160),
    borderRadius: 3,
    //overflow: 'hidden',
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
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    paddingHorizontal: vw(15),
    color: '#666666',
  },
  containerStyle: {
    height: vw(30),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: vw(2),
    borderWidth: vw(1),
    borderColor: MAIN_COLOR,
    paddingLeft: vw(3),
    paddingRight: vw(5),
  },
  text: {
    width: '85%',
    fontSize: vw(14),
    color: '#4F4F4F',
  },
  image: {
    width: vw(25),
    height: vw(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCaretDown: {
    width: vw(15),
    height: vw(15),
    resizeMode: 'contain',
  },
});
