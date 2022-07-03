import React from 'react';
import { Dimensions, FlatList, Text, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR } from '../../constants';
import ProductItem from '../../screens/OrderToProvider/ProductItem';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';

interface Props {
  isLoadMore: boolean;
  refreshing: boolean;
  onClickItem: () => void;
  onClickAcceptOrder: () => void;
  onClickCancelOrder: () => void;
  onEndReached: () => void;
  style: any;
  renderHeader: any;
  onRefresh: () => void;
  error: any;
  data: any;
  type: string;
  phoneNo: any;
  navigation: any;
  onUpdateProductSuccess: any;
  renderFooter: any;
}
interface State {
  data: any;
  isLoadMore: boolean;
  refreshing: boolean;
  error: any;
}

const { height } = Dimensions.get('window');

class DrugList extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      isLoadMore: props.isLoadMore,
      refreshing: props.refreshing,
      error: props.error,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps: Props) {
    if (
      this.props.isLoadMore !== nextProps.isLoadMore ||
      (this.props.refreshing !== nextProps.refreshing && this.props.error !== nextProps.error)
    ) {
      this.setState({
        isLoadMore: nextProps.isLoadMore,
        refreshing: nextProps.refreshing,
        error: nextProps.error,
      });
    }
  }

  _keyExtractor = (item, index) => `item-${index}`;

  _getItemLayout = (data, index) => ({ length: height / 5, offset: (height / 5) * index, index });

  // _renderItem(item) {
  //   return (
  //     <ProductItem
  //       data={item}
  //       type={this.props.type}
  //       phoneNo={this.props.phoneNo}
  //       navigation={this.props.navigation}
  //       onUpdateProductSuccess={() => this.props.onUpdateProductSuccess && this.props.onUpdateProductSuccess(item)}
  //     />
  //   );
  // }
  logAction = value => {
    this.props.action(value);
  };
  _renderItem(item) {
    return (
      <ProductItem
        data={item}
        type={this.props.type}
        phoneNo={this.props.phoneNo}
        navigation={this.props.navigation}
        action={value => this.logAction(value)}
        onUpdateProductSuccess={() => this.props.onUpdateProductSuccess && this.props.onUpdateProductSuccess(item)}
      />
    );
  }

  _renderFooter = () => {
    return (
      <View>
        {this.props.renderFooter}
        {this.state.error ? (
          <Text style={{ textAlign: 'center', marginBottom: vw(5) }}>{this.state.error.message}</Text>
        ) : (
          this.state.isLoadMore && (
            // <View style={{ flex: 1, paddingVertical: 20 }}>
            //   <ActivityIndicator size="large" color="#2D9CDB" />
            // </View>
            <LoadContent
              number={1}
              loading={true}
              style={{ marginTop: 5, marginHorizontal: vw(10) }}
              animation={Progressive}
            />
          )
        )}
      </View>
    );
  };

  render() {
    const dataAPI = this.props.data;
    return (
      <FlatList
        data={dataAPI}
        getItemLayout={this._getItemLayout}
        disableVirtualization
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        keyExtractor={this._keyExtractor}
        onEndReached={this.props.onEndReached}
        renderItem={({ item }) => this._renderItem(item)}
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={this.props.renderHeader || <View style={{ height: vw(10) }} />}
        extraData={this.state}
        ItemSeparatorComponent={() => <View style={{ height: vw(0) }} />}
        style={this.props.style}
        refreshControl={
          <RefreshControl
            tintColor={MAIN_COLOR}
            colors={[MAIN_COLOR, '#CA4E4E', '#58C4BE']}
            refreshing={this.state.refreshing}
            onRefresh={this.props.onRefresh}
          />
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrugList);
