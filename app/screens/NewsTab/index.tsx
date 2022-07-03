import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, Image, Dimensions, StyleSheet } from 'react-native';
import { MAIN_COLOR, ICON_ADD, WHITE } from '../../constants';
import Api from '../../api';
import { connect } from 'react-redux';
import LoaderIndicator from '../../elements/LoaderIndicator';
import NewItem from '../../components/NewItem';
import { IconAvatar } from '../../elements/Icon/IconAvatar';
import { REFRESH_NEWS } from '../../redux/types';
import ImageView from 'react-native-image-view';
import LoadNew from '../../elements/LoadNew';
import { ShineOverlay, Progressive } from 'rn-placeholder';
const { width, height } = Dimensions.get('window');
type Props = {
  user: any;
  reFreshNew: Function;
  navigation: Function;
};
type State = {
  listNews: any;
  refreshing: boolean;
  isFetching: boolean;
  page: number;
  total_page: number;
  isLoadMore: boolean;
  imageShowView: any;
  imageIndex: number;
  isImageViewVisible: boolean;
};
class NewsTab extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      listNews: [],
      refreshing: false,
      isFetching: false,
      page: 1,
      total_page: 0,
      isLoadMore: false,
      imageShowView: [],
      imageIndex: 0,
      isImageViewVisible: false,
    };
  }

  componentWillMount() {
    this._pullData();
  }

  componentWillReceiveProps(nextProps: any) {
    console.log('nextProps', nextProps);
    if (nextProps.isRefreshNew) {
      this._refreshData();
    }
  }

  _fetchMoreData = () => {
    this.setState({ isLoadMore: true });
    const { page, total_page } = this.state;
    if (page < total_page) {
      Api.socialApi
        .getListPost(this.props.user.account_id, page + 1)
        .then(res => {
          const listNews = res.data.data;
          this.setState({
            listNews: [...this.state.listNews, ...listNews],
            isLoadMore: false,
            page: res.data.page,
            total_page: res.data.total_page,
          });
          this.props.reFreshNew(false);
        })
        .catch(err => {
          this.setState({ isFetching: false });
        });
    }
  };

  _refreshData = () => {
    this.setState({ refreshing: true });
    Api.socialApi
      .getListPost(this.props.user.account_id)
      .then(res => {
        const listNews = res.data.data;
        this.setState({
          listNews: listNews,
          refreshing: false,
        });
        this.props.reFreshNew(false);
      })
      .catch(err => {
        this.setState({ refreshing: false });
      });
  };
  _pullData = () => {
    this.setState({ isFetching: true });
    Api.socialApi
      .getListPost(this.props.user.account_id)
      .then(res => {
        const listNews = res.data.data;
        this.setState({
          listNews: listNews,
          isFetching: false,
          page: res.data.page,
          total_page: res.data.total_page,
        });
        this.props.reFreshNew(false);
      })
      .catch(err => {
        this.setState({ isFetching: false });
      });
  };
  _onPressComment = item => {
    this.props.navigation.navigate('NewDetailScreen', { data: item });
  };

  _onPressImage = (imageShowView: any, index: number) => {
    console.log('on press image', imageShowView, index);
    this.setState({
      imageShowView: imageShowView,
      isImageViewVisible: true,
      imageIndex: index,
    });
  };

  _addNew = () => {
    this.props.navigation.navigate('NewCreateScreen');
  };

  render() {
    const { imageShowView, imageIndex, isImageViewVisible, isFetching } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: WHITE }}>
        <TouchableOpacity style={styles.AddNewButton} onPress={this._addNew}>
          <IconAvatar />
          <Text style={{ flex: 1, color: 'gray', opacity: 0.5, padding: 10 }}>
            Bạn đang muốn chia sẻ với bạn bè điều gì?
          </Text>
          <Image source={ICON_ADD} style={{ tintColor: 'gray', width: 20, height: 20 }} />
        </TouchableOpacity>
        <FlatList
          data={this.state.listNews}
          disableVirtualization
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          onEndReached={this._fetchMoreData}
          keyExtractor={(item, index) => item.post.post_id + 'id'}
          renderItem={({ item }) => (
            <NewItem item={item} onPressComment={this._onPressComment} onPressImage={this._onPressImage} />
          )}
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          refreshControl={
            <RefreshControl
              tintColor={MAIN_COLOR}
              colors={[MAIN_COLOR, '#CA4E4E', '#58C4BE']}
              refreshing={this.state.refreshing}
              onRefresh={this._refreshData}
            />
          }
        />
        <ImageView
          glideAlways
          images={imageShowView}
          imageIndex={imageIndex}
          animationType="fade"
          isVisible={isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />
        <LoadNew number={10} loading={isFetching} animation={ShineOverlay} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AddNewButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

function mapStateToProps(state: any) {
  return {
    user: state.user.dataUser.info,
    store: state.auth.data2,
    isRefreshNew: state.social.isRefreshNew,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    reFreshNew: isRefreshNew => dispatch({ type: REFRESH_NEWS, isRefreshNew: isRefreshNew }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsTab);
