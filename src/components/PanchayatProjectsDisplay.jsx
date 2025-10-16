import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "./Admin/PanchayatProjects.css";

const PanchayatProjectsDisplay = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState({ open: false, url: null });

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProjects(data);
    });
    return () => unsub();
  }, []);

  const filtered = projects.filter((p) => filter === "all" ? true : p.status === filter);

  return (
    <div className="panchayat-public">
      <h2>गावाचे पूर्ण व आगामी काम</h2>

      <div className="filter-row">
        <button className={filter==="all"?"active":""} onClick={()=>setFilter("all")}>All</button>
        <button className={filter==="completed"?"active":""} onClick={()=>setFilter("completed")}>Completed</button>
        <button className={filter==="upcoming"?"active":""} onClick={()=>setFilter("upcoming")}>Upcoming</button>
      </div>

      <div className="public-grid">
        {filtered.length === 0 && <p>No projects found.</p>}

        {filtered.map((p) => (
          <div key={p.id} className="public-card">
            <div className="public-header">
              <h3>{p.title}</h3>
              <span className={`tag ${p.status}`}>{p.status}</span>
            </div>
            <p className="desc">{p.description}</p>
            <p className="cost"><strong>खर्च:</strong> ₹ {p.cost || "—"}</p>

            <div className="photo-row">
              {p.photos?.length ? p.photos.map((ph, idx) => (
                <img
                  key={idx}
                  src={ph.url}
                  alt={`${p.title}-${idx}`}
                  onClick={() => setLightbox({ open: true, url: ph.url })}
                />
              )) : <div className="noimg">No images</div>}
            </div>
          </div>
        ))}
      </div>

      {lightbox.open && (
        <div className="lightbox" onClick={() => setLightbox({ open: false, url: null })}>
          <img src={lightbox.url} alt="lightbox" />
        </div>
      )}
    </div>
  );
};

export default PanchayatProjectsDisplay;
