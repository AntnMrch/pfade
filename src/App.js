import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TutoringCharacterPage from "./pages/TutoringCharacterPage";
import ParentDashboard from "./pages/ParentDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character" element={<TutoringCharacterPage />} />
        <Route path="/dashboard" element={<ParentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
