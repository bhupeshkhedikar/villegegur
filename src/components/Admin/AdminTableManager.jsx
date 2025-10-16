import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./AdminTableManager.css";

const AdminTableManager = () => {
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState({
    id: null,
    title: "",
    columns: ["अ. क्र", "नाव", "प्रतिनिधित्व", "पद"],
    rows: [{ "अ. क्र": "", "नाव": "", "प्रतिनिधित्व": "", "पद": "" }],
  });

  // ✅ Fetch tables from Firestore
  const fetchTables = async () => {
    const snapshot = await getDocs(collection(db, "tables"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTables(data);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // ✅ Add new column
  const addColumn = () => {
    const newCol = `स्तंभ ${currentTable.columns.length + 1}`;
    const updatedColumns = [...currentTable.columns, newCol];
    const updatedRows = currentTable.rows.map((row) => ({ ...row, [newCol]: "" }));
    setCurrentTable({ ...currentTable, columns: updatedColumns, rows: updatedRows });
  };

  // ✅ Edit column name
  const editColumnName = (index, value) => {
    const oldCol = currentTable.columns[index];
    const newColumns = [...currentTable.columns];
    newColumns[index] = value;

    const newRows = currentTable.rows.map((row) => {
      const newRow = { ...row };
      newRow[value] = newRow[oldCol];
      delete newRow[oldCol];
      return newRow;
    });

    setCurrentTable({ ...currentTable, columns: newColumns, rows: newRows });
  };

  // ✅ Add new row
  const addRow = () => {
    const newRow = {};
    currentTable.columns.forEach((col) => (newRow[col] = ""));
    setCurrentTable({ ...currentTable, rows: [...currentTable.rows, newRow] });
  };

  // ✅ Handle cell change
  const handleCellChange = (rIndex, colName, value) => {
    const newRows = [...currentTable.rows];
    newRows[rIndex][colName] = value;
    setCurrentTable({ ...currentTable, rows: newRows });
  };

  // ✅ Save or Update Table
  const saveTable = async () => {
    if (!currentTable.title.trim()) {
      alert("कृपया टेबलसाठी शीर्षक भरा.");
      return;
    }

    try {
      if (currentTable.id) {
        const tableRef = doc(db, "tables", currentTable.id);
        await updateDoc(tableRef, {
          title: currentTable.title,
          columns: currentTable.columns,
          rows: currentTable.rows,
        });
        alert("✅ टेबल अद्यतनित केले!");
      } else {
        const newDocRef = await addDoc(collection(db, "tables"), {
          title: currentTable.title,
          columns: currentTable.columns,
          rows: currentTable.rows,
        });
        // Update local state with new id
        setCurrentTable(prev => ({ ...prev, id: newDocRef.id }));
        alert("✅ टेबल जतन केले!");
      }

      // Reset only if new table was created
      if (!currentTable.id) {
        cancelEdit();
      }
      fetchTables();
    } catch (error) {
      console.error("Error saving table:", error);
      alert("त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
    }
  };

  // ✅ Edit existing table
  const editTable = (table) => {
    setCurrentTable({ ...table });
  };

  // ✅ Cancel editing
  const cancelEdit = () => {
    setCurrentTable({
      id: null,
      title: "",
      columns: ["अ. क्र", "नाव", "प्रतिनिधित्व", "पद"],
      rows: [{ "अ. क्र": "", "नाव": "", "प्रतिनिधित्व": "", "पद": "" }],
    });
  };

  // ✅ Delete table safely
  const deleteTable = async (tableId) => {
    if (!window.confirm("आपण हे टेबल हटवू इच्छिता का?")) return;
    try {
      await deleteDoc(doc(db, "tables", tableId));
      setTables(tables.filter((t) => t.id !== tableId));
      alert("🗑️ टेबल हटवले!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
    }
  };

  return (
    <div className="admin-table-container">
      <h2>टेबल तयार करा / व्यवस्थापन करा</h2>

      <input
        type="text"
        className="table-title-input"
        placeholder="टेबल शीर्षक लिहा..."
        value={currentTable.title}
        onChange={(e) => setCurrentTable({ ...currentTable, title: e.target.value })}
      />

      <div className="table-editor">
        <table>
          <thead>
            <tr>
              {currentTable.columns.map((col, cIndex) => (
                <th key={cIndex}>
                  <input
                    type="text"
                    value={col}
                    onChange={(e) => editColumnName(cIndex, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTable.rows.map((row, rIndex) => (
              <tr key={rIndex}>
                {currentTable.columns.map((col, cIndex) => (
                  <td key={cIndex}>
                    <input
                      type="text"
                      value={row[col] || ""}
                      onChange={(e) => handleCellChange(rIndex, col, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-actions">
        <button onClick={addColumn}>+ स्तंभ जोडा</button>
        <button onClick={addRow}>+ पंक्ती जोडा</button>
      </div>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        {currentTable.id ? (
          <>
            <button className="save-btn" onClick={saveTable}>
              💾 बदल जतन करा
            </button>
            <button
              className="cancel-btn"
              style={{ marginLeft: "10px", backgroundColor: "#d32f2f" }}
              onClick={cancelEdit}
            >
              ❌ रद्द करा
            </button>
          </>
        ) : (
          <button className="save-btn" onClick={saveTable}>
            💾 टेबल जतन करा
          </button>
        )}
      </div>

      <h3 style={{ textAlign: "center" }}>सध्याचे टेबल्स</h3>
      <div className="table-list">
        {tables.map((table) => (
          <div key={table.id} className="table-card">
            <h4>{table.title}</h4>
            <button style={{ margin: "10px" }} onClick={() => editTable(table)}>
              ✏️ संपादित करा
            </button>
            <button onClick={() => deleteTable(table.id)} className="delete-btn">
              🗑️ हटवा
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableManager;