import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NavigatorIOS
} from 'react-native';

// import {unauthUser} from '../actions';
// onLogout: function() {
//   this.props.dispatch(unauthUser);
// },
// <TouchableOpacity onPress={this.onLogout}>
//   <Text>
//     Logout
//   </Text>
// </TouchableOpacity>

import Map from './Map';

var Main = React.createClass({
    render() {
        return (
            <View style={{flex: 1}}>
                <Map/>
            </View>
        );
    }
});

module.exports = Main;
