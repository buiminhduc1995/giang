import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import styles from './CategoryCashFlowHistory.styles';
import { ICON_BACK, themes, SHADOW } from '../../constants';
import { mock } from '../../constants';
import ItemDynamic from '../../elements/ItemDynamic';
import vw from '../../utils/size-dynamic';
import { CATEGORY_CASH_FLOW_DETAIL } from '../../redux/types';
import { Navigation } from '../../dataType';

type Props = {
  navigation: Navigation;
};

type State = {};

class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  _renderHeader = () => {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  };

  _renderHeaderLeft = () => {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Lịch sử giao dịch</Text>
      </TouchableOpacity>
    );
  };
  renderCenter = (item: any) => {
    return (
      <View style={styles.center}>
        <Text numberOfLines={1} style={styles.txtCodeTrade}>
          Mã giao dịch: {item.codeTrade}
        </Text>
        <Text style={styles.txtDetailTrade}>Mã đơn hàng: {item.codeINV}</Text>
        <Text style={styles.txtDetailTrade}>Ngày giao dịch: {item.dateTrade}</Text>
      </View>
    );
  };
  renderRight = (item: any) => {
    return (
      <View style={styles.right}>
        <Text style={[styles.txtAmount, { textDecorationLine: item.status === 3 ? 'line-through' : 'none' }]}>
          {item.status === 1 ? '+' : item.status === 2 ? '-' : ''}
          {''}
          {item.amount}
        </Text>
        <View
          style={[
            styles.buttonItem,
            {
              backgroundColor:
                item.status === 1
                  ? themes.colors.MAIN_COLOR
                  : item.status === 2
                  ? themes.colors.RED
                  : themes.colors.GRAY,
            },
          ]}
        >
          <Text style={styles.txtButton}>
            {item.status === 1 ? 'Hoàn thành' : item.status === 2 ? 'Đã hủy' : 'Hoàn trả'}
          </Text>
        </View>
      </View>
    );
  };
  goToDetail = (item: Object) => {
    this.props.navigation.navigate(CATEGORY_CASH_FLOW_DETAIL, { item });
  };
  _renderList = () => {
    return (
      <FlatList
        data={mock.dataListHistoryVNPay}
        contentContainerStyle={styles.wapperList}
        renderItem={({ item }) => (
          <ItemDynamic
            stylesImage
            source={null}
            disabled={false}
            item={item}
            center={this.renderCenter}
            right={this.renderRight}
            styleWapper={{ marginBottom: vw(5), ...SHADOW }}
            onPress={() => this.goToDetail(item)}
          />
        )}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderList()}
      </View>
    );
  }
}

export default index;
