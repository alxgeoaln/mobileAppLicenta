/**
 * Created by Systegra on 9/12/2017.
 */
import React, {
    Component
} from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {

    componentDidMount() {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
            }
        })
    }

    componentWillMount() {
        (function () {
            // Register all the valid actions for notifications here and add the action handler for each action
            PushNotificationAndroid.registerNotificationActions(['Da', 'Nu']);
            DeviceEventEmitter.addListener('notificationActionReceived', function (action) {
                console.log('Notification action received: ' + action);
                const info = JSON.parse(action.dataJSON);
                if (info.action == 'Da') {
                    console.log(true);
                } else if (info.action == 'Nu') {
                    console.log(false);
                }
                // Add all the required actions handlers
            });
        })();
    }

    render() {
        return null;
    }
}