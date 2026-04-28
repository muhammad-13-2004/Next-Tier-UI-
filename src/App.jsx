import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/public/SignUp";
import Login from "./pages/public/Login";
import Home from "./pages/public/Home";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import VerifyEmail from "./components/auth/VerifyEmail";
import { useAuthStore } from "./store/authStore";
import Boardingflow from "./components/boarding/Boardingflow";
import CourseReadingTab from './components/dashboard/tabs/CourseReadingTab'

function App() {
  
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    return initAuth();
  }, [initAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/boarding" element={<Boardingflow />} />
        <Route path="/lesson/:id" element={<CourseReadingTab />} />
        <Route element={<ProtectedRoute requireVerified />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




