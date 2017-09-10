import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import SideMenu from 'react-native-side-menu'
import Icon from 'react-native-vector-icons/Octicons';
import {unauthUser} from '../actions';


import Map from './Map';
import PhoneNumberList from './PhoneNumberList';

var Main = React.createClass({
    getInitialState(){
        return {
            isOpen: false
        }
    },
    onLogout: function () {
        this.props.dispatch(unauthUser);
    },
    openMenu() {
        console.log(this.state.isOpen);
        this.setState({
            isOpen: true
        })
    },


    renderScene(route, nav){
        switch (route.name) {
            case 'numberList':
                return (
                    <PhoneNumberList/>
                );
            default:
                return (
                    <Map/>
                )
        }
    },
    numberPage() {
        this.nav.push({
            name: 'numberList'
        });
        this.setState({
            isOpen: false
        });
    },
    homePage(){
        this.nav.push({
            name: 'map'
        });
        this.setState({
            isOpen: false
        });
    },
    configureScene() {
        return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight
    },
    render() {
        const MenuComponent = (
            <View
                style={{flex: 1, backgroundColor: '#ededed', paddingTop: 62}}
            >
                <View style={styles.todoContainer}>
                    <TouchableOpacity
                        onPress={this.homePage}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="home" size={20}/>
                            <Text style={{fontWeight: "bold", paddingRight: 10, paddingLeft: 10}}>Acasa</Text>
                            <Icon name="chevron-right" size={20}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.todoContainer}>
                    <TouchableOpacity
                        onPress={this.numberPage}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="person" size={20}/>
                            <Text style={{fontWeight: "bold", paddingRight: 10, paddingLeft: 10}}>Contacte</Text>
                            <Icon name="chevron-right" size={20}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
        return (
            <View style={{flex: 1}}>
                <SideMenu
                    isOpen={this.state.isOpen}
                    menu={MenuComponent}
                    menuPosition="right"
                >
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={this.onLogout}>
                            <Icon name="sign-out" size={20} color="#3AC162"/>
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Licenta 2017
                        </Text>
                        <TouchableOpacity onPress={this.openMenu}>
                            <Icon name="three-bars" size={20} color="#3AC162"/>
                        </TouchableOpacity>
                    </View>
                    <NavigationExperimental.Navigator
                        configureScene={this.configureScene}
                        initialRoute={{name: 'map', index: 0}}
                        ref={((nav) => {
                            this.nav = nav
                        })}
                        renderScene={this.renderScene}
                    />
                </SideMenu>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3E474F'
    },
    title: {
        color: '#3AC162',
        fontSize: 20,
        fontWeight: 'bold'
    },
    todoContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: -1,
        borderColor: '#ccc',
        flexDirection: 'row'
    }
});

module.exports = connect()(Main);
