import {
  LayoutDashboard,
  Activity,
  SlidersHorizontal,
  Bot,
  Leaf,
  Settings,
  HelpCircle,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Globe2 size={22} />
        </div>

        <div>
          <div className="brand-name">EcoTwin</div>
          <div className="brand-subtitle">ENVIRONMENTAL AI</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">OVERVIEW</div>

        <a className="nav-item active">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </a>

        <Link to="/risk-analysis" className="nav-item">
          <Activity size={18} />
          <span>Risk Analysis</span>
        </Link>

        <div className="nav-section">INTELLIGENCE</div>

        <Link to="/simulator" className="nav-item">
          <SlidersHorizontal size={18} />
          <span>What-If Simulator</span>
        </Link>

        <Link to="/ai-analyst" className="nav-item">
          <Bot size={18} />
          <span>AI Analyst</span>
        </Link>

        <a className="nav-item">
          <Leaf size={18} />
          <span>Impact</span>
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a className="nav-item">
          <HelpCircle size={18} />
          <span>Help</span>
        </a>

        <a className="nav-item">
          <Settings size={18} />
          <span>Settings</span>
        </a>

        <div className="hackathon-badge">
          <div className="badge-dot" />
          <div>
            <strong>Earth Forward</strong>
            <span>NextStep Hacks 2026</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
