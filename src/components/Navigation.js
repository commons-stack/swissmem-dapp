import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import WalletButton from './WalletButton';
import ChangeWallet from './ChangeWallet';
import csLogo from '../assets/headerlogo.svg';
import './Navigation.sass';

const Comp = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(1);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setActiveNavItem(1);
        break;
      case '/contribute':
        setActiveNavItem(2);
        break;
      // case "/help":
      // setActiveNavItem(3)
      // break
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="../">
              <img src={csLogo} alt="Logo" />
            </a>
            <span className="navbar-burger burger" data-target="navbarMenu">
              <span />
              <span />
              <span />
            </span>
          </div>

          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              {/* <div
                className={
                  activeNavItem === 1 ? "navbar-item is-active" : "navbar-item"
                }
              >
                <Link to="/">
                  <span>About contribution</span>
                </Link>
              </div> */}
              <div className={activeNavItem === 2 ? 'navbar-item is-active' : 'navbar-item'}>
                <Link to="/contribute">
                  <span>Membership</span>
                </Link>
              </div>
              <div className={activeNavItem === 3 ? 'navbar-item is-active' : 'navbar-item'}>
                <a
                  href="mailto:info@commonsstack.foundation"
                  subject="I have a problem getting CSTK tokens"
                  className="support-link"
                >
                  <span>Need help?</span>
                </a>
              </div>
            </div>

            <div className="navbar-end">
              <div className="tabs is-right">
                <div className="navbar-item">
                  <ChangeWallet />
                  <WalletButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Comp;
