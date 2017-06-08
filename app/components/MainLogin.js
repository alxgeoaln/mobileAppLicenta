import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationExperimental from 'react-native-deprecated-custom-components';


import Register from './Register';
import Login from './Login';

var MainLogin = React.createClass({
    getInitialState(){
        return {
            isOpen: false
        }
    },
    renderScene(route, nav){
        switch (route.name) {
            case 'register':
                return (
                    <Register/>
                );
            default:
                return (
                    <Login/>
                )
        }
    },
    registerPage() {
        this.nav.push({
            name: 'register'
        });
    },
    loginPage(){
        this.nav.push({
            name: 'login'
        });
    },
    configureScene() {
        return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.loginPage}>
                        <Text style={styles.button}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.registerPage}>
                        <Text style={styles.button}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <NavigationExperimental.Navigator
                    configureScene={this.configureScene}
                    initialRoute={{name: 'login', index: 0}}
                    ref={((nav) => {
                        this.nav = nav
                    })}
                    renderScene={this.renderScene}
                />

            </View>
        );
    }
});
const styles = StyleSheet.create({
    buttonContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2ecc71'
    },
    button: {
        fontSize: 25,
        color: 'white'
    },
    formError: {
        color: 'red'
    }
});

module.exports = connect()(MainLogin);
