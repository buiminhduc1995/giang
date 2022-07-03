import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TextEmpty from '../../elements/TextEmpty/';
class CourseTab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return <TextEmpty text={'Hiện tại chưa có khóa học nào!'} />;
  }
}

export default CourseTab;
