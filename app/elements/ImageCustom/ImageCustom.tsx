import React from 'react';
import {
  ProgressBarAndroid,
  Platform,
  ProgressViewIOS,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { MAIN_COLOR, BACKGROUND_COLOR } from '../../constants';

type Props = {
  source: any;
  style: any;
};
type States = {
  isLoading: boolean;
};

class ImageCustom extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { isLoading: true };
  }
  _onLoadingEnd = () => {
    this.setState({ isLoading: false });
  };
  render() {
    const { style, source, children } = this.props;
    const { isLoading } = this.state;
    const isIndicator = typeof this.props.source === 'object' ? true : false;
    return (
      <ImageBackground
        {...this.props}
        style={[styles.wrapper, style]}
        // source={{
        //   uri: 'https://wallpapercave.com/wp/qhuCMQT.jpg',
        // }}
        source={source}
        onLoadEnd={this._onLoadingEnd}
      >
        {isLoading && isIndicator && Platform.OS === 'android' && (
          <ProgressBarAndroid style={{ width: '70%', borderRadius: 3 }} styleAttr="Horizontal" color={MAIN_COLOR} />
        )}
        {isLoading && isIndicator && Platform.OS === 'ios' && <ActivityIndicator color={MAIN_COLOR} />}
        {children}
      </ImageBackground>
    );
  }

  //ProgressBar cho IOS
  // <ProgressViewIOS progress = { this.state.progress} progressTintColor = {MAIN_COLOR} />
  // animate() {
  //   let progress = 0;
  //   this.setState({ progress });
  //   this.setState({ indeterminate: false });
  //   setInterval(() => {
  //     progress += 0.2;
  //     if (progress > 1) {
  //       progress = 0;
  //     }
  //     this.setState({ progress });
  //   }, 100);
  // }
  // clearInterval(animate);
}

export default ImageCustom;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
});
