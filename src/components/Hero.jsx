import React from 'react';

const Hero = () => {
  return (
    <section className="hero container">
      <h2>ग्रामपंचायत गोसे बूज आपले सहर्ष स्वागत करीत आहे.</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>एकूण लोकसंख्या</h3>
          <p>११५६ (विविध वयोगट, लिंग आणि समुदायांमध्ये विभागलेली)</p>
        </div>
        <div className="stat-card">
          <h3>प्रति व्यक्ती पाणी पुरवठा</h3>
          <p>५५ लिटर/दिवस (शुद्ध आणि सुरक्षित)</p>
        </div>
        <div className="stat-card">
          <h3>पुरुष/महिला</h3>
          <p>५७१ पुरुष, ५८५ महिला (एकूण ११५६)</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;