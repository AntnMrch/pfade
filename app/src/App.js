import { BrowserRouter, Routes, Route } from "react-router-dom";
// Stellen Sie sicher, dass diese Dateien in './pages/' existieren
import HomePage from "./pages/HomePage";
import TutoringPage from "./pages/TutoringPage"; 
import TutoringCharacterPage from "./pages/TutoringCharacterPage"; // Falls diese Seite noch existiert
import ParentDashboard from "./pages/ParentDashboard";
import PathPage from "./pages/PathPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE / HERO (Enthält Pfadauswahl und Pricing) */}
        <Route path="/" element={<HomePage />} /> 
        
        {/* NACHHILFE / LEHRER-BÖRSE */}
        <Route path="/tutoring" element={<TutoringPage />} />
        
        {/* WEITERE SEITEN */}
        <Route path="/character" element={<TutoringCharacterPage />} />
        <Route path="/dashboard" element={<ParentDashboard />} />
        <Route path="/path" element={<PathPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;