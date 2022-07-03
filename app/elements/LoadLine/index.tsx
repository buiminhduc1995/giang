import React, { PureComponent } from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, Shine, ShineOverlay, Progressive } from 'rn-placeholder';
type Props = {
  number: Number;
  loading: Boolean;
  style: any;
  animation: any;
};
type State = {
  list: any;
};

const { width } = Dimensions.get('window');
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
            renderItem={({ item }) => (
              <View>
                <Placeholder Animation={this.props.animation} style={{ flexDirection: 'row', marginRight: 10 }}>
                  <PlaceholderLine width={100} />
                  {/* <PlaceholderLine /> */}
                  <PlaceholderLine width={70} />
                </Placeholder>
              </View>
            )}
          />
        ) : null}
      </View>
    );
  }
}

export default index;
