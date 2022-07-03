import React, { PureComponent } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Alert } from 'react-native';
import { ICON_ARROW_DROP, ICON_FILTER_INVOICE, ICON_CLOSE, ICON_CHECKED } from '../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';
import styles from './ModalFilterImport.style';
import Moment from 'moment/moment';
const status = ['Tất cả', 'Hoàn thành', 'Chờ duyệt', 'Đã hủy'];
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
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
  codeStatus: any;
  flag: boolean;
};
class ModalFilterImport extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      dateStart: '',
      dateEnd: '',
      selectedValue: status[0],
      conditionFilter: [],
      status: false,
      dateNowFilter: '',
      codeStatus: '',
      flag: false,
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
    const { dateStart, dateEnd, selectedValue, conditionFilter, modalVisible, flag } = this.state;
    const value =
      selectedValue === 'Tất cả' ? '' : selectedValue === 'Hoàn thành' ? 2 : selectedValue === 'Chờ duyệt' ? '0' : 9;
    if (dateEnd.length === 0 && dateStart.length === 0) {
      Alert.alert('Ngày bắt đầu hoặc ngày kết thúc trống');
    } else {
      if (new Date(dateEnd) < new Date(dateStart)) {
        Alert.alert('Ngày kết thúc không được lớn hơn ngày bắt đầu');
      } else {
        let dataFilter = Object.assign(conditionFilter, {
          from_issue_datetime: flag === true ? dateStart : '',
          to_issue_datetime: flag === true ? dateEnd : '',
          status: value,
        });
        this.setState({ modalVisible: !modalVisible, conditionFilter: dataFilter });
        this.props.dataConditionFilter(conditionFilter);
      }
    }
  };
  cancel = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  _onSelect = async (idx: number, value: object) => {
    await this.setState({
      selectedValue: value,
    });
  };
  selectAll = () => {
    this.setState({
      flag: true,
    });
  };
  selectDate = () => {
    this.setState({
      flag: false,
    });
  };
  _renderDropDown = () => {
    const { selectedValue } = this.state;
    return (
      <ModalDropdown
        options={status}
        defaultValue={status[0]}
        defaultIndex={0}
        dropdownStyle={[styles.dropdownStyle, { height: status.length > 4 ? 'auto' : -1 }]}
        dropdownTextStyle={styles.dropDownText}
        onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperInputFilter}>
          <Text style={styles.txtFilter}>{selectedValue}</Text>
          <Image source={ICON_ARROW_DROP} style={styles.iconDropDown} />
        </View>
      </ModalDropdown>
    );
  };
  _renderModalFilter = () => {
    const { dateStart, dateEnd } = this.state;
    return (
      <Modal transparent={true} animationType={'slide'} visible={this.state.modalVisible}>
        <View style={styles.backgroundModal}>
          <View style={styles.ModalInsideView}>
            <TouchableOpacity
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              style={styles.buttonCancel}
              onPress={() => this.cancel()}
            >
              <Image source={ICON_CLOSE} style={styles.iconClose} />
            </TouchableOpacity>
            <View style={[styles.wapperCheckBox, { marginTop: 20 }]}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Thời gian</Text>
              </View>
              <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => this.selectDate()}
                  style={styles.buttonCheckBox}
                >
                  <View style={styles.checkbox}>
                    {!this.state.flag ? <Image source={ICON_CHECKED} style={styles.iconCheck} /> : null}
                  </View>
                  <Text style={styles.txtSelectTime}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectAll()} style={styles.buttonCheckBox}>
                  <View style={styles.checkbox}>
                    {this.state.flag ? <Image source={ICON_CHECKED} style={styles.iconCheck} /> : null}
                  </View>
                  <Text style={styles.txtSelectTime}>Chọn khoảng thời gian</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerRow}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Từ ngày</Text>
              </View>
              <View style={{ flex: 7 }}>
                <DatePicker
                  style={{ width: '100%' }}
                  date={dateStart}
                  androidMode="spinner"
                  maxDate={this.state.dateNowFilter}
                  disabled={!this.state.flag}
                  mode="date"
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
                      borderRadius: 5,
                      height: vw(30),
                    },
                    dateText: {
                      fontSize: vw(14),
                    },
                  }}
                  onDateChange={(date: string) => {
                    this.setState({ dateStart: date });
                  }}
                />
              </View>
            </View>
            <View style={[styles.containerRow, { marginTop: vw(20) }]}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Đến ngày</Text>
              </View>
              <View style={{ flex: 7 }}>
                <DatePicker
                  androidMode="spinner"
                  style={{ width: '100%' }}
                  date={dateEnd}
                  disabled={!this.state.flag}
                  mode="date"
                  placeholder="Chọn ngày kết thúc"
                  format="DD/MM/YYYY"
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
                      borderRadius: 5,
                      height: vw(30),
                    },
                    dateText: {
                      fontSize: vw(14),
                    },
                  }}
                  onDateChange={(date: string) => this.setState({ dateEnd: date })}
                />
              </View>
            </View>
            <View style={styles.containerRow}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Trạng thái</Text>
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
          <Text style={styles.txtFilterButton}>Lọc</Text>
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
export default connect(mapStateToProps)(ModalFilterImport);
