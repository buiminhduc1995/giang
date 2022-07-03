import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { ICON_RIGHT, ICON_DOWN, themes } from '../../constants';
import vw from '../../utils/size-dynamic'


class InfoDetail extends Component {
  state = {
    activeSections: [0, 1, 2],
  };

  _renderHeader = (section, index, isActive, sections) => {
    return (
      <View style={styles.header}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItem: 'center' }}>
          <Text style={styles.headerText}>{section.title}</Text>
          <Image source={isActive ? themes.ICON_DOWN : themes.ICON_RIGHT} style={{ height: vw(10), width: vw(10) }} />
        </View>
        <View style={{ height: 0.5, width: '100%', backgroundColor: themes.colors.GRAY, opacity: 0.5 }} />
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text style={styles.txtContent}>{section.content}</Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={this.props.sections}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        underlayColor={"#eaeaea"}
      />
    );
  }
}
const styles = {
  content: {
    paddingLeft: vw(15),
    paddingRight: vw(15),
    paddingTop: vw(5),
    paddingBottom: vw(5),
    backgroundColor: themes.colors.WHITE,
  },
  header: {
    marginLeft: vw(10),
    marginRight: vw(15),
    height: vw(30),
    justifyContent: 'center'
  },
  headerText: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: themes.colors.BLACK_BASIC,
  },
  txtContent:{
    fontSize:vw(12)
  }
}

export default InfoDetail