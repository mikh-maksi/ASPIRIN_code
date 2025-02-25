import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ProjectDetail from "../pages/ProjectDetail/ProjectDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:projectId" element={<ProjectDetail />} />
    </Routes>
  );
};

export default AppRouter;