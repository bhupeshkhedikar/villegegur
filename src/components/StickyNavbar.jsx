import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router hook
import "./StickyNavbar.css";

const StickyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const navigate = useNavigate(); // hook for navigation

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const navLinks = [
    { name: "मुखपृष्ठ", href: "/" },
    {
      name: "आमच्या विषयी",
      href: "welcome",
      submenu: [
        { name: "प्रस्तावना", href: "/about" }, // external page
        { name: "फोटो संग्रह", href: "gallery" }, // in-page section
      ],
    },
    { name: "समिति", href: "/Committee" },
    { name: "शासकीय योजना", href: "schemes" },
    { name: "गावातील प्रकल्प", href: "/projects" },
    { name: "अधिकारी", href: "officers" },
    // { name: "कर्मचारी", href: "employees" },
    { name: "महत्त्वाचे दुवे", href: "links" },
    { name: "संपर्क", href: "footer" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();

    if (href === "/about" || href === "/" || href === "/Committee" || href === "/projects") {
      navigate(href);
    } else {
      // in-page scroll
      const section = document.getElementById(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky-navbar">
      {/* Top Blue Bar */}
      <div className="top-blue-bar">
        <div className="contact-info">
          <span className="email">gpgurdha@gmail.com</span>
          <span className="phone">988139596</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="logo-section">
          <div className="emblem-placeholder">
            <img
              src="https://i.ibb.co/99dr2X06/gpgurdha.png"
              width={80}
              height={80}
              alt="Emblem"
              className="emblem-image"
            />
          </div>
          <h1 className="navbar-title">ग्रामपंचायत गुरढा </h1>
        </div>

        <div className="nav-section">
          {/* Hamburger */}
          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Nav Links */}
          <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
            {navLinks.map((link, index) => (
              <li key={index} className={link.submenu ? "has-submenu" : ""}>
                <a
                  href={link.href.startsWith("/") ? link.href : `#${link.href}`}
                  onClick={(e) => {
                    if (link.submenu) {
                      e.preventDefault();
                      toggleDropdown(index);
                    } else {
                      handleLinkClick(e, link.href);
                    }
                  }}
                >
                  {link.name}{" "}
                  {link.submenu && (
                    <span
                      className={`arrow ${
                        openDropdownIndex === index ? "rotate" : ""
                      }`}
                    >
                      ▾
                    </span>
                  )}
                </a>

                {link.submenu && (
                  <ul
                    className={`dropdown-menu ${
                      openDropdownIndex === index ? "show" : ""
                    }`}
                  >
                    {link.submenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={sub.href.startsWith("/") ? sub.href : `#${sub.href}`}
                          onClick={(e) => handleLinkClick(e, sub.href)}
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
