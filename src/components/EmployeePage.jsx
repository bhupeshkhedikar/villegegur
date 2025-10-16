import React, { useEffect, useState } from "react";
import "./EmployeePage.css";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "employee"), orderBy("index", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEmployees(data);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Auto-scroll logic for mobile carousel
  useEffect(() => {
    if (window.innerWidth > 768 || employees.length <= 1) return;
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % employees.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [employees]);

  return (
    <div className="employee-page-unique">
      <header className="employee-header-unique">
        <h1 className="employee-main-title-unique">ग्रामपंचायत कर्मचारी</h1>
      </header>

      <main className="employee-content-unique">
        {/* 🟢 Desktop Grid */}
        <div className="employee-cards-grid-unique">
          {employees.length > 0 ? (
            employees.map((emp) => (
              <div key={emp.id} className="officer-card-unique">
                <div className="officer-card-bg-unique">
                  <img
                    src={emp.photo || "https://via.placeholder.com/150"}
                    alt={emp.name}
                    className="officer-bg-img-unique"
                  />
                </div>
                <div className="officer-card-footer-unique">
                  <h3 className="officer-name-unique">{emp.name}</h3>
                  <p>{emp.post}</p>
                </div>
              </div>
            ))
          ) : (
            <p>कर्मचारी लोड होत आहेत...</p>
          )}
        </div>

        {/* 🟢 Mobile Carousel */}
        <div className="employee-carousel-unique">
          {employees.length > 0 ? (
            <div
              className="carousel-track-unique"
              style={{
                transform: `translateX(-${scrollIndex * 100}%)`,
              }}
            >
              {employees.map((emp) => (
                <div key={emp.id} className="carousel-card-unique">
                  <div className="officer-card-bg-unique">
                    <img
                      src={emp.photo || "https://via.placeholder.com/150"}
                      alt={emp.name}
                      className="officer-bg-img-unique"
                    />
                  </div>
                  <div className="officer-card-footer-unique">
                    <h3 className="officer-name-unique">{emp.name}</h3>
                    <p>{emp.post}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>कर्मचारी लोड होत आहेत...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeePage;
