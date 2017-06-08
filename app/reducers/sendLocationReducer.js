module.exports = (state = [], action) => {
    switch (action.type) {
        case 'SEND_MAIL':
            return [
                ...state,
                action.message
            ];
        default:
            return state;
    }
};