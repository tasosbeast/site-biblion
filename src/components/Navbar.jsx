import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header class="header">
      <div class="container">
        <a href="/" class="logo">
          BookLovers
        </a>
        <nav class="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Ροή
          </NavLink>
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Η Βιβλιοθήκη μου
          </NavLink>
          <a href="#" class="nav-link">
            Κοινότητα
          </a>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Προφίλ
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
