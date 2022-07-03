import React from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import TabPill from '../../components/TabPill';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import TabDrug from '../../components/TabDrug';
import { ORDER_PROVIDER } from '../../redux/types';
import TabHistoryOrderPharmacy from '../../components/TabHistoryOrderPharmacy';
import TabDrugInventory from '../TabDrugInventory';
import { ICON_CART } from '../../constants';
import { changeScrollTab } from '../../redux/action/navigation';
// import OrderDialog from "../../components/OrderDialog";

interface Props {
  listProductOrder: any;
  scrollTabOrderScreenNumber: number;
  changeScrollTab: any;
}
interface State {}
class ProviderScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      //selectedValue: dataSelect[0],
      orderBy: {
        name: true,
        account_id: props.info.account_id !== null ? props.info.account_id : null,
      },
      update: false,
      isFetching: false,
      text: '',
    };
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }

  _renderHeaderLeft() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: vw(18),
            fontFamily: 'Arial',
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          Đặt hàng
        </Text>
      </View>
    );
  }

  _renderHeaderRight = () => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => this.props.navigation.navigate('OrderListToProvider')}
      >
        <Image source={ICON_CART} style={styles.iconCart} />
        {this.props.listProductOrder.length ? (
          <View style={styles.containerNumberProduct}>
            <Text style={styles.numberProduct}>{this.props.listProductOrder.length}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  _renderTab() {
    return (
      <ScrollableTabView
        initialPage={0}
        page={this.props.scrollTabOrderScreenNumber}
        renderTabBar={() => <TabPill />}
        tabBarPosition="top"
        onChangeTab={(number: number) => {
          this.props.changeScrollTab(number.i);
        }}
      >
        <View tabLabel={'Thuốc trong kho'} style={{ flex: 1 }}>
          <TabDrugInventory navigation={this.props.navigation} />
        </View>
        <View tabLabel={'Công ty dược'} style={{ flex: 1 }}>
          <TabDrug navigation={this.props.navigation} orderBy={this.state.orderBy} />
        </View>
        <View tabLabel={'Lịch sử đơn hàng'} style={{ flex: 1 }}>
          <TabHistoryOrderPharmacy navigation={this.props.navigation} />
        </View>
      </ScrollableTabView>
    );
  }

  _renderBody() {
    return (
      <View style={styles.wrapBody}>
        {/* {this._renderSearchBox()} */}
        {this._renderTab()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderBody()}
        {/* <OrderDialog/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapBody: {
    flex: 1,
  },
  text: {
    fontFamily: 'Arial',
    fontSize: vw(14),
  },
  button: {},
  containerNumberProduct: {
    backgroundColor: '#FF7E00',
    height: vw(17),
    width: vw(17),
    borderRadius: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -7,
    right: -5,
  },
  iconCart: {
    width: vw(25),
    height: vw(25),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  numberProduct: {
    fontSize: vw(12),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    dataOrder: state.order.dataOrder,
    listProductOrder: state.orderToProvider.listProductOrder,
    scrollTabOrderScreenNumber: state.navigation.scrollTabOrderScreenNumber,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    removeData: () => dispatch({ type: ORDER_PROVIDER, data: null }),
    changeScrollTab: (number: number) => dispatch(changeScrollTab(number)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProviderScreen);

// _renderDropdown() {
//   return (
//     <ModalDropdown
//       options={dataSelect}
//       defaultValue={this.state.selectedValue}
//       defaultIndex={0}
//       dropdownStyle={{
//         width: vw(150),
//         height: "auto",
//         maxHeight: vw(120),
//         borderRadius: 3,
//         overflow: "hidden",
//         marginTop: vw(10),
//         marginRight: -vw(10),
//         // Shadow
//         ...Platform.select({
//           ios: {
//             shadowColor: "black",
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.14,
//             shadowRadius: 2
//           },
//           android: {
//             elevation: 8
//           }
//         })
//       }}
//       dropdownTextStyle={{
//         fontSize: vw(14),
//         fontFamily: "Arial",
//         paddingHorizontal: vw(15)
//       }}
//       onSelect={(idx, value) => this._onSelect(idx, value)}
//     >
//       <View
//         style={{
//           alignItems: "center"
//         }}
//       >
//         <Image
//           source={ICON_FILTER}
//           style={{
//             width: vw(16),
//             height: vw(16),
//             resizeMode: "contain"
//           }}
//         />
//         <Text
//           style={{
//             fontSize: vw(10),
//             color: MAIN_COLOR,
//             fontFamily: "Arial"
//           }}
//         >
//           {this.state.selectedValue}
//         </Text>
//       </View>
//     </ModalDropdown>
//   );
// }

// async _onSelect(idx, value) {
//   this.setState({
//     selectedValue: value
//   });
//   if (idx.toString() === "0") {
//     await this.setState({
//       orderBy: {
//         name: true,
//         account_id:
//           this.props.info.account_id !== null
//             ? this.props.info.account_id
//             : null
//       }
//     });
//   } else if (idx.toString() === "1") {
//     await this.setState({
//       orderBy: {
//         quantity: true,
//         account_id:
//           this.props.info.account_id !== null
//             ? this.props.info.account_id
//             : null
//       }
//     });
//   }
// }
// _onSearchNameDrug = () => {
//   if (validate(this.state.text) == null) {
//     this.setState({
//       orderBy: {
//         key_name: this.state.text,
//         account_id:
//           this.props.info.account_id !== null
//             ? this.props.info.account_id
//             : null
//       }
//     });
//   }
// };

// _renderSearchBox() {
//   return (
//     <View
//       style={{
//         backgroundColor: "white"
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           backgroundColor: "#F2F2F2",
//           borderRadius: 5,
//           margin: vw(10),
//           paddingHorizontal: vw(10)
//         }}
//       >
//         <TouchableOpacity onPress={this._onSearchNameDrug}>
//           <Image
//             source={ICON_SEARCH}
//             style={{
//               width: vw(21),
//               height: vw(21),
//               resizeMode: "contain"
//             }}
//           />
//         </TouchableOpacity>
//         <Input
//           onChange={text => {
//             this.setState({ text }, this._onSearchNameDrug);
//           }}
//           style={{
//             color: "#333333",
//             backgroundColor: "transparent",
//             height: vw(40),
//             paddingVertical: 0,
//             flex: 1
//           }}
//           placeholder={"Tìm kiếm theo từ khóa"}
//           selectionColor={"#333333"}
//           placeholderTextColor={"#BDBDBD"}
//         />
//         {this._renderDropdown()}
//       </View>
//     </View>
//   );
// }
