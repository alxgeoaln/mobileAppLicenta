module.exports = (state=[], action) => {
    switch(action.type) {
        case 'ADD_CONTACT':
            return [
                ...state,
                action.contact
            ];

        case 'SET_CONTACTS':
            return action.contacts;

        case 'REMOVE_CONTACT':
            return state.filter((contact) => {
                if (contact._id === action.contact_id) {
                    return false;
                } else {
                    return true;
                }
            });

        default:
            return state;
    }
};