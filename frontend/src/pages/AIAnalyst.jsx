import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Droplets,
  Leaf,
  MapPin,
  Sparkles,
  Thermometer,
  TreePine,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";

const recommendations = [
  {
    rank: "01",
    icon: TreePine,
    title: "Increase urban tree coverage",
    description:
      "Expand canopy and shade coverage around high-exposure urban areas.",
    impact: "High impact",
    impactClass: "high",
    effect: "Heat ↓ 20 pts",
    className: "trees",
  },
  {
    rank: "02",
    icon: Leaf,
    title: "Expand green spaces",
    description:
      "Add parks, gardens and permeable green areas to improve local resilience.",
    impact: "High impact",
    impactClass: "high",
    effect: "Heat ↓ 9 pts",
    className: "green",
  },
  {
    rank: "03",
    icon: Droplets,
    title: "Improve water conservation",
    description:
      "Increase water efficiency and conservation across high-demand areas.",
    impact: "Medium impact",
    impactClass: "medium",
    effect: "Water ↓ 13 pts",
    className: "water",
  },
  {
    rank: "04",
    icon: Waves,
    title: "Strengthen sustainable infrastructure",
    description:
      "Improve drainage, permeability and climate-resilient infrastructure.",
    impact: "Medium impact",
    impactClass: "medium",
    effect: "Flood ↓ 8 pts",
    className: "infra",
  },
];

function AIAnalyst() {
  return (
    <div className="ai-analyst-page">
      <header className="analyst-topbar">
        <Link to="/" className="analyst-back">
          <ArrowLeft size={16} />
          Dashboard
        </Link>

        <div className="analyst-location">
          <span className="location-pulse" />
          <MapPin size={15} />
          Hyderabad, India
        </div>
      </header>

      <main className="analyst-content">
        <section className="analyst-hero">
          <div className="analyst-hero-copy">
            <div className="analyst-eyebrow">
              <Sparkles size={12} />
              AI ENVIRONMENTAL ANALYST
            </div>

            <h1>
              Turn environmental data into
              <span> better decisions.</span>
            </h1>

            <p>
              EcoTwin analyzes the environmental risk profile and identifies
              the interventions with the strongest potential to improve
              resilience.
            </p>

            <div className="analyst-meta">
              <span>
                <MapPin size={13} />
                Hyderabad, India
              </span>
              <span>
                <CheckCircle2 size={13} />
                Analysis complete
              </span>
              <span>
                <Bot size={13} />
                AI-assisted assessment
              </span>
            </div>
          </div>

          <div className="analyst-score">
            <div className="analyst-score-ring">
              <div>
                <span>RISK SCORE</span>
                <strong>76</strong>
                <small>/100</small>
              </div>
            </div>

            <div className="analyst-score-copy">
              <span>PRIMARY CONCERN</span>
              <strong>Heat exposure</strong>
              <p>
                The highest-risk factor and strongest near-term opportunity
                for intervention.
              </p>
            </div>
          </div>
        </section>

        <section className="analyst-insight">
          <div className="insight-ai-icon">
            <Sparkles size={23} />
          </div>

          <div className="insight-content">
            <span>AI PRIORITY INSIGHT</span>
            <h2>
              Tree coverage is the highest-impact opportunity.
            </h2>
            <p>
              Hyderabad's current environmental profile shows elevated heat
              exposure alongside high pollution pressure. Increasing urban
              canopy and green spaces could address both concerns while
              improving resilience to future climate stress.
            </p>

            <div className="reasoning-row">
              <div>
                <Thermometer size={15} />
                <span>Heat risk</span>
                <strong>82</strong>
              </div>

              <div>
                <Leaf size={15} />
                <span>Tree coverage</span>
                <strong>32%</strong>
              </div>

              <div>
                <Waves size={15} />
                <span>Pollution risk</span>
                <strong>73</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="recommendations-section">
          <div className="recommendations-heading">
            <div>
              <span>RECOMMENDED ACTIONS</span>
              <h2>Where should we act first?</h2>
            </div>

            <div className="confidence-pill">
              <CheckCircle2 size={13} />
              High confidence
            </div>
          </div>

          <p className="recommendations-description">
            Ranked by estimated environmental impact across the current
            location profile.
          </p>

          <div className="recommendations-list">
            {recommendations.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className={`recommendation-card ${item.className}`}
                  key={item.rank}
                >
                  <div className="recommendation-rank">{item.rank}</div>

                  <div className="recommendation-icon">
                    <Icon size={21} />
                  </div>

                  <div className="recommendation-copy">
                    <div className="recommendation-title">
                      <h3>{item.title}</h3>
                      <span className={item.impactClass}>{item.impact}</span>
                    </div>

                    <p>{item.description}</p>
                  </div>

                  <div className="recommendation-effect">
                    <span>ESTIMATED EFFECT</span>
                    <strong>{item.effect}</strong>
                  </div>

                  <ArrowRight className="recommendation-arrow" size={17} />
                </article>
              );
            })}
          </div>
        </section>

        <section className="analyst-bottom-grid">
          <div className="reasoning-card">
            <div className="reasoning-header">
              <div className="reasoning-icon">
                <Bot size={19} />
              </div>
              <div>
                <span>ANALYSIS REASONING</span>
                <h3>Why these recommendations?</h3>
              </div>
            </div>

            <div className="reasoning-steps">
              <div>
                <strong>01</strong>
                <p>
                  Heat risk is the largest contributor to the current
                  environmental score.
                </p>
              </div>

              <div>
                <strong>02</strong>
                <p>
                  Low urban canopy creates an actionable opportunity to reduce
                  heat exposure.
                </p>
              </div>

              <div>
                <strong>03</strong>
                <p>
                  Green interventions can provide multiple environmental
                  benefits rather than addressing a single risk.
                </p>
              </div>
            </div>
          </div>

          <div className="analyst-cta">
            <div className="cta-orbit">
              <Sparkles size={20} />
            </div>

            <span>NEXT STEP</span>
            <h3>See what happens if we act.</h3>
            <p>
              Test the recommended interventions and explore their projected
              effect on Hyderabad's environmental risk.
            </p>

            <Link to="/simulator" className="analyst-cta-button">
              Open Impact Simulator
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AIAnalyst;
