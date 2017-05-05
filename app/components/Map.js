import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import MapView from 'react-native-maps';
import {unauthUser} from '../actions';

class Map extends React.Component {
    state = {
        region: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null
        }
    };

    calcDelta(lat, lon) {
        const latDelta = 0.03;
        const lonDelta = 0.03;

        this.setState({
            region: {
                latitude: lat,
                longitude: lon,
                latitudeDelta: latDelta,
                longitudeDelta: lonDelta
            }
        })
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            this.calcDelta(lat, lon)
        })
    }

    marker(){
        return{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.region.latitude ? <MapView
                    style={styles.map}
                    inititalRegion={this.state.region}
                >
                    <MapView.Marker
                        coordinate={this.marker()}
                        title="Im here!"
                        description="Home"
                    />
                </MapView> : null}
            </View>
        );
    }
}


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

module.exports = Map;