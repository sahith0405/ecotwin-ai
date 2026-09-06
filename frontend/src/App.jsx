import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WhatIfSimulator from "./pages/WhatIfSimulator";
import RiskAnalysis from "./pages/RiskAnalysis";
import AIAnalyst from "./pages/AIAnalyst";
import { LocationProvider } from "./context/LocationContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/simulator" element={<WhatIfSimulator />} />
          <Route path="/risk-analysis" element={<RiskAnalysis />} />
          <Route path="/ai-analyst" element={<AIAnalyst />} />
        </Routes>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;
