import React from 'react';
import './header.css'

function Header() {

    const handleClick = () => {
        alert('This doesn\'t do anything yet');
    };

    return (
        <header className='header'>
        <h1 className='logo'>
            <a href="/" className='logo-link'>Sudoku Solver</a>
        </h1>
        <nav>
            <ul className='nav-list'>
            <li>
            <button className='nav-button' onClick={handleClick}>
                Info
            </button>
            </li>
            </ul>
        </nav>
        </header>
    );
}

export default Header;
