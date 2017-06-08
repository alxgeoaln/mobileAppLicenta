import axios from 'axios';
import Keychain from 'react-native-keychain';

import {CONTACTS_URL, CONTACTSDELETE_URL} from '../api';
import {addAlert} from './alertsActions';

exports.addContact = (email, name) => {

    return function (dispatch) {
        return Keychain.getGenericPassword().then((credentials) => {
            var {username, password} = credentials;
            return axios.post(CONTACTS_URL(username), {email, name}, {
                headers: {authorization: password}
            }).then((response) => {
                dispatch(addNewContact(response.data.contact));
            }).catch((err) => {
                dispatch(addAlert("Couldn't add new contact."));
            })
        })
    }
};

exports.deleteContact = (contact_id) => {
    return function(dispatch) {
        return Keychain.getGenericPassword().then((credentials) => {
            var {username, password} = credentials;
            return axios.delete(CONTACTSDELETE_URL(username, contact_id), {
                headers: {authorization: password}
            }).then((response) => {
                dispatch(removeContact(contact_id));
            }).catch((err) => {
                dispatch(addAlert("Couldn't delete contact."));
            })
        })
    }
}

exports.getContactData = function(dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
        var {username, password} = credentials;
        return axios.get(CONTACTS_URL(username), {
            headers: {authorization: password}
        }).then((response) => {
            dispatch(setContacts(response.data.contacts));
        }).catch((err) => {
            dispatch(addAlert("Couldn't get contacts."));
        })
    })
}

var addNewContact = (contact) => {
    return {
        type: 'ADD_CONTACT',
        contact,
    }
};

var removeContact = (contact_id) => {
    return {
        type: 'REMOVE_CONTACT',
        contact_id
    }
};

var setContacts = (contacts) => {
    return {
        type: 'SET_CONTACTS',
        contacts
    }
};