import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/public/SignUp";
import Login from "./pages/public/Login";
import Home from "./pages/public/Home";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import VerifyEmail from "./components/auth/VerifyEmail";
import AuthCallback from "./components/auth/AuthCallback";
import { useAuthStore } from "./store/authStore";
import Boarding from "./pages/public/Boarding";
import CourseReadingTab from './dashboard/pages/CourseReading'
import MyRoadmaps from "./dashboard/pages/MyRoadmaps";
import Main from "./dashboard/pages/Main";
import AiTutor from "./dashboard/pages/AiTutor";
import Community from "./dashboard/pages/Community";
import Settings from "./dashboard/pages/Settings";
import Career from "./dashboard/pages/Career";
import CertificatePage from "./pages/public/CertificatePage";
import NotFound from "./pages/public/NotFound";
import AddRoadmap from "./dashboard/features/roadmap/components/AddRoadmap";



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
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          element={
            <ProtectedRoute
              requireVerified
              blockWhenOnboardingCompleted
            />
          }
        >
          <Route path="/boarding" element={<Boarding />} />
        </Route>

        <Route element={<ProtectedRoute requireVerified />}>
          <Route path="/dashboard/roadmaps/:slug/:id" element={<CourseReadingTab />} />
          <Route path="/dashboard/roadmaps/certificate/:courseId" element={<CertificatePage />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Main />} />
            <Route path="roadmaps" element={<MyRoadmaps />} />
            <Route path="add-roadmap" element={<AddRoadmap />} />
            <Route path="roadmaps/:slug" element={<MyRoadmaps />} />
            <Route path="ai-tutor" element={<AiTutor />} />
            <Route path="community" element={<Community />} />
            <Route path="career" element={<Career />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
