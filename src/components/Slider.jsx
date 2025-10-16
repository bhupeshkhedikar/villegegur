import React, { useState, useEffect } from "react";
import "./Slider.css";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 Fetch slides in realtime from Firestore
  useEffect(() => {
    const q = query(collection(db, "slides"), orderBy("index", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const slideData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSlides(slideData);
    });

    return () => unsubscribe();
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    if (!slides.length) return; // prevent interval if no slides
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, slides]);

if (!slides.length) {
  return (
    <div className="slider-loader-container">
      <div className="colorful-loader">
        <img
          src="https://i.ibb.co/XfCgGV3T/Whats-App-Image-2025-10-06-at-17-32-42-aa380099-removebg-preview.png" // 👈 replace this with your logo path or image URL
          alt="Loading..."
          className="loader-logo"
        />
      </div>
      <p className="loading-text"> लोड होत आहे...</p>
    </div>
  );
}



  return (
    <div className="slider-container">
      <div
        className="slide"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      >
        <div className="slide-text">
          <h2 className="slide-title">{slides[currentIndex].title}</h2>
          <p className="slide-subtitle">{slides[currentIndex].subtitle}</p>
        </div>

        {/* Left Arrow */}
        <div className="arrow left-arrow" onClick={goToPrevious}>
          ❮
        </div>

        {/* Right Arrow */}
        <div className="arrow right-arrow" onClick={goToNext}>
          ❯
        </div>
      </div>
    </div>
  );
};

export default Slider;
