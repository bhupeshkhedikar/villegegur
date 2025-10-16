import React from 'react';

const Initiatives = () => {
  const initiatives = [
    { title: 'सरपंच लाडली बेटी योजना', desc: 'मुलींच्या जन्मानंतर आणि शिक्षणासाठी आर्थिक सहाय्य, बालविवाह रोखण्यासाठी.', link: 'https://gpgosebujruk.in/service/view/1' },
    { title: 'सरपंच शैक्षणिक सहयता', desc: 'शैक्षणिक साहित्य, शाळेतील सुविधा.', link: 'https://gpgosebujruk.in/service/view/2' },
    { title: 'सरपंचा वैद्यकीय सहयता', desc: 'आरोग्य सेवेतील योजना आणि उपक्रम.', link: 'https://gpgosebujruk.in/service/view/3' },
    { title: 'प्रतेक घरात शौचालय', desc: 'स्वच्छ भारत अभियान, शौचालयाचे महत्व.', link: 'https://gpgosebujruk.in/service/view/4' },
    { title: 'गोबर गॅस', desc: 'बायोगॅस, शेण आणि सेंद्रिय कचऱ्याच्या विघटनातून तयार होणारा वायू.', link: 'https://gpgosebujruk.in/service/view/7' }
  ];

  return (
    <section id="initiatives" className="section container">
      <h2>ग्रामपंचायत गुरढा - अभिनव उपक्रम</h2>
      <p>ग्रामविकासाला गती देणारे नवनवीन प्रकल्प आणि उपक्रम.</p>
      <div className="initiatives-grid">
        {initiatives.map((init, index) => (
          <div key={index} className="card">
            <h3>{init.title}</h3>
            <p>{init.desc}</p>
            <a href={init.link} target="_blank" rel="noopener noreferrer">वाचा अधिक</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Initiatives;