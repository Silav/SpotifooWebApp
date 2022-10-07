import React from "react";
import "../styles/nav.css";
import logo from "../assets/logo.png";
import home from "../assets/home.svg";
import search from "../assets/search.svg";

const Nav = () => {
  return (
    <>
      <nav className="desktop-nav">
        <div className="nav-container">
          <div>
            <img src={logo} alt="logo" className="logo" />
          </div>
          <ul>
            <li>
              <a href="/home" className="active">
                <img src={home} alt="home" className="nav-icons" />
                Home
              </a>
            </li>
            <li>
              <a href="/search">
                <img src={search} alt="search" className="nav-icons" />
                Search
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="mobile-navbar">
        <div className="nav-container">
          <ul>
            <li>
              <a href="/home">
                <img src={home} alt="home" className="nav-icons" />
              </a>
              <a href="/home" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="/search">
                <img src={search} alt="search" className="nav-icons" />
              </a>
              <a href="/search">Search</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
