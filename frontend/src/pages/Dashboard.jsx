import {
  ArrowRight,
  Sparkles,
  TrendingDown,
  TreePine,
  ChevronRight,
  MapPin,
  Activity,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import RiskCard from "../components/RiskCard";
import RiskTrendChart from "../components/RiskTrendChart";
import EnvironmentalPulse from "../components/EnvironmentalPulse";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "../context/LocationContext";



function Dashboard() {
  const navigate = useNavigate();
  const { location, environment, loading, error } = useLocation();

  const risks = environment
    ? [
        {
          type: "heat",
          title: "Heat Risk",
          score: environment.risks.heat,
          status:
            environment.risks.heat >= 70
              ? "High"
              : environment.risks.heat >= 45
              ? "Moderate"
              : "Low",
          description: "Elevated temperatures and urban heat exposure.",
        },
        {
          type: "water",
          title: "Water Stress",
          score: environment.risks.water,
          status:
            environment.risks.water >= 70
              ? "High"
              : environment.risks.water >= 45
              ? "Moderate"
              : "Low",
          description: "Increasing pressure on available water resources.",
        },
        {
          type: "flood",
          title: "Flood Risk",
          score: environment.risks.flood,
          status:
            environment.risks.flood >= 70
              ? "High"
              : environment.risks.flood >= 45
              ? "Moderate"
              : "Low",
          description: "Exposure during extreme rainfall events.",
        },
        {
          type: "pollution",
          title: "Pollution",
          score: environment.risks.pollution,
          status:
            environment.risks.pollution >= 70
              ? "High"
              : environment.risks.pollution >= 45
              ? "Moderate"
              : "Low",
          description: "Air quality affected by urban emissions.",
        },
      ]
    : [];

      const overallRisk = environment?.overallRisk;
      const riskLevel = environment?.riskLevel;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="dashboard-content">

          {/* HERO */}
          <section className="hero-section">
            <div className="hero-copy">
              <div className="eyebrow">
                ENVIRONMENTAL INTELLIGENCE PLATFORM
              </div>

              <h1>
                See the health of
                <br />
                <span>your environment.</span>
              </h1>

              <p>
                AI-powered environmental intelligence for understanding risk,
                discovering opportunities, and planning a more resilient future.
              </p>

              <div className="hero-meta">
                <div>
                  <MapPin size={15} />
                  <span>{location}, India</span>
                </div>

                <div>
                  <span className="live-dot" />
                  <span>Live assessment</span>
                </div>

                <div>
                  <ShieldCheck size={15} />
                  <span>AI analyzed</span>
                </div>
              </div>
            </div>

            <div className="hero-score">
              <div className="score-ring">
                <div className="score-ring-inner">
                  <span>RISK SCORE</span>
                    <strong>{loading ? "..." : overallRisk ?? "—"}</strong>
                  <small>out of 100</small>
                </div>
              </div>

              <div className="hero-score-info">
                    <span className="high-pill">
                      {loading ? "LOADING" : riskLevel ? `${riskLevel.toUpperCase()} RISK` : "UNAVAILABLE"}
                    </span>
                    <strong>{error ? "Connection failed" : "Needs attention"}</strong>
                <p>
                      {error || environment?.summary || "Loading environmental assessment..."}
                </p>

                <div className="score-change">
                  <TrendingDown size={14} />
                  3% improvement this month
                </div>
              </div>
            </div>
          </section>

          {/* AI INSIGHT */}
          <section className="ai-feature">
            <div className="ai-feature-icon">
              <Sparkles size={23} />
            </div>

            <div className="ai-feature-content">
              <div className="ai-feature-label">
                AI ENVIRONMENTAL ANALYST
              </div>

              <h2>Tree coverage is your highest-impact opportunity.</h2>

              <p>
                Expanding urban tree coverage and green spaces could reduce
                heat exposure while improving local air quality. EcoTwin
                estimates this as one of the most effective near-term
                interventions for this location.
              </p>
            </div>

            <button
              className="ai-feature-button"
              onClick={() => navigate("/ai-analyst")}
            >
              Explore insight
              <ArrowRight size={17} />
            </button>
          </section>

          {/* RISK PROFILE */}
          <section className="section-block">
            <div className="section-header">
              <div>
                <span>RISK PROFILE</span>
                <h2>Environmental Risk Factors</h2>
              </div>

              <Link to="/risk-analysis" className="section-link">
                Full analysis
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="risk-grid">
                  {loading && <div className="loading-state">Loading environmental risks...</div>}
                  {!loading && error && <div className="loading-state">{error}</div>}
                  {!loading && !error && risks.map((risk) => (
                    <RiskCard key={risk.type} {...risk} />
                  ))}
            </div>
          </section>

          {/* ANALYTICS */}
          <section className="analytics-grid">

            <div className="analytics-card trend-card">
              <div className="analytics-heading">
                <div>
                  <span>RISK HISTORY</span>
                  <h2>Environmental Risk Trend</h2>
                </div>

                <div className="chart-status">
                  <Activity size={14} />
                  30 days
                </div>
              </div>

              <p className="analytics-description">
                Overall environmental risk movement for {location}.
              </p>

              <RiskTrendChart />
            </div>

            <EnvironmentalPulse />

          </section>

          {/* SIMULATOR CTA */}
          <section className="simulation-banner">
            <div className="simulation-decoration">
              <div className="simulation-orbit orbit-one" />
              <div className="simulation-orbit orbit-two" />
              <TreePine size={30} />
            </div>

            <div className="simulation-copy">
              <span>WHAT-IF IMPACT SIMULATOR</span>

              <h2>What if you could change the future?</h2>

              <p>
                Test interventions, adjust environmental strategies, and
                discover how much risk you could reduce.
              </p>
            </div>

            <Link to="/simulator" className="simulation-button">
              Start simulation
              <ArrowRight size={18} />
            </Link>
          </section>

          <footer className="dashboard-footer">
            <span>EcoTwin Environmental Intelligence</span>
            <span>NextStep Hacks 2026 · Earth Forward</span>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
