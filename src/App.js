import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StickyNavbar from './components/StickyNavbar';
import Footerr from './components/Footerr';
import AboutUs from './components/AboutUs';
import AdminPanel from './components/Admin/AdminPanel';
import Slider from './components/Slider';
import WelcomeSection from './components/WelcomeSection';
import Component from './components/Component';
import GovernmentSchemesPage from './components/GovernmentSchemesPage';
import OfficersPage from './components/OfficersPage';
import EmployeePage from './components/EmployeePage';
import PhotoGallery from './components/PhotoGallery';
import ImportantLinks from './components/ImportantLinks';
import BlogPage from './components/BlogPage';
import CommitteeAdmin from './components/Admin/CommitteeAdmin';
import CommitteeTable from './components/CommitteeTable';
import TablesDisplay from './components/TablesDisplay';
import AdminTableManager from './components/Admin/AdminTableManager';
import UserTables from './components/UserTables';
import PanchayatAdminProjects from './components/Admin/PanchayatAdminProjects';
import PanchayatProjectsDisplay from './components/PanchayatProjectsDisplay';

function App() {
  return (
    <>
      <Router>

        <StickyNavbar /> {/* Always visible */}

        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<>
            <Slider />
            <div id="welcome"><WelcomeSection /></div>
            <div id="component"><Component /></div>
            <div id="schemes"><GovernmentSchemesPage /></div>
            <div id="officers"><OfficersPage /></div>
            <div id="employees"><EmployeePage /></div>
            <div id="gallery"><PhotoGallery /></div>
            <div id="links"><ImportantLinks /></div>
          </>} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/schemes" element={<BlogPage />} />
          <Route path="/Committee" element={<UserTables />} />
          <Route path="/projects" element={<PanchayatProjectsDisplay />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        <div id="footer"><Footerr /></div> {/* Always visible */}
      </Router></>
  );
}

export default App;
