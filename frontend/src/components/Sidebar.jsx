import {
  LayoutDashboard,
  Activity,
  SlidersHorizontal,
  Bot,
  Leaf,
  Settings,
  HelpCircle,
  Globe2,
  X,
  MapPin,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation as useRouterLocation } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "../context/LocationContext";

function Sidebar() {
  const routerLocation = useRouterLocation();

  const {
    location,
    changeLocation,
    locations,
  } = useLocation();

  const [activePanel, setActivePanel] = useState(null);

  const isActive = (path) => routerLocation.pathname === path;

  const closePanel = () => {
    setActivePanel(null);
  };

  const resetLocation = () => {
    changeLocation("Hyderabad");
    localStorage.setItem("ecotwin-location", "Hyderabad");
  };

  return (
    <>
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

          <Link
            to="/"
            className={`nav-item ${isActive("/") ? "active" : ""}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/risk-analysis"
            className={`nav-item ${
              isActive("/risk-analysis") ? "active" : ""
            }`}
          >
            <Activity size={18} />
            <span>Risk Analysis</span>
          </Link>

          <div className="nav-section">INTELLIGENCE</div>

          <Link
            to="/simulator"
            className={`nav-item ${
              isActive("/simulator") ? "active" : ""
            }`}
          >
            <SlidersHorizontal size={18} />
            <span>What-If Simulator</span>
          </Link>

          <Link
            to="/ai-analyst"
            className={`nav-item ${
              isActive("/ai-analyst") ? "active" : ""
            }`}
          >
            <Bot size={18} />
            <span>AI Analyst</span>
          </Link>

          <button
            type="button"
            className="nav-item sidebar-button"
            onClick={() => setActivePanel("impact")}
          >
            <Leaf size={18} />
            <span>Impact</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className="nav-item sidebar-button"
            onClick={() => setActivePanel("help")}
          >
            <HelpCircle size={18} />
            <span>Help</span>
          </button>

          <button
            type="button"
            className="nav-item sidebar-button"
            onClick={() => setActivePanel("settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <div className="hackathon-badge">
            <div className="badge-dot" />
            <div>
              <strong>Earth Forward</strong>
              <span>NextStep Hacks 2026</span>
            </div>
          </div>
        </div>
      </aside>

      {activePanel && (
        <div className="sidebar-modal-backdrop" onClick={closePanel}>
          <div
            className="sidebar-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sidebar-modal-header">
              <div>
                <span className="sidebar-modal-eyebrow">
                  ECOTWIN
                </span>

                <h2>
                  {activePanel === "help"
                    ? "Help & Guide"
                    : activePanel === "settings"
                    ? "Settings"
                    : "Environmental Impact"}
                </h2>
              </div>

              <button
                type="button"
                className="sidebar-modal-close"
                onClick={closePanel}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            {activePanel === "help" && (
              <div className="sidebar-modal-content">
                <div className="help-intro">
                  <div className="help-icon">
                    <HelpCircle size={22} />
                  </div>

                  <div>
                    <strong>How EcoTwin works</strong>
                    <p>
                      Explore environmental risks, understand their causes,
                      and simulate interventions that could reduce those
                      risks.
                    </p>
                  </div>
                </div>

                <div className="help-steps">
                  <div className="help-step">
                    <span>01</span>
                    <div>
                      <strong>Choose a location</strong>
                      <p>
                        Select a supported city from the location selector.
                      </p>
                    </div>
                  </div>

                  <div className="help-step">
                    <span>02</span>
                    <div>
                      <strong>Analyze environmental risk</strong>
                      <p>
                        Review heat, water, flood and pollution risk levels.
                      </p>
                    </div>
                  </div>

                  <div className="help-step">
                    <span>03</span>
                    <div>
                      <strong>Ask the AI Analyst</strong>
                      <p>
                        Get an environmental diagnosis and recommended actions.
                      </p>
                    </div>
                  </div>

                  <div className="help-step">
                    <span>04</span>
                    <div>
                      <strong>Run a What-If simulation</strong>
                      <p>
                        Adjust interventions and compare projected risk.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="help-tip">
                  <Leaf size={17} />
                  <p>
                    <strong>Demo tip:</strong> Try Mumbai in the AI Analyst
                    and then explore flood-reduction strategies in the
                    simulator.
                  </p>
                </div>
              </div>
            )}

            {activePanel === "settings" && (
              <div className="sidebar-modal-content">
                <div className="settings-section">
                  <span>ENVIRONMENTAL LOCATION</span>
                  <h3>Current city</h3>

                  <div className="settings-location">
                    <div className="settings-location-icon">
                      <MapPin size={17} />
                    </div>

                    <div>
                      <strong>{location}, India</strong>
                      <small>Used across EcoTwin</small>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <span>CHANGE LOCATION</span>
                  <h3>Select another city</h3>

                  <div className="settings-city-grid">
                    {locations.map((city) => (
                      <button
                        type="button"
                        key={city}
                        className={`settings-city ${
                          city === location ? "selected" : ""
                        }`}
                        onClick={() => changeLocation(city)}
                      >
                        <MapPin size={15} />
                        <span>{city}</span>
                        {city === location && (
                          <span className="settings-current">Current</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settings-actions">
                  <button
                    type="button"
                    className="settings-reset"
                    onClick={resetLocation}
                  >
                    <RotateCcw size={16} />
                    Reset to Hyderabad
                  </button>

                  <button
                    type="button"
                    className="settings-done"
                    onClick={closePanel}
                  >
                    Done
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {activePanel === "impact" && (
              <div className="sidebar-modal-content">
                <div className="help-intro">
                  <div className="help-icon">
                    <Leaf size={22} />
                  </div>

                  <div>
                    <strong>Environmental Impact</strong>
                    <p>
                      EcoTwin helps compare environmental interventions and
                      estimate how they could reduce overall risk.
                    </p>
                  </div>
                </div>

                <div className="impact-preview-grid">
                  <div>
                    <strong>🌳 Tree Coverage</strong>
                    <span>Heat & pollution</span>
                  </div>

                  <div>
                    <strong>🌿 Green Spaces</strong>
                    <span>Heat & flood resilience</span>
                  </div>

                  <div>
                    <strong>💧 Water Conservation</strong>
                    <span>Water stress</span>
                  </div>

                  <div>
                    <strong>🏙️ Sustainable Infrastructure</strong>
                    <span>Flood & pollution</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="impact-open-button"
                  onClick={() => {
                    closePanel();
                    window.location.href = "/simulator";
                  }}
                >
                  Explore in What-If Simulator
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
