import React from 'react';
import classes from './Header.module.css';
import Adform from '../../assests/adform.svg';

const Header = () => {
    return (
        <header className={classes.header}>
            <img src={Adform} alt="adform logo"/>
            <h1>Flow Campaign</h1>
        </header>
    );
};

export default Header;