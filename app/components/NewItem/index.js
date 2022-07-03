import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share, 
  Dimensions
} from "react-native";

import { ICON_DOT, ICON_LIKE, ICON_SHARE, ICON_COMMENT } from "../../constants";
import { IconAvatar } from "../../elements/Icon/IconAvatar";
import ButtonBorderIcon from "../../elements/Button/ButtonIconBorder";
import { connect } from "react-redux";
import Api from "../../api";
import ReadMore from "../ReadMoreText";
import { REFRESH_NEWS } from "../../redux/types";
import { DistanseTime } from "../../utils/DateFormat";
import ImagesNewItem from "../ImagesNewItem";
import PropTypes from 'prop-types';
const {width,height}= Dimensions.get("window");

class NewItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stateChange: true
    };
  }

  _onPressButtonLike = item => {
    if (!item.post.like) {
      this._onPressLike(item);
    } else {
      this._onPressUnlike(item);
    }
  };
  _reRender = () => {
    const stateChange = this.state.stateChange;
    this.setState({ stateChange: !stateChange });
    if (this.props.detail) {
      this.props.reFreshNew(true);
    }
  };
  _onPressLike = item => {
    const { user, store } = this.props;
    const params = {
      account_id: user.account_id,
      drg_store_id: store.drg_store_id,
      post_id: item.post.post_id,
      full_name: user.full_name,
      drg_name: store.drg_name,
      avatar_url: store.avatar_url
    };
    Api.socialApi
      .likePost(params)
      .then(res => {
        item.post.like = true;
        item.post.total_like = item.post.total_like + 1;
        this._reRender();
      })
      .catch(err => {});
  };
  _onPressUnlike = item => {
    const { user, store } = this.props;
    const params = {
      account_id: user.account_id,
      drg_store_id: store.drg_store_id,
      post_id: item.post.post_id
    };
    Api.socialApi
      .unLikePost(params)
      .then(res => {
        item.post.like = false;
        item.post.total_like = item.post.total_like - 1;
        this._reRender();
      })
      .catch(err => {});
  };

  _onShare = async item => {
    try {
      const result = await Share.share({
        message:item.post.description + 
        "\n"+"Android: https://play.google.com/store/apps/details?id=com.ecomedic.medlink&hl=vi" +
        "\n"+" Ios:https://itunes.apple.com/us/app/medlink/id1414235575?mt=8",
        title:"Medlink"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  _onPressComment = item => {
    this.props.onPressComment(item);
  };


  _onPressImage = (index) => {
    let imageShowView = this.props.item.list_url.map((item)=>{
      return {
        source:{uri:item.url},
        height:height-100,
      }
    })
    this.props.onPressImage(imageShowView,index);
  };

  _renderTruncatedFooter = () => {
    return (
      <TouchableOpacity onPress={() => this.readMore._handlePressReadMore()}>
        <Text style={{ color: "#2D9CDB" }}>Xem thêm</Text>
      </TouchableOpacity>
    );
  };

  _renderRevealedFooter = () => {
    return (
      <TouchableOpacity onPress={() => this.readMore._handlePressReadLess()}>
        <Text style={{ color: "#2D9CDB" }}>Thu gọn</Text>
      </TouchableOpacity>
    );
  };

  renderHeaderItem = () => {
    const item = this.props.item;
    return (
      <View style={{ flexDirection: "row" }}>
        <IconAvatar />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            {item.post.drg_name}
          </Text>
          <Text>{DistanseTime(item.post.created_date)}</Text>
        </View>
        <TouchableOpacity
          style={{ justifyContent: "center", paddingRight: 10 }}
        >
          <Image
            source={ICON_DOT}
            style={{ width: 5, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderBodyItem = () => {
    const item = this.props.item;
    return (
      <View style={{ margin: 10 }}>
        {this.props.detail ? (
          <Text selectable>{item.post.description}</Text>
        ) : 
          <ReadMore
            ref={node => (this.readMore = node)}
            numberOfLines={3}
            renderTruncatedFooter={this._renderTruncatedFooter}
            renderRevealedFooter={this._renderRevealedFooter}
          >
            <Text selectable>{item.post.description}</Text>
          </ReadMore>
        }
        <ImagesNewItem images={item.list_url} onPressImage={this._onPressImage} />
      </View>
    );
  };

  renderFooterItem = () => {
    const item = this.props.item;
    styleIconLike = item.post.like
      ? { tintColor: "#2D9CDB" }
      : { tintColor: "#828282" };
    styleIconShare = item.post.share
      ? { tintColor: "#2D9CDB" }
      : { tintColor: "#828282" };
    styleText = { fontWeight: "bold", color: "#2D9CDB" };
    style = { borderColor: "#2D9CDB" };
    return (
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <ButtonBorderIcon
            onPress={() => this._onPressButtonLike(item)}
            title={`Thích (${item.post.total_like})`}
            icon={ICON_LIKE}
            styleIcon={styleIconLike}
            style={item.post.like ? style : {}}
            styleText={item.post.like ? styleText : {}}
          />
          <ButtonBorderIcon
            onPress={() => this._onShare(item)}
            title={`Chia sẻ (${item.post.total_share})`}
            icon={ICON_SHARE}
            styleIcon={styleIconShare}
            style={item.post.share ? style : null}
            styleText={item.post.share ? styleText : {}}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <ButtonBorderIcon
            onPress={() => this._onPressComment(item)}
            title={`${item.post.total_comment} Bình luận`}
            icon={ICON_COMMENT}
            style={{ borderColor: "white" }}
            styleIcon={{ tintColor: "#2D9CDB" }}
            styleText={{ color: "#2D9CDB" }}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View
        style={styles.container}
      >
        {this.renderHeaderItem()}
        {this.renderBodyItem()}
        <View
          style={{ height: 0.5, backgroundColor: "#BDBDBD", width: "100%" }}
        />
        {this.renderFooterItem()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 5,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5
  }
});


NewItem.defaultProps = {
  
};

NewItem.propTypes = {
  /**
   * @property {element} item - infomation image
   */
  item: PropTypes.object.isRequired,
  /**
   * @property {element} onPressImage - onPressImage
   */
  onPressImage: PropTypes.func
};


function mapStateToProps(state) {
  return {
    user: state.user.dataUser.info,
    store: state.user.dataUser.store
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reFreshNew: isRefreshNew =>
      dispatch({ type: REFRESH_NEWS, isRefreshNew: isRefreshNew })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewItem);
