import React from 'react';
import { Dimensions, FlatList, Text, ActivityIndicator, View, RefreshControl} from 'react-native';
import OrderItem from '../OrderItem';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import vw from '../../utils/size-dynamic';
import {MAIN_COLOR} from "../../constants";

const {width, height} = Dimensions.get("window");

class OrderList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoadMore: props.isLoadMore,
      refreshing: props.refreshing,
      error: props.error
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadMore !== nextProps.isLoadMore || this.props.refreshing !== nextProps.refreshing && this.props.error !== nextProps.error) {
      this.setState({
        isLoadMore: nextProps.isLoadMore,
        refreshing: nextProps.refreshing,
        error: nextProps.error
      })
    }
  }

  _keyExtractor = (item, index) => `item-${index}`;

  _getItemLayout = (data, index) => ({length: height / 5, offset: height / 5 * index, index});

  _renderItem(item) {
    return (
      <OrderItem
        data={item}
        navigation={this.props.navigation}
        onClickItem={this.props.onClickItem}
        onClickAcceptOrder={this.props.onClickAcceptOrder}
        onClickCancelOrder={this.props.onClickCancelOrder}
        dataType={this.props.dataType}
      />
    );
  }

  _renderFooter = () => (
    <View>
      {this.props.renderFooter}
      {this.state.error ? <Text style={{textAlign: "center", marginBottom: vw(10)}}>{this.state.error.message}</Text> :
        this.state.isLoadMore && (
          <View style={{flex: 1, paddingVertical: 20}}>
            <ActivityIndicator size="large" color="#2D9CDB"/>
          </View>
        )
      }
    </View>
  );

  render() {
    const dataAPI = this.props.data;
    return (
      <FlatList
        data={dataAPI}
        getItemLayout={this._getItemLayout}
        disableVirtualization
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        keyExtractor={this._keyExtractor}
        onEndReached={this.props.onEndReached}
        renderItem={({item}) => this._renderItem(item)}
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={this.props.renderHeader}
        extraData={this.state}
        ItemSeparatorComponent={() => <View style={{height: vw(5)}}/>}
        style={this.props.style}
        refreshControl={
          <RefreshControl
            tintColor={MAIN_COLOR}
            colors={[MAIN_COLOR, "#CA4E4E", "#58C4BE"]}
            refreshing={this.state.refreshing}
            onRefresh={this.props.onRefresh}
          />
        }
      />
    );
  }
}

OrderList.propTypes = {
  isLoadMore: PropTypes.bool,
  refreshing: PropTypes.bool,
  onClickItem: PropTypes.func,
  onClickAcceptOrder: PropTypes.func,
  onClickCancelOrder: PropTypes.func,
  onEndReached: PropTypes.func,
  style: PropTypes.object,
  renderHeader: PropTypes.element,
  onRefresh: PropTypes.func,
  error: PropTypes.any,
  data: PropTypes.array,
  dataType: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);