import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {connect} from "react-redux";
import {ICON_BACK} from "../../constants";
import LeftCenterRight from "../../elements/LeftCenterRight";
import {MAP} from "../../redux/types";
import Icon from "react-native-vector-icons/FontAwesome";


import ProductItem from "../../components/ProductItem";
// import PopupDialog, {DialogButton, DialogTitle, SlideAnimation} from "react-native-popup-dialog";


// const slideAnimation = new SlideAnimation({
//   slideFrom: 'bottom',
// });

const  {height, width} = Dimensions.get('window');

const dataOrder = {
  address: {
    street: "Nhà số 12, ngõ 178 phố Bạch Mai",
    district: "Hai Bà Trưng",
    city: "Hà Nội"
  },
  time: "18:00 30/06/2018",
  customer: {
    name: "Nguyễn Hoàng Anh",
    phone: "0987765545"
  },
  products: [
    {
      name: "Thực phẩm chức năng IOT",
      style: "Viên nang, 100 viên/hộp",
      size: "03",
      unit: "350.000 VND",
      total: "1,050,000 VND",
      image: "https://img.thuocbietduoc.com.vn/images/drugs/paracetamol_lado.jpg"
    },
    {
      name: "Thực phẩm chức năng IOTThực phẩm chức năng IOT",
      style: "Viên nang, 100 viên/hộp",
      size: "03",
      unit: "350.000 VND",
      total: "1,050,000 VND",
      image: "https://img.thuocbietduoc.com.vn/images/drugs/paracetamol_lado.jpg"
    },
    {
      name: "Thực phẩm chức năng IOTThực phẩm chức năng IOT",
      style: "Viên nang, 100 viên/hộp",
      size: "03",
      unit: "350.000 VND",
      total: "1,050,000 VND",
      image: "https://img.thuocbietduoc.com.vn/images/drugs/paracetamol_lado.jpg"
    },
  ]
};

class ProcessOrderScreen extends React.PureComponent  {

  constructor(props) {
    super(props);
    this.state = {
      itemCancelSelected: '1',
    }
  }

  _onGoBack = () => {
    this.props.navigation.goBack();
  };

  _renderHeader() {
    return (
      <LeftCenterRight
        body={this._renderHeaderTitle()}
        left={this._renderMenu()}
        style={styles.header}
      />
    );
  }

  _renderHeaderTitle() {
    return (
      <View>
        <Text>MEDLINK - Xử lý đơn hàng</Text>
      </View>
    );
  }

  _renderMenu() {
    return (
      <TouchableOpacity onPress={this._onGoBack} style={{paddingRight: 5, paddingVertical: 5}}>
        <Image style={styles.icon_back} source={ICON_BACK}/>
      </TouchableOpacity>
    );
  }

  _renderListProduct() {
    return (
      <View>
        {dataOrder.products.map((item, index) => {
          return(
            <ProductItem data={item} key={index.toString()}/>
          )
        })}
        <Text style={{textAlign: "right", color: "#333333", padding: 10}}>Tổng đơn: 2,3000,000</Text>
      </View>
    )
  }

  _renderInfo() {
    return (
      <View style={{paddingHorizontal: 15, paddingTop: 15, paddingBottom:5, borderBottomWidth: 1, borderBottomColor: "#cccccc"}}>
        <View style={{flexDirection: "row"}}>
          <View style={{}}>
            <Text style={styles.infoItemTitle}>Địa chỉ giao hàng</Text>
            <View style={styles.infoItem}>
              <Icon
                name={"map-marker"}
                style={styles.infoItemIcon}
              />
              <View>
                <Text style={styles.infoItemText}>
                  {dataOrder.address.street}
                </Text>
                <Text style={styles.infoItemText}>
                  Quận/Huyện: {dataOrder.address.district}
                </Text>
                <Text style={styles.infoItemText}>
                  Thành phố: {dataOrder.address.city}
                </Text>
              </View>
            </View>
            <Text style={styles.infoItemTitle}>Thời gian giao hàng</Text>
            <View style={styles.infoItem}>
              <Icon
                name={"clock-o"}
                style={styles.infoItemIcon}
              />
              <View>
                <Text style={styles.infoItemText}>
                  {dataOrder.time}
                </Text>
              </View>
            </View>
            <Text style={styles.infoItemTitle}>Thông tin khách hàng</Text>
            <View style={[styles.infoItem, {marginBottom: 0}]}>
              <Icon
                name={"user"}
                style={styles.infoItemIcon}
              />
              <View>
                <Text style={styles.infoItemText}>
                  {dataOrder.customer.name}
                </Text>
                <Text style={styles.infoItemText}>
                  Số điện thoại: {dataOrder.customer.phone}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: "flex-end"}}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.dispatch({type: MAP})
            }}>
              <Text style={[styles.link, {textAlign: "right"}]}>Chỉ đường</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{textAlign: "center", color: "#333333", marginTop: 10}}>THANH TOÁN GIAO HÀNG</Text>
      </View>
    )
  }

  _renderCancelPopup() {
    return null
    // (
    //   <PopupDialog
    //     dialogTitle={<DialogTitle title="Hủy đơn hàng" />}
    //     ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    //     dialogAnimation={slideAnimation}
    //     width={width - 30}
    //   >
    //     <View style={styles.wrapPopup}>
    //       <Text>Lý do hủy đơn hàng</Text>
    //       <View style={styles.wrapRadioButton}>
    //         <TouchableOpacity onPress={() => this.setState({ itemCancelSelected: '1' })}>
    //           <Radio
    //             selected={this.state.itemCancelSelected === '1'}
    //           />
    //           <Text>Khách gọi hủy đơn hàng</Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.popupFooter}>
    //         <TouchableOpacity onPress={() => {
    //           return this.popupDialog.dismiss(() => {
    //             console.log('callback - will be called immediately')
    //           });
    //         }}>
    //           <Text>OK</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </PopupDialog>
    // );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderCancelPopup()}
        <ScrollView>
          {this._renderListProduct()}
          {this._renderInfo()}
          <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 100}}>
            <TouchableOpacity style={{padding: 15}}>
              <Text style={styles.link}>Hoàn thành đơn hàng ></Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 15}} onPress={() => {
              return this.popupDialog.show(() => {
                console.log('callback - will be called immediately')
              });
            }}>
              <Text style={styles.link}>Hủy đơn hàng ></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#ffffff"
  },
  icon_back: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 0,
    marginRight: 2,
  },
  header:{
    backgroundColor: '#00CC00',
    height: 50,
    paddingBottom: 10
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    flexWrap: "wrap"
  },
  infoItemIcon: {
    marginRight: 5,
    width: 15,
    textAlign: "center",
    marginTop: 2
  },
  infoItemText: {
    color: "#333333",
    flex: 1
  },
  infoItemTitle: {
    fontWeight: "700",
    color: "#333333",
    marginBottom: 3
  },
  wrapPopup: {
    padding: 15,
    flex: 1
  },
  popupFooter: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 15,
    justifyContent: "center",
    flexDirection: "row"
  }
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessOrderScreen);