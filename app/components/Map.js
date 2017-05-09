import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';



var width = Dimensions.get('window').width;
class Map extends React.Component {
    state = {
        region: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null
        }
    };

    sendLocation() {
        var lat = this.state.region.latitude;
        var lon = this.state.region.longitude;
    }

    calcDelta(lat, lon) {
        const latDelta = 0.0922;
        const lonDelta = 0.0421;

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
            }, (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000000, maximumAge: 1000})
    }

    marker() {
        return {
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
                        image={require('../img/pin.png')}
                        title="Im here!"
                        description="Home"
                    />
                </MapView> : null}
                {/*region sendLocationButton*/}
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 25,
                        right: 0,
                        left: 0
                    }}>
                    <TouchableHighlight
                        onPress={() => this.sendLocation()}
                        style={styles.buttonContainer}>
                        <View style={{flexDirection: 'row', marginTop: 7}}>
                            <Icon name="send" size={20} color="orange"/>
                            <Text style={{color: 'orange', marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Send
                                Location</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {/*endregion*/}
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
    },
    buttonContainer: {
        backgroundColor: '#000',
        width: width * .9,
        height: 40,
        alignItems: 'center',
        borderRadius: 5

    }
});

module.exports = Map;