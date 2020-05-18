import React, {useState} from 'react';
import './MainNavigation.css';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import {Link} from 'react-router-dom';

const MainNavigation = (props)=> {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }
    return (
        <React.Fragment>
            { drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/> }
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer> }
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h3 className="main-navigation__title" ><Link to="/" style={{color: "white", textDecoration: "none"}}>PERSONAL<span> BLOGSPOT</span></Link></h3>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}
export default MainNavigation;