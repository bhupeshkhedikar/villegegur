import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import "./Committee.css";

const CommitteeAdmin = () => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    serial: "",
    name: "",
    representation: "",
    position: "",
  });

  const committeeRef = collection(db, "committeeMembers");

  // Fetch Members
  const fetchMembers = async () => {
    const snapshot = await getDocs(committeeRef);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMembers(list.sort((a, b) => a.serial - b.serial));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Add Member
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert("कृपया सर्व फील्ड भरा!");

    await addDoc(committeeRef, {
      ...formData,
      serial: Number(formData.serial),
      timestamp: serverTimestamp(),
    });

    setFormData({ serial: "", name: "", representation: "", position: "" });
    fetchMembers();
  };

  // Delete
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "committeeMembers", id));
    fetchMembers();
  };

  return (
    <div className="committee-admin">
      <h2>🏛️ समिती सदस्य व्यवस्थापन पॅनेल</h2>

      <form onSubmit={handleSubmit} className="committee-form">
        <input
          type="number"
          placeholder="अ.क्र."
          value={formData.serial}
          onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="नाव"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="प्रतिनिधित्व"
          value={formData.representation}
          onChange={(e) =>
            setFormData({ ...formData, representation: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="पद"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
          required
        />
        <button type="submit">जतन करा</button>
      </form>

      <table className="committee-table admin-view">
        <thead>
          <tr>
            <th>अ.क्र.</th>
            <th>नाव</th>
            <th>प्रतिनिधित्व</th>
            <th>पद</th>
            <th>कृती</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.serial}</td>
              <td>{m.name}</td>
              <td>{m.representation || "—"}</td>
              <td>{m.position}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(m.id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitteeAdmin;
