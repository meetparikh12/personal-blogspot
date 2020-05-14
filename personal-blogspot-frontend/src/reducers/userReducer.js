import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userInfo: {
        userId: false,
        user: ''
    }
}
const userReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.USER_INFO:
            return {
                ...state,
                userInfo : {
                    userId : action.payload,
                    user: 'u1'
                }
            }
    
        default: return state;
    }
}

export default userReducer;