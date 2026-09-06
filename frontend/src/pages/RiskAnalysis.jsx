import {
  ArrowLeft,
  ArrowRight,
  Activity,
  AlertTriangle,
  Droplets,
  Thermometer,
  Waves,
  Wind,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";

const trendData = [
  { date: "Aug 08", risk: 83 },
  { date: "Aug 13", risk: 81 },
  { date: "Aug 18", risk: 82 },
  { date: "Aug 23", risk: 78 },
  { date: "Aug 28", risk: 79 },
  { date: "Sep 02", risk: 74 },
  { date: "Sep 06", risk: 76 },
];

const risks = [
  {
    name: "Heat Risk",
    score: 82,
    level: "High",
    icon: Thermometer,
    className: "heat",
    description:
      "Elevated temperature exposure and urban heat concentration are the largest environmental concerns.",
    factors: ["High daytime temperatures", "Urban heat-island effect", "Limited shade coverage"],
  },
  {
    name: "Water Stress",
    score: 67,
    level: "Moderate",
    icon: Droplets,
    className: "water",
    description:
      "Water demand is putting increasing pressure on available local resources.",
    factors: ["Growing demand", "Seasonal variability", "Conservation opportunity"],
  },
  {
    name: "Flood Risk",
    score: 41,
    level: "Low",
    icon: Waves,
    className: "flood",
    description:
      "Current flood exposure is comparatively lower, but extreme rainfall can create localized risk.",
    factors: ["Heavy rainfall events", "Drainage pressure", "Low-lying zones"],
  },
  {
    name: "Pollution Risk",
    score: 73,
    level: "High",
    icon: Wind,
    className: "pollution",
    description:
      "Urban emissions and air-quality pressure contribute significantly to environmental risk.",
    factors: ["Traffic emissions", "Urban activity", "Air-quality variability"],
  },
];

function RiskAnalysis() {
  return (
    <div className="risk-analysis-page">
      <header className="analysis-topbar">
        <Link to="/" className="analysis-back">
          <ArrowLeft size={16} />
          Dashboard
        </Link>

        <div className="analysis-location">
          <span className="location-pulse" />
          <MapPin size={15} />
          Hyderabad, India
        </div>
      </header>

      <main className="analysis-content">
        <section className="analysis-hero">
          <div>
            <div className="analysis-eyebrow">ENVIRONMENTAL RISK INTELLIGENCE</div>
            <h1>Understand what is<br /><span>driving the risk.</span></h1>
            <p>
              EcoTwin breaks down the environmental health of Hyderabad into
              measurable risk factors and identifies the areas where action can
              make the biggest difference.
            </p>
          </div>

          <div className="analysis-score-card">
            <div className="score-card-label">OVERALL ENVIRONMENTAL RISK</div>
            <div className="analysis-score">
              76<span>/100</span>
            </div>
            <div className="score-status">HIGH RISK</div>
            <p>Heat and pollution are currently the largest contributors.</p>
          </div>
        </section>

        <section className="analysis-grid">
          <div className="analysis-chart-card">
            <div className="card-heading">
              <div>
                <span>RISK HISTORY</span>
                <h2>Environmental Risk Trend</h2>
              </div>
              <div className="period-pill">Last 30 days</div>
            </div>

            <p className="card-description">
              Overall environmental risk movement for the selected location.
            </p>

            <div className="trend-chart">
              <ResponsiveContainer width="100%" height={290}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4d8973" stopOpacity={0.22} />
                      <stop offset="100%" stopColor="#4d8973" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e7eeeb" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 9, fill: "#8a9993" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[60, 90]}
                    tick={{ fontSize: 9, fill: "#8a9993" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="risk"
                    stroke="#3f806a"
                    strokeWidth={3}
                    fill="url(#riskFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ai-analysis-card">
            <div className="ai-icon">
              <Sparkles size={20} />
            </div>

            <span>AI ENVIRONMENTAL ANALYST</span>
            <h2>What needs attention?</h2>

            <p>
              Heat exposure is EcoTwin's highest-risk factor. Increasing tree
              coverage and green spaces could provide the strongest near-term
              opportunity to reduce environmental stress.
            </p>

            <div className="ai-priority">
              <AlertTriangle size={16} />
              <div>
                <strong>Priority intervention</strong>
                <span>Increase urban canopy and shade coverage</span>
              </div>
            </div>

            <Link to="/simulator" className="analysis-action">
              Test this intervention
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <section className="risk-section">
          <div className="section-heading">
            <div>
              <span>RISK PROFILE</span>
              <h2>Environmental Risk Factors</h2>
            </div>
            <div className="live-indicator">
              <Activity size={14} />
              Live assessment
            </div>
          </div>

          <div className="risk-analysis-list">
            {risks.map((risk) => {
              const Icon = risk.icon;

              return (
                <article className={`risk-analysis-item ${risk.className}`} key={risk.name}>
                  <div className="risk-main">
                    <div className="risk-icon">
                      <Icon size={21} />
                    </div>

                    <div className="risk-title">
                      <h3>{risk.name}</h3>
                      <span>{risk.level} risk</span>
                    </div>

                    <div className="risk-number">
                      {risk.score}
                      <small>/100</small>
                    </div>
                  </div>

                  <div className="risk-progress">
                    <span style={{ width: `${risk.score}%` }} />
                  </div>

                  <p>{risk.description}</p>

                  <div className="risk-factors">
                    {risk.factors.map((factor) => (
                      <span key={factor}>{factor}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="analysis-bottom">
          <div className="method-card">
            <div className="method-icon">
              <Activity size={19} />
            </div>
            <div>
              <span>HOW ECOTWIN ASSESSES RISK</span>
              <h3>Multiple environmental signals → one actionable profile</h3>
              <p>
                Environmental indicators are normalized into comparable risk
                scores, combined into an overall assessment, and translated
                into practical intervention opportunities.
              </p>
            </div>
          </div>

          <Link to="/simulator" className="simulation-banner">
            <div>
              <span>WHAT-IF IMPACT SIMULATOR</span>
              <strong>See how interventions could change these risks.</strong>
            </div>
            <ArrowRight size={19} />
          </Link>
        </section>
      </main>
    </div>
  );
}

export default RiskAnalysis;
