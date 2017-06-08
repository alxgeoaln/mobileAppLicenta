import axios from 'axios';
import Keychain from 'react-native-keychain';

import {SENDMAIL_URL} from '../api';
import {addAlert} from './alertsActions';

exports.sendLocation = (lat, lon, address) => {

    return function (dispatch) {
        return Keychain.getGenericPassword().then((credentials) => {
            var {username, password} = credentials;
            return axios.post(SENDMAIL_URL(username), {lat, lon, address}, {
                headers: {authorization: password}
            }).then((response) => {
                console.log(response)
                const message = 'Successfully send';
                dispatch(sendMail(message));
            }).catch((err) => {
                console.log(err);
                dispatch(addAlert("Couldn't send location."));
            })
        })
    }
}



var sendMail = (message) => {
    return {
        type: 'SEND_MAIL',
        message,
    }
};
