import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/sonner";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
