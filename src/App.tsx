import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { ComeFunzionaPage } from "@/pages/ComeFunzionaPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/come-funziona" element={<ComeFunzionaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
