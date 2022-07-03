import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, Shine, ShineOverlay, Progressive } from 'rn-placeholder';
import vw from '../../utils/size-dynamic';
type Props = {
  number: Number;
  loading: Boolean;
  style: any;
  animation: any;
};
type State = {
  list: any;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    this.setState({ list: Array.from(Array(this.props.number).keys()).map(i => i) });
  }
  render() {
    const { list } = this.state;
    return (
      <View style={this.props.style}>
        {this.props.loading ? (
          <FlatList
            data={list}
            contentContainerStyle={{ marginTop: vw(5) }}
            renderItem={({ item }) => (
              <View style={{ marginBottom: vw(20) }}>
                <Placeholder
                  Left={PlaceholderMedia}
                  Animation={this.props.animation}
                  style={{
                    width: vw(50),
                    height: vw(50),
                    flexDirection: 'row',
                    // marginBottom: vw(10),
                    marginHorizontal: vw(5),
                    // marginTop: vw(10),
                    position: 'absolute',
                  }}
                >
                  {/* <PlaceholderLine width={50} style={{ marginLeft: vw(10), marginTop: vw(10) }} /> */}
                  {/* <PlaceholderLine width={50} style={{ marginLeft: vw(10), marginTop: vw(10) }} /> */}
                  {/* <PlaceholderLine width={vw(80)} style={{ marginLeft: vw(10), marginTop: vw(10) }} /> */}
                </Placeholder>
                <View style={{}}>
                  <PlaceholderLine width={65} style={{ marginLeft: vw(75) }} />
                  <PlaceholderLine width={50} style={{ marginLeft: vw(75) }} />
                  <PlaceholderLine width={60} style={{ marginLeft: vw(75),marginTop: vw(5), }} />
                  <PlaceholderLine width={50} style={{ marginLeft: vw(75) }} />
                  <PlaceholderLine width={40} style={{ marginLeft: vw(75) }} />
                  <PlaceholderLine width={30} style={{ marginLeft: vw(75) }} />
                </View>
              </View>
            )}
          />
        ) : null}
      </View>
    );
  }
}

export default index;
