import React, { useState } from 'react';
import './ImportantLinks.css';

const ImportantLinks = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const logos = [
    {
      src: 'https://gpgosebujruk.in/public/uploads/partner-8.jpg',
      alt: 'महाराष्ट्र शासन',
      title: 'महाराष्ट्र शासन',
      href: 'https://maharashtra.gov.in/'
    },
    {
      src: 'https://gpgosebujruk.in/public/uploads/partner-2.png',
      alt: 'डिजिटल इंडिया',
      title: 'डिजिटल इंडिया',
      href: 'https://digitalindia.gov.in/'
    },
    {
      src: 'https://gpgosebujruk.in/public/uploads/partner-3.png',
      alt: 'पंचायतराज',
      title: 'पंचायतराज',
      href: 'https://panchayat.gov.in/'
    },
    {
      src: 'https://gpgosebujruk.in/public/uploads/partner-8.jpg',
      alt: 'आपले सेवा योजना',
      title: 'आपले सेवा योजना',
      href: 'https://aaplesarkar.mahaonline.gov.in/'
    },
    {
      src: 'https://gpgosebujruk.in/public/uploads/partner-4.png',
      alt: 'अटल भूजल योजना',
      title: 'अटल भूजल योजना',
      href: 'https://ataljal.hid.gov.in/'
    }
  ];

  const openModal = (logo) => {
    setSelectedImage(logo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="important-links">
      {/* Section Title */}
      <div style={{margin:'0 auto', textAlign:'center', padding:'1rem 0', fontSize:24, fontWeight:'bold', color:'black'}}>
        <b>महत्वाचे शासकीय दुवे</b>
      </div>

      {/* Logos Row */}
      <div className="logos-row">
        {logos.map((logo, index) => (
          <a
            key={index}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="logo-item"
            title={logo.title}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="logo-img"
              onClick={() => openModal(logo)}
            />
            <p className="logo-title">{logo.title}</p>
          </a>
        ))}
      </div>

      {/* Important Links Scrolling Section */}
      <div className="important-links-container">
        <div className="important-links-heading">
          महत्वाच्या वेबसाइट लिंक
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-content">
            <a href="https://maharashtra.gov.in/site/1628/RTS-act" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 17l5-5-5-5v10z"></path>
              </svg>
              महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५
            </a>
            <a href="https://maharashtra.gov.in/" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 17l5-5-5-5v10z"></path>
              </svg>
              महाराष्ट्र शासन
            </a>
            <a href="https://aaplesarkar.maharashtra.gov.in/en/" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 17l5-5-5-5v10z"></path>
              </svg>
              आपले सरकार
            </a>
            <a href="https://grievances.maharashtra.gov.in/en" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 17l5-5-5-5v10z"></path>
              </svg>
              आपले सरकार - तक्रार निवारण प्रणाली
            </a>
            <a href="https://pgportal.gov.in/" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 17l5-5-5-5v10z"></path>
              </svg>
              प्रशासनीक सुधार और लोक शिकायत विभाग
            </a>
            <a href="https://rdd.mahaonline.gov.in/" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 17l5-5-5-5v10z"></path>
              </svg>
              ग्राम विकास योजना
            </a>
          </div>
        </div>
      </div>

      {/* Modal for Zoom (optional, still works) */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <img src={selectedImage.src} alt={selectedImage.alt} className="modal-image" />
            <p className="modal-title">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantLinks;
