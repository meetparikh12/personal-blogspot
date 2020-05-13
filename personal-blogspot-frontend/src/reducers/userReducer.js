import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userInfo: null
}
const userReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.USER_INFO:
            return {
                ...state,
                userInfo : {
                    userId : '123'
                }
            }
    
        default: return state;
    }
}

export default userReducer;