// import React, { PureComponent } from 'react';
// import { FlatList, View, Dimensions } from 'react-native';
// import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, Shine, ShineOverlay, Progressive } from 'rn-placeholder';
// type Props = {
//   number: Number;
//   loading: Boolean;
//   style: any;
//   animation: any;
// };
// type State = {
//   list: any;
// };

// const { width } = Dimensions.get('window');

// class index extends PureComponent<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       list: [],
//     };
//   }
//   componentDidMount() {
//     this.setState({ list: Array.from(Array(this.props.number).keys()).map(i => i) });
//   }
//   render() {
//     const { list } = this.state;
//     return (
//       <View style={this.props.style}>
//         {this.props.loading ? (
//           <FlatList
//             data={list}
//             renderItem={({ item }) => (
//               <View>
//                 <Placeholder
//                   Left={PlaceholderMedia}
//                   Animation={this.props.animation}
//                   style={{ flexDirection: 'row', marginRight: 10 }}
//                 >
//                   <PlaceholderLine width={100} />
//                   {/* <PlaceholderLine /> */}
//                   <PlaceholderLine width={80} />
//                 </Placeholder>
//               </View>
//             )}
//           />
//         ) : null}
//       </View>
//     );
//   }
// }

// export default index;

import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { LoadItem } from '../Loading';
import { BACKGROUND_COLOR } from '../../constants';
import vw from '../../utils/size-dynamic';
import { Fade } from 'rn-placeholder';

type Props = {
  number?: Number;
  loading: Boolean;
  animation: any;
};
type State = {
  list: any;
};

class index extends PureComponent<Props, State> {
  static defaultProps = {
    number: 10,
    style: {},
    animation: Fade,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.setState({ list: Array.from(Array(this.props.number).keys()).map(i => i) });
  }

  _renderItem = () => <LoadItem />;

  render() {
    const { list } = this.state;
    const { loading, style } = this.props;
    return (
      loading && (
        <View style={styles.container}>
          <FlatList data={list} renderItem={this._renderItem} showsVerticalScrollIndicator={false} />
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: vw(10),
  },
});

export default index;
