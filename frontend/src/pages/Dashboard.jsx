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
import { Link } from "react-router-dom";

const risks = [
  {
    type: "heat",
    title: "Heat Risk",
    score: 82,
    status: "High",
    description: "Elevated temperatures and urban heat exposure.",
  },
  {
    type: "water",
    title: "Water Stress",
    score: 67,
    status: "Moderate",
    description: "Increasing pressure on available water resources.",
  },
  {
    type: "flood",
    title: "Flood Risk",
    score: 41,
    status: "Low",
    description: "Moderate exposure during extreme rainfall events.",
  },
  {
    type: "pollution",
    title: "Pollution",
    score: 73,
    status: "High",
    description: "Air quality affected by urban emissions.",
  },
];

function Dashboard() {
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
                  <span>Hyderabad, India</span>
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
                  <strong>76</strong>
                  <small>out of 100</small>
                </div>
              </div>

              <div className="hero-score-info">
                <span className="high-pill">HIGH RISK</span>
                <strong>Needs attention</strong>
                <p>
                  Heat and pollution are currently the largest contributors.
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

            <button className="ai-feature-button">
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

              <button className="section-link">
                Full analysis
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="risk-grid">
              {risks.map((risk) => (
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
                Overall environmental risk movement for Hyderabad.
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
