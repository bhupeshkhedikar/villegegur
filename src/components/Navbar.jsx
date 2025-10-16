import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="navbar-header">
      {/* 🔵 Top Blue Bar */}
      <div className="top-bar">
        <span>📧 gpgosebujruk@gmail.com</span>
        <span>📞 +91 7030256781</span>
      </div>

      {/* 🔹 Main Navbar */}
      <nav className="navbar">
        <div className="logo">ग्राम पंचायत गोसे बुरजूख</div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li><a href="#">मुखपृष्ठ</a></li>

          <li
            className="dropdown"
            onClick={() => window.innerWidth <= 768 && toggleDropdown()}
          >
            <a href="#">
              आमच्या विषयी ▾
            </a>
            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              <li><a href="#">प्रस्तावना</a></li>
              <li><a href="#">फोटो संग्रह</a></li>
            </ul>
          </li>

          <li><a href="#">अभिनव उपक्रम</a></li>
          <li><a href="#">शासकीय योजना</a></li>
          <li><a href="#">समिती</a></li>
          <li><a href="#">संपर्क</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
