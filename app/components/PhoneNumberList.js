import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
    RefreshControl
} from 'react-native';
import {addContact, getContactData, deleteContact, addAlert} from '../actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import Spinner from 'react-native-loading-spinner-overlay';
var ContactItem = connect()(React.createClass({
    onDelete: function () {
        this.props.dispatch(deleteContact(this.props.id));
    },
    render(){
        return (
            <View style={styles.todoContainer}>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text>{this.props.name}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{position: 'absolute'}}>{this.props.email}</Text>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert(
                        'Sterge Contact',
                        'Sunteti sigur ca vreti sa stergeti acest contact?',
                        [
                            {text: 'Inchide', onPress: () => console.log('Cancel Pressed!')},
                            {text: 'OK', onPress: this.onDelete},
                        ]
                    )}>
                        <Icon name="x" size={15} color='red'/>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}));

var ContactList = React.createClass({
    getInitialState() {
        return {
            email: undefined,
            name: undefined,
            loading: false,
            refreshing: false
        }
    },
    onRefresh() {
        this.setState({refreshing: true});
        this.props.dispatch(getContactData).then(() => {
            this.setState({refreshing: false});
        })
    },
    addNewContact: function () {
        var {dispatch} = this.props;
        var email = this.state.email;
        var name = this.state.name;
        if (email && email != "" && name && name != "") {
            this.setState({
                loading: true
            });
            dispatch(addContact(email, name)).then(() => {
                this.setState({
                    email: '',
                    name: '',
                    loading: false
                });
            });
        } else {
            dispatch(addAlert("Trebuie sa introduceti un nume si email valid."))
        }
    },

    render() {
        var renderContacts = () => {
            return this.props.contacts.map((contact) => {
                return (
                    <ContactItem key={contact._id} name={contact.name} email={contact.email} id={contact._id}/>
                )
            })
        };
        if (this.state.loading) {
            return (
                <View style={{flex: 1}}>
                    <Spinner
                        overlayColor="#2ecc71"
                        visible={this.state.loading}
                        textContent="Contactul se posteaza..."
                        textStyle={{color: 'white'}}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={(email) => this.setState({email: email})}
                            ref={(el) => {
                                this.email = el;
                            }}
                            value={this.state.email}
                            placeholder="Email"
                            style={styles.input}/>
                        <TextInput
                            onChangeText={(name) => this.setState({name: name})}
                            ref={(el) => {
                                this.name = el;
                            }}
                            value={this.state.name}
                            placeholder="Nume"
                            style={styles.input}/>
                        <TouchableOpacity onPress={this.addNewContact}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>Adauga Email</Text>
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
                        {renderContacts()}
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
        borderWidth: 5,
        borderRadius: 10,
        borderColor: "#3AC162"
    },
    input: {
        height: 40
    }
});


var mapStateToProps = (state) => {
    console.log(state);
    return {
        contacts: state.contacts
    }
};

module.exports = connect(mapStateToProps)(ContactList);
