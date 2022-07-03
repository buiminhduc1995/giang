import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  ICON_LINK,
  ICON_MAIL,
  ICON_NO_IMAGE,
  ICON_PHONE_ROUND, ICON_STAR, ICON_STAR_O,
} from "../../constants";
import vw from "../../utils/size-dynamic";
import { PROVIDER_DETAIL_SCREEN } from "../../redux/types";
import API from "../../api";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";

class ProviderItem extends React.PureComponent {

  constructor(props) {
    super(props);
    let favorite = null;
    if (props.data.is_favorite === 0) {
      favorite = false
    } else if (props.data.is_favorite === 1) {
      favorite = true
    }
    this.state = {
      favorite: favorite,
      isRequesting: false,
    };
  }

  _onClickItem = () => {
    this.props.navigation.navigate(PROVIDER_DETAIL_SCREEN, {
      data: this.props.data,
      favorite: this.props.data.is_favorite,
    });
  };

  _onUpdateFavoriteProvider = async () => {
    if (this.state.isRequesting === false) {
      await this.setState({
        isRequesting: true
      });
      const params = {
        "company_id": this.props.data.company_id,
        "account_id": this.props.info.account_id,
        "type": this.props.data.is_favorite ? 0 : 1
      };

      API.companyApi.updateFavoriteCompany(params)
        .then(() => {
          this.setState(prevState => ({
            isRequesting: false,
            favorite: !prevState.favorite
          }), () => {
            return this.props.onUpdateProviderSuccess();
          })
        }).catch(err => {
          this.setState({
            isRequesting: false
          });
          console.log(err)
        });
    }
  };


  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onClickItem}
        style={styles.constainer}
      >
        {/* <Image
          source={typeof data.avatar_url === "string" && data.avatar_url.length > 0 ? { uri: data.avatar_url } : ICON_NO_IMAGE}
          style={{ width: vw(80), height: vw(80), resizeMode: 'contain', marginRight: vw(15) }} /> */}
        <FastImage
            style={{ width: vw(80), height: vw(80), marginRight: vw(15) }}
            source={
              typeof data.avatar_url === "string" && data.avatar_url.length > 0 ?
              {
                uri:data.avatar_url,
                priority: FastImage.priority.high
              }:
              ICON_NO_IMAGE
            }
            resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{ flex: 1 }}>
          <View style={{
            flexDirection: 'row',
            marginBottom: vw(8)
          }}>
            <Text style={{
              color: '#4F4F4F',
              fontSize: vw(14),
              fontWeight: 'bold',
              flex: 1
            }}>{typeof data.company_name === "string" && data.company_name}</Text>
            <TouchableOpacity
              onPress={this._onUpdateFavoriteProvider}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            >
              <Image source={data.is_favorite ? ICON_STAR : ICON_STAR_O} style={{
                width: vw(15),
                height: vw(15),
                resizeMode: 'contain',
                tintColor: data.is_favorite ? '#FFEB3B' : null
              }} />
            </TouchableOpacity>
          </View>
          {
            typeof data.phone_no === "string" && data.phone_no !== "" &&
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vw(3) }}
            >
              <Image source={ICON_PHONE_ROUND} style={{
                width: vw(10),
                height: vw(10),
                resizeMode: 'contain',
                tintColor: '#BDBDBD',
                marginRight: vw(5)
              }} />
              <Text style={{
                color: '#4F4F4F',
                fontSize: vw(12),
                fontFamily: 'Arial'
              }}>{data.phone_no}</Text>
            </View>
          }
          {
            typeof data.website === "string" && data.website !== "" &&
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vw(3) }}>
              <Image source={ICON_LINK} style={{
                width: vw(10),
                height: vw(10),
                resizeMode: 'contain',
                tintColor: '#BDBDBD',
                marginRight: vw(5)
              }} />
              <Text style={{
                color: '#2F80ED',
                fontSize: vw(12),
                fontFamily: 'Arial'
              }}>{data.website}</Text>
            </View>
          }
          {typeof data.email === "string" && data.email !== "" &&
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vw(3) }}
            >
              <Image source={ICON_MAIL} style={{
                width: vw(10),
                height: vw(10),
                resizeMode: 'contain',
                tintColor: '#BDBDBD',
                marginRight: vw(5)
              }} />
              <Text style={{
                color: '#4F4F4F',
                fontSize: vw(12),
                fontFamily: 'Arial'
              }}>{data.email}</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  constainer:{
    flexDirection: 'row', 
    padding: vw(10), 
    backgroundColor: 'white', 
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
})
function mapStateToProps(state) {
  return {
    info: state.user.dataUser.info,
    isUpdate: state.company.isUpdate
  };
}
const mapDispatchToProps = {
  
}
export default connect(mapStateToProps, mapDispatchToProps)(ProviderItem);