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
                        overlayColor="#2ecc71"
                        visible={this.state.loading}
                        textContent="Logging in..."
                        textStyle={{color: 'white'}}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Register
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
                            placeholder="Password"
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
                            placeholder="Name"
                            underlineColorAndroid="#fff"
                            style={styles.textInput}/>
                        <View>
                            {renderError(name)}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            onPress={() => this.onSignUp()}
                            style={{borderColor: 'green', borderWidth: 2,
                            borderRadius:10, width: 100, height: 45, backgroundColor: 'green'}}>
                            <Text style={{fontSize: 25, textAlign: 'center', color: '#fff'}}>Submit</Text>
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
        backgroundColor: '#2ecc71'
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
        errors.email = "Please enter an email.";
    }
    if (!formProps.password) {
        errors.password = "Please enter a password.";
    }
    if (!formProps.name) {
        errors.password = "Please enter a name.";
    }
    return errors;
}

module.exports = reduxForm({
    form: 'login',
    fields: ['email', 'password', 'name'],
    validate: validate
}, null, null)(Register);