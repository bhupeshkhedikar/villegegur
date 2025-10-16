import React from 'react';
import './Footerr.css';

const Footerr = () => {
  return (
    <footer className="wp-footer">
      {/* Contact Section */}
      <div className="wp-footer-contact-section">
        <div className="wp-footer-contact-info">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h3>📍</h3>
            <h3>ग्रामपंचायत पत्ता</h3>
          </div>

          <p>ग्रामपंचायत गुरढा</p>
          <p>पंचायत समिती जिल्हा परिषद भंडारा</p>
        </div>
        <div className="wp-footer-phone-section">
          <h3>📞</h3>
          <p>सोमवार से शुक्रवार</p>
          <p>988139596</p>
        </div>
        <div className="wp-footer-timing-section">
          <h3>⏰</h3>
          <p>कार्यालय वेळ</p>
          <p>सोमवार-शुक्रवार (10:00 AM - 5:00 PM)</p>
          <p>शनिवार आणि रविवार सुट्टी</p>
        </div>
      </div>

      {/* Blue Section */}
      <div className="wp-footer-blue-section">
        <div className="wp-footer-blue-column wp-prastavna">
          <h4>प्रस्तावना</h4>
          <p>ग्रामपंचायत गुरढा पंचायत समिती  </p>
          <p>जिल्हा परिषद भंडारा भागातील</p>
          <p> एक ग्रामीण स्थानिक संस्था आहे.</p>
        </div>
        <div className="wp-footer-blue-column wp-naye-samiti">
          <h4>नवीन समिती</h4>
          <p>तंटामुक्त समिती गुरढा</p>
          <p>ग्राम कृषि विकास समिति गुरढा</p>
        </div>
        <div className="wp-footer-blue-column wp-samiti">
          <h4>समिती</h4>
         <p>तंटामुक्त समिती गुरढा</p>
          <p>ग्राम कृषि विकास समिति गुरढा</p>
        </div>
        <div className="wp-footer-blue-column wp-quick-links">
          <h4>त्वरित लिंक्स</h4>
          <ul>
            <li>मुख्यपृष्ठ</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="wp-footer-copyright">
        <p>Copyright ©2025. All Rights Reserved SevenHorses Digital Solutions</p>
      </div>
    </footer>
  );
};

export default Footerr;
