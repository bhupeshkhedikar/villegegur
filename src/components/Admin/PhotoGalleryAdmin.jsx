import React, { useState, useEffect } from "react";
import "./PhotoGalleryAdmin.css";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const PhotoGalleryAdmin = () => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [captions, setCaptions] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);

  // Fetch existing images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setImages(data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };
    fetchImages();
  }, []);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const initialCaptions = {};
    selectedFiles.forEach((file, index) => (initialCaptions[index] = ""));
    setCaptions(initialCaptions);
  };

  const handleUpload = async () => {
    if (!files.length) return alert("कृपया फोटो निवडा!");
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const caption = captions[i]?.trim() || "गॅलरी फोटो";
      const storageRef = ref(storage, `gallery/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: Math.round(progress),
          }));
        },
        (error) => {
          console.error(error);
          alert("❌ अपलोड अयशस्वी झाले");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "gallery"), {
            url: downloadURL,
            caption,
            createdAt: serverTimestamp(),
          });
          setFiles([]);
          setCaptions({});
          setUploadProgress({});
          window.location.reload();
        }
      );
    }

    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("हा फोटो हटवायचा आहे का?")) return;
    try {
      await deleteDoc(doc(db, "gallery", id));
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
      alert("❌ हटवण्यात अडचण आली");
    }
  };

  return (
    <section className="gallery-admin-section">
      <h2 className="admin-title">गॅलरी व्यवस्थापन</h2>

      {/* Upload Form */}
      <div className="gallery-upload-card">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
        />

        {files.length > 0 && (
          <div
            className={`preview-grid ${files.length < 3 ? "center-preview" : ""}`}
          >
            {files.map((file, index) => (
              <div key={index} className="preview-item">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="preview-image"
                />
                <input
                  type="text"
                  placeholder="शीर्षक लिहा"
                  value={captions[index]}
                  onChange={(e) =>
                    setCaptions({ ...captions, [index]: e.target.value })
                  }
                />
                {uploadProgress[file.name] && (
                  <p className="progress-text">
                    अपलोड होत आहे: {uploadProgress[file.name]}%
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <button onClick={handleUpload} disabled={uploading || !files.length}>
          {uploading ? "अपलोड होत आहे..." : "📤 फोटो अपलोड करा"}
        </button>
      </div>

      {/* Uploaded Images */}
      <div
        className={`gallery-grid ${images.length < 3 ? "center-preview" : ""}`}
      >
        {images.map((img) => (
          <div key={img.id} className="gallery-card">
            <img src={img.url} alt={img.caption} className="gallery-photo" />
            <p>{img.caption || "गॅलरी फोटो"}</p>
            <div className="card-buttons">
              <button className="delete-btn" onClick={() => handleDelete(img.id)}>
                🗑️ हटवा
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGalleryAdmin;
