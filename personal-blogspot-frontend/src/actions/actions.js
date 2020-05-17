import * as actionTypes from './actionTypes';

export const setUserInfo = userInfo => {
    return {
        type: actionTypes.USER_INFO,
        payload: userInfo
    }
}

export const getAllPosts = posts => {
    return {
        type: actionTypes.GET_ALL_POSTS,
        payload: posts
    }
}