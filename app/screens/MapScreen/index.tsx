import React from 'react';
import API from '../../api';
import {
  Dimensions,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
  PermissionsAndroid,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  BackHandler,
} from 'react-native';
import Permissions from 'react-native-permissions';
import MapView from 'react-native-maps';
import { ICON_BACK, ICON_CARET_DOWN, ICON_MAP_MARKER, MAIN_COLOR } from '../../constants/index';
import OrderList from '../../components/OrderList';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import { MyStatusBar } from '../../elements/MyStatusBar';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const initialRegion = {
  latitude: 21.002546,
  longitude: 105.797398,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
type State = {
  distance: string;
  isMapReady: boolean;
  orderInfo: object;
  region: any;
  isRequestingCurrentLocation: boolean;
  isMarkerLoading: boolean;
  tmpZIndex: number;
  isRequestingDirect: boolean;
  error: boolean;
  coords: object;
  pickupOrders: object;
  currentPoint: object;
  isOpenOrderOther: boolean;
  markerStart: object;
  markerDest: object;
  duration: string;
};
type Props = {
  navigation: Function;
};
class MapScreen extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      region: initialRegion,
      isMapReady: false,
      isRequestingCurrentLocation: false,
      isMarkerLoading: false,
      tmpZIndex: 0,
      isRequestingDirect: false,
      error: false,
      coords: [],
      pickupOrders: [],
      orderInfo: {},
      currentPoint: {
        latitude: 0,
        longitude: 0,
      },
      isOpenOrderOther: false,
      markerStart: {
        latitude: null,
        longitude: null,
      },
      markerDest: {
        latitude: null,
        longitude: null,
      },
      duration: '',
      distance: '',
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this._onClickItem = this._onClickItem.bind(this);
    this._fetchData = this._fetchData.bind(this);
    this._handleBackPress = this._handleBackPress.bind(this);
    this._goBack = this._goBack.bind(this);
    this._onMapReady = this._onMapReady.bind(this);
    this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
  }

  componentWillMount() {
    this._fetchData();
  }

  _fetchData() {
    const dataMapScreen = this.props.navigation.getParam('dataMapScreen', null);
    if (dataMapScreen.dataType === 'FINISHED_ORDER') {
      API.orderApi
        .getOrderHistoryDetails(dataMapScreen.medOrderId)
        .then(res => {
          this.setState({
            orderInfo: res.data.med_order_pool_history,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      API.orderApi
        .getOrderDetails(dataMapScreen.medOrderId)
        .then(res => {
          this.setState({
            orderInfo: res.data.med_order_pool,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  _handleBackPress() {
    this._goBack();
    return true;
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={this._goBack}
      >
        <Image
          source={ICON_BACK}
          style={{
            width: vw(11),
            height: vw(20),
            resizeMode: 'contain',
            marginRight: vw(10),
          }}
        />
        <Text
          style={{
            fontSize: vw(18),
            fontFamily: 'Arial',
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          Chỉ đường
        </Text>
      </TouchableOpacity>
    );
  }

  _renderHeaderRight() {
    return (
      <Text
        style={{
          color: '#ffffff',
          fontSize: vw(14),
        }}
      >
        {this.state.distance ? '(' + this.state.distance + ')' : ''}
      </Text>
    );
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _checkLocationPermission() {
    return Permissions.check('location').then(response => {
      return response === 'authorized';
    });
  }

  _onMapReady() {
    const dataMapScreen = this.props.navigation.getParam('dataMapScreen', null);
    if (!this.state.isMapReady) {
      this.setState({ isMapReady: true }, () => {
        this._moveToCurrentUserPosition()
          .then(() => {
            this._drawDirections(this.state.orderInfo);
          })
          .then(() => {
            API.orderApi
              .getPickupOrder(dataMapScreen.storeId, 'ship_datetime', 1, 10)
              .then(res => {
                let data = res.data.data;
                data.map(item => {
                  let target =
                    item.pos_lat.length > 0 ? `${item.pos_lat}, ${item.pos_long}` : item.address1 + ' ' + item.district;
                  API.mapApi
                    .getDirections(`${this.state.currentPoint.latitude},${this.state.currentPoint.longitude}`, target)
                    .then(response => {
                      if (response !== false) {
                        this.setState(prevState => ({
                          pickupOrders: [...prevState.pickupOrders, { ...item, distance: response.distance + ' km' }],
                        }));
                      } else {
                        this.setState(prevState => ({
                          pickupOrders: [...prevState.pickupOrders, { ...item, distance: '' }],
                        }));
                      }
                    });
                });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }

  _getCurrentPosition() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    });
  }

  _moveToCurrentUserPosition() {
    return new Promise((resolve, reject) => {
      if (this.state.isRequestingCurrentLocation) return resolve();
      this.setState({ isRequestingCurrentLocation: true });

      return this._checkLocationPermission().then(ok => {
        if (ok) {
          return this._getCurrentPosition()
            .then(pos => {
              this.setState(
                {
                  isRequestingCurrentLocation: false,
                  currentPoint: {
                    latitude: pos.latitude,
                    longitude: pos.longitude,
                  },
                },
                () => {
                  this.map.animateToRegion(
                    {
                      latitude: pos.latitude,
                      longitude: pos.longitude,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    },
                    500,
                  );
                },
              );
              return resolve();
            })
            .catch(err => {
              this.setState({ isRequestingCurrentLocation: false }, () => {
                Alert.alert(
                  'Có lỗi xảy ra',
                  'Không thể lấy được vị trí hiện tại của bạn, xin thử lại',
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false },
                );
              });
              return resolve();
            });
        } else {
          this.setState({ isRequestingCurrentLocation: false }, () => {
            Alert.alert(
              'Thông báo',
              'Bạn cần bật tính năng GPS cho ứng dụng để sử dụng chức năng tìm quanh đây',
              [{ text: 'OK', onPress: () => this._requestLocationPermission() }],
              { cancelable: false },
            );
          });
          return reject();
        }
      });
    });
  }

  async _requestLocationPermission() {
    const dataMapScreen = this.props.navigation.getParam('dataMapScreen', null);
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this._moveToCurrentUserPosition()
          .then(() => {
            return this._drawDirections(this.state.orderInfo);
          })
          .then(() => {
            API.orderApi
              .getPickupOrder(dataMapScreen.storeId, 'ship_datetime', 1, 10)
              .then(res => {
                let data = res.data.data;
                data.map(item => {
                  let target =
                    item.pos_lat.length > 0 ? `${item.pos_lat}, ${item.pos_long}` : item.address1 + ' ' + item.district;
                  API.mapApi
                    .getDirections(`${this.state.currentPoint.latitude},${this.state.currentPoint.longitude}`, target)
                    .then(response => {
                      if (response !== false) {
                        this.setState(prevState => ({
                          pickupOrders: [...prevState.pickupOrders, { ...item, distance: response.distance + ' km' }],
                        }));
                      } else {
                        this.setState(prevState => ({
                          pickupOrders: [...prevState.pickupOrders, { ...item, distance: '' }],
                        }));
                      }
                    });
                });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  _onRegionChangeComplete(region: any) {
    this.setState({ region });
  }

  _getDirections = (startLoc: any, destinationLoc: any) => {
    this.setState({
      isRequestingDirect: true,
    });
    API.mapApi
      .getDirections(startLoc, destinationLoc)
      .then(res => {
        if (res !== false) {
          this.setState({
            coords: res.coords,
            markerStart: res.coords[0][0],
            markerDest: res.coords[0][res.coords[0].length - 1],
            isRequestingDirect: false,
            duration: res.duration,
            distance: res.distance + ' km',
          });
        } else {
          this.setState(
            {
              isRequestingDirect: false,
            },
            () => Alert.alert('Dữ liệu bị lỗi vui lòng xem lại kết nối internet.'),
          );
        }
      })
      .catch(error => {
        this.setState(
          {
            isRequestingDirect: false,
          },
          () => {
            Alert.alert(error);
          },
        );
      });
  };

  _drawDirections(data) {
    let isString = typeof data.pos_lat === 'string' && data.pos_lat.length > 0;
    let target = isString ? `${data.pos_lat}, ${data.pos_long}` : data.address1 + ' ' + data.district;
    data.address1 === 'false'
      ? Alert.alert('Địa chỉ đơn hàng không tìm thấy')
      : this._getDirections(`${this.state.currentPoint.latitude},${this.state.currentPoint.longitude}`, target);
  }

  _renderPolyline(line, color, index) {
    return (
      <MapView.Polyline
        coordinates={line}
        strokeWidth={6}
        strokeColor={color}
        lineCap={'round'}
        key={index.toString()}
      />
    );
  }

  _renderMap() {
    return (
      <View style={styles.wrapMap}>
        {
          <MapView
            style={styles.map}
            ref={ref => {
              this.map = ref;
            }}
            initialRegion={initialRegion}
            showsUserLocation
            userLocationAnnotationTitle={'Vị trí của tôi'}
            onRegionChangeComplete={this._onRegionChangeComplete}
            onMapReady={this._onMapReady}
            showsMyLocationButton={false}
            showsCompass={false}
          >
            {this.state.markerDest.latitude !== null && <MapView.Marker coordinate={this.state.markerDest} />}
            {this.state.coords
              .slice(0)
              .reverse()
              .map((item, index) =>
                this._renderPolyline(item, index === this.state.coords.length - 1 ? '#00BCD4' : '#cccccc', index),
              )}
          </MapView>
        }

        {(!this.state.isMapReady || this.state.isRequestingDirect || this.state.isRequestingCurrentLocation) && (
          <View
            style={{
              elevation: 2,
              width: 36,
              height: 36,
              borderRadius: 100,
              position: 'absolute',
              top: 80,
              left: 50 + '%',
              marginLeft: -18,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              zIndex: 999999,
            }}
          >
            <ActivityIndicator color="#58c4be" />
          </View>
        )}
        <TouchableOpacity onPress={() => this._moveToCurrentUserPosition()} style={styles.wrapBtn}>
          {(this.state.isRequestingCurrentLocation && (
            <Image source={require('./../../assets/icon/point_working.gif')} style={styles.imgPoint} />
          )) || <Image source={require('./../../assets/icon/point.png')} style={styles.imgPoint} />}
        </TouchableOpacity>
      </View>
    );
  }

  _onClickItem(data) {
    this.setState(
      {
        orderInfo: data,
      },
      () => {
        return this._drawDirections(this.state.orderInfo);
      },
    );
  }

  _renderList() {
    return (
      <OrderList
        dataType={'PICKUP_ORDER_MAP'}
        data={this.state.pickupOrders}
        navigation={this.props.navigation}
        renderHeader={<View style={{ height: vw(10) }} />}
        renderFooter={<View style={{ height: vw(10) }} />}
        style={{ flex: 1, paddingRight: vw(10), marginLeft: vw(10) }}
        onClickItem={this._onClickItem}
      />
    );
  }

  _renderFooter() {
    return (
      <View style={styles.wrapContent}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderBottomWidth: 0.5,
            borderBottomColor: '#e5e5e5',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Image
                source={ICON_MAP_MARKER}
                style={{
                  width: vw(14),
                  height: vw(14),
                  resizeMode: 'contain',
                  marginTop: vw(4),
                  marginRight: vw(3),
                }}
              />
              <Text style={{ fontSize: vw(16), color: '#4F4F4F', fontFamily: 'Arial' }}>
                {this.state.orderInfo.address1}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: vw(16),
                  color: MAIN_COLOR,
                  fontFamily: 'Arial',
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}
              >
                {this.state.duration}
              </Text>
              <Text
                style={{
                  fontSize: vw(16),
                  color: '#BDBDBD',
                  fontFamily: 'Arial',
                  textAlign: 'right',
                }}
              >
                {this.state.distance}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: '#DEDEDE' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: this.state.isOpenOrderOther ? '#DEDEDE' : '#ffffff',
              paddingVertical: vw(10),
            }}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              this.setState({
                isOpenOrderOther: !this.state.isOpenOrderOther,
              });
            }}
          >
            <Text
              style={{
                fontSize: vw(12),
                color: '#828282',
                fontFamily: 'Arial',
                marginRight: vw(4),
              }}
            >
              {!this.state.isOpenOrderOther ? 'Xem đơn hàng khác' : 'Ẩn đơn hàng khác'}
            </Text>
            <Image source={ICON_CARET_DOWN} style={{ width: vw(9), height: vw(9), resizeMode: 'contain' }} />
          </TouchableOpacity>
          <ScrollView
            style={{
              paddingHorizontal: vw(10),
              width: width,
              maxHeight: this.state.isOpenOrderOther ? vw(220) : 0,
            }}
          >
            {this._renderList()}
            <View style={{ height: vw(10) }} />
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderMap()}
        {this._renderFooter()}
      </View>
    );
  }
}

MapScreen.navigationOptions = {
  title: 'Bản đồ',
};

const styles = {
  container: {
    flex: 1,
  },
  wrapMap: {
    flex: 1,
  },
  wrapContent: {
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  wrapBtn: {
    position: 'absolute',
    bottom: vw(10),
    right: vw(10),
  },
  map: {
    flex: 1,
  },
  menuIcon: {
    width: vw(25),
    height: vw(25),
    resizeMode: 'contain',
    marginLeft: 0,
    marginRight: vw(15),
  },
  imgPoint: {
    width: vw(50),
    height: vw(50),
  },
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapScreen);
