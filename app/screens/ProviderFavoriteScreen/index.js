import React, { Component } from 'react';
import { Image, Platform, Text, View, TouchableOpacity } from 'react-native';
import vw from "../../utils/size-dynamic";
import { ICON_FILTER, ICON_SEARCH, MAIN_COLOR, ICON_BACK } from "../../constants";
import HeaderBar from "../../elements/HeaderBar";
import Input from "../../elements/Input";
import { connect } from "react-redux";
import ProviderList from '../../components/ProviderList';
import API from "../../api";
import {onUpdateFavoriteAction} from '../../redux/action/company';
import { MyStatusBar } from '../../elements/MyStatusBar';

class ProviderFavoriteScreen extends React.PureComponent  {

    constructor(props) {
        //console.log()
        super(props);
        this.state = {
            isLoadMore: false,
            refreshing: false,
            pulling: false,
            providerList: [],
            page: 2,
            totalPage: 0,
            error: false,
        }
    }

    async componentWillMount() {
        await this._refreshData();
    }

    _fetchMoreData = async () => {
        const account_id = this.props.info !== null && this.props.info.account_id
        if (this.state.isLoadMore) return;
        if (this.state.page <= this.state.totalPage) {
            await this.setState({ isLoadMore: true });
            API.companyApi.getFavoriteProvider(account_id, this.state.page).then(res => {
                if (res.data.data.length > 0)
                    this.setState(prevState => ({
                        isLoadMore: false,
                        page: prevState.page + 1,
                        providerList: res.data,
                        totalPage: res.data.total_page
                    }))
            }).catch(error => {
                let mError = "";
                if (error.response) {
                    mError = error.response.data
                } else {
                    mError = error.message
                }
                this.setState({
                    error: mError,
                    isLoadMore: false
                });
            });
        }
    };

    _pullingData = async () => {
        const account_id = this.props.info !== null && this.props.info.account_id
        if (this.state.pulling) return;
        await this.setState({ pulling: true });
        API.companyApi.getFavoriteProvider(account_id, 1).then(res => {
            this.setState({
                pulling: false,
                page: 2,
                providerList: res.data,
                totalPage: res.data.total_page
            })
        }).catch(() => {
            this.setState({
                pulling: false
            });
        });
    };

    _refreshData = async () => {
        this.setState({ providerList: [] })
        console.log('refresh')
        const account_id = this.props.info !== null && this.props.info.account_id
        if (this.state.refreshing) return;
        await this.setState({ refreshing: true });
        API.companyApi.getFavoriteProvider(account_id, 1).then(res => {
            console.log(res)
            this.setState({
                refreshing: false,
                page: 2,
                providerList: res.data,
                totalPage: res.data.total_page
            });
            console.log(res)
        }).catch(() => {
            this.setState({
                refreshing: false
            });
        });
    };

    _renderHeader() {
        return (
            <HeaderBar
                left={this._renderHeaderLeft()}
            />
        );
    }

    _renderHeaderLeft() {
        return (
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => this.props.navigation.goBack()}>
                <Image source={ICON_BACK} style={{ width: vw(11), height: vw(20), resizeMode: "contain", marginRight: vw(10) }} />
                <Text style={{ fontSize: vw(18), fontFamily: "Arial", fontWeight: "bold", color: "#ffffff" }}>
                    Danh sách nhà cung cấp yêu thích
                </Text>
            </TouchableOpacity>
        )
    }

    _renderBody() {
        return (
            <ProviderList
                data={this.state.providerList}
                navigation={this.props.navigation}
                onEndReached={this._fetchMoreData}
                onRefresh={this._pullingData}
                renderFooter={<View style={{ height: vw(10) }} />}
                renderHeader={<View style={{ height: vw(10) }} />}
                style={{ flex: 1, paddingRight: vw(10), marginLeft: vw(10) }}
                isLoadMore={this.state.isLoadMore}
                refreshing={this.state.pulling}
                error={this.state.error}
                onUpdateProviderSuccess={() => {
                    this._refreshData();
                    this.props.onUpdateFavoriteAction();
                }}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <MyStatusBar/>
                {this._renderHeader()}
                {this._renderBody()}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    wrapBody: {
        flex: 1,
    }
};

function mapStateToProps(state) {
    return {
        info: state.user.dataUser.info
    };
}

const mapDispatchToProps = {
    onUpdateFavoriteAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderFavoriteScreen);