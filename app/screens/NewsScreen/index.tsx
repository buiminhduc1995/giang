import React, { Component } from 'react';
import { Image, Platform, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import vw from '../../utils/size-dynamic';
import { ICON_FILTER, ICON_SEARCH, MAIN_COLOR } from '../../constants';
import HeaderBar from '../../elements/HeaderBar';
import TabPill from '../../components/TabPill';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import NewsTab from '../NewsTab';
import CourseTab from '../CourseTab';
class NewsScreen extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>Kiến thức</Text>
      </View>
    );
  }

  componentWillReceiveProps(nextProps: any) {}

  _renderTab() {
    return (
      <ScrollableTabView initialPage={0} renderTabBar={() => <TabPill />} tabBarPosition="top" onChangeTab={data => {}}>
        <View tabLabel={'Tin tức'} style={{ flex: 1 }}>
          <NewsTab navigation={this.props.navigation} />
        </View>

        <View tabLabel={'Khoá học'} style={{ flex: 1 }}>
          <CourseTab navigation={this.props.navigation} />
        </View>
      </ScrollableTabView>
    );
  }

  _renderBody() {
    return <View style={styles.wrapBody}>{this._renderTab()}</View>;
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderBody()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  wrapBody: {
    flex: 1,
  },
  text: {
    fontFamily: 'Arial',
    fontSize: vw(14),
  },
};

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    data: state.auth.data2,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsScreen);
