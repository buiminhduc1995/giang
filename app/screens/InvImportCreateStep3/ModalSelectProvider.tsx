import React, { PureComponent } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../constants';
import { connect } from 'react-redux';
import ItemCustomer from '../../components/ItemCustomer';
import LoaderIndicator from '../../elements/LoaderIndicator';
import API from '../../api';
import vw from '../../utils/size-dynamic'
type Props = {
  navigation: Function;
  token: any;
  info: any;
  store: any;
};
type State = {
  selectedValue: string;
  listProvider: any;
  isFetching: boolean;
  text: any;
  page: number;
  totalPage: number;
  loadMore: boolean;
  modalVisible: boolean;
  providerSelected: object;
  isOpenFirst: boolean;
};
class ModalSelectedPhone extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      listProvider: [],
      providerSelected: {},
    };
  }
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount = () => {
    this._initData();
  };
  _initData = async () => {
    await API.warehouse.getListProvider(this.props.store.company_code).then(res => {
      this.setState({ listProvider: res.data })
    }).catch(err => {
      console.log(err);
    })
  };
  selectedProvider = item => {
    let data = Object.assign(this.state.providerSelected, {
      provider_code: item.provider_code,
      provider_name: item.provider_name,
    });
    this.setState({ modalVisible: false, providerSelected: data });
    this.props.onSelectProvider(this.state.providerSelected);
  };
  _renderListEmpty = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, color: MAIN_COLOR, fontWeight: 'bold' }}>Không tìm thấy kết quả phù hợp</Text>
    </View>
  );
  _renderBody = () => {
    const { listProvider } = this.state;
    return (
      <View style={{ backgroundColor: '#F0EDEE', flex: 1, paddingBottom: 10 }}>
        <LoaderIndicator loading={this.state.isFetching} />
        {listProvider && listProvider.length > 0 ? (
          <FlatList
            type="provider"
            data={listProvider}
            renderItem={({ item, index }) => (
              <ItemCustomer item={item} type={'provider'} onPressSelected={() => this.selectedProvider(item)} />
            )}
            keyExtractor={(item) => item.provider_id.toString()}
          />
        ) : (
            this._renderListEmpty()
          )}
      </View>
    );
  };
  cancel = async () => {
    await this.setState({ modalVisible: false, page: 0, listProvider: [] })
    this._initData()
  }
  _renderFooter = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.cancel()}>
        <Text style={styles.txtButton}>HỦY</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <Modal animationType={'slide'} transparent={false} visible={this.state.modalVisible}>
        {this._renderBody()}
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: vw(60) }}>
          {this._renderFooter()}
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    height: vw(40),
    backgroundColor: MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: vw(5),
  },
  txtButton: {
    fontSize: vw(14),
    color: 'white',
    fontWeight: 'bold'
  }
})
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
    store: state.user.dataUser.store,
  };
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(ModalSelectedPhone);
