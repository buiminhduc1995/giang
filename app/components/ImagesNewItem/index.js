import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text
} from "react-native";
import CheckImage from "../../utils/CheckImage";
import PropTypes from "prop-types";
import config from "../../config";
const { width, height } = Dimensions.get("window");
import FastImage from "react-native-fast-image";

export default class ImagesNewItem extends React.PureComponent {
  renderImageItem = (image, index) => {
    return (
      <TouchableOpacity
        style={[styles.containerImage,{backgroundColor:'#F2F2F2'}]}
        key={index}
        onPress={() => this.props.onPressImage(index)}
      >
        <FastImage
            style={{ width: "100%", height: width / 2 - 10 }}
            source={{
              uri:image.url,
              priority: FastImage.priority.high
            }}
          />
      </TouchableOpacity>
    );
  };

  render() {
    if (this.props.images.length == 0) return null;
    else if (this.props.images.length == 1) {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.onPressImage(0)}
        >
          <FastImage
            style={styles.imageOnlyOne}
            source={{
              uri:this.props.images[0].url,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      );
    } else if (this.props.images.length == 3) {
      return (
        <View style={{ paddingTop: 3 }}>
          <TouchableOpacity onPress={() => this.props.onPressImage(0)}
            style={{backgroundColor:'#F2F2F2'}}
          >
            <FastImage
              style={styles.imageFirst}
              source={{
                uri:this.props.images[0].url,
                priority: FastImage.priority.height
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.props.images
              .slice(1)
              .map((image, index) => this.renderImageItem(image, index + 1))}
          </View>
        </View>
      );
    } else if (this.props.images.length > 4) {
      return (
        <View style={styles.container}>
          {this.props.images
            .slice(0, 3)
            .map((image, index) => this.renderImageItem(image, index))}
          <TouchableOpacity
            style={styles.containerImage}
            onPress={() => this.props.onPressImage(3)}
          >
            <ImageBackground
              source={{ uri:this.props.images[3].url }}
              style={{
                width: "100%",
                height: width / 2 - 10,
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.9,
              }}
            >
              <Text
                style={{ fontSize: 40, fontWeight: "bold", color: "white" }}
              >
                + {this.props.images.length - 4}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.props.images.map((image, index) =>
            this.renderImageItem(image, index)
          )}
        </View>
      );
    }
  }
}

ImagesNewItem.defaultProps = {
  images: []
};

ImagesNewItem.propTypes = {
  /**
   * @property {element} images - list url image new
   */
  images: PropTypes.array.isRequired,
  /**
   * @property {element} onPressImage - list url image new
   */
  onPressImage: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 3
  },
  containerImage: {
    width: "50%",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor:'#F2F2F2'
  },
  imageOnlyOne: {
    flex: 1,
    alignSelf: "stretch",
    width: width,
    height: 350
  },
  imageFirst: {
    flex: 1,
    height: 200,
    width: "100%",
    marginTop: 5,
  }
});
