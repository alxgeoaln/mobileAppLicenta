import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Linking
} from 'react-native';
import {connect} from 'react-redux';
import Geocoder from 'react-native-geocoder';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import {sendLocation} from '../actions';

const hospitals = [
    {
        name: "Spitalul Universitar de Urgență Elias",
        coords: {
            latitude: 44.465909,
            longitude: 26.074050
        }

    },
    {
        name: "Spitalul CF Witting",
        coords: {
            latitude: 44.443261,
            longitude: 26.074390
        }

    }
];


var width = Dimensions.get('window').width;
class Map extends React.Component {
    state = {
        region: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null
        },
        loading: false,
        speed: null
    };


    sendLocation() {
        const lat = this.state.region.latitude;
        const lon = this.state.region.longitude;
        const NY = {
            lat: this.state.region.latitude,
            lng: this.state.region.longitude
        };
        const {dispatch} = this.props;

        this.setState({
            loading: true
        });
        Geocoder.geocodePosition(NY).then(res => {
            const address = res[0].formattedAddress;
            dispatch(sendLocation(lat, lon, address)).then(() => {
                this.setState({
                    loading: false
                });
            });
            console.log(address)
        })
            .catch(err => console.log(err))

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
            {enableHighAccuracy: true, timeout: 2000000000, maximumAge: 100000})
    }

    componentDidMount(){
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                console.log(position.coords.speed);
                this.setState({
                    speed: position.coords.speed
                })
            }
        )
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }


    marker() {
        return {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
        }
    }

    markerHostipal() {
        return {
            latitude: 44.443261,
            longitude: 26.074390
        }
    }

    gogogo(coords) {
        Linking.openURL('http://maps.google.com/maps?daddr=' + coords.latitude + ',' + coords.longitude);
    }


    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1}}>
                    <Spinner
                        overlayColor="#2ecc71"
                        visible={this.state.loading}
                        textContent="Sending location..."
                        textStyle={{color: 'white'}}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    {this.state.region.latitude ? <MapView
                        style={styles.map}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                    >
                        {/*<MapView.Marker*/}
                        {/*coordinate={this.marker()}*/}
                        {/*image={require('../img/placeholder.png')}*/}
                        {/*title="Im here!"*/}
                        {/*description="My current location"*/}
                        {/*/>*/}
                        {
                            hospitals.map((l, k) => {
                                return (
                                    <MapView.Marker
                                        key={k}
                                        coordinate={l.coords}
                                        image={require('../img/hospitalPin.png')}
                                        title={l.name}
                                        onPress={() => this.gogogo(l.coords)}
                                    />
                                )

                            })
                        }

                    </MapView> : <Text style={{flex: 1, backgroundColor: "white"}}>Map is loading...</Text>}
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
                                <Text style={{color: 'orange', marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>{this.state.speed}
                                    </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {/*endregion*/}
                </View>
            );
        }
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

module.exports = connect()(Map);