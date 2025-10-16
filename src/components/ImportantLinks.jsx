import React, { useState, useEffect, useRef } from 'react';
import './ImportantLinks.css';

const ImportantLinks = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const logosRowRef = useRef(null);

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

  const openModal = (logo) => setSelectedImage(logo);
  const closeModal = () => setSelectedImage(null);

  // 🔄 Auto-scroll carousel for mobile view
  useEffect(() => {
    const container = logosRowRef.current;
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    let scrollStep = 1;
    const scrollInterval = setInterval(() => {
      if (!container) return;
      container.scrollLeft += scrollStep;

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      }
    }, 25);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="important-links">
      {/* Section Title */}
      <div className="section-title">महत्वाचे शासकीय दुवे</div>

      {/* Logos Row - Auto Carousel in Mobile */}
      <div className="logos-row" ref={logosRowRef}>
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

      {/* Scrolling Important Links Section */}
      <div className="important-links-container">
        <div className="important-links-heading">महत्वाच्या वेबसाइट लिंक</div>
        <div className="marquee-wrapper">
          <div className="marquee-content">
            <a href="https://maharashtra.gov.in/site/1628/RTS-act" target="_blank" rel="noopener noreferrer">महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५</a>
            <a href="https://maharashtra.gov.in/" target="_blank" rel="noopener noreferrer">महाराष्ट्र शासन</a>
            <a href="https://aaplesarkar.maharashtra.gov.in/en/" target="_blank" rel="noopener noreferrer">आपले सरकार</a>
            <a href="https://grievances.maharashtra.gov.in/en" target="_blank" rel="noopener noreferrer">आपले सरकार - तक्रार निवारण प्रणाली</a>
            <a href="https://pgportal.gov.in/" target="_blank" rel="noopener noreferrer">प्रशासनीक सुधार और लोक शिकायत विभाग</a>
            <a href="https://rdd.mahaonline.gov.in/" target="_blank" rel="noopener noreferrer">ग्राम विकास योजना</a>
          </div>
        </div>
      </div>

      {/* Modal for Zoom Image */}
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
