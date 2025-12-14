import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TutoringCharacterPage from "./pages/TutoringCharacterPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character" element={<TutoringCharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
