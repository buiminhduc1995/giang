import React, { PureComponent } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { ICON_FILTER_INVOICE, MAIN_COLOR, ICON_CHECKED, ICON_ARROW_DROP, ICON_CLOSE, themes } from '../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';
import styles from './OrderManagement.style';
import vw from '../../utils/size-dynamic';
import Moment from 'moment/moment';
const dataSelect = ['Tất cả'];
import { connect } from 'react-redux';
type Props = {
  list_employees: any;
  info: any;
  dataConditionFilter: any;
};
type State = {
  modalVisible: boolean;
  dateStart: string;
  dateEnd: string;
  selectedValue: any;
  conditionFilter: any;
  status: boolean;
  dateNowFilter: any;
  login_id: any;
};
class ModalFilter extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      dateStart: '',
      dateEnd: '',
      selectedValue:
        this.props.list_employees !== undefined && this.props.list_employees.length !== 0
          ? dataSelect[0]
          : this.props.info.full_name,
      conditionFilter: [],
      status: false,
      dateNowFilter: '',
      login_id:
        this.props.list_employees !== undefined && this.props.list_employees.length !== 0
          ? ''
          : this.props.info.login_id,
    };
  }
  componentDidMount() {
    var date = new Date();
    var dateAgo = Moment(date.setDate(date.getDate() - 31)).format('DD/MM/YYYY');
    var dateNow = Moment().format('DD/MM/YYYY');
    this.setState({ dateNowFilter: dateNow, dateEnd: dateNow, dateStart: dateAgo });
  }
  toggleModal(visible: boolean) {
    this.setState({ modalVisible: visible });
  }
  getValueFilter = async () => {
    const { dateStart, dateEnd, selectedValue, conditionFilter, modalVisible, status, login_id } = this.state;
    if (status === false) {
      let dataFilter = Object.assign(conditionFilter, {
        from_issue_datetime: '',
        to_issue_datetime: '',
        updated_user: selectedValue,
        login_id: login_id,
      });
      this.setState({ modalVisible: !modalVisible, conditionFilter: dataFilter });
      this.props.dataConditionFilter(conditionFilter);
    } else {
      if (dateEnd.length === 0 && dateStart.length === 0) {
        Alert.alert('Ngày bắt đầu hoặc ngày kết thúc trống');
      } else {
        if (new Date(dateEnd) < new Date(dateStart)) {
          Alert.alert('Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
        } else {
          let dataFilter = Object.assign(conditionFilter, {
            from_issue_datetime: dateStart,
            to_issue_datetime: dateEnd,
            updated_user: selectedValue,
            login_id: login_id,
          });
          this.setState({ modalVisible: !modalVisible, conditionFilter: dataFilter });
          this.props.dataConditionFilter(conditionFilter);
        }
      }
    }
  };
  cancel = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  _onSelect(idx: number, value: any) {
    const { list_employees, info } = this.props;
    this.setState({
      selectedValue: value,
      login_id:
        list_employees !== undefined && list_employees.length !== 0 ? list_employees[idx].login_id : info.login_id,
    });
  }
  selectAll = () => {
    this.setState({
      status: true,
    });
  };
  selectDate = () => {
    this.setState({
      status: false,
    });
  };
  _renderModalCustomer = () => {
    const { selectedValue } = this.state;
    const { list_employees, info } = this.props;
    let darfListEmployess = this.props.list_employees;
    if (darfListEmployess !== undefined && darfListEmployess.length !== 0) {
      if (darfListEmployess[0].full_name !== 'Tất cả') {
        darfListEmployess.unshift({ full_name: 'Tất cả', login_id: '' });
      }
      var listCustomer = darfListEmployess.map((element: any) => {
        return element.full_name !== null ? element.full_name : element.login_id;
      });
    } else {
      var Person = [{ full_name: info ? info.full_name : '', login_id: info ? info.login_id : '' }];
      var listCustomer = Person.map(element => {
        return element.full_name !== null ? element.full_name : element.login_id;
      });
    }
    return (
      <ModalDropdown
        options={listCustomer !== undefined && listCustomer.length !== 0 ? listCustomer : dataSelect}
        defaultValue={listCustomer !== undefined && listCustomer.length !== 0 ? listCustomer[0] : dataSelect[0]}
        defaultIndex={0}
        dropdownStyle={[
          styles.stylesModal,
          {
            height: dataSelect.length > 4 ? 'auto' : -1,
          },
        ]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx, value) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperInputFilter}>
          <Text style={styles.txtFilter}>{selectedValue}</Text>
          <Image source={ICON_ARROW_DROP} style={{ width: vw(14), height: vw(14), tintColor: 'black' }} />
        </View>
      </ModalDropdown>
    );
  };
  _renderModalFilter = () => {
    const { dateStart, dateEnd, selectedValue } = this.state;
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.ShowModalFunction(!this.state.modalVisible);
        }}
      >
        <View style={styles.backgroundModal}>
          <View style={styles.ModalInsideView}>
            <TouchableOpacity
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              style={styles.wapperButtonCancel}
              onPress={() => this.cancel()}
            >
              <Image source={ICON_CLOSE} style={styles.iconClose} />
            </TouchableOpacity>
            <View style={styles.wapperCheckBox}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Thời gian</Text>
              </View>
              <View style={styles.wapperColum1}>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => this.selectDate()}
                  style={styles.buttonCheckBox}
                >
                  <View style={styles.checkbox}>
                    {!this.state.status ? <Image source={ICON_CHECKED} style={styles.iconCheck} /> : null}
                  </View>
                  <Text style={styles.txtSelectTime}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => this.selectAll()}
                  style={styles.buttonCheckBox}
                >
                  <View style={styles.checkbox}>
                    {this.state.status && <Image source={ICON_CHECKED} style={styles.iconCheck} />}
                  </View>
                  <Text style={styles.txtSelectTime}>Chọn khoảng thời gian</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wapperView}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Từ ngày</Text>
              </View>
              <View style={{ flex: 7 }}>
                <DatePicker
                  androidMode="spinner"
                  disabled={!this.state.status}
                  style={{ width: '100%' }}
                  date={this.state.status ? dateStart : ''}
                  mode="date"
                  maxDate={this.state.dateNowFilter}
                  placeholder="Chọn ngày bắt đầu"
                  format="DD/MM/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={true}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      borderRadius: vw(5),
                      fontSize: vw(12),
                      height: vw(40),
                    },
                    dateText: {
                      fontSize: vw(14),
                    },
                    placeholderText: {
                      fontSize: vw(14),
                    },
                  }}
                  onDateChange={(date: string) => {
                    this.setState({ dateStart: date });
                  }}
                />
              </View>
            </View>
            <View style={[styles.wapperView, { marginTop: vw(30) }]}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Đến ngày</Text>
              </View>
              <View style={{ flex: 7 }}>
                <DatePicker
                  androidMode="spinner"
                  disabled={!this.state.status}
                  style={{ width: '100%' }}
                  date={this.state.status ? dateEnd : ''}
                  mode="date"
                  maxDate={this.state.dateNowFilter}
                  placeholder="Chọn ngày kết thúc"
                  format="DD/MM/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={true}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      borderRadius: vw(5),
                      fontSize: vw(12),
                      height: vw(40),
                    },
                    dateText: {
                      fontSize: vw(14),
                    },
                    placeholderText: {
                      fontSize: vw(14),
                    },
                  }}
                  onDateChange={(date: string) => {
                    this.setState({ dateEnd: date });
                  }}
                />
              </View>
            </View>
            <View style={styles.wapperView}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Nhân viên</Text>
              </View>
              <View style={{ flex: 7 }}>{this._renderModalCustomer()}</View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.buttonFilter, { borderRightColor: themes.colors.GRAY, borderRightWidth: 0.5 }]}
                onPress={() => this.getValueFilter()}
              >
                <Text style={styles.txtAskFilter}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.containerButton}
          onPress={() => {
            this.toggleModal(true);
          }}
        >
          <Text style={styles.txtFilterButton}>Bộ lọc</Text>
          <Image source={ICON_FILTER_INVOICE} style={styles.iconFilter} />
        </TouchableOpacity>
        {this._renderModalFilter()}
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    list_employees: state.user.dataUser.list_employees,
    info: state.user.dataUser.info,
  };
}
export default connect(mapStateToProps)(ModalFilter);
