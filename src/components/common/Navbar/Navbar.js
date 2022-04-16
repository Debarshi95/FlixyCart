import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillMoonFill, BsSunFill, BsFillCartFill } from 'react-icons/bs';
import { FaSignOutAlt, FaHeart } from 'react-icons/fa';
import { useTheme } from 'providers/ThemeProvider/ThemeProvider';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { clearItem } from 'utils/helperFuncs';
import './Navbar.scss';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useAuth();

  const handleSignout = () => {
    clearItem('user');
    setUser(null);
  };

  return (
    <div className="w-full Navbar__root">
      <nav className="d-flex content-between max-w-85 mx-auto items-center">
        <NavLink to="/" className="text-12">
          FlixyCart
        </NavLink>
        <div className="Navbar__IconContainer d-flex w-10 content-between items-center">
          {user?.id ? (
            <>
              <NavLink to="/wishlist" className="Navbar__IconButton">
                <FaHeart />
              </NavLink>
              <NavLink to="/cart" className="Navbar__IconButton">
                <BsFillCartFill />
              </NavLink>
              <button type="button" className="Navbar__IconButton" onClick={handleSignout}>
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin">SignIn</NavLink>
              <NavLink to="/signup">SignUp</NavLink>
            </>
          )}
          <div
            role="button"
            aria-hidden
            tabIndex={0}
            className="Navbar__IconButton"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <BsSunFill /> : <BsFillMoonFill />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
