module.exports = (state=[], action) => {
    switch(action.type) {
        case 'ADD_PHONENUMBER':
            return [
                ...state,
                action.phoneNumber
            ];

        // case 'SET_TODOS':
        //     return action.todos;
        //
        // case 'REMOVE_TODO':
        //     return state.filter((todo) => {
        //         if (todo._id === action.todo_id) {
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     });

        default:
            return state;
    }
}