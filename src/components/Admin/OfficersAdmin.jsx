import React, { useState, useEffect } from "react";
import "./OfficersAdmin.css";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
  query,
  limit
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const OfficersAdmin = () => {
  const [officers, setOfficers] = useState([]);
  const [name, setName] = useState("");
  const [post, setPost] = useState(""); // ✅ new field for post name
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingId, setEditingId] = useState(null);

  // Fetch officers
  useEffect(() => {
    const fetchOfficers = async () => {
      const q = query(collection(db, "officers"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOfficers(data);
    };
    fetchOfficers();
  }, []);

  // Add or Update officer
  const handleSaveOfficer = async () => {
    if (!name) return alert("कृपया नाव भरा!");
    if (!post) return alert("कृपया पदाचे नाव भरा!");
    setUploading(true);

    const saveOfficer = async (photoURL = null) => {
      try {
        if (editingId) {
          // Update existing officer
          const officerRef = doc(db, "officers", editingId);
          await updateDoc(officerRef, {
            name,
            post, // ✅ add post name
            ...(photoURL && { photo: photoURL }),
            createdAt: serverTimestamp(),
          });
          alert("✅ अधिकारी अपडेट झाला!");
        } else {
          // Get max index for ordering
          const q = query(collection(db, "officers"), orderBy("index", "desc"), limit(1));
          const snapshot = await getDocs(q);
          let maxIndex = 0;
          if (!snapshot.empty) {
            maxIndex = snapshot.docs[0].data().index || 0;
          }

          // Add new officer
          await addDoc(collection(db, "officers"), {
            name,
            post, // ✅ save post name
            photo: photoURL,
            createdAt: serverTimestamp(),
            index: maxIndex + 1,
          });
          alert("✅ अधिकारी यशस्वीरित्या जोडला गेला!");
        }

        // Reset form
        setName("");
        setPost("");
        setPhoto(null);
        setUploadProgress(0);
        setEditingId(null);
        setUploading(false);
        window.location.reload();
      } catch (err) {
        console.error(err);
        alert("❌ काहीतरी अडचण आली");
        setUploading(false);
      }
    };

    if (photo) {
      const storageRef = ref(storage, `officers/${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error(error);
          alert("❌ अपलोड अयशस्वी झाले");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          saveOfficer(downloadURL);
        }
      );
    } else {
      saveOfficer();
    }
  };

  // Delete officer
  const handleDelete = async (id) => {
    if (!window.confirm("हा अधिकारी हटवायचा आहे का?")) return;
    try {
      await deleteDoc(doc(db, "officers", id));
      setOfficers((prev) => prev.filter((o) => o.id !== id));
      alert("✅ अधिकारी हटवला गेला!");
    } catch (err) {
      console.error(err);
      alert("❌ हटवण्यात अडचण आली");
    }
  };

  // Edit officer
  const handleEdit = (officer) => {
    setName(officer.name);
    setPost(officer.post || ""); // ✅ load post name for editing
    setPhoto(null);
    setEditingId(officer.id);
  };

  return (
    <div className="employee-admin-container">
      <h2 className="admin-title">ग्रामपंचायत अधिकारी व्यवस्थापन</h2>

      {/* Add/Edit Form */}
      <div className="employee-form">
        <input
          type="text"
          placeholder="अधिकाऱ्याचे नाव"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="पदाचे नाव"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        {photo && (
          <img
            src={URL.createObjectURL(photo)}
            alt="preview"
            className="employee-photo"
          />
        )}

        {uploading && (
          <p className="progress-text">अपलोड होत आहे... {uploadProgress}%</p>
        )}

        <button onClick={handleSaveOfficer} disabled={uploading}>
          {uploading
            ? "अपलोड होत आहे..."
            : editingId
            ? "🔄 अपडेट करा"
            : "➕ अधिकारी जोडा"}
        </button>

        {editingId && (
          <button
            style={{ background: "#f57c00", marginLeft: "10px" }}
            onClick={() => {
              setEditingId(null);
              setName("");
              setPost("");
              setPhoto(null);
            }}
          >
            ❌ रद्द करा
          </button>
        )}
      </div>

      {/* Officers Grid */}
      <div className="employee-list">
        {officers.length > 0 ? (
          officers.map((officer) => (
            <div key={officer.id} className="employee-card">
              <img
                src={officer.photo}
                alt={officer.name}
                className="employee-photo"
              />
              <h4>{officer.name}</h4>
              <p className="employee-post">{officer.post || "—"}</p>
              <div className="card-buttons">
                <button onClick={() => handleEdit(officer)}>✏️ संपादन</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(officer.id)}
                >
                  🗑️ हटवा
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>कोणतेही अधिकारी नाहीत.</p>
        )}
      </div>
    </div>
  );
};

export default OfficersAdmin;
