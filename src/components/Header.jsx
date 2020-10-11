import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
/// sass
import '../sass/main.css';

const Header = () => {

    return (
        <header className="header">
            <nav className="header__logo-box">
                <Link className="header__logo-link" to="/">
                    <img className="logo" src={require("../img/logo-umpa-loompa.png")} alt="Logo Oompa Loompa's" />
                    <span>Oompa Loompa's crew</span>
                </Link>
            </nav>
        </header>
    );
}

Header.prototype = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired
};

export default Header;
