import React, { useEffect, useState } from "react";
import "./OfficersPage.css";
import { db } from "../../src/firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const OfficersPage = () => {
  const [officers, setOfficers] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    // 🔹 Real-time listener sorted by index
    const q = query(collection(db, "officers"), orderBy("index", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOfficers(data);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Auto-scroll carousel for mobile view
  useEffect(() => {
    if (window.innerWidth > 768 || officers.length <= 1) return;
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % officers.length);
    }, 3000); // auto slide every 3 seconds
    return () => clearInterval(interval);
  }, [officers]);

  return (
    <div className="officers-page-unique">
      <header className="officers-header-unique">
        <h1 className="officers-main-title-unique">
          ग्रामपंचायत कार्यकारणी मंडळ
        </h1>
      </header>

      <main className="officers-content-unique">
        {/* 🟢 Desktop Grid */}
        <div className="officers-cards-grid-unique">
          {officers.length > 0 ? (
            officers.map((officer) => (
              <div key={officer.id} className="officer-card-unique">
                <div className="officer-card-bg-unique">
                  <img
                    src={officer.photo || "https://via.placeholder.com/150"}
                    alt={officer.name}
                    className="officer-bg-img-unique"
                  />
                </div>
                <div className="officer-card-footer-unique">
                  <h3 className="officer-name-unique">{officer.name}</h3>
                  <p>{officer.post}</p>
                </div>
              </div>
            ))
          ) : (
            <p>अधिकारी लोड होत आहेत...</p>
          )}
        </div>

        {/* 🟢 Mobile Carousel */}
        <div className="officers-carousel-unique">
          {officers.length > 0 ? (
            <div
              className="carousel-track-unique"
              style={{
                transform: `translateX(-${scrollIndex * 100}%)`,
              }}
            >
              {officers.map((officer) => (
                <div key={officer.id} className="carousel-card-unique">
                  <div className="officer-card-bg-unique">
                    <img
                      src={officer.photo || "https://via.placeholder.com/150"}
                      alt={officer.name}
                      className="officer-bg-img-unique"
                    />
                  </div>
                  <div className="officer-card-footer-unique">
                    <h3 className="officer-name-unique">{officer.name}</h3>
                    <p>{officer.post}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>अधिकारी लोड होत आहेत...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default OfficersPage;
