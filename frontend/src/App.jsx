import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/sonner";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Companies from "./components/admin/Companies";
import AdminJobs from "./components/admin/AdminJobs";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";

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

        {/* ADMIN / RECRUITER RELATED ROUTES */}
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/companies/:id" element={<CompanySetup />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/company/create" element={<CreateCompany />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
