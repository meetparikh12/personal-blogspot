import React from 'react' ;
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

class NavLinks extends React.Component {

    render(){
        return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>LOGIN</NavLink>
            </li>
           
            <li>
                <NavLink to="/all-blogs">ALL BLOGS</NavLink>
            </li> 
            <li>
                <NavLink to="/register">SIGN UP</NavLink>
            </li> 

            <li>
                <NavLink to='/my-blogs'>MY BLOGS</NavLink>
            </li>
            
           
            <li>
                 <NavLink to="/blog/new">NEW POST</NavLink>
            </li>
            
           
            <li>
                <NavLink to="/">LOGOUT</NavLink>
            </li>
            

        </ul>
        )
    }
}
export default NavLinks;