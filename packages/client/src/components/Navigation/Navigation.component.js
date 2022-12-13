import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import './Navigation.styles.css';
import { Button } from '../Button/Button.component';

export const Navigation = () => {
  const { user, name, logout } = useUserContext();

  return (
    <div className="navigation-container">
      <div className="navigation">
        <div className="nav">
          <span className="navbar-brand">Fashion Spree</span>
          <NavLink to="/" className="home">
            Home
          </NavLink>
          <NavLink to="/about-us" className="about-us">
            About Us
          </NavLink>
          <NavLink to="/collections" className="collections">
            Our collections
          </NavLink>
          <NavLink to="/contact-us" className="contact-us">
            Contact Us
          </NavLink>
          {user ? (
            <div className="logged-in-container">
              <div className="logged-in-text">
                <div>{name}</div>
                <div>{user.email}</div>
              </div>
              <div className="logout-button-container">
                <Button
                  label="Logout"
                  backgroundColor="#F5F5F5"
                  onClick={logout}
                />
              </div>
            </div>
          ) : (
            <div className="nav-buttons">
              <Link to="/login" className="login">
                <Button label="Login" backgroundColor="#F5F5F5" />
              </Link>
              <Link to="/signup" className="signup">
                <Button label="Sign Up" backgroundColor="#F5F5F5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
