import React, { useState, useEffect } from "react";
import "./PhotoGallery.css";
import { db } from "../../src/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  // Fetch images from Firestore
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setImages(data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };

    fetchImages();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="photo-gallery">
      {/* Header */}
      <header className="gallery-header">
        <h2 className="gallery-title">PHOTO GALLERY</h2>
        <p className="gallery-subtitle">ग्रामपंचायत गुरढा</p>
      </header>

      {/* Image Grid */}
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              className="image-container"
              onClick={() => openModal(image)}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="gallery-image"
              />
              <div className="zoom-overlay">
                <span className="zoom-icon">🔍</span>
              </div>
              <div className="image-caption">
                <p>{image.caption || "गॅलरी फोटो"}</p>
              </div>
            </div>
          ))
        ) : (
          <p>फोटो लोड होत आहेत...</p>
        )}
      </div>

      {/* Modal for Zoom */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedImage.url}
              alt={selectedImage.caption || "गॅलरी फोटो"}
              className="modal-image"
            />
            <p className="modal-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
