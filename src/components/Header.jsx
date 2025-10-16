import React from 'react';

const Header = () => {
  return (
    <header className="container">
      <h1>ग्रामपंचायत गुरढा </h1>
      <p>ईमेल: grampanchayatgosebuj@gmail.com | फोन: 9881319596</p>
      <div className="social-links">
        <a href="https://www.facebook.com/profile.php?id=61577605096097" target="_blank" rel="noopener noreferrer">फेसबुक</a>
        {/* Placeholder for other social links */}
        <a href="#">ट्विटर</a>
        <a href="#">इंस्टाग्राम</a>
        <a href="#">यूट्यूब</a>
      </div>
    </header>
  );
};

export default Header;