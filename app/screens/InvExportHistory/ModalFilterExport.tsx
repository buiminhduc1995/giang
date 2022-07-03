import React, { PureComponent } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { ICON_FILTER_INVOICE, MAIN_COLOR, ICON_CHECKED, ICON_CLOSE } from '../../constants';
import DatePicker from 'react-native-datepicker';
import vw from '../../utils/size-dynamic';
import Moment from 'moment/moment';
import { connect } from 'react-redux';
import { ModalCustom } from '../../elements/ModalCustom';
import * as types from '../../redux/types';
import API from '../../api';
import { colors } from '../../constants/themes';

interface Props {
  info: any;
  exportType: any;
  dataConditionFilter: any;
  getExportType: any;
}
interface State {
  modalVisible: boolean;
  isAllDay: boolean;
  dateStart: string;
  dateEnd: string;
  dateNow: any;
  status: string;
  exportType: number;
}

class ModalFilter extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      isAllDay: true,
      dateStart: '',
      dateEnd: '',
      dateNow: '',
      status: 'Tất cả',
      exportType: 0,
    };
  }

  async componentDidMount() {
    var date = new Date();
    var dateAgo = Moment(date.setDate(date.getDate() - 31)).format('DD/MM/YYYY');
    var dateNow = Moment().format('DD/MM/YYYY');
    this.setState({ dateNow: dateNow, dateEnd: dateNow, dateStart: dateAgo });
    try {
      if (!this.props.exportType || this.props.exportType.length === 0) {
        const res = await API.warehouse.getExportType();
        this.props.getExportType(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  isShowModal(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  filter = () => {
    const { isAllDay, dateStart, dateEnd, status, exportType } = this.state;
    const _status = status == 'Đã hoàn thành' ? 2 : status == 'Đã hủy' ? 9 : 0;
    const params = {
      drg_drug_name: '',
      lot: '',
      from_time: dateStart,
      to_time: dateEnd,
      drg_store_id: this.props.info.drg_store_id,
      sort_field: '',
      sort_type: 'asc',
      status: _status,
      login_mode: 0,
      store_ids: [this.props.info.drg_store_id],
      export_code: '',
      export_type: exportType == 0 ? '' : this.props.exportType[exportType - 1].code,
      updated_user: '',
      import_store: '',
    };
    if (isAllDay === true) {
      params.from_time = '';
      params.to_time = '';
      this.props.dataConditionFilter(params);
    } else {
      if (new Date(dateEnd) < new Date(dateStart)) {
        Alert.alert('Thông báo', 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
      } else {
        params.from_time = dateStart;
        params.to_time = dateEnd;
        this.props.dataConditionFilter(params);
      }
    }
    this.isShowModal(false);
  };

  _renderModalFilter = () => {
    const { dateStart, dateEnd } = this.state;
    const exportType = this.props.exportType.map(e => e.value);
    exportType.unshift('Tất cả');
    return (
      <Modal transparent={true} animationType={'slide'} visible={this.state.modalVisible}>
        <View style={styles.backgroundModal}>
          <View style={styles.ModalInsideView}>
            <View style={styles.wapperCheckBox}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Thời gian</Text>
              </View>
              <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => this.setState({ isAllDay: true })}
                  style={styles.buttonCheckBox}
                >
                  <View style={styles.checkbox}>
                    {this.state.isAllDay ? <Image source={ICON_CHECKED} style={{ width: 10, height: 10 }} /> : null}
                  </View>
                  <Text style={styles.txtSelectTime}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => this.setState({ isAllDay: false })}
                  style={styles.buttonCheckBox}
                >
                  <View style={styles.checkbox}>
                    {!this.state.isAllDay ? <Image source={ICON_CHECKED} style={{ width: 10, height: 10 }} /> : null}
                  </View>
                  <Text style={styles.txtSelectTime}>Chọn khoảng thời gian</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}
            >
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Từ ngày</Text>
              </View>
              <View style={{ flex: 7 }}>
                <DatePicker
                  disabled={this.state.isAllDay}
                  style={{ width: '100%' }}
                  date={!this.state.isAllDay ? dateStart : ''}
                  mode="date"
                  maxDate={this.state.dateNow}
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
                      // marginLeft: 36,
                      borderRadius: 5,
                    },
                  }}
                  onDateChange={date => {
                    this.setState({ dateStart: date });
                  }}
                />
              </View>
            </View>
            <View style={styles.containerContext}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Đến ngày</Text>
              </View>
              <View style={{ flex: 7 }}>
                <DatePicker
                  disabled={this.state.isAllDay}
                  style={{ width: '100%' }}
                  date={!this.state.isAllDay ? dateEnd : ''}
                  mode="date"
                  maxDate={this.state.dateNow}
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
                      // marginLeft: 36,
                      borderRadius: 5,
                    },
                  }}
                  onDateChange={date => {
                    this.setState({ dateEnd: date });
                  }}
                />
              </View>
            </View>
            <View style={styles.containerContext}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Trạng thái</Text>
              </View>
              <ModalCustom
                options={['Tất cả', 'Đã hoàn thành', 'Đã hủy']}
                style={{ flex: 7 }}
                onSelected={(index: number, value: string) => this.setState({ status: value })}
                value={this.state.status}
                containerStyle={styles.wapperInputFilter}
              />
            </View>
            <View style={styles.containerContext}>
              <View style={{ flex: 3 }}>
                <Text style={styles.txtFilter}>Phân loại xuất kho</Text>
              </View>
              <ModalCustom
                options={exportType}
                style={{ flex: 7 }}
                onSelected={(index: number, value: string) => this.setState({ exportType: index })}
                value={this.state.exportType === 0 ? 'Tất cả' : exportType[this.state.exportType]}
                containerStyle={styles.wapperInputFilter}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.buttonFilter, { borderRightColor: 'gray', borderRightWidth: 0.5 }]}
                onPress={() => this.filter()}
              >
                <Text style={styles.txtAskFilter}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              style={styles.wapperButtonCancle}
              onPress={() => this.isShowModal(false)}
            >
              <Image source={ICON_CLOSE} style={{ width: 10, height: 10, tintColor: '#B51823' }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => {
          this.isShowModal(true);
        }}
      >
        <Image source={ICON_FILTER_INVOICE} style={styles.iconFilter} />
        <Text style={styles.txtFilterButton}>Bộ lọc</Text>

        {this._renderModalFilter()}
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    exportType: state.dataPersist.exportType,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getExportType: (exportType: any) =>
      dispatch({
        type: types.EXPORT_TYPE,
        payload: exportType,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalFilter);

const styles = StyleSheet.create({
  ModalInsideView: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: vw(10),
    padding: vw(10),
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  txtFilter: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: vw(14),
  },
  wapperInputFilter: {
    flexDirection: 'row',
    height: vw(40),
    width: '100%',
    borderRadius: vw(5),
    borderColor: colors.GRAY,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(10),
  },
  buttonFilter: {
    height: vw(40),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(10),
    backgroundColor: colors.MAIN_COLOR,
    borderRadius: vw(5),
  },
  txtAskFilter: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(16),
  },
  checkbox: {
    height: vw(15),
    width: vw(15),
    borderColor: colors.MAIN_COLOR,
    borderWidth: vw(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wapperCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vw(3),
    marginTop: vw(20),
  },
  containerContext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vw(10),
  },
  txtSelectTime: {
    paddingLeft: vw(5),
    fontSize: vw(13),
  },
  iconFilter: {
    width: vw(15),
    height: vw(15),
    tintColor: colors.WHITE,
  },
  txtFilterButton: {
    fontSize: vw(12),
    fontFamily: 'Arial',
    color: '#FFF',
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MAIN_COLOR,
    width: vw(50),
    height: vw(40),
    borderRadius: vw(5),
    marginRight: vw(10),
  },
  wapperButtonCancle: {
    position: 'absolute',
    right: 0,
    marginTop: vw(10),
    marginRight: vw(10),
  },
  iconClose: {
    width: vw(10),
    height: vw(10),
    tintColor: colors.RED,
  },
  iconCheck: {
    width: vw(10),
    height: vw(10),
  },
});
