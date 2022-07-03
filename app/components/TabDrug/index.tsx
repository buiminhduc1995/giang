import React from 'react';
import { View, Text, Image, Alert, Animated } from 'react-native';
import { themes } from '../../constants';
import vw from '../../utils/size-dynamic';
import API from '../../api';
import DrugList from '../DrugList';
import { connect } from 'react-redux';
import Input from '../../elements/Input';
import ModalDropdown from 'react-native-modal-dropdown';
const dataSelect = ['Tên thuốc', 'Nhà cung cấp'];
import debounce from '../../utils/debounce';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay } from 'rn-placeholder';
import { Navigation } from '../../dataType/index.d';
import styles from './TabDrug.styles';
import TextEmpty from '../../elements/TextEmpty/';
type Props = {
  info: any;
  phoneNo: any;
  type: any;
  navigation: Navigation;
};
type State = {
  page: number;
  total_page: number;
  params: {
    drug_name: any;
    drug_code: any;
    sort_by: any;
    provider_name: any;
  };
  loadMore: boolean;
  isFetching: boolean;
  text: string;
  drugList: any;
  selectedModal: string;
  fadeIn: any;
  fadeOut: any;
  flag: boolean;
};

class TabDrug extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      drugList: [],
      selectedModal: dataSelect[0],
      text: '',
      loadMore: false,
      isFetching: false,
      page: 1,
      total_page: 1,
      params: {
        drug_name: '',
        drug_code: '',
        sort_by: '',
        provider_name: '',
      },
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(1),
      flag: false,
    };
  }

  componentDidMount() {
    this.fetchData(this.state.params, this.state.page);
  }

  // Danh sách thuốc từ các nhà cung cấp
  fetchData = async (_params: any, page?: number) => {
    const params = _params ? _params : this.state.params;
    this.setState({ isFetching: true });
    await this.setState({ page: 1, params: params });
    await API.syncOrderToAdmin
      .getListDrugCompany(params, page)
      .then((res: any) => {
        this.setState({
          drugList: res.data.result.data,
          total_page: res.data.result.total_page,
          isFetching: false,
        });
      })
      .catch((err: any) => {
        Alert.alert('Thông báo', 'Lỗi kết nối, vui lòng thử lại');
        this.setState({ isFetching: false });
      });
  };
  loadMore = async () => {
    const { page, params, drugList, total_page } = this.state;
    if (page >= total_page) return;
    await this.setState({ loadMore: true });
    await API.syncOrderToAdmin
      .getListDrugCompany(params, page + 1)
      .then((res: any) => {
        this.setState({
          drugList: [...drugList, ...res.data.result.data],
          loadMore: false,
        });
      })
      .catch((err: any) => console.log(err));
    if (page + 1 >= total_page) {
      this.setState({ loadMore: false });
    }
    this.setState({ page: page + 1 });
  };

  _renderSearchBox() {
    const placeholder =
      this.state.selectedModal === dataSelect[0] ? 'Tìm kiếm theo tên thuốc' : 'Tìm kiếm theo tên nhà cung cấp';
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <Image source={themes.ICON_SEARCH} style={styles.iconSearch} />
          <Input
            onChange={debounce(this.onSearch, 350)}
            style={styles.input}
            placeholder={placeholder}
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
          {this._renderDropdown()}
        </View>
      </View>
    );
  }
  _renderDropdown() {
    return (
      <ModalDropdown
        options={dataSelect}
        defaultValue={this.state.text}
        defaultIndex={0}
        dropdownStyle={styles.dropDownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={this.onSelect}
      >
        <View style={{ alignItems: 'center' }}>
          <Image source={themes.ICON_FILTER} style={styles.iconSearch} />
          <Text style={styles.text}>{this.state.selectedModal}</Text>
        </View>
      </ModalDropdown>
    );
  }

  onSelect = (idx: number, value: string) => {
    this.setState({ selectedModal: dataSelect[idx] });
  };
  onSearch = async (text: string) => {
    const { selectedModal } = this.state;
    const params = { ...this.state.params };
    if (selectedModal === dataSelect[0]) {
      params.drug_name = text;
      params.sort_by = '';
      params.provider_name = '';
    }
    if (selectedModal === dataSelect[1]) {
      params.drug_name = '';
      params.sort_by = '';
      params.provider_name = text;
    }
    this.fetchData(params);
    this.setState({ params: params });
  };
  fadeIn = () => {
    this.state.fadeIn.setValue(0);
    this.setState({ flag: true });
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1500,
    }).start(() => this.fadeOut());
  };

  fadeOut = () => {
    this.state.fadeOut.setValue(1);
    this.setState({ flag: false });
    Animated.timing(this.state.fadeIn, {
      toValue: 0,
      duration: 1000,
    }).start();
  };
  show = (e: any) => {
    if (e === true) {
      this.fadeIn();
    }
  };
  _showOrderCart = () => {
    return (
      <Animated.View style={[styles.wapperAnimation, { opacity: this.state.fadeIn }]}>
        <View style={styles.viewAnimation}>
          <Text style={styles.txtAnimation}>Đã thêm vào giỏ hàng</Text>
        </View>
      </Animated.View>
    );
  };
  render() {
    const { drugList, loadMore, isFetching } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: themes.colors.WHITE }}>
        {this._renderSearchBox()}
        {!this.state.isFetching && (!this.state.drugList || this.state.drugList.length === 0) ? (
          <TextEmpty text={'Không tìm thấy sản phẩm nào!'} />
        ) : (
          <DrugList
            data={this.state.drugList}
            navigation={this.props.navigation}
            onEndReached={!loadMore ? this.loadMore : null}
            onRefresh={() => this.fetchData(this.state.params)}
            renderFooter={null}
            renderHeader={<View style={{ height: vw(10) }} />}
            style={styles.context}
            isLoadMore={loadMore}
            refreshing={isFetching && drugList.length !== 0}
            onUpdateProductSuccess={this.fetchData}
            phoneNo={this.props.phoneNo}
            type={this.props.type}
            action={e => this.show(e)}
          />
        )}
        <LoadContent
          number={10}
          loading={isFetching && drugList.length === 0}
          animation={ShineOverlay}
          style={{ marginHorizontal: vw(10), marginTop: vw(5) }}
        />
        {this._showOrderCart()}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isUpdate: state.product.isUpdate,
    info: state.user.dataUser.info,
    dataOrder: state.order.dataOrder,
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabDrug);
