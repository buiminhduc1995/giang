import React from 'react';
import {
    View,
    Image,
} from 'react-native'

import { ICON_DOT, ICON_AVATAR } from '../../constants';

export const IconAvatar = ({style,styleIcon}) =>{
    return(
        <View style ={[{
            height:40, 
            width: 40, 
            borderRadius:20, 
            backgroundColor:'#2D9CDB', 
            justifyContent:'center',
            alignItems:'center'
        },style]}>
            <Image source={ICON_AVATAR} style={[{ height: 15, width: 15 },styleIcon]} />
        </View>
    )
}