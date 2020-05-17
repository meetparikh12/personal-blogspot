import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userInfo: {}
}
const userReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.USER_INFO:
            return {
                ...state,
                userInfo : action.payload
            }
    
        default: return state;
    }
}

export default userReducer;