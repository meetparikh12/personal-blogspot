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
    
            {userInfo.userId && <li>
                <NavLink to="/all-blogs" style={{textDecoration: "none"}}>ALL BLOGS</NavLink>
            </li>}

            {!userInfo.userId && <li>
                <NavLink to="/" style={{textDecoration: "none"}} exact onClick={() => this.props.logoutUser(!userInfo.userId)}>LOGIN</NavLink>
            </li>}
           
            {!userInfo.userId && <li>
                <NavLink to="/register" style={{textDecoration: "none"}}>SIGN UP</NavLink>
            </li>}

            {userInfo.userId && <li>
                <NavLink to={`/blogs/${userInfo.user}`} style={{textDecoration: "none"}}>MY BLOGS</NavLink>
            </li>}
            
            {userInfo.userId && <li>
                 <NavLink to="/blog/new" style={{textDecoration: "none"}}>NEW POST</NavLink>
            </li>}            
           
            {userInfo.userId && <li>
                <NavLink to="/" style={{textDecoration: "none"}} exact onClick={() => this.props.logoutUser(!userInfo.userId)}>LOGOUT</NavLink>
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