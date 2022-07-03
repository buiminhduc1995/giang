import React from 'react';
import { Text, StatusBar, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { HOME, LOGIN } from '../../redux/types';
import Counter from '../../utils/counter';
import vw from '../../utils/size-dynamic';
import { BG_SPLASH, ICON_LOGO_SPLASH } from '../../constants';
import * as types from '../../redux/types';
import API from '../../api';

class SplashScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onChangeScreen = this._onChangeScreen.bind(this);
  }

  componentWillReceiveProps(nextProps) {}

  _onChangeScreen() {
    if (this.props.isLogged && this.props.userSaved !==null) {
      API.authApi
        .getLogin(this.props.userSaved.username, this.props.userSaved.password)
        .then(res => {
          this.props
            .logged(res, this.props.saveLogged, this.props.saveLogged ? this.props.userSaved : null)
            .then(() => this.props.navigation.navigate(HOME));
        })
        .catch(err => {
          this.props.logout().then(() => this.props.navigation.navigate(LOGIN));
        });
    } else {
      this.props.logout().then(() => this.props.navigation.navigate(LOGIN));
    }
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={BG_SPLASH}>
        <StatusBar translucent={true} hidden={true} />
        <Image source={ICON_LOGO_SPLASH} style={{ width: vw(150), height: vw(150), resizeMode: 'contain' }} />
        <Text style={{ color: '#ffffff', fontSize: vw(32), fontFamily: 'Arial', fontWeight: 'bold' }}>Medlink</Text>
        <Counter
          end={10000}
          start={0}
          time={this.props.isLogged ? 0 : 2000}
          digits={0}
          easing="linear"
          onComplete={() => this._onChangeScreen()}
        />
      </ImageBackground>
    );
  }
}

SplashScreen.navigationOptions = {
  header: null,
};

const styles = {
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
    dataUser: state.user.dataUser,
    saveLogged: state.user.saveLogged,
    userSaved: state.user.userSaved,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logged: (data, saveLogged, userSaved) =>
      new Promise(resolve =>
        resolve(
          dispatch({
            type: types.LOGGED,
            data: data,
            saveLogged: saveLogged,
            userSaved: userSaved,
          }),
        ),
      ),
    logout: () =>
      new Promise(resolve =>
        resolve(
          dispatch({
            type: types.LOGOUT,
          }),
        ),
      ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
