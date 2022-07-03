import React from 'react';
import { Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import vw from '../../utils/size-dynamic';

import HeaderBar from '../../elements/HeaderBar';
import { connect } from 'react-redux';
import { ICON_BACK, ICON_CAMERA, ICON_LIBRARY_PHOTO } from '../../constants';
import Api from '../../api';
import { MyStatusBar } from '../../elements/MyStatusBar';
import dp from '../../utils/size-dynamic';
import { IconAvatar } from '../../elements/Icon/IconAvatar';
import { TextInput } from 'react-native-gesture-handler';
import validate from '../../utils/validate';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { REFRESH_NEWS } from '../../redux/types';
import ImagePicker from 'react-native-image-crop-picker';
import ImageUpload from './ImageUpload';
import ButtonIcon from '../../elements/Button/ButtonIcon';
import { RNS3 } from 'react-native-aws3';
type Props = {
  navigation: Function;
  reFreshNew: Function;
  store: any;
};
type State = {
  text: string;
  comments: object;
  page: number;
  isLoading: boolean;
  isLoadImage: boolean;
  listUrl: any;
};
class NewCreateScreen extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this._goBack = this._goBack.bind(this);
    this.state = {
      text: '',
      comments: [],
      page: 1,
      isLoading: false,
      isLoadImage: false,
      listUrl: [],
    };
  }

  _renderHeader() {
    return (
      <HeaderBar
        left={this._renderHeaderLeft()}
        right={this._renderHeaderRight()}
        wrapLeft={{ flex: 1, paddingRight: vw(20) }}
      />
    );
  }
  _goBack() {
    if (this.state.text !== '' || this.state.listUrl.length !== 0) {
      Alert.alert('Thông báo', 'Bạn có chắc chắn muốn huỷ bài viết?', [
        { text: 'Đúng', onPress: () => this.props.navigation.goBack() },
        { text: 'Không', onPress: () => console.log('No') },
      ]);
    } else {
      this.props.navigation.goBack();
    }
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
          Thêm bài viết mới
        </Text>
      </TouchableOpacity>
    );
  }
  _renderHeaderRight() {
    return (
      <TouchableOpacity
        style={[{ flexDirection: 'row', alignItems: 'center' }, { opacity: this.state.isLoadImage ? 0.6 : 1 }]}
        onPress={this._addNew}
        disabled={this.state.isLoadImage}
      >
        <Text
          style={{
            fontSize: vw(18),
            fontFamily: 'Arial',
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          Đăng
        </Text>
      </TouchableOpacity>
    );
  }

  uploadFile = async (image: any) => {
    return new Promise((resole, reject) => {
      const date = new Date();
      const file = {
        uri: image.path,
        name: `${date.getTime()}.png`,
        type: image.mime,
      };
      const options = {
        keyPrefix: 'uploads',
        bucket: 'medlinknews',
        region: 'ap-southeast-1',
        accessKey: 'AKIAIGK2LWAXNG77D4LQ',
        secretKey: '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',
        successActionStatus: 201,
      };
      RNS3.put(file, options).then(response => {
        if (response.status !== 201) throw new Error('Failed to upload image to S3');
        console.log(response.body);
        const url = {
          url: response.body.postResponse.location,
          type_url: 'image',
        };
        const newListUrl = [...this.state.listUrl, ...[url]];
        console.log('newListUrl', newListUrl);
        this.setState({ listUrl: newListUrl });
        resole();
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      });
    });
  };

  onPressAddImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 15,
      compressImageQuality: 0.3,
    }).then(async (images: any) => {
      await this.setState({ isLoadImage: true });
      for (const image of images) {
        await this.uploadFile(image);
      }
      this.setState({ isLoadImage: false });
    });
  };

  onPressCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      compressImageQuality: 0.3,
    }).then(async image => {
      await this.setState({ isLoadImage: true });
      await this.uploadFile(image);
      this.setState({ isLoadImage: false });
    });
  };

  removeImage = async (image: any) => {
    // console.log("image remove", image)
    const newListUrl = await this.state.listUrl.filter(item => {
      return item.url !== image.url;
    });
    // console.log("newListUrl", newListUrl)
    this.setState({ listUrl: newListUrl });
  };

  _addNew = () => {
    const { user, store } = this.props;
    if (validate('string', this.state.text) == null) {
      this.setState({ isLoading: true });
      params = {
        post: {
          account_id: user.account_id,
          drg_store_id: store.drg_store_id,
          full_name: user.full_name,
          drg_name: store.drg_name,
          avatar_url: store.avatar_url,
          title: '',
          type_post: '',
          description: this.state.text,
          url: '',
        },
        list_url: this.state.listUrl,
      };
      Api.socialApi
        .createPost(params)
        .then(res => {
          console.log('add new post result', res);
          this.setState({ isLoading: false });
          this.props.reFreshNew(true);
          this.props.navigation.goBack();
        })
        .catch(err => {
          this.setState({ isLoading: false });
        });
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung bài viết!');
    }
  };

  renderAddImage = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <ButtonIcon
            title={'Thêm ảnh'}
            icon={ICON_LIBRARY_PHOTO}
            onPress={this.onPressAddImage}
            style={styles.button}
          />
          <ButtonIcon title={'Camera'} icon={ICON_CAMERA} onPress={this.onPressCamera} style={styles.button} />
        </View>
        {this.state.listUrl.length !== 0 ? (
          <ImageUpload images={this.state.listUrl} removeImage={this.removeImage} />
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <IconAvatar />
          <Text style={{ fontWeight: 'bold', paddingLeft: 10, fontSize: 15 }}>{this.props.store.drg_name}</Text>
        </View>
        <View style={{ backgroundColor: 'white', margin: 5, borderRadius: 5 }}>
          <TextInput
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              height: 200,
              padding: 5,
              textAlignVertical: 'top',
            }}
            placeholder="Nhập nội dung bài viết"
            multiline={true}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.renderAddImage()}
        <LoaderIndicator loading={this.state.isFetching} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F0EDEE',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
};

function mapStateToProps(state) {
  return {
    user: state.user.dataUser.info,
    store: state.user.dataUser.store,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reFreshNew: isRefreshNew => dispatch({ type: REFRESH_NEWS, isRefreshNew: isRefreshNew }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCreateScreen);
