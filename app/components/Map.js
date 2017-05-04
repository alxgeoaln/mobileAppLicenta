import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import MapView from 'react-native-maps';
import {unauthUser} from '../actions';


var Map = React.createClass({
    onLogout() {
        this.props.dispatch(unauthUser);
    },
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={this.onLogout}>
                        <Icon name="x" size={20} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        To-Do List
                    </Text>
                    <TouchableOpacity></TouchableOpacity>
                </View>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2ecc71'
    },
    title: {
        color: 'white',
        fontSize: 20
    }
});


module.exports = connect()(Map);