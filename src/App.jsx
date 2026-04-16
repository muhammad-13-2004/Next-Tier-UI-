import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/public/SignUp";
import Login from "./pages/public/Login";
import Home from "./pages/public/Home";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import VerifyEmail from "./components/auth/VerifyEmail";
import { useAuthStore } from "./store/authStore";
import Boarding5 from "./components/boarding/Boarding5";

// function App() {
  
//   const initAuth = useAuthStore((s) => s.initAuth);

//   useEffect(() => {
//     return initAuth();
//   }, [initAuth]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />
//         <Route element={<ProtectedRoute requireVerified />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/boarding" element={<Boarding1 />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


function App() {
  
  

  return (
    <Boarding5 />
  );
}

export default App;
