import React, { useState, useEffect } from "react";
import SliderAdmin from "./SliderAdmin";
import OfficersAdmin from "./OfficersAdmin";
import PhotoGalleryAdmin from "./PhotoGalleryAdmin";
import EmployeeAdminPanel from "./EmployeeAdminPanel";
import "./AdminPanel.css";
import BlogPage from "../BlogPage";
import AdminAddPost from "./AdminAddPost";
import AdminTableManager from "./AdminTableManager";
import PanchayatAdminProjects from "./PanchayatAdminProjects";
// import "./AuthPopup.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("slider");
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // डीफॉल्ट अॅडमिन क्रेडेन्शियल्स
  const adminCredentials = {
    email: "admin@admin.com",
    password: "admin123",
  };

  // लोकलस्टोरेज मधून लॉगिन तपासा
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) setUser(JSON.parse(storedUser));
    else setShowLogin(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const loggedInUser = { email };
      localStorage.setItem("adminUser", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setShowLogin(false);
      setError("");
    } else {
      setError("अवैध क्रेडेन्शियल्स");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setUser(null);
    setShowLogin(true);
    setEmail("");
    setPassword("");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "slider":
        return <SliderAdmin />;
      case "officers":
        return <OfficersAdmin />;
      case "gallery":
        return <PhotoGalleryAdmin />;
      case "employees":
        return <EmployeeAdminPanel />;
      case "blog":
        return <AdminAddPost />;
      case "tables":
        return <AdminTableManager />;
      case "projects":
        return <PanchayatAdminProjects />;
      default:
        return <SliderAdmin />;
    }
  };

  return (
    <div className="admin-panel">
      {showLogin && (
        <div className="auth-popup">
          <div className="auth-box">
            <h2>एडमिन लॉगिन</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="ईमेल"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="पासवर्ड"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">लॉगिन</button>
            </form>
          </div>
        </div>
      )}

      {user && (
        <>
          <h1 className="admin-title">प्रशासकीय पॅनेल</h1>
          <button className="logout-btn" onClick={handleLogout}>
            लॉगआउट
          </button>

          <div className="admin-tabs">
            <button
              className={activeTab === "slider" ? "active" : ""}
              onClick={() => setActiveTab("slider")}
            >
              स्लायडर
            </button>
                        <button
              className={activeTab === "gallery" ? "active" : ""}
              onClick={() => setActiveTab("gallery")}
            >
              फोटो गॅलरी
            </button>
            <button
              className={activeTab === "officers" ? "active" : ""}
              onClick={() => setActiveTab("officers")}
            >
              अधिकारी
            </button>
            <button
              className={activeTab === "employees" ? "active" : ""}
              onClick={() => setActiveTab("employees")}
            >
              कर्मचारी
            </button>
                <button
              className={activeTab === "blog" ? "active" : ""}
              onClick={() => setActiveTab("blog")}
            >
            योजना व्यवस्थापन 
            </button>
            <button
              className={activeTab === "tables" ? "active" : ""}
              onClick={() => setActiveTab("tables")}
            >
              समिति 
            </button>
               <button
              className={activeTab === "projects" ? "active" : ""}
              onClick={() => setActiveTab("projects")}
            >
              प्रकल्प व्यवस्थापन
            </button>
          </div>

          <div key={activeTab} className="admin-content">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
