import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Alert, ScrollView, Platform } from 'react-native';
import styles from './DetailCustomerScreen.style';
import vw from '../../utils/size-dynamic';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { ICON_BACK, ICON_PERSON_DETAIL, ICON_PENCIL, ICON_NAVIGATION_BLUE, MAIN_COLOR } from '../../constants';
import HeaderBar from '../../elements/HeaderBar';
import { dataHistoryBuyProduct } from '../../constants/data';
import HistoryItemBuy from '../../components/HistoryItemBuy/';
import ModalDropdown from 'react-native-modal-dropdown';
const dataGender = ['Nam', 'Nữ'];
const dataCustomer = ['Khách lẻ', 'Công ty'];
import API from '../../api';
import { connect } from 'react-redux';
import { ADD_INVOICE_SCREEN } from '../../redux/types/';
type State = {
  edit: boolean;
  name: string;
  phone: string;
  address: string;
  numberOrder: number;
  totalMoney: number;
  selectedValueGender: any;
  selectedValueCustomer: any;
};
type Props = {
  navigation: Function;
};
class DetailCustomerScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    const item = this.props.navigation.getParam('item');
    this.state = {
      name: item.customer_name,
      phone: item.phone_no,
      address: item.address1,
      edit: false,
      numberOrder: 5,
      totalMoney: 1200000,
      selectedValueGender: item.sex,
      selectedValueCustomer: item.customer_group_name,
    };
  }
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }
  _renderHeaderRight = () => {
    return (
      <View>
        {this.state.edit ? (
          <TouchableOpacity onPress={() => this.updateProfileCustomer()}>
            <Text style={styles.txtButton}>Cập nhật</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  _renderHeaderLeft() {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Chi tiết khách hàng
        </Text>
      </TouchableOpacity>
    );
  }
  edit = () => {
    this.setState({ edit: !this.state.edit });
  };
  updateProfileCustomer = () => {
    const { name, phone, selectedValueGender, selectedValueCustomer, address } = this.state;
    const { info, token } = this.props;
    const item = this.props.navigation.getParam('item');
    const params = {
      drg_store_id: info.drg_store_id,
      customer_name: name,
      customer_type: '1',
      customer_group_cd: item.customer_group_cd,
      customer_group_name: selectedValueCustomer,
      avatar_url: null,
      birthday: '',
      sex: selectedValueGender === 'Nam' ? 'M' : 'F',
      phone_no: phone,
      email: '',
      facebook_id: null,
      prefecture: null,
      city: '',
      district: null,
      address1: address,
      address2: null,
      zipcode: null,
      conv_code: null,
      source: 'SOURCE_TEL',
      note: '',
      updated_user: info.full_name,
    };
    API.customerApi
      .editCustomer(params, token)
      .then(res => {
        if (res.status === 200) {
          Alert.alert('Cập nhật thông tin khách hàng thành công');
          this.setState({
            name: res.data.customer_name,
            phone: res.data.phone_no,
            address: res.data.address1,
            selectedValueGender: res.data.sex,
            selectedValueCustomer: res.data.customer_group_name,
            edit: !this.state.edit,
          });
        } else {
          Alert.alert('Cập nhật thất bại');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  map = () => {
    console.log('====================================');
    console.log('mapp');
    console.log('====================================');
  };

  _onSelectCustomer = (idx, value) => {
    this.setState({
      selectedValueCustomer: value,
    });
  };
  _onSelectGender = (idx, gender) => {
    this.setState({
      selectedValueGender: gender === 'Nam' ? 'M' : 'F',
    });
  };
  _renderInformation = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginTop: vw(12),
          borderRadius: vw(5),
          paddingHorizontal: vw(14),
          paddingVertical: vw(14),
        }}
      >
        <View style={[styles.wapperLine]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.wapperTotalOrder}>
              <Image source={ICON_PERSON_DETAIL} style={{ width: 12, height: 12 }} resizeMode="contain" />
            </View>
            <View>
              <Text style={[styles.txtTitle, { paddingLeft: 14 }]}>Thông tin khách hàng</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonEdit} onPress={() => this.edit()}>
            <Image source={ICON_PENCIL} style={{ width: 10, height: 10, tintColor: '#2D9CDB' }} resizeMode="contain" />
            <Text style={[styles.txt, { color: '#2D9CDB' }]}>Sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.wapperLine]}>
          <View style={styles.boderBottomLine}>
            <Text style={{ flex: 3, fontSize: vw(13) }}>Tên khách:</Text>
            <TextInput
              editable={this.state.edit}
              placeholder="Nhập họ và tên"
              onChangeText={txt => this.setState({ name: txt })}
              value={this.state.name}
              style={[styles.txtInput]}
            />
          </View>
          <View style={{ flex: 3, borderBottomWidth: 1, borderBottomColor: '#DADADA', height: 30 }}>
            <ModalDropdown
              disabled={!this.state.edit}
              options={dataGender}
              defaultValue={this.state.selectedValueGender}
              defaultIndex={0}
              dropdownStyle={[styles.styleModal]}
              dropdownTextStyle={{
                fontSize: 14,
                paddingHorizontal: vw(15),
              }}
              onSelect={(idx, gender) => this._onSelectGender(idx, gender)}
            >
              <View
                style={{
                  alignItems: 'center',
                  height: 30,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: '#333333',
                  }}
                >
                  {this.state.selectedValueGender === 'M' ? 'Nam' : 'Nữ'}
                </Text>
              </View>
            </ModalDropdown>
          </View>
        </View>
        <View style={[styles.wapperLine]}>
          <View style={styles.boderBottomLine}>
            <Text style={{ flex: 3, fontSize: vw(13) }}>Địa chỉ:</Text>
            <TextInput
              editable={this.state.edit}
              placeholder="Nhập địa chỉ"
              onChangeText={txt => this.setState({ address: txt })}
              value={this.state.address}
              style={[styles.txtInput]}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 3,
              justifyContent: 'flex-end',
              borderBottomWidth: 1,
              borderBottomColor: '#DADADA',
              height: 30,
            }}
            onPress={() => this.map()}
          >
            <Image
              source={ICON_NAVIGATION_BLUE}
              style={{ width: 10, height: 10, marginRight: 5 }}
              resizeMode="contain"
            />
            <Text style={[styles.txt, { color: '#2D9CDB', textAlign: 'right' }]}>Chỉ đường</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.wapperLine]}>
          <View style={styles.boderBottomLine}>
            <Text style={{ flex: 3, fontSize: vw(13) }}>Điện thoại:</Text>
            <TextInput
              editable={this.state.edit}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại"
              onChangeText={txt => this.setState({ phone: txt })}
              value={this.state.phone}
              style={styles.txtInput}
            />
          </View>
          <View style={{ flex: 3 }} />
        </View>
        <View style={[styles.wapperLine]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 7 }}>
            <Text style={{ flex: 3, fontSize: vw(13) }}>Loại:</Text>
            <View style={{ flex: 7, borderBottomWidth: 1, borderBottomColor: '#DADADA' }}>
              <ModalDropdown
                disabled={!this.state.edit}
                options={dataCustomer}
                defaultValue={this.state.selectedValueCustomer}
                defaultIndex={0}
                dropdownStyle={{
                  height: 80,
                }}
                dropdownTextStyle={{
                  fontSize: 14,
                  paddingHorizontal: vw(15),
                }}
                onSelect={(idx, value) => this._onSelectCustomer(idx, value)}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#333333',
                      // marginLeft: 10,
                    }}
                  >
                    {this.state.selectedValueCustomer}
                  </Text>
                </View>
              </ModalDropdown>
            </View>
          </View>
          <View style={{ flex: 3 }} />
        </View>
      </View>
    );
  };
  renderTotal = () => {
    return (
      <View style={styles.wapperTotal}>
        <Text style={styles.txtDetail}>Tổng số đơn</Text>
        <View>
          {/* <Text style={{textAlign:'right'}}>{this.state.numberOrder} đơn hàng</Text> */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 16, color: '#4F4F4F' }}>{this.state.numberOrder}</Text>
            <Text style={[styles.txtDetail, { paddingTop: 5 }]}> đơn hàng</Text>
          </View>
          <Text style={styles.txtDetail}>
            Giá trị :{this.state.totalMoney.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} đ
          </Text>
        </View>
      </View>
    );
  };
  renderHisoryBuy = () => {
    return (
      <View>
        <Text style={styles.txtTitle}>Lịch sử mua hàng</Text>
        <FlatList
          data={dataHistoryBuyProduct}
          renderItem={({ item }) => <HistoryItemBuy item={item} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };

  _renderFooter = () => {
    const item = this.props.navigation.getParam('item');
    const { name, phone } = this.state;
    return (
      <View style={styles.containerFooter}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(ADD_INVOICE_SCREEN, {
              customer_name: name,
              customer_code: item.customer_code,
              customer_phone_no: phone,
              address: item.address1
            })
          }
          style={styles.button}
        >
          <Text style={[styles.txtButton, { fontWeight: 'bold' }]}>+ Thêm đơn mới</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView style={styles.wapper}>
          <View style={styles.wapperLayout}>{this._renderInformation()}</View>
          <View style={styles.wapperLayout}>{this.renderTotal()}</View>
          <View style={styles.wapperLayout}>{this.renderHisoryBuy()}</View>
        </ScrollView>
        {this._renderFooter()}
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
  };
}
export default connect(mapStateToProps)(DetailCustomerScreen);
