import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header id='main-header'>
            <div className='header-content'>
                <Link to="/">
                    Blog
                </Link>
                <Link to="/login">
                    Entrar
                </Link>
            </div>
        </header>
    )
}

export default Header