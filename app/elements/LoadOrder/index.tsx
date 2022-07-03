import React, { PureComponent } from 'react';
import { FlatList, View, ScrollView, Dimensions } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, ShineOverlay } from 'rn-placeholder';
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
      <ScrollView style={this.props.style}>
        {this.props.loading ? (
          <View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vw(10) }}>
                <View
                  style={{
                    flex: 1,
                    borderRadius: 5,
                    overflow: 'hidden',
                    paddingHorizontal: vw(10),
                    paddingVertical: vw(10),
                    backgroundColor: 'white',
                  }}
                >
                  <Placeholder
                    Right={PlaceholderMedia}
                    Animation={ShineOverlay}
                    style={{ flexDirection: 'row', marginTop: vw(30), position: 'absolute' }}
                  ></Placeholder>
                  <PlaceholderLine width={100} />
                  <PlaceholderLine width={50} />
                  <PlaceholderLine width={30} />
                  <PlaceholderLine width={80} style={{ marginTop: vw(5) }} />
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRadius: 5,
                    overflow: 'hidden',
                    paddingHorizontal: vw(10),
                    paddingVertical: vw(10),
                    backgroundColor: 'white',
                    marginLeft: vw(5),
                  }}
                >
                  <Placeholder
                    Right={PlaceholderMedia}
                    Animation={ShineOverlay}
                    style={{ flexDirection: 'row', marginTop: vw(30), position: 'absolute' }}
                  ></Placeholder>
                  <PlaceholderLine width={100} />
                  <PlaceholderLine width={50} />
                  <PlaceholderLine width={30} />
                  <PlaceholderLine width={80} style={{ marginTop: vw(5) }} />
                </View>
              </View>
              <View style={{ backgroundColor: 'white', height: vw(100), padding: vw(5), marginTop: vw(5) }}>
                <Placeholder
                  Animation={ShineOverlay}
                  style={{ flexDirection: 'row', position: 'absolute', width: vw(200), height: vw(30), right: 0 }}
                ></Placeholder>
                <PlaceholderLine width={80} />
                <PlaceholderLine width={70} />
                <PlaceholderLine width={60} />
                <PlaceholderLine width={50} />
              </View>
            </View>
            <FlatList
              data={list}
              contentContainerStyle={{ marginTop: vw(5) }}
              renderItem={({ item }) => (
                <View style={{ backgroundColor: 'white', padding: vw(5), marginBottom: vw(5) }}>
                  <Placeholder
                    Right={PlaceholderMedia}
                    Animation={ShineOverlay}
                    style={{ flexDirection: 'row', position: 'absolute', width: vw(200), height: vw(30), right: 0 }}
                  ></Placeholder>
                  <PlaceholderLine width={80} />
                  <PlaceholderLine width={50} />
                </View>
              )}
            />
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

export default index;
