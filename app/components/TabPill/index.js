
import PropTypes from 'prop-types';
import React from 'react';
import {
  ViewPropTypes,
  Text,
  View,
  Animated,
  TouchableOpacity, Image
} from 'react-native';
import vw from '../../utils/size-dynamic';
import { ICON_TRIANGLE, MAIN_COLOR, SHADOW, themes } from "../../constants";


/**
 * A customized tab bar used in this app.
 * TODO: Need to provide more customizable to users.
 */
export default class DefaultTabBar extends React.PureComponent {

  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  };

  renderTab(name, page, isTabActive, onPressHandler) {
    return (
      <TouchableOpacity
        style={[styles.touch, {}]}
        key={page}
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.containerTouch,
        {
          backgroundColor: isTabActive ? themes.colors.WHITE : null,
          borderRadius: isTabActive ? vw(5) : 0,
          shadowColor: isTabActive ? themes.colors.BLACK_BASIC : null,
          shadowOffset: {
            width: 0,
            height: isTabActive ? 1 : 0,
          },
          shadowOpacity: isTabActive ? 0.22 : 0,
          shadowRadius: isTabActive ? 16 : 0,
          elevation: isTabActive ? 10 : 0,
          width: isTabActive ? '105%' : '100%'
        }]}>
          <Text style={{ color: isTabActive ? themes.colors.MAIN_COLOR : themes.colors.PLACEHOLDER_INPUT, fontSize: isTabActive ? vw(14) : vw(10), fontWeight: 'bold' }}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
      </View>

    );
  }
}

const styles = {
  tabs: {
    height: vw(40),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: vw(5),
    alignItems: 'center',
    marginHorizontal: vw(10),
    marginVertical: vw(5),
    backgroundColor: '#F4FCFF'
  },
  touch: {
    flex: 1,
    alignItems: 'center',
  },
  containerTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vw(40),
  }
};
