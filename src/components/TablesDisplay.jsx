import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./TablesDisplay.css";

const TablesDisplay = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      const querySnapshot = await getDocs(collection(db, "tables"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTables(data);
    };
    fetchTables();
  }, []);

  return (
    <div className="tables-display">
      {tables.map((table) => (
        <div key={table.id} className="table-wrapper">
          <h2 className="table-title">{table.title}</h2>
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
                    {row.map((cell, cIndex) => (
                      <td key={cIndex}>{cell}</td>
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

export default TablesDisplay;
