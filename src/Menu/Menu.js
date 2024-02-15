import React from 'react';

import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
            <ul>
                <li><Link to="/"/*  aria-label="Link to Home page" */>Home</Link></li>
                <li><Link to="/about" /* aria-label="Link to About page" */>About</Link></li>
                <li><Link to="/login" /* aria-label="Link to login page" */>Login</Link></li>
            </ul>
        </nav>
  );
}

export default Menu;