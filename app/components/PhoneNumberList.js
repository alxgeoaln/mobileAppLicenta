import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    RefreshControl
} from 'react-native';
import {addPhoneNumber,getPhoneNumbers, addAlert} from '../actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import Spinner from 'react-native-loading-spinner-overlay';

var PhoneItem = connect()(React.createClass({
    render(){
        return (
            <View style={styles.todoContainer}>
                <Text>{this.props.name}</Text>
                <Text>{this.props.number}</Text>
            </View>
        )
    }
}));

var PhoneNumberList = React.createClass({
    getInitialState() {
        return {
            phoneNumber: undefined,
            name: undefined,
            loading: false,
            refreshing: false
        }
    },
    onRefresh() {
            this.setState({refreshing: true});
            this.props.dispatch(getPhoneNumbers).then(() => {
                this.setState({refreshing: false});
            })
    },
    addNewPhoneNumber: function () {
        var {dispatch} = this.props;
        var phoneNumber = this.state.phoneNumber;
        var name = this.state.name;
        if (phoneNumber && phoneNumber != "" && name && name != "") {
            this.setState({
                loading: true
            });
            dispatch(addPhoneNumber(phoneNumber, name)).then(() => {
                this.setState({
                    loading: false
                });
            });
        } else {
            dispatch(addAlert("You must enter a valid number and name."))
        }
    },
    render() {
        var renderPhoneNumbers = () => {
            return this.props.phoneNumbers.map((contact) => {
                return (
                    <PhoneItem key={contact._id} name={contact.name} number={contact.number} id={contact._id}/>
                )
            })
        };
        if (this.state.loading) {
            return (
                <View style={{flex: 1}}>
                    <Spinner
                        overlayColor="#2ecc71"
                        visible={this.state.loading}
                        textContent="Posting your phone number..."
                        textStyle={{color: 'white'}}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={(phoneNumber) => this.setState({phoneNumber: phoneNumber})}
                            ref={(el) => {
                                this.phoneNumber = el;
                            }}
                            value={this.state.phoneNumber}
                            placeholder="Phone Number"
                            style={styles.input}/>
                        <TextInput
                            onChangeText={(name) => this.setState({name: name})}
                            ref={(el) => {
                                this.name = el;
                            }}
                            value={this.state.name}
                            placeholder="Name"
                            style={styles.input}/>
                        <TouchableOpacity onPress={this.addNewPhoneNumber}>
                            <Text>Add Phone Number</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}/>
                        }
                        automaticallyAdjustContentInsets={false}
                        contentContainerStyle={styles.scrollViewContainer}>
                        {renderPhoneNumbers()}
                    </ScrollView>
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
        backgroundColor: 'white'
    },

    todoContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: -1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputContainer: {
        padding: 5,
        paddingLeft: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "orange"
    },
    input: {
        height: 40
    }
});


var mapStateToProps = (state) => {
    console.log(state);
    return {
        phoneNumbers: state.phoneNumbers
    }
};

module.exports = connect(mapStateToProps)(PhoneNumberList);
