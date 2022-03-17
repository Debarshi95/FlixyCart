/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillMoonFill, BsSunFill, BsFillCartFill } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../../../providers/ThemeProvider/ThemeProvider';
import './Navbar.scss';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = true;

  return (
    <div className="w-full Navbar__root">
      <nav className="d-flex content-between max-w-85 mx-auto items-center">
        <NavLink to="/" className="text-12">
          FlixyCart
        </NavLink>
        <div className="d-flex w-10 content-between">
          {isLoggedIn ? (
            <>
              <NavLink to="/cart" className="Navbar__IconButton">
                <BsFillCartFill />
              </NavLink>
              <button type="button" className="Navbar__IconButton">
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin">SignIn</NavLink>
              <NavLink to="/signup">SignUp</NavLink>
            </>
          )}
          <div role="button" className="Navbar__IconButton" onClick={toggleTheme}>
            {theme === 'light' ? <BsSunFill /> : <BsFillMoonFill />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
