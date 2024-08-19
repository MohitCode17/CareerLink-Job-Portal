import CategoryCarousel from "@/components/sub-components/CategoryCarousel";
import Hero from "@/components/sub-components/Hero";
import LatestJobs from "@/components/sub-components/LatestJobs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <>
      <Hero />
      <CategoryCarousel />
      <LatestJobs />
    </>
  );
};

export default Home;
