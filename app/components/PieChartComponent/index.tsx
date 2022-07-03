import React from 'react';
import { AppRegistry, StyleSheet, Text, View, processColor } from 'react-native';

import { StackNavigator, SafeAreaView } from 'react-navigation';

import { PieChart } from 'react-native-charts-wrapper';

class PieChartComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 0,
        form: 'CIRCLE',

        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: [
              { value: 45, label: 'Nhân viên 1' },
              { value: 21, label: 'Nhân viên 2' },
              { value: 15, label: 'Nhân viên 3' },
              { value: 9, label: 'Nhân viên 4' },
              { value: 15, label: 'Nhân viên 5' },
            ],
            label: '',
            config: {
              colors: [
                processColor('#C0FF8C'),
                processColor('#FFF78C'),
                processColor('#FFD08C'),
                processColor('#8CEAFF'),
                processColor('#FF8C9D'),
              ],
              valueTextSize: 10,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      highlights: [{ x: 2 }],
      description: {
        text: 'Biểu đồ doanh thu',
        textSize: 15,
        textColor: processColor('darkgray'),
      },
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('pink')}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}
            entryLabelColor={processColor('green')}
            entryLabelTextSize={0}
            drawEntryLabels={true}
            rotationEnabled={false}
            rotationAngle={45}
            usePercentValues={true}
            // styledCenterText={{ text: 'Pie center text!', color: processColor('pink'), size: 20 }}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={350}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    width: '100%',
    height: 150,
  },
});

export default PieChartComponent;
