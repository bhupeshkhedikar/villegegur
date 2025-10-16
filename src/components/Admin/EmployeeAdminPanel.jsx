import React, { useState, useEffect } from "react";
import "./EmployeeAdminPanel.css";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EmployeeAdminPanel = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editId, setEditId] = useState(null);

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const q = query(collection(db, "employee"), orderBy("index", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Get next index from Firestore
  const getNextIndex = async () => {
    const q = query(collection(db, "employee"), orderBy("index", "desc"), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return (snapshot.docs[0].data().index || 0) + 1;
    }
    return 1;
  };

  // Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !post.trim()) {
      alert("कृपया सर्व माहिती भरा!");
      return;
    }

    setUploading(true);

    try {
      let photoURL = null;

      // Upload photo if selected
      if (photo) {
        const storageRef = ref(
          storage,
          `employee_photos/${Date.now()}_${photo.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, photo);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (err) => reject(err),
            async () => {
              photoURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      if (editId) {
        // Update existing employee
        const employeeRef = doc(db, "employee", editId);
        await updateDoc(employeeRef, {
          name,
          post,
          ...(photoURL && { photo: photoURL }),
        });
        alert("कर्मचारी माहिती अद्ययावत केली गेली!");
      } else {
        // Add new employee with Firestore-based index
        const nextIndex = await getNextIndex();
        await addDoc(collection(db, "employee"), {
          name,
          post,
          index: nextIndex,
          photo: photoURL || "",
          createdAt: serverTimestamp(),
        });
        alert("नवीन कर्मचारी जोडला गेला!");
      }

      // Reset form
      setName("");
      setPost("");
      setPhoto(null);
      setEditId(null);
      setUploadProgress(0);

      // Refresh employees list
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setUploading(false);
    }
  };

  // Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm("आपण हा कर्मचारी हटवू इच्छिता का?")) {
      try {
        await deleteDoc(doc(db, "employee", id));
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        alert("कर्मचारी हटवला गेला!");
      } catch (err) {
        console.error(err);
        alert("हटवण्यात अडचण आली.");
      }
    }
  };

  // Edit Employee
  const handleEdit = (emp) => {
    setName(emp.name);
    setPost(emp.post || "");
    setEditId(emp.id);
  };

  return (
    <div className="employee-admin-container">
      <h2 className="admin-title">👨‍💼 कर्मचारी व्यवस्थापन पॅनेल</h2>

      {/* Add/Edit Form */}
      <form className="employee-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="कर्मचारी नाव"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="पद"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        {/* Photo Preview */}
        {photo && (
          <div className="photo-preview">
            <img src={URL.createObjectURL(photo)} alt="Preview" />
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="upload-progress">
            <div style={{ width: `${uploadProgress}%` }}></div>
            {uploadProgress}%
          </div>
        )}

        <button type="submit" disabled={uploading}>
          {uploading
            ? "अपलोड होत आहे..."
            : editId
            ? "अद्ययावत करा"
            : "कर्मचारी जोडा"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setName("");
              setPost("");
              setPhoto(null);
              setEditId(null);
            }}
          >
            रद्द करा
          </button>
        )}
      </form>

      {/* Employees List */}
      <div className="employee-list">
        {employees.length > 0 ? (
          employees.map((emp) => (
            <div key={emp.id} className="employee-card">
              <img
                src={emp.photo || "https://via.placeholder.com/100"}
                alt={emp.name}
                className="employee-photo"
              />
              <h4 style={{color:'black'}}>{emp.name}</h4>
              <p style={{color:'black'}}>{emp.post}</p>
              {/* <p>क्रमांक: {emp.index}</p> */}
              <div className="card-buttons">
                <button onClick={() => handleEdit(emp)}>✏️ संपादन</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(emp.id)}
                >
                  🗑️ हटवा
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>कोणतेही कर्मचारी नाहीत.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeAdminPanel;
