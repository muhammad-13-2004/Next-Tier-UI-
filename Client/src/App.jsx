import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './pages/public/SignUp';
import Login from './pages/public/Login';
import Home from "./pages/public/Home";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

    </Router>
  )
}

export default App
