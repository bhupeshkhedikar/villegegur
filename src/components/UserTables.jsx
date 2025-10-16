import React, { useEffect, useState } from "react";
import { db } from ".././firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./UserTables.css";

const UserTables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      const snapshot = await getDocs(collection(db, "tables"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTables(data);
    };
    fetchTables();
  }, []);

  if (tables.length === 0) {
    return <p>सध्या कोणतेही टेबल उपलब्ध नाहीत.</p>;
  }

  return (
    <div className="user-tables-container">
      {tables.map((table) => (
        <div key={table.id} className="user-table-card">
          <h3 style={{textAlign:'center'}}>{table.title}</h3>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  {table.columns.map((col, i) => (
                    <th key={i}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIndex) => (
                  <tr key={rIndex}>
                    {table.columns.map((col, cIndex) => (
                      <td key={cIndex}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTables;
