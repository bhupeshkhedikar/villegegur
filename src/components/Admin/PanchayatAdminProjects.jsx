import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import "./PanchayatProjects.css";

const initialProject = {
  id: null,
  title: "",
  description: "",
  status: "upcoming",
  cost: "",
  photos: [],
};

const PanchayatAdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(initialProject);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // 🔁 Realtime project list
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setProjects(data);
    });
    return () => unsub();
  }, []);

  const handleFiles = (e) => setFiles(Array.from(e.target.files));

  const uploadFiles = async (fileList, prefix = "projects") => {
    const urls = [];
    for (const file of fileList) {
      const name = `${prefix}/${Date.now()}_${file.name}`;
      const ref = storageRef(storage, name);
      const task = uploadBytesResumable(ref, file);

      await new Promise((resolve, reject) => {
        task.on(
          "state_changed",
          (snap) => {
            const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            setUploadProgress((p) => ({ ...p, [file.name]: pct }));
          },
          reject,
          async () => {
            const url = await getDownloadURL(task.snapshot.ref);
            urls.push({ url, storagePath: name });
            resolve();
          }
        );
      });
    }
    return urls;
  };

  // 💾 Save or Update Project
  const handleSave = async () => {
    if (!project.title.trim()) return alert("कृपया शीर्षक भरा");
    setIsSaving(true);

    try {
      let photoObjs = project.photos || [];
      if (files.length > 0) {
        const uploaded = await uploadFiles(files);
        photoObjs = [...photoObjs, ...uploaded];
      }

      const payload = {
        title: project.title,
        description: project.description,
        status: project.status,
        cost: project.cost,
        photos: photoObjs,
        updatedAt: serverTimestamp(),
      };

      if (project.id) {
        await updateDoc(doc(db, "projects", project.id), payload);
        alert("✅ प्रकल्प अद्यतनित केला");
      } else {
        await addDoc(collection(db, "projects"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        alert("✅ नवीन प्रकल्प तयार केला");
      }

      setProject(initialProject);
      setFiles([]);
      setUploadProgress({});
    } catch (err) {
      console.error(err);
      alert("⚠️ त्रुटी आली");
    } finally {
      setIsSaving(false);
    }
  };

  // ✏️ Edit existing project
  const handleEdit = (p) => {
    setProject({
      id: p.id,
      title: p.title || "",
      description: p.description || "",
      status: p.status || "upcoming",
      cost: p.cost || "",
      photos: p.photos || [],
    });
    setFiles([]);
    setUploadProgress({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ❌ Delete project and its images
  const handleDelete = async (p) => {
    if (!window.confirm("आपण हा प्रकल्प हटवू इच्छिता का?")) return;
    try {
      for (const ph of p.photos || []) {
        if (ph.storagePath) {
          const ref = storageRef(storage, ph.storagePath);
          await deleteObject(ref).catch(() => {});
        }
      }
      await deleteDoc(doc(db, "projects", p.id));
      alert("🗑️ प्रकल्प हटवला");
    } catch (err) {
      console.error(err);
      alert("⚠️ त्रुटी आली");
    }
  };

  const removePhotoFromProject = async (index) => {
    const ph = project.photos[index];
    if (!ph) return;
    if (ph.storagePath && project.id) {
      try {
        const ref = storageRef(storage, ph.storagePath);
        await deleteObject(ref);
      } catch {}
    }
    const newPhotos = project.photos.filter((_, i) => i !== index);
    setProject({ ...project, photos: newPhotos });
  };

  return (
    <div className="panchayat-admin">
      <h2>ग्रामपंचायत प्रकल्प व्यवस्थापन</h2>

      <div className="admin-form">
        <input
          type="text"
          placeholder="प्रकल्पाचे शीर्षक"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
        />
        <textarea
          placeholder="प्रकल्पाचे वर्णन"
          rows={4}
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
        />
        <div className="row">
          <select
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
          >
            <option value="upcoming">आगामी</option>
            <option value="completed">पूर्ण झाले</option>
          </select>
          <input
            type="number"
            placeholder="एकूण खर्च (₹)"
            value={project.cost}
            onChange={(e) => setProject({ ...project, cost: e.target.value })}
          />
        </div>

        <label className="file-label">
          फोटो जोडा (एक किंवा अधिक)
          <input type="file" multiple accept="image/*" onChange={handleFiles} />
        </label>

        {files.length > 0 && (
          <div className="upload-preview">
            {files.map((f) => (
              <div key={f.name} className="upload-item">
                <span>{f.name}</span>
                <span>{uploadProgress[f.name] ? `${uploadProgress[f.name]}%` : ""}</span>
              </div>
            ))}
          </div>
        )}

        {project.photos?.length > 0 && (
          <div className="existing-photos">
            {project.photos.map((ph, idx) => (
              <div key={idx} className="photo-thumb">
                <img src={ph.url} alt={`photo-${idx}`} />
                <button onClick={() => removePhotoFromProject(idx)}>❌</button>
              </div>
            ))}
          </div>
        )}

        <div className="form-actions">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : project.id ? "Update Project" : "Create Project"}
          </button>
          {project.id && (
            <button
              className="cancel-btn"
              onClick={() => setProject(initialProject)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3>सर्व प्रकल्प</h3>
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <div className="thumb">
              {p.photos?.[0]?.url ? (
                <img src={p.photos[0].url} alt={p.title} />
              ) : (
                <div className="noimg">No Image</div>
              )}
            </div>
            <div className="pc">
              <h4>{p.title}</h4>
              <p className={`status ${p.status}`}>{p.status === "completed" ? "पूर्ण" : "आगामी"}</p>
              <p className="cost">₹ {p.cost || "-"}</p>
              <div className="pc-actions">
                <button onClick={() => handleEdit(p)}>✏️ Edit</button>
                <button onClick={() => handleDelete(p)} className="delete-btn">
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanchayatAdminProjects;
