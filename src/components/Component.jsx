import React from 'react';
import './Component.css';

// JSON data
const schemesData = {
  page: {
    title: "ग्रामपंचायत गुरढा- अभिनव उपक्रम",
    subtitle: "ग्रामविकासाला गती देणारे नवनवीन प्रकल्प आणि उपक्रम",

    "schemes": [
      {
        "title": "सरपंच लाडली बेटी योजना",
        "subtitle": "सरपंच लाडली बेटी योजना ही एक शासकीय योजना आहे जी मुलींच्या जन्मानंतर आणि शिक्षणासाठी आर्थिक सहाय्य प्रदान करते. ही योजना मुलींच्या शिक्षणाला प्रोत्साहन देण्यासाठी आणि बालविवाह रोखण्यासाठी आहे.",
        "image": "https://gpgosebujruk.in/public/uploads/service-1.png",
        "buttonText": "Read More",
        "buttonLink": "/schemes"
      },
      {
        "title": "सरपंच शैक्षणिक सहयता",
        "subtitle": "सरपंच, शिक्षण आणि मदत याबद्दल माहितीसाठी, ग्रामपंचायत स्तरावर शिक्षणविषयक योजना आणि सुविधांसाठी सरपंच मदत करू शकतात. यामध्ये शाळेत जाणाऱ्या मुला-मुलींसाठी शैक्षणिक साहित्य पुरवणे, शाळेत सुविधा उपलब्ध करणे,",
        "image": "https://gpgosebujruk.in/public/uploads/service-2.jpg",
        "buttonText": "Read More",
        "buttonLink": "/schemes"
      },
      {
        "title": "सरपंचा वैद्यकीय सहयता",
        "subtitle": "सरपंच, आरोग्य सेवा आणि मदतीच्या संदर्भात, ग्रामपंचायत (Gram Panchayat) आणि आरोग्य विभाग (Health Department) यांच्या माध्यमातून अनेक योजना आणि उपक्रम राबवले जातात. सरपंच, गावचा आरोग्य सेवक म्हणून,",
        "image": "https://gpgosebujruk.in/public/uploads/service-3.png",
        "buttonText": "Read More",
        "buttonLink": "/schemes"
      },
      {
        "title": "प्रतेक घरात शौचालय",
        "subtitle": "प्रत्येक घरात शौचालय असावे, यासाठी केंद्र सरकारने 'स्वच्छ भारत अभियान' (Swachh Bharat Abhiyan) सुरू केले आहे. या अभियानांतर्गत, सरकारने लोकांना शौचालयाचे महत्व समजावून सांगून प्रत्येक घरात शौचालय असणे आवश्यक आहे,",
        "image": "https://gpgosebujruk.in/public/uploads/service-4.jpg",
        "buttonText": "Read More",
        "buttonLink": "/schemes"
      },
      {
        "title": "गोबर गॅस",
        "subtitle": "गोबर गॅस, ज्याला बायोगॅस म्हणूनही ओळखले जाते, हा एक प्रकारचा वायू आहे जो शेण आणि इतर सेंद्रिय कचऱ्याच्या विघटनातून तयार होतो. ही प्रक्रिया ॲनारोबिक (ऑक्सिजनच्या अनुपस्थितीत) वातावरणात होते.",
        "image": "https://gpgosebujruk.in/public/uploads/service-7.jpg",
        "buttonText": "Read More",
        "buttonLink": "/schemes"
      }
    ]
  }


};

const Component = () => {
  return (
    <div className="schemes-page">
      <main className="main-content">
        <div className="content-wrapper">
          <h2 className="main-title">{schemesData.page.title}</h2>
          <p className="subtitle">{schemesData.page.subtitle}</p>

          <div className="schemes-cards-container">
            {schemesData.page.schemes.map((scheme, index) => (
              <div className="scheme-card" key={index}>
                <div className="scheme-card-image">
                  <img src={scheme.image} alt={scheme.title} />
                </div>
                <div className="scheme-card-content">
                  <h3 className="scheme-card-title">{scheme.title}</h3>
                  <p className="scheme-card-description">{scheme.subtitle}</p>
                  <a
                    href={scheme.buttonLink}
                    className="scheme-read-more-btn"
                  >
                    {scheme.buttonText}
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Component;
