import React, { useState } from 'react';
import './GovernmentSchemesPage.css';

const schemesData = [
  {
    id: 1,
    type: 'Gram Panchayat',
    title: 'वैयत्तिक सौरऊर्जा प्रकल्प',
    description:
      'वैयक्तिक सौर ऊर्जा प्रकल्प म्हणजे तुमच्या घरात किंवा परिसरात वापरण्यासाठी सौर ऊर्जेचा वापर करणे. यात तुमच्या घराच्या छतावर किंवा इतर उपलब्ध जागेवर सौर पॅनेल (solar panels) बसवून सूर्यप्रकाशाचे रूपांतर वीजमध्ये केले जाते. यामुळे तुम्ही तुमच्या घरासाठी वीज निर्माण करू शकता आणि विजेचे बिल कमी करू शकता',
    image: 'https://gpgosebujruk.in/public/uploads/portfolio-1.jpg',
  },
  // {
  //   id: 2,
  //   type: 'Gram Panchayat',
  //   title: 'ग्रामीण मल आवास केंद्र',
  //   description: 'ग्रामीण मल आवास केंद्र योजना का विवरण।',
  //   image: 'https://via.placeholder.com/400x300?text=ग्रामीण+मल+आवास+केंद्र+Image',
  // },
];

const filterTabs = ['All', 'ग्रामपंचायत मार्फत आपले सेवाकेंद्र', 'घरकुल योजना', 'वैयत्तिक सौरऊर्जा प्रकल्प'];

const GovernmentSchemesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredSchemes = schemesData.filter(
    (scheme) => activeFilter === 'All' || scheme.type === activeFilter
  );

  return (
    <div className="government-schemes-page">
      <main className="main-content">
        <div className="content-wrapper">
          <h2 className="main-title">शासकीय योजना</h2>
          <p className="subtitle">
            केंद्र आणि राज्य सरकार विविध लोकांसाठी अनेक शासकीय योजना राबवतात. या योजनांचा उद्देश शिक्षण, आरोग्य, कृषी, सामाजिक सुरक्षा, आणि इतर क्षेत्रांमध्ये विकास करणे आहे.
          </p>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="cards-grid">
            {filteredSchemes.map((scheme) => (
              <div className="scheme-card" key={scheme.id}>
                <div className="scheme-card-image">
                  <img src={scheme.image} alt={scheme.title} />
                </div>
                <div className="scheme-card-content">
                  <h3 className="scheme-card-title">{scheme.title}</h3>
                  <p className="scheme-card-description">{scheme.description}</p>
                 <a style={{textDecoration:'none',color:'white'}} href='/schemes'> <button className="scheme-read-more-btn">Read more</button></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovernmentSchemesPage;
