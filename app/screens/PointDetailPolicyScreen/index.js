import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { ICON_BACK } from "../../constants";
import Api from "../../api";
import { connect } from "react-redux";
import LoaderIndicator from "../../elements/LoaderIndicator";
import { REFRESH_NEWS } from "../../redux/types";
import HeaderBar from '../../elements/HeaderBar';
import vw from "../../utils/size-dynamic";
import {MyStatusBar} from '../../elements/MyStatusBar';

class PointDetailPolicyScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching:false,
    };
  }

  componentWillMount() {
    
  }


  _goBack=()=>{
    this.props.navigation.goBack();
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
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={this._goBack}>
        <Image source={ICON_BACK} style={{ width: vw(11), height: vw(20), resizeMode: "contain", marginRight: vw(10) }} />
        <Text style={{ fontSize: vw(18), fontFamily: "Arial", fontWeight: "bold", color: "#ffffff" }}>
          Chi tiết điểm thưởng
        </Text>
      </TouchableOpacity>
    )
  }
  _renderPolicy = () =>{
    return(
      <View style={{padding:5}}>
        <Text style= {{color:'black', fontWeight:'bold',paddingLeft:5}}>Chính sách điểm thưởng</Text>
        <Text style={{padding:10}}>
        {`Nhận đơn hàng và hoàn thành đơn hàng: +50đ \nHủy đơn hàng do khách hủy đơn: -0đ \nHủy đơn hàng vì các lý do khác: Quá xa, không nhận đơn nữa, vv , ...: - 1000đ\nBấm đặt đơn hàng trên app: Ít hơn 5 sản phẩm + 500đ, nhiều hơn 5 sản phẩm +1000đ`}
        </Text>
        <Text style= {{color:'black', fontWeight:'bold', paddingLeft:5}}>Quy tắc đổi điểm và quy định sử dụng điểm thưởng:</Text>
        <Text style={{padding:10}}>
        {`Quy ước đổi: 10đ = 100VNĐ.\nQuy định: Sau khi tích đủ trên 10000đ = 100,000VND, nhà thuốc sẽ được phép sử dụng điểm để chiết khấu trên đơn hàng đặt trên app.\nĐiểm không đổi ra tiền mặt hoặc có giá trị sử dụng trên các ứng dụng khác.\nLưu ý: Nếu nhà thuốc bị khóa tài khoản (do vị phạm điều khoản sử dụng, hủy đơn quá nhiều lần, khách hàng review xấu, ..vv...), toàn bộ điểm đã tích được sẽ mất hiệu lực sử dụng`}
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar/>
        {this._renderHeader()}
        {this._renderPolicy()}
        <LoaderIndicator loading={this.state.isFetching} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.dataUser.info,
    store: state.auth.data2,
    isRefreshNew: state.social.isRefreshNew
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
)(PointDetailPolicyScreen);
