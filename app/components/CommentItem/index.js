import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { ICON_DOT, ICON_LIKE, ICON_SHARE, ICON_COMMENT } from '../../constants';
import { IconAvatar } from '../../elements/Icon/IconAvatar';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import {DistanseTime} from '../../utils/DateFormat';
class CommentItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            stateChange: true,
        }
    }
    render() {
        const item = this.state.item
        return (
            <View style={{ margin: 5, padding: 5, backgroundColor: 'white', borderRadius: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <IconAvatar style = {{}} styleIcon={{width:12,height:12}}/>
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.drg_name}</Text>
                        <Text>{DistanseTime(item.created_date)}</Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', paddingRight: 10 }}>
                        <Image source={ICON_DOT} style={{ width: 5, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={{paddingLeft:50, paddingTop:5}}>
                    <Text>{item.comment}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

function mapStateToProps(state) {
    return {
        user: state.user.dataUser.info,
        store: state.user.dataUser.store,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);