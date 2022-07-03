import React from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import LeftCenterRight from '../../elements/LeftCenterRight'
import {ICON_MENU} from '../../constants/index';
import OrderList from "../../components/OrderList";
import LinearGradient from 'react-native-linear-gradient';
import vw from "../../utils/size-dynamic";


class OrderFinishScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: dataOrder
    };
  }

  _openMenu = () => {
    this.props.navigation.navigate('DrawerOpen');
  };

  _renderHeader() {
    return (
      <LinearGradient
        colors={['#58c4be', '#45aa4b']}
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        style={{paddingHorizontal: vw(15), height: vw(50), justifyContent: "center"}}
      >
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <TouchableOpacity onPress={this._openMenu}>
            <Image style={styles.menuIcon} source={ICON_MENU}/>
          </TouchableOpacity>
          <Text style={{color: "white", fontSize: vw(16), fontFamily: "arial"}}>
            Đơn hàng hoàn thành
          </Text>
        </View>
      </LinearGradient>
    );
  }

  _onEndReached() {

  }

  _renderContent() {
    data = this.state.data;
    return (
      <View>
        <OrderList
          data={data}
          dataType={'order'}
          navigation={this.props.navigation}
          onClickItem={this._onClickItem}
          onEndReached={this._onEndReached}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar hidden={true}/> */}
        {this._renderHeader()}
        {this._renderContent()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFinishScreen);

const styles = {
  menuIcon: {
    width: vw(30),
    height: vw(30),
    resizeMode: 'contain',
    marginLeft: 0,
    marginRight: vw(15)
  },
  container: {
    // backgroundColor: '#00CC00',
    flexDirection: 'column',
    flex: 1,
  },
  icon_back: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 0,
    marginRight: 2,
  },
  header: {
    backgroundColor: '#00CC00',
    height: 50,
    paddingBottom: 10
  }
};
