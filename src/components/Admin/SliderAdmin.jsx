import React, { useState, useEffect } from "react";
import "./SliderAdmin.css";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  limit,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SliderAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [titles, setTitles] = useState({});
  const [subtitles, setSubtitles] = useState({});
  const [toast, setToast] = useState(null);
  const [editingSlide, setEditingSlide] = useState(null);
  const [editFile, setEditFile] = useState(null);

  // Toast
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      const q = query(collection(db, "slides"), orderBy("index", "desc"));
      const snapshot = await getDocs(q);
      setSlides(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchSlides();
  }, []);

  // Add new slides
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const initialTitles = {};
    const initialSubtitles = {};
    selectedFiles.forEach((_, index) => {
      initialTitles[index] = "";
      initialSubtitles[index] = "";
    });
    setTitles(initialTitles);
    setSubtitles(initialSubtitles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return showToast("कृपया फोटो निवडा!", "error");

    const q = query(collection(db, "slides"), orderBy("index", "desc"), limit(1));
    const snapshot = await getDocs(q);
    let maxIndex = 0;
    if (!snapshot.empty) maxIndex = snapshot.docs[0].data().index || 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const title = titles[i] || "";
      const subtitle = subtitles[i] || "";
      const newIndex = maxIndex + 1 + i;

      const storageRef = ref(storage, `slides/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: Math.round(progress),
          }));
        },
        (error) => {
          console.error(error);
          showToast("❌ अपलोड अयशस्वी झाले", "error");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "slides"), {
            image: downloadURL,
            title,
            subtitle,
            index: newIndex,
            uploadedAt: serverTimestamp(),
          });
          showToast(`✅ "${file.name}" अपलोड पूर्ण झाले!`, "success");
          if (i === files.length - 1) setTimeout(() => window.location.reload(), 1500);
        }
      );
    }
  };

  // Delete slide
  const handleDelete = async (id) => {
    if (!window.confirm("हा स्लाइड हटवायचा आहे का?")) return;
    try {
      await deleteDoc(doc(db, "slides", id));
      setSlides((prev) => prev.filter((s) => s.id !== id));
      showToast("🗑️ स्लाइड हटवला गेला!", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ हटवण्यात अडचण आली", "error");
    }
  };

  // Edit mode
  const handleEdit = (slide) => {
    setEditingSlide({ ...slide });
    setEditFile(null);
  };

  const handleEditFileChange = (e) => {
    setEditFile(e.target.files[0]);
  };

  // Save updated slide
  const handleSaveEdit = async () => {
    if (!editingSlide) return;

    const slideRef = doc(db, "slides", editingSlide.id);
    let newImageURL = editingSlide.image;

    try {
      if (editFile) {
        const storageRef = ref(storage, `slides/${Date.now()}_${editFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, editFile);

        uploadTask.on("state_changed", () => {}, console.error, async () => {
          newImageURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(slideRef, {
            image: newImageURL,
            title: editingSlide.title,
            subtitle: editingSlide.subtitle,
          });
          showToast("✅ स्लाइड अपडेट झाला!");
          setEditingSlide(null);
          setTimeout(() => window.location.reload(), 1200);
        });
      } else {
        await updateDoc(slideRef, {
          title: editingSlide.title,
          subtitle: editingSlide.subtitle,
        });
        showToast("✅ स्लाइड अपडेट झाला!");
        setEditingSlide(null);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error(error);
      showToast("❌ अपडेट अयशस्वी झाले", "error");
    }
  };

  return (
    <section className="slider-admin">
      <h2 className="title">📸 स्लायडर व्यवस्थापन</h2>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <p>{toast.message}</p>
        </div>
      )}

      {/* Upload New Slides */}
      <div className="upload-box">
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      </div>

      {files.length > 0 && (
        <div className={`preview-grid ${files.length < 3 ? "center-grid" : ""}`}>
          {files.map((file, index) => (
            <div key={index} className="preview-item">
              <img src={URL.createObjectURL(file)} alt="preview" className="preview-image" />
              <input
                type="text"
                placeholder="शीर्षक लिहा"
                value={titles[index]}
                onChange={(e) => setTitles({ ...titles, [index]: e.target.value })}
              />
              <input
                type="text"
                placeholder="उपशीर्षक लिहा"
                value={subtitles[index]}
                onChange={(e) => setSubtitles({ ...subtitles, [index]: e.target.value })}
              />
              {uploadProgress[file.name] && (
                <p className="progress-text">अपलोड होत आहे: {uploadProgress[file.name]}%</p>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="upload-btn" onClick={handleUpload} disabled={files.length === 0}>
        📤 अपलोड करा
      </button>

      <hr />

      {/* Display Slides */}
      <div className={`uploaded-slides-grid ${slides.length < 3 ? "center-grid" : ""}`}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide-item">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-info">
              <h4>{slide.title}</h4>
              <p>{slide.subtitle}</p>
              {/* <p>Index: {slide.index}</p> */}
            </div>
            <div className="btn-group">
              <button className="save-btn" style={{width:'100%', marginBottom:'10px'}} onClick={() => handleEdit(slide)}>✏️संपादित करा</button>
              <button className="deletee-btn" onClick={() => handleDelete(slide.id)}>🗑️ हटवा</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Popup */}
      {editingSlide && (
        <div className="edit-modal">
          <div className="edit-content">
            <h3>✏️ स्लाइड संपादन</h3>
            <img src={editFile ? URL.createObjectURL(editFile) : editingSlide.image} alt="edit" />
            <input
              type="file"
              accept="image/*"
              onChange={handleEditFileChange}
              style={{ marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="शीर्षक"
              value={editingSlide.title}
              onChange={(e) =>
                setEditingSlide({ ...editingSlide, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="उपशीर्षक"
              value={editingSlide.subtitle}
              onChange={(e) =>
                setEditingSlide({ ...editingSlide, subtitle: e.target.value })
              }
            />
            <div className="edit-actions">
              <button onClick={handleSaveEdit} className="save-btn">💾 जतन करा</button>
              <button onClick={() => setEditingSlide(null)} className="cancel-btn">❌ रद्द</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SliderAdmin;
