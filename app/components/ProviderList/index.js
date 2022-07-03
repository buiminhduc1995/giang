import React from 'react';
import { Dimensions, FlatList, Text, ActivityIndicator, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR } from "../../constants";
import ProviderItem from "../ProviderItem";

const { width, height } = Dimensions.get("window");

class ProviderList extends React.PureComponent {
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

  _getItemLayout = (data, index) => ({ length: height / 5, offset: height / 5 * index, index });

  _renderItem(item) {
    return (
      <ProviderItem
        data={item}
        navigation={this.props.navigation}
        onClickItem={this.props.onClickItem}
        onUpdateProviderSuccess={() => this.props.onUpdateProviderSuccess && this.props.onUpdateProviderSuccess(item)}
      />
    );
  }

  _renderFooter = () => (
    <View>
      {this.props.renderFooter}
      {this.state.error ? <Text style={{ textAlign: "center", marginBottom: vw(10) }}>{this.state.error.message}</Text> :
        this.state.isLoadMore && (
          <View style={{ flex: 1, paddingVertical: 20 }}>
            <ActivityIndicator size="large" color="#2D9CDB" />
          </View>
        )
      }
    </View>
  );

  render() {
    const dataAPI = this.props.data;
    return (
      <FlatList
        {...this.props}
        data={dataAPI}
        getItemLayout={this._getItemLayout}
        disableVirtualization
        initialNumToRender={5}
        maxToRenderPerBatch={5}
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
        ItemSeparatorComponent={() => <View style={{ height: vw(10) }} />}
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

ProviderList.propTypes = {
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
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderList);