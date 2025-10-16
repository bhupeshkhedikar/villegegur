import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../components/Admin/Committee.css";

const CommitteeTable = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const ref = collection(db, "committeeMembers");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc) => doc.data());
      setMembers(data.sort((a, b) => a.serial - b.serial));
    };
    fetchMembers();
  }, []);

  return (
    <section className="committee-section">
      <h2 className="committee-title">ग्रामपंचायत गुरढा समिती सदस्य</h2>
      <div className="table-container">
        <table className="committee-table">
          <thead>
            <tr>
              <th>अ.क्र.</th>
              <th>नाव</th>
              <th>प्रतिनिधित्व</th>
              <th>पद</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i}>
                <td>{m.serial}</td>
                <td>{m.name}</td>
                <td>{m.representation || "—"}</td>
                <td>{m.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommitteeTable;
