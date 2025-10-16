import React from "react";
import "./AboutUs.css";

const objectivesISO = [
  "स्वच्छ भारत अभियान अंतर्गत 100% गांव हागणदारीमुक्त करणे",
  "कर वसुली 100% पूर्ण करणे",
  "शुद्ध पाणी पुरवठा करणे",
  "दलीत वस्ती आराखड्याप्रमाणे सोयी सुविधा पुरविणे",
  "व्यसनमुक्त गांव करणे",
  "वृक्ष लागवड करणे",
  "निरनिराळ्या योजनेत सहभागी होणे",
  "तंटामुक्त गांव ठेवणे",
  "नागरीकांना संगणकीकृत ऑनलाईन सेवा उपलब्ध करणे",
  "स्वच्छ आणि सुंदर गाव तयार करणे",
];

const objectivesExtra = [
  "स्मार्ट ग्राम करणे",
  "बँकींग सेवा उपलब्ध करणे",
  "100% कर वसुली करणे",
  "घनकचरा व सांडपाणी व्यवस्थापन",
  "डिजीटल शाळा व अंगणवाडी",
  "सौर उर्जा निर्मिती",
  "शासनाच्या योजनांची माहिती पोहचविणे",
  "गावात एक घर, एक झाड लावणे",
  "महिला सशक्तीकरणासाठी मार्गदर्शन उपलब्ध करणे",
];

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        {/* Header */}
        <div className="header-section">
          <h1>ग्रामपंचायत गुरढा</h1>
          <p>
            आमचे उद्दीष्टे गावाच्या सर्व विकासासाठी, स्वच्छता, शुद्ध पाणी, महिला सशक्तीकरण आणि डिजिटल सुविधा उपलब्ध करणे.
          </p>
        </div>

        {/* Main Content */}
        <div className="content-section">
          <div className="image-container">
            <img src='https://gpgosebujruk.in/public/uploads/about_photo.jpg' alt="गावाचे दृश्य" />
          </div>

          <div className="objectives-container">
            <h2> ग्रामपंचायतचे उद्दीष्टे</h2>
            <div className="cards-container">
              {objectivesISO.map((item, index) => (
                <div className="card" key={index}>
                  <span className="bullet">✔</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <h2>ग्रामीण विकासासाठी इतर उद्दीष्टे</h2>
            <div className="cards-container">
              {objectivesExtra.map((item, index) => (
                <div className="card" key={index}>
                  <span className="bullet">✔</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
