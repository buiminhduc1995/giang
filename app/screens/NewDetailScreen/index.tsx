import React from 'react';
import {
  TextInput,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import vw from '../../utils/size-dynamic';

import HeaderBar from '../../elements/HeaderBar';
import { connect } from 'react-redux';
import { ICON_BACK, MAIN_COLOR } from '../../constants';
import Api from '../../api';
import { MyStatusBar } from '../../elements/MyStatusBar';
import NewItem from '../../components/NewItem';
import dp from '../../utils/size-dynamic';
import CommentItem from '../../components/CommentItem';
import validate from '../../utils/validate';
import { REFRESH_NEWS } from '../../redux/types';
import ImageView from 'react-native-image-view';
type Props = {
  navigation: Function;
};
type State = {
  text: string;
  comments: object;
  page: number;
  refreshing: boolean;
  item: any;
  stateChange: boolean;
  imageShowView: object;
  imageIndex: number;
  isImageViewVisible: boolean;
};
class NewDetailScreen extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this._goBack = this._goBack.bind(this);
    this.state = {
      text: '',
      comments: [],
      page: 1,
      refreshing: false,
      item: this.props.navigation.state.params.data,
      stateChange: false,
      imageShowView: [],
      imageIndex: 0,
      isImageViewVisible: false,
    };
  }
  componentDidMount() {
    this._getListComment();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    // alert('Keyboard Shown');
  }

  _keyboardDidHide() {
    // alert('Keyboard Hidden');
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _getListComment = () => {
    const item = this.state.item;
    Api.socialApi
      .getListComments(item.post.post_id)
      .then(res => {
        this.setState({
          comments: res.data.data,
          page: res.data.page,
        });
      })
      .catch(err => {});
  };

  _addNewComment = () => {};

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} wrapLeft={{ flex: 1, paddingRight: vw(20) }} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this._goBack}>
        <Image
          source={ICON_BACK}
          style={{
            width: vw(11),
            height: vw(20),
            resizeMode: 'contain',
            marginRight: vw(10),
          }}
        />
        <Text
          style={{
            fontSize: vw(18),
            fontFamily: 'Arial',
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          Chi tiết tin tức
        </Text>
      </TouchableOpacity>
    );
  }

  _onPressComment = () => {
    console.log('comment');
  };

  _onPressSend = () => {
    Keyboard.dismiss();
    const item = this.state.item;
    const { user, store } = this.props;
    if (validate('string', this.state.text) == null) {
      params = {
        account_id: user.account_id,
        drg_store_id: store.drg_store_id,
        url_id: 0,
        post_id: item.post.post_id,
        full_name: user.full_name,
        drg_name: store.drg_name,
        avatar_url: '',
        parent_comment_id: 0,
        comment: this.state.text,
      };
      Api.socialApi
        .createComment(params)
        .then(res => {
          item.post.total_comment = item.post.total_comment + 1;
          const stateChange = this.state.stateChange;
          let newItem = Object.assign({}, this.state.item);
          this.setState({ text: '', stateChange: !stateChange, item: newItem });
          this._getListComment();
        })
        .catch(err => {});
    }
  };
  _onPressImage = (imageShowView: any, index: number) => {
    console.log('on press image', imageShowView, index);
    this.setState({
      imageShowView: imageShowView,
      isImageViewVisible: true,
      imageIndex: index,
    });
  };

  render() {
    const item = this.state.item;
    const { imageShowView, imageIndex, isImageViewVisible } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView>
          <NewItem item={item} onPressComment={this._onPressComment} detail={true} onPressImage={this._onPressImage} />
          <FlatList
            data={this.state.comments}
            disableVirtualization
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
            keyExtractor={(item, index) => item.comment_id + 'id'}
            renderItem={({ item }) => <CommentItem item={item} />}
            renderToHardwareTextureAndroid
            shouldRasterizeIOS
            refreshControl={
              <RefreshControl
                tintColor={MAIN_COLOR}
                colors={[MAIN_COLOR, '#CA4E4E', '#58C4BE']}
                refreshing={this.state.refreshing}
              />
            }
          />
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: dp(45),
                backgroundColor: 'white',
                color: '#333333',
                fontFamily: 'Arial',
                paddingLeft: 10,
              }}
              placeholder="Nhập nội dung"
              placeholderTextColor="gray"
              underlineColorAndroid="transparent"
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
            <TouchableOpacity onPress={this._onPressSend} style={{ paddingRight: 10 }}>
              <Text style={{ color: '#2D9CDB', fontWeight: 'bold', fontSize: 15 }}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <ImageView
          glideAlways
          images={imageShowView}
          imageIndex={imageIndex}
          animationType="fade"
          isVisible={isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F0EDEE',
  },
};

function mapStateToProps(state: any) {
  return {
    user: state.user.dataUser.info,
    store: state.user.dataUser.store,
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
)(NewDetailScreen);
