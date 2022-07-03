import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, processColor } from 'react-native';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-charts-wrapper';
import vw from '../../utils/size-dynamic/';
import Moment from 'moment/moment';
import { SHADOW, themes } from '../../constants';
import MoneyFormat from '../../utils/MoneyFormat';
class LineChartScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      selectedTotal: null,
      selectedDate: null,
      marker: {
        enabled: true,
        digits: vw(1),
        selectedEntry: vw(1),
        textColor: processColor('white'),
      },
      xAxis: {
        granularityEnabled: true,
        granularity: vw(1),
      },
      visibleRange: { x: { min: 1, max: 2 } },
      legend: {
        textSize: vw(14),
      },
    };
  }
  getValueChart = () => {
    const { data, nameCustomer, totalAmount, from_date, to_date } = this.props;
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [
              {
                values: data,
                label: nameCustomer !== null ? nameCustomer : '',
                config: {
                  drawValues: false,
                  color: processColor('#61A02C'),
                  fillColor: processColor('#61A02C'),
                  fillAlpha: 45,
                  // circleColor: processColor('red'),
                  drawFilled: true,
                  drawHighlightIndicators: true,
                  drawCircles: true,
                  // circleHoleColor: 10,
                  drawCubicIntensity: vw(12),
                  drawCircleHole: true,
                },
              },
            ],
          },
        },
        // Config trục xAxis
        xAxis: {
          $set: {
            valueFormatter: 'date',
            valueFormatterPattern: 'yyyy/MM/dd',
            position: 'BOTTOM',
            gridDashedLine: {
              lineLength: 0,
              spaceLength: 5,
            },
            textColor: processColor('white'),
            // bottom: { enabled: false },
          },
        },
        // Config trục yAxis
        yAxis: {
          $set: {
            left: {
              drawLabels: false,
              drawAxisLine: true,
              drawGridLines: false,
              // zeroLine: { enabled: true, lineWidth: 1.5 },
              axisMinimum: 0,
            },
            right: { enabled: false },
          },
        },
      }),
    );
  };
  componentDidMount() {
    this.getValueChart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.getValueChart();
    }
  }
  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry.x) {
      this.setState({ ...this.state, selectedTotal: entry.y, selectedDate: entry.data.x });
    } else {
      this.setState({ ...this.state, selectedEntry: null });
    }
  }
  render() {
    const { selectedDate, selectedTotal } = this.state;
    const { totalAmount, to_date, from_date } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.titleChartY}>Doanh thu{'\n'}(VND)</Text>
            {selectedDate === null ? null : (
              <View>
                <Text style={styles.txtRevenue}>
                  Ngày :
                  {selectedDate === null
                    ? ''
                    : Moment(selectedDate).format('DD/MM/YYYY') === Moment().format('DD/MM/YYYY')
                    ? 'Hôm nay'
                    : Moment(selectedDate).format('DD/MM/YYYY')}{' '}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.txtRevenue}>Doanh thu:</Text>
                  <Text style={[styles.txtRevenue, { fontWeight: 'bold', fontSize: vw(14), paddingRight: vw(10) }]}>
                    {selectedTotal === null
                      ? ''
                      : '' + ' ' + selectedTotal &&
                        selectedTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '' + ' vnđ'}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <LineChart
                style={styles.chart}
                data={this.state.data}
                chartDescription={{ text: '' }}
                legend={this.state.legend}
                // marker={this.state.marker}
                xAxis={this.state.xAxis}
                yAxis={this.state.yAxis}
                drawGridBackground={false}
                borderColor={processColor('white')}
                borderWidth={0}
                drawBorders={true}
                autoScaleMinMaxEnabled={false}
                touchEnabled={true}
                dragEnabled={true}
                pinchZoom={false}
                doubleTapToZoomEnabled={false}
                highlightPerTapEnabled={true}
                highlightPerDragEnabled={true}
                dragDecelerationEnabled={true}
                dragDecelerationFrictionCoef={0.99}
                ref="chart"
                keepPositionOnRotation={false}
                onSelect={this.handleSelect.bind(this)}
              />
            </View>
          </View>
          <View style={styles.wapperDate}>
            <Text style={styles.titleChartX}>Ngày</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={styles.txtTotalAmount}>Tổng doanh thu</Text>

            <Text style={styles.txtTotalAmount}>
              (
              {Moment(from_date).format('DD/MM') === Moment().format('DD/MM')
                ? 'Hôm nay'
                : Moment(from_date).format('DD/MM')}
            </Text>
            <Text style={styles.txtTotalAmount}>
              {' - '}
              {Moment(to_date).format('DD/MM') === Moment().format('DD/MM')
                ? 'Hôm nay'
                : Moment(to_date).format('DD/MM')}
              )
            </Text>
            <Text style={styles.txtTotalMoney}> {MoneyFormat(totalAmount)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.WHITE,
    borderBottomRightRadius: vw(5),
    borderBottomLeftRadius: vw(5),
    ...SHADOW,
    zIndex: 1,
  },
  chart: {
    width: '100%',
    height: vw(200),
  },
  titleChartY: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.BLACK_BASIC,
    paddingLeft: vw(10),
  },
  titleChartX: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.BLACK_BASIC,
    paddingRight: vw(20),
  },
  txtTotalAmount: {
    color: themes.colors.BLACK_BASIC,
    fontSize: vw(13),
  },
  wapperDate: {
    position: 'absolute',
    right: vw(-5),
    bottom: vw(10),
  },
  txtTotalMoney: {
    color: themes.colors.MAIN_COLOR,
    fontSize: vw(14),
    fontWeight: 'bold',
  },
  txtRevenue: {
    fontSize: vw(12),
    color: themes.colors.RED,
    // paddingRight: 10,
  },
});
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
  };
}
export default connect(mapStateToProps)(LineChartScreen);
