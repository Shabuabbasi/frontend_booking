import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import BusinessFormation from './pages/BusinessFormation';
import ProServices from './pages/ProServices';
import VisaServices from './pages/VisaServices';
import Contact from './pages/Contact';
import Footer from './Components/Footer';
import Chatbot from './pages/Chatbot';
import FloatingChatbot from './pages/FloatingChatbot';
import VideoCall from './Components/VedioCall';
import AdminDashboard from './Components/AdminDashboard';
import ProtectedRoute from './Components/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
 const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ✅ If not logged in → go to login */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/BusinessFormation" element={token ? <BusinessFormation /> : <Navigate to="/login" />} />
        <Route path="/Visa" element={token ? <VisaServices /> : <Navigate to="/login" />} />
        <Route path="/ProServices" element={token ? <ProServices /> : <Navigate to="/login" />} />
        <Route path="/contact" element={token ? <Contact /> : <Navigate to="/login" />} />
        <Route path="/chat" element={token ? <Chatbot /> : <Navigate to="/login" />} />
        <Route path="/vedio" element={token ? <VideoCall /> : <Navigate to="/login" />} />

        {/* Auth routes */}
           <Route path="/login" element={<Login setRole={setRole} setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Admin Dashboard */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute role={role} allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<h1>🚫 Unauthorized</h1>} />
      </Routes>

      <FloatingChatbot />
      <Footer />
    </Router>
  );
}

export default App;
