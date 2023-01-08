import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import './Navigation.styles.css';
import { Button } from '../Button/Button.component';
import close from '../../assets/icons/close_round.png';
import menu from '../../assets/icons/Menu.png';
import favorites from '../../assets/icons/Favorite.png';
import userLogin from '../../assets/icons/user.png';
import shoppingCart from '../../assets/icons/shopping.png';

export const Navigation = () => {
  const { user, logout } = useUserContext();
  const [showMobileLinks, setShowMobileLinks] = useState(false);

  return (
    <div className="navigation-container">
      <div className="navigation">
        <div className="nav">
          <span className="navbar-brand">Fashion Spree</span>
          <div className="links" id={showMobileLinks ? 'links-mobile' : ''}>
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
          </div>
          <div>
            {user ? (
              <div className="logged-in-container">
                <div className="logged-in-text">
                  <Link to="/favorites">
                    <img
                      className="icon-login"
                      src={favorites}
                      alt="favorites"
                    />
                  </Link>
                  <Link to="/shopping-cart">
                    <img
                      className="icon-login"
                      src={shoppingCart}
                      alt="shopping"
                    />
                  </Link>
                  <Link to="/">
                    <img className="icon-login" src={userLogin} alt="user" />
                  </Link>
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

          <button
            onClick={() => setShowMobileLinks(!showMobileLinks)}
            type="button"
            className="mobile-menu-icon"
          >
            {showMobileLinks ? (
              <img className="icon-hamburger" src={close} alt="close round" />
            ) : (
              <img className="icon-hamburger" src={menu} alt="menu" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
