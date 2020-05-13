import * as actionTypes from './actionTypes';

export const setUserInfo = userInfo => {
    return {
        type: actionTypes.USER_INFO,
        payload: userInfo
    }
}