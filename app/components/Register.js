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

var Register = React.createClass({
    getInitialState: function () {
        return {
            loading: false
        }
    },
    onSignUp: function () {
        var {dispatch, fields: {email, password, name}} = this.props;
        this.setState({
            loading: true
        });
        dispatch(signupUser(email.value, password.value, name.value)).then(() => {
            this.setState({
                loading: false
            });
        });
    },
    render() {
        var {fields: {email, password, name}} = this.props;

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
                        textContent="Inregistrare..."
                        textStyle={{color: 'white'}}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Inregistrare
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
                    <View style={styles.field}>
                        <TextInput
                            {...name}
                            placeholder="Nume"
                            underlineColorAndroid="#fff"
                            style={styles.textInput}/>
                        <View>
                            {renderError(name)}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            onPress={() => this.onSignUp()}
                            style={{borderColor: '#3AC162', borderWidth: 2,
                            borderRadius:10, width: 150, height: 35, backgroundColor: '#3AC162'}}>
                            <Text style={{fontSize: 20, textAlign: 'center', color: '#fff'}}>Inregistrare</Text>
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
        color: 'white'
    },
    formError: {
        color: 'red'
    }
});

var validate = (formProps) => {
    var errors = {};
    if (!formProps.email) {
        errors.email = "Va rog introduceti o adresa de email.";
    }
    if (!formProps.password) {
        errors.password = "Va rog introduceti o parola.";
    }
    if (!formProps.name) {
        errors.password = "Va rog introduceti un nume.";
    }
    return errors;
};

module.exports = reduxForm({
    form: 'login',
    fields: ['email', 'password', 'name'],
    validate: validate
}, null, null)(Register);