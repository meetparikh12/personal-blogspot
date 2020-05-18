import React from 'react' ;
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavLinks.css';
import { setUserInfo } from '../../../actions/actions';
import setJwtToken from '../../securityUtils/setJwtToken';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

class NavLinks extends React.Component {

    logoutUser(userId) {
        localStorage.removeItem('jwt-token');
        setJwtToken(false);
        this.props.logoutUser({});
        toast.success("You're logged out!", {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000});
    }

    render(){
        const { userInfo } = this.props;
        return (
        <ul className="nav-links">
    
            <li>
                <NavLink to="/" exact style={{textDecoration: "none"}}>ALL BLOGS</NavLink>
            </li>

            {!userInfo.userId && <li>
                <NavLink to="/login" style={{textDecoration: "none"}} exact>LOGIN</NavLink>
            </li>}
           
            {!userInfo.userId && <li>
                <NavLink to="/register" style={{textDecoration: "none"}}>SIGN UP</NavLink>
            </li>}

            {userInfo.userId && <li>
                <NavLink to={`/blogs/${userInfo.userId}`} style={{textDecoration: "none"}}>MY BLOGS</NavLink>
            </li>}
            
            {userInfo.userId && <li>
                 <NavLink to="/blog/new" style={{textDecoration: "none"}}>NEW POST</NavLink>
            </li>}            
           
            {userInfo.userId && <li>
                <NavLink to="/login" style={{textDecoration: "none"}} exact onClick={this.logoutUser.bind(this)}>LOGOUT</NavLink>
            </li>}            

        </ul>
        )
    }
}

NavLinks.propTypes = {
    userInfo: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {
        userInfo : state.user.userInfo
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        logoutUser : (userInfo) => {
            dispatchEvent(setUserInfo(userInfo));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavLinks);