import React from 'react';

const Schemes = () => {
  const schemes = [
    { title: 'All', desc: 'सर्व योजना' },
    { title: 'ग्रामपंचायत मार्फत आपले सेवाकेंद्र', desc: 'ग्रामपंचायत सेवाकेंद्र' },
    { title: 'घरकुल योजना', desc: 'घरकुल योजना विवरण' },
    { title: 'वैयत्तिक सौरऊर्जा प्रकल्प', desc: 'सौरऊर्जा प्रकल्प' }
  ];

  return (
    <section id="schemes" className="section container">
      <h2>शासकीय योजना</h2>
      <p>केंद्र आणि राज्य सरकार विविध लोकांसाठी अनेक शासकीय योजना राबवतात. उद्देश: शिक्षण, आरोग्य, कृषी, सामाजिक सुरक्षा, इतर क्षेत्रांमधील विकास.</p>
      <div className="schemes-grid">
        {schemes.map((scheme, index) => (
          <div key={index} className="card">
            <h3>{scheme.title}</h3>
            <p>{scheme.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Schemes;