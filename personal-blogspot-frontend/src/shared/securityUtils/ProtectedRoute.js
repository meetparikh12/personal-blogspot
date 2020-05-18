import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({component: Component, userInfo, ...otherProps }) {
    return (
        <Route {...otherProps} render={(props) => {
            if(userInfo.userId) {
                return <Component {...props} /> 
            } else {
                return <Redirect to="/"/>
            }
        }}/>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    }
}
export default connect(mapStateToProps,null)(ProtectedRoute);