import React, { PureComponent } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { ICON_ARROW_DROP, MAIN_COLOR, ICON_FILTER_INVOICE, ICON_CLOSE } from '../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';
import styles from './DrugStoreTab.style';
import vw from '../../utils/size-dynamic';
import Moment from 'moment/moment';
const dataSelect = ['Tất cả'];
import { connect } from 'react-redux';
type Props = {
  list_employees: any;
  info: any;
  dataConditionFilter: Function;
};
type State = {
  modalVisible: boolean;
  dateStart: string;
  dateEnd: string;
  selectedValue: any;
  conditionFilter: any;
  status: boolean;
  dateNowFilter: any;
  updated_user: any;
};
class ModalFilterChart extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dateStart: '',
      dateEnd: '',
      selectedValue:
        this.props.list_employees && this.props.list_employees.length !== 0 ? dataSelect[0] : this.props.info.full_name,
      conditionFilter: [],
      status: false,
      dateNowFilter: '',
      updated_user: this.props.list_employees && this.props.list_employees.length !== 0 ? '' : this.props.info.login_id,
    };
  }
  componentDidMount() {
    var date = new Date();
    var dateAgo = Moment(date.setDate(date.getDate() - 31)).format('YYYY/MM/DD');
    var dateNow = Moment().format('YYYY/MM/DD');
    this.setState({ dateNowFilter: dateNow, dateEnd: dateNow, dateStart: dateAgo });
  }
  toggleModal(visible: boolean) {
    this.setState({ modalVisible: visible });
  }
  getValueFilter = () => {
    const { dateStart, dateEnd, selectedValue, conditionFilter, modalVisible, status, updated_user } = this.state;
    if (dateEnd.length === 0 && dateStart.length === 0) {
      Alert.alert('Ngày bắt đầu hoặc ngày kết thúc trống');
    } else {
      if (new Date(dateEnd) < new Date(dateStart)) {
        Alert.alert('Ngày kết thúc không được lớn hơn ngày bắt đầu');
      } else {
        let dataFilter = Object.assign(conditionFilter, {
          from_issue_datetime: dateStart,
          to_issue_datetime: dateEnd,
          updated_user: updated_user,
          nameCustomer: selectedValue,
        });
        this.setState({ modalVisible: !modalVisible, conditionFilter: dataFilter });
        this.props.dataConditionFilter(conditionFilter);
      }
    }
  };
  cancle = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  _onSelect(idx: number, value: object) {
    const { list_employees, info } = this.props;
    this.setState({
      selectedValue: value,
      updated_user: list_employees && list_employees.length !== 0 ? list_employees[idx].login_id : info.login_id,
    });
  }
  _renderDropDown = () => {
    const { selectedValue } = this.state;
    const { list_employees, info } = this.props;
    if (list_employees && list_employees.length !== 0) {
      if (list_employees[0].full_name !== 'Tất cả') {
        list_employees.unshift({ full_name: 'Tất cả', login_id: '' });
      }
      var listCustomer = list_employees.map(element => {
        return element.full_name !== null ? element.full_name : element.login_id;
      });
    } else {
      if (info !== null) {
        var Person = [
          {
            full_name: info.full_name,
            login_id: info.login_id,
          },
        ];
        var listCustomer = Person.map(element => {
          return element.full_name !== null ? element.full_name : element.login_id;
        });
      }
    }
    return (
      <ModalDropdown
        options={listCustomer !== undefined && listCustomer.length !== 0 ? listCustomer : dataSelect}
        defaultValue={listCustomer !== undefined && listCustomer.length !== 0 ? listCustomer[0] : dataSelect[0]}
        defaultIndex={0}
        dropdownStyle={[styles.dropdownStyle, { height: dataSelect.length > 4 ? 'auto' : -1 }]}
        dropdownTextStyle={{
          fontSize: vw(14),
          fontFamily: 'Arial',
          // paddingHorizontal: vw(15),
        }}
        onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperInputFilter}>
          <Text style={styles.txt14}>{selectedValue}</Text>
          <Image source={ICON_ARROW_DROP} style={styles.iconArrow} />
        </View>
      </ModalDropdown>
    );
  };
  _renderModalFilter = () => {
    const { dateStart, dateEnd } = this.state;
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
              style={{ position: 'absolute', right: 0, marginTop: 10, marginRight: 10 }}
              onPress={() => this.cancle()}
            >
              <Image source={ICON_CLOSE} style={styles.iconClose} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: vw(15),
                height: vw(40),
              }}
            >
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Từ ngày</Text>
              </View>
              <View style={{ flex: 7 }}>
                <DatePicker
                  androidMode="spinner"
                  style={{ width: '100%' }}
                  date={dateStart}
                  mode="date"
                  maxDate={this.state.dateNowFilter}
                  placeholder="Chọn ngày bắt đầu"
                  format="YYYY/MM/DD"
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: vw(10),
                height: vw(40),
              }}
            >
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Đến ngày</Text>
              </View>
              <View style={{ flex: 7 }}>
                <DatePicker
                  androidMode="spinner"
                  style={{ width: '100%' }}
                  date={dateEnd}
                  mode="date"
                  placeholder="Chọn ngày kết thúc"
                  format="YYYY/MM/DD"
                  maxDate={this.state.dateNowFilter}
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
                      height: vw(40),
                    },
                    dateText: {
                      fontSize: vw(14),
                    },
                    placeholderText: {
                      fontSize: vw(14),
                    },
                  }}
                  onDateChange={(date: string) => this.setState({ dateEnd: date })}
                />
              </View>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: vw(10) }}
            >
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Nhân viên</Text>
              </View>
              <View style={{ flex: 7 }}>{this._renderDropDown()}</View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[styles.buttonFilter, { borderRightColor: 'gray', borderRightWidth: 0.5 }]}
                onPress={() => this.getValueFilter()}
              >
                <Text style={styles.buttonAccpect}>Đồng ý</Text>
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
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
          style={styles.buttonFilterModal}
          onPress={() => {
            this.toggleModal(true);
          }}
        >
          <Image source={ICON_FILTER_INVOICE} style={styles.iconFilter} />
          <Text style={{ color: 'white', fontSize: vw(12) }}>Lọc</Text>
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
export default connect(mapStateToProps)(ModalFilterChart);
