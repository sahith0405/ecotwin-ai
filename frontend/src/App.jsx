import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WhatIfSimulator from "./pages/WhatIfSimulator";
import RiskAnalysis from "./pages/RiskAnalysis";
import AIAnalyst from "./pages/AIAnalyst";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/simulator" element={<WhatIfSimulator />} />
        <Route path="/risk-analysis" element={<RiskAnalysis />} />
        <Route path="/ai-analyst" element={<AIAnalyst />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
