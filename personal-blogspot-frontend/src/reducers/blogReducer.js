import * as actionTypes from '../actions/actionTypes';
const initialState = {
    posts : []
}

const blogReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
}
export default blogReducer;