import React, { Component } from 'react';
import Communications from 'react-native-communications';
import {
  BackHandler,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  Linking,Dimensions,Alert
} from 'react-native';
import vw from "../../utils/size-dynamic";
import {
  ICON_BACK, ICON_CARET_DOWN,
  ICON_LINK,
  ICON_MAIL, ICON_NO_IMAGE,
  ICON_PHONE_ROUND, ICON_STAR, ICON_STAR_O
} from "../../constants";
import HeaderBar from "../../elements/HeaderBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabPill from "../../components/TabPill";
import API from "../../api";
import TabOrderList from "../../components/TabOrderList";
import TabDrug from "../../components/TabDrug";
import { connect } from 'react-redux'
import PopupDialog from "react-native-popup-dialog";
import { MyStatusBar } from '../../elements/MyStatusBar';
// import OrderDialog from "../../components/OrderDialog";

const { height, width } = Dimensions.get('window');

class ProductDetailScreen extends React.PureComponent  {

  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
      dataDetail: null,
      isRequesting: false,
      dataItem: null,
      amount:0,
      qty_request:1,
      update: false
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  async componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
    await this._getProviderDetail();
  }

  _handleBackPress = () => {
    return this.props.navigation.goBack();
  };

  _getProviderDetail = () => {
    const { company_id } = this.props.navigation.state.params.data;
    const { company_code } = this.props.navigation.state.params.data;
    if (typeof company_id === 'number') {
      return API.companyApi.getProviderDetail(company_id).then(async res => {
        await this.setState({
          dataDetail: res.data,
        });
      }).catch(err => {
        console.log(err);
      });
    }
    if (typeof company_code === 'string' && company_code !== "") {
      return API.companyApi.getProviderDetailByCode(company_code).then(async res => {
        await this.setState({
          dataDetail: res.data,
        });
      }).catch(err => {
        console.log(err);
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.data != undefined){
      this.setState({
        dataItem: nextProps.data.data,
        amount: nextProps.data.data.price* 1
      }, () => nextProps.data.data.campaign != null && this.popupDialog.show())
    }
  }

  _renderHeader() {
    return (
      <HeaderBar
        left={this._renderHeaderLeft()}
      />
    );
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => this.props.navigation.goBack()}>
        <Image source={ICON_BACK} style={{ width: vw(11), height: vw(20), resizeMode: "contain", marginRight: vw(10) }} />
        <Text style={{ fontSize: vw(18), fontFamily: "Arial", fontWeight: "bold", color: "#ffffff" }}>
          Thông tin nhà cung cấp
        </Text>
      </TouchableOpacity>
    )
  }

  _renderDetail() {
    const { dataDetail } = this.state;
    const favorite = this.props.navigation.state.params.favorite;
    return (
      <View>
        <View style={{ flexDirection: 'row', padding: vw(10), paddingBottom:0, backgroundColor: 'white', alignItems:'center', justifyContent:'center', alignContent:'center' }}>
          <Image source={typeof dataDetail.avatar_url === 'string' && dataDetail.avatar_url.length > 0 ? { uri: dataDetail.avatar_url } : ICON_NO_IMAGE}
            style={{ width: vw(80), height: vw(80), resizeMode: 'contain', marginRight: vw(15) }} />
          <View style={{ flex: 1 }}>
            <View style={{
              flexDirection: 'row',
              marginBottom: vw(5)
            }}>
              {typeof dataDetail.company_name === 'string' && dataDetail.company_name.length > 0 && <Text style={{
                color: '#4F4F4F',
                fontSize: vw(14),
                fontWeight: 'bold',
                flex: 1
              }}>{dataDetail.company_name}</Text>}

              <Image source={favorite ? ICON_STAR : ICON_STAR_O} style={{
                width: vw(15),
                height: vw(15),
                resizeMode: 'contain',
                tintColor: favorite ? '#FFEB3B' : null
              }} />
            </View>
            {typeof dataDetail.phone_no === 'string' && dataDetail.phone_no.length > 0 &&
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={ICON_PHONE_ROUND} style={{
                  width: vw(11),
                  height: vw(11),
                  resizeMode: 'contain',
                  tintColor: '#BDBDBD',
                  marginRight: vw(5)
                }} />
                <Text onPress={() => Linking.openURL('tel:' + encodeURIComponent(dataDetail.phone_no))} style={{ color: '#4F4F4F', fontSize: vw(12) }}>{dataDetail.phone_no}</Text>
              </View>}
            {typeof dataDetail.website === 'string' && dataDetail.website.length > 0 &&
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={ICON_LINK} style={{
                  width: vw(11),
                  height: vw(11),
                  resizeMode: 'contain',
                  tintColor: '#BDBDBD',
                  marginRight: vw(5)
                }} />
                <Text onPress={() => Linking.openURL(dataDetail.website)} style={{ color: '#2F80ED', fontSize: vw(12) }}>{dataDetail.website}</Text>
              </View>}
            {typeof dataDetail.email === 'string' && dataDetail.email.length > 0 &&
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={ICON_MAIL} style={{
                  width: vw(11),
                  height: vw(11),
                  resizeMode: 'contain',
                  tintColor: '#BDBDBD',
                  marginRight: vw(5)
                }} />
                <Text onPress={() => Communications.email([dataDetail.email],null,null,null,null)} style={{ color: '#4F4F4F', fontSize: vw(12) }}>{dataDetail.email}</Text>
              </View>}
          </View>
        </View>
        {typeof this.state.dataDetail.note === 'string' && this.state.dataDetail.note.length > 0 && this._renderDetailCompany()}
      </View>
    )
  }

  _toggleDetail = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(prevState => ({
      isShowDetail: !prevState.isShowDetail
    }))
  };

  getDetailDrugCompany() {
    return (
      <View style={{
        backgroundColor: 'white',
        padding: vw(10)
      }}>
        <View style={{ backgroundColor: '#f2f2f2' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: vw(8)
            }}
            onPress={this._toggleDetail}
          >
            <Text style={{
              color: '#828282',
              fontSize: vw(12),
              fontFamily: 'Arial',
              marginRight: vw(3),
            }}>Giới thiệu công ty</Text>
            <Image source={ICON_CARET_DOWN} style={{ width: vw(7), height: vw(4), resizeMode: 'contain' }} />
          </TouchableOpacity>
          <ScrollView style={{ height: this.state.isShowDetail ? vw(120) : 0 }}>
            <View style={{ paddingHorizontal: vw(10), paddingTop: vw(5), paddingBottom: vw(10) }}>
              <Text style={{
                color: '#000000',
                fontSize: vw(12),
                fontFamily: 'Arial'
              }}>
                {this.state.dataDetail.note}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

  _renderTab() {
    const { drg_store_id } = this.props.navigation.state.params.data;
    return (
      typeof drg_store_id === 'number' &&
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <TabPill style={{ backgroundColor: '#e5e5e5' }} />}
        tabBarPosition="top"
        onChangeTab={data => {
        }}
      >
        <View tabLabel={'Danh sách sản phẩm'} style={{ flex: 1 }}>
          <TabDrug navigation={this.props.navigation} drugStoreId={drg_store_id} phoneNo={this.state.dataDetail.phone_no} type={'ProviderDetail'}/>
        </View>

        <View tabLabel={'Đơn hàng chờ nhận'} style={{ flex: 1 }}>
          <TabOrderList navigation={this.props.navigation} storeProviderId={drg_store_id} />
        </View>
      </ScrollableTabView>
    )
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar/>
        {this._renderHeader()}
        <View style={styles.wrapBody}>
          {this.state.dataDetail !== null && this._renderDetail()}
          <View style={{ height: vw(5), backgroundColor: 'white' }} />
          {this.state.dataDetail !== null && this._renderTab()}
        </View>
        {/* <OrderDialog/>  */}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  wrapBody: {
    flex: 1,
    backgroundColor: '#e5e5e5'
  }
};

function mapStateToProps(state) {
  return {
    info: state.user.dataUser.info,
    data: state.auth.data1,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);