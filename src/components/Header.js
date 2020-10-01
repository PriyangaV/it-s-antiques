import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartLink, LoginLink } from '../components';
import { UserContext } from '../context/user';

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      <ul>
        <div className="hLeft">
          <li>
            <NavLink to="/" exact activeClassName="selected">
              home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" exact activeClassName="selected">
              about
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" exact activeClassName="selected">
              shop
            </NavLink>
          </li>
          {user.token && (
            <li>
              <NavLink to="/checkout" exact activeClassName="selected">
                checkout
              </NavLink>
            </li>
          )}
        </div>
        <div className="hRight">
          <LoginLink />
          <CartLink />
        </div>
      </ul>
    </header>
  );
};

export default Header;
