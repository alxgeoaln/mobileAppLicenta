import React from 'react';
import {reduxForm} from 'redux-form';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {loginUser, signupUser, addAlert} from '../actions';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import Register from './Register';

var Login = React.createClass({
    getInitialState: function () {
        return {
            loading: false
        }
    },
    onSignIn: function () {
        var {dispatch, fields: {email, password}} = this.props;
        this.setState({
            loading: true
        });
        dispatch(loginUser(email.value, password.value)).then(() => {
            this.setState({
                loading: false
            });
        });
    },
    onSignUp: function () {
        this.nav.push({
            name: 'register'
        });
    },
    render() {
        var {fields: {email, password}} = this.props;

        var renderError = (field) => {
            if (field.touched && field.error) {
                return (
                    <Text style={styles.formError}>{field.error}</Text>
                )
            }
        };

        if (this.state.loading) {
            return (
                <View style={{flex: 1}}>
                    <Spinner
                        overlayColor="#3E474F"
                        visible={this.state.loading}
                        textContent="Autentificare..."
                        textStyle={{color: '#fff'}}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Autentificare
                        </Text>
                    </View>
                    <View style={styles.field}>
                        <TextInput
                            {...email}
                            placeholder="Email"
                            underlineColorAndroid="#fff"
                            style={styles.textInput}/>
                        <View>
                            {renderError(email)}
                        </View>
                    </View>
                    <View style={styles.field}>
                        <TextInput
                            {...password}
                            placeholder="Parola"
                            underlineColorAndroid="#fff"
                            secureTextEntry={true}
                            style={styles.textInput}/>
                        <View>
                            {renderError(password)}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            onPress={() => this.onSignIn()}
                            style={{
                                borderColor: '#3AC162', borderWidth: 2,
                                borderRadius: 10, width: 150, height: 35, backgroundColor: '#3AC162'
                            }}>
                            <Text style={{fontSize: 20, textAlign: 'center', color: '#fff'}}>Autentificare</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }

    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: 20,
        backgroundColor: '#3E474F'
    },
    titleContainer: {
        padding: 10
    },
    title: {
        color: 'white',
        fontSize: 35,
        marginTop: 20,
        marginBottom: 20
    },
    field: {
        borderRadius: 5,
        padding: 5,
        paddingLeft: 8,
        margin: 7,
        marginTop: 0,
        backgroundColor: 'white'
    },
    textInput: {
        height: 40
    },
    buttonContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        fontSize: 30,
        color: '#3AC162'
    },
    formError: {
        color: 'red'
    }
});

var validate = (formProps) => {
    var errors = {};
    if (!formProps.email) {
        errors.email = "Va rog introduceti un email.";
    }
    if (!formProps.password) {
        errors.password = "Va rog introduceti o parola.";
    }
    return errors;
};

module.exports = reduxForm({
    form: 'login',
    fields: ['email', 'password'],
    validate: validate
}, null, null)(Login);