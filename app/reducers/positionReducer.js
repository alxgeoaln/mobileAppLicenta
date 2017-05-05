var defaultState = [];

module.exports = (state = defaultState, action) => {
    switch (action.type) {
        case 'USER_POSITION':
            console.log(action)
            return [
                ...state,
                {
                    region: action.region,
                }
            ];

        default:
            return state;
    }
}