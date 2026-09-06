import { API_BASE_URL } from "../config/api";
import { useEffect, useState } from "react";
import {
  Brain,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Droplets,
  Waves,
  Wind,
  AlertTriangle,
} from "lucide-react";
import { useLocation } from "../context/LocationContext";
import { useNavigate } from "react-router-dom";

function AIAnalyst() {
  const navigate = useNavigate();
  const { location, environment, loading: locationLoading } = useLocation();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadAnalysis = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/environment/${encodeURIComponent(
            location
          )}/ai-analysis`
        );

        if (!response.ok) {
          throw new Error("Unable to generate environmental analysis");
        }

        const data = await response.json();

        if (!cancelled) {
          setAnalysis(data);
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setAnalysis(null);
          setError("Unable to connect to the EcoTwin AI Analyst.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAnalysis();

    return () => {
      cancelled = true;
    };
  }, [location]);

  const risks = environment?.risks || {};

  const riskItems = [
    {
      key: "heat",
      label: "Heat",
      value: risks.heat ?? 0,
      icon: <Leaf size={17} />,
      className: "heat",
    },
    {
      key: "water",
      label: "Water",
      value: risks.water ?? 0,
      icon: <Droplets size={17} />,
      className: "water",
    },
    {
      key: "flood",
      label: "Flood",
      value: risks.flood ?? 0,
      icon: <Waves size={17} />,
      className: "flood",
    },
    {
      key: "pollution",
      label: "Pollution",
      value: risks.pollution ?? 0,
      icon: <Wind size={17} />,
      className: "pollution",
    },
  ];

  const getRiskClass = (value) => {
    if (value >= 70) return "high";
    if (value >= 45) return "moderate";
    return "low";
  };

  const overallRisk = analysis?.overallRisk ?? environment?.overallRisk ?? 0;

  return (
    <main className="page ai-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} />
            AI ENVIRONMENTAL ANALYST
          </span>

          <h1>Understand {location}'s environmental risks.</h1>

          <p>
            EcoTwin analyzes the environmental profile of {location} and
            translates risk data into practical actions for a more resilient
            future.
          </p>
        </div>

        <div className="ai-status">
          <span className="ai-status-dot" />
          <span>Analysis engine active</span>
        </div>
      </div>

      {error && (
        <div className="ai-error">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      <section className="ai-overview-grid">
        <div className="ai-hero-card">
          <div className="ai-hero-top">
            <div className="ai-icon">
              <Brain size={24} />
            </div>

            <div>
              <span>ENVIRONMENTAL INTELLIGENCE</span>
              <h2>
                {loading || locationLoading
                  ? "Analyzing environmental profile..."
                  : analysis?.primaryConcern || "Environmental Risk"}
              </h2>
            </div>
          </div>

          <div className="ai-score-row">
            <div>
              <span>OVERALL RISK</span>
              <strong>{overallRisk}</strong>
              <small>/100</small>
            </div>

            <div
              className={`ai-risk-badge ${getRiskClass(overallRisk)}`}
            >
              {analysis?.riskLevel || "Loading"}
            </div>
          </div>

          <div className="ai-analysis-text">
            <span>AI DIAGNOSIS</span>

            <p>
              {loading || locationLoading
                ? "Generating an environmental assessment..."
                : analysis?.diagnosis ||
                  "Environmental analysis will appear here."}
            </p>
          </div>
        </div>

        <div className="ai-risk-panel">
          <div className="section-heading">
            <div>
              <span>RISK PROFILE</span>
              <h3>{location}, India</h3>
            </div>

            <ShieldCheck size={21} />
          </div>

          <div className="ai-risk-list">
            {riskItems.map((risk) => (
              <div className="ai-risk-item" key={risk.key}>
                <div className={`ai-risk-icon ${risk.className}`}>
                  {risk.icon}
                </div>

                <div className="ai-risk-name">
                  <strong>{risk.label} Risk</strong>
                  <div className="ai-progress">
                    <span
                      style={{ width: `${risk.value}%` }}
                    />
                  </div>
                </div>

                <strong className="ai-risk-value">
                  {risk.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-content-grid">
        <div className="ai-card">
          <div className="ai-card-heading">
            <div>
              <span>RECOMMENDED ACTIONS</span>
              <h2>What EcoTwin recommends</h2>
            </div>

            <Leaf size={20} />
          </div>

          <div className="recommendation-list">
            {(analysis?.recommendations || []).map((item, index) => (
              <div className="recommendation-item" key={index}>
                <div className="recommendation-number">
                  {index + 1}
                </div>

                <div>
                  <strong>{item}</strong>
                  <p>
                    A practical intervention identified from the current
                    environmental risk profile.
                  </p>
                </div>

                <CheckCircle2 size={18} />
              </div>
            ))}
          </div>
        </div>

        <div className="ai-card impact-card">
          <div className="ai-card-heading">
            <div>
              <span>POTENTIAL IMPACT</span>
              <h2>Areas that can improve</h2>
            </div>

            <Sparkles size={20} />
          </div>

          <div className="impact-list">
            {(analysis?.impactAreas || []).map((item, index) => (
              <div className="impact-item" key={index}>
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="simulation-callout">
            <div className="simulation-callout-icon">
              <ArrowRight size={18} />
            </div>

            <div className="simulation-callout-content">
              <span>NEXT STEP</span>
              <p>
                {analysis?.simulationAdvice ||
                  "Explore interventions in the What-If Simulator."}
              </p>

              <button
                className="ai-simulation-button"
                onClick={() => navigate("/simulator")}
              >
                Explore this intervention
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="ai-disclaimer">
        <ShieldCheck size={16} />
        <span>
          EcoTwin provides scenario-based environmental analysis for
          decision support. Results are estimates and depend on local
          conditions and real-world implementation.
        </span>
      </div>
    </main>
  );
}

export default AIAnalyst;
