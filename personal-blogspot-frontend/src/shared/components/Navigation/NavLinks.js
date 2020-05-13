import React from 'react' ;
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavLinks.css';
import { setUserInfo } from '../../../actions/actions';

class NavLinks extends React.Component {

    logoutUser(userId) {
        this.props.logoutUser(!userId);
    }

    render(){
        const { userInfo } = this.props;
        return (
        <ul className="nav-links">
    
            <li>
                <NavLink to="/all-blogs">ALL BLOGS</NavLink>
            </li>

            {!userInfo.userId && <li>
                <NavLink to="/" exact onClick={() => this.props.logoutUser(!userInfo.userId)}>LOGIN</NavLink>
            </li>}
           
            {!userInfo.userId && <li>
                <NavLink to="/register">SIGN UP</NavLink>
            </li>}

            {userInfo.userId && <li>
                <NavLink to='/my-blogs'>MY BLOGS</NavLink>
            </li>}
            
            {userInfo.userId && <li>
                 <NavLink to="/blog/new">NEW POST</NavLink>
            </li>}            
           
            {userInfo.userId && <li>
                <NavLink to="/" exact onClick={() => this.props.logoutUser(!userInfo.userId)}>LOGOUT</NavLink>
            </li>}            

        </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo : state.user.userInfo
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        logoutUser : (userId) => {
            dispatchEvent(setUserInfo(userId));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavLinks);