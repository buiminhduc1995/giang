import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { ICON_CLOSE } from '../../constants';
import config from '../../config';
// import { RNS3 } from "react-native-aws3";
type Props = {
  removeImage: Function;
  images: any;
};
type State = {};
export default class ImageUpload extends PureComponent<Props, State> {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.images.map((image: any, index: number) => {
            return (
              <View
                key={index}
                style={{
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor: '#F2F2F2',
                }}
              >
                <ImageBackground source={{ uri: image.url }} style={styles.backgroundImage}>
                  <TouchableOpacity style={styles.buttonExit} onPress={() => this.props.removeImage(image)}>
                    <Image source={ICON_CLOSE} style={{ width: 12, height: 12, tintColor: 'white' }} />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  backgroundImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    flexDirection: 'row-reverse',
  },
  buttonExit: {
    width: 20,
    height: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
