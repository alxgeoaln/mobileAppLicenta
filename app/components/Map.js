import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Linking,
    AppState
} from 'react-native';
import {connect} from 'react-redux';
import Geocoder from 'react-native-geocoder';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import {sendLocation} from '../actions';
import PushController from '../pushNotification/PushController';
import PushNotification from 'react-native-push-notification';

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#ffeb3b"
            },
            {
                "weight": 6
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#ffeb3b"
            },
            {
                "weight": 6
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }
]

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
        speed: null,
        speed_h: null,
        maxSpeed: null,
        seconds: 5
    };


    sendLocation() {
        const lat = this.state.region.latitude;
        const lon = this.state.region.longitude;
        const dateTime = new Date();
        const location = {
            lat: this.state.region.latitude,
            lng: this.state.region.longitude
        };
        const {dispatch} = this.props;

        this.setState({
            loading: true
        });
        Geocoder.geocodePosition(location).then(res => {
            const address = res[0].formattedAddress;
            dispatch(sendLocation(lat, lon, address, dateTime)).then(() => {
                this.setState({
                    loading: false
                });
            });
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
        });
    }

    accident(speed_h) {
        // if (this.state.speed_h < speed_h) {
        //     this.setState({
        //         maxSpeed: speed_h
        //     });
        // }
        //
        // const speedDiff = this.state.maxSpeed - this.state.speed_h;
        //
        // if (speedDiff === this.state.maxSpeed) {
        //     this.sendLocation();
        // }

        if(speed_h >= 5) {
            // this.sendLocation();
            PushNotification.localNotificationSchedule({
                message: "Accident?",
                date: new Date(Date.now() + (5 * 1000)),
                actions: '["Da", "Nu"]'
            });
        }
    }


    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                console.log(position);
                this.setState({
                    speed: position.coords.speed,
                    speed_h: position.coords.speed * 3600 / 1000,

                });
                this.calcDelta(position.coords.latitude, position.coords.longitude);
                this.accident(position.coords.speed * 3600 / 1000)
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
        );
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        // navigator.geolocation.clearWatch(this.watchId);
    }

    handleAppStateChange(appState) {
        try {
            if (appState === 'background') {
                PushNotification.localNotificationSchedule({
                    message: "Sugi pula?", // (required)
                    date: new Date(Date.now() + (5 * 1000)),
                    actions: '["Da", "Nu"]'
                });
            }
        } catch (e) {
            console.log(e);
        }


    }


    goToNavigation(coords) {
        Linking.openURL('http://maps.google.com/maps?daddr=' + coords.latitude + ',' + coords.longitude);
    }


    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1}}>
                    <Spinner
                        overlayColor="#2ecc71"
                        visible={this.state.loading}
                        textContent="Se trimite locatia..."
                        textStyle={{color: 'white'}}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    {this.state.region.latitude ? <MapView
                        customMapStyle={mapStyle}
                        style={styles.map}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                    >
                        {
                            hospitals.map((l, k) => {
                                return (
                                    <MapView.Marker
                                        key={k}
                                        coordinate={l.coords}
                                        image={require('../img/hospitalPin.png')}
                                        title={l.name}
                                        onPress={() => this.goToNavigation(l.coords)}
                                    />
                                )

                            })
                        }

                    </MapView> : <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "#2F3131"
                    }}><Text style={{color: '#fff', fontSize: 30}}>Harta se incarca...</Text></View>}
                    {/*region sendLocationButton*/}
                    {this.state.region.latitude ?
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
                                    <Icon name="send" size={20} color="#F9BA32"/>
                                    <Text style={{color: '#F9BA32', marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Km/h: {this.state.speed_h}</Text>
                                </View>
                            </TouchableHighlight>
                        </View> : <View></View>}
                    <PushController/>
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
    title: {
        color: 'white',
        fontSize: 20
    },
    buttonContainer: {
        backgroundColor: '#2F3131',
        width: width * .9,
        height: 40,
        alignItems: 'center',
        borderRadius: 5

    }
});

module.exports = connect()(Map);