import { useEffect, useState } from "react";
import { useLocation } from "../context/LocationContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Leaf,
  Building2,
  Trees,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

const interventions = [
  {
    key: "trees",
    title: "Tree Coverage",
    description: "Increase urban canopy and shade coverage.",
    icon: Trees,
    max: 50,
    unit: "%",
  },
  {
    key: "green",
    title: "Green Spaces",
    description: "Add parks, gardens and permeable green areas.",
    icon: Leaf,
    max: 40,
    unit: "%",
  },
  {
    key: "water",
    title: "Water Conservation",
    description: "Improve conservation and water efficiency.",
    icon: Droplets,
    max: 50,
    unit: "%",
  },
  {
    key: "infra",
    title: "Sustainable Infrastructure",
    description: "Improve resilient and low-impact infrastructure.",
    icon: Building2,
    max: 40,
    unit: "%",
  },
];

const baseline = {
  heat: 82,
  water: 67,
  flood: 41,
  pollution: 73,
};

function getLevel(score) {
  if (score >= 70) return "HIGH";
  if (score >= 45) return "MODERATE";
  return "LOW";
}

function WhatIfSimulator() {
  const { location, changeLocation, locations } = useLocation();

  const [values, setValues] = useState({
    trees: 32,
    green: 24,
    water: 28,
    infra: 18,
  });

  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSimulation = async (scenario, selectedLocation = location) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/environment/simulate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: selectedLocation,
            treeCoverage: scenario.trees,
            greenSpaces: scenario.green,
            waterConservation: scenario.water,
            sustainableInfrastructure: scenario.infra,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Simulation request failed");
      }

      const data = await response.json();
      setSimulation(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the EcoTwin risk engine.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation(values);
  }, []);

  const projected = simulation?.projectedRisks ?? baseline;

  const currentOverall = simulation?.currentOverallRisk ?? 76;
  const projectedOverall =
    simulation?.projectedOverallRisk ?? currentOverall;

  const reduction = simulation?.riskReduction ?? 0;
  const reductionPercent = Math.round(
    simulation?.reductionPercent ?? 0
  );

  const updateValue = (key, value) => {
    const nextValues = {
      ...values,
      [key]: Number(value),
    };

    setValues(nextValues);
    runSimulation(nextValues);
  };

  const resetSimulation = () => {
    const defaultValues = {
      trees: 32,
      green: 24,
      water: 28,
      infra: 18,
    };

    setValues(defaultValues);
    runSimulation(defaultValues);
  };

  const currentRisks = simulation?.currentRisks ?? baseline;

  const riskRows = [
    {
      key: "heat",
      label: "Heat Risk",
      current: currentRisks.heat,
      projected: projected.heat,
      color: "heat",
    },
    {
      key: "water",
      label: "Water Stress",
      current: currentRisks.water,
      projected: projected.water,
      color: "water",
    },
    {
      key: "flood",
      label: "Flood Risk",
      current: currentRisks.flood,
      projected: projected.flood,
      color: "flood",
    },
    {
      key: "pollution",
      label: "Pollution",
      current: currentRisks.pollution,
      projected: projected.pollution,
      color: "pollution",
    },
  ];

  return (
    <div className="simulator-page">
      <header className="simulator-topbar">
        <Link to="/" className="back-link">
          <ArrowLeft size={17} />
          Dashboard
        </Link>

        <div className="simulator-location">
          <span className="location-pulse" />

          <select
            value={location}
            onChange={(e) => {
              const nextLocation = e.target.value;
              changeLocation(nextLocation);
              runSimulation(values, nextLocation);
            }}
            aria-label="Select simulation location"
          >
            <option value="Hyderabad">Hyderabad, India</option>
            <option value="Bengaluru">Bengaluru, India</option>
            <option value="Mumbai">Mumbai, India</option>
            <option value="Delhi">Delhi, India</option>
            <option value="Chennai">Chennai, India</option>
          </select>
        </div>
      </header>

      <main className="simulator-content">
        <section className="simulator-heading">
          <div>
            <div className="simulator-eyebrow">
              ENVIRONMENTAL DECISION INTELLIGENCE
            </div>

            <h1>
              What if you could
              <span> change the future?</span>
            </h1>

            <p>
              Explore environmental interventions and instantly see their
              projected effect on {location}'s environmental risk profile.
            </p>
          </div>

          <button
            className="reset-button"
            onClick={resetSimulation}
          >
            <RotateCcw size={15} />
            Reset scenario
          </button>
        </section>

        <section className="simulator-layout">
          <div className="intervention-panel">
            <div className="panel-heading">
              <div>
                <span>SCENARIO DESIGNER</span>
                <h2>Choose your interventions</h2>
              </div>

              <div className="scenario-badge">
                <Sparkles size={13} />
                Live simulation
              </div>
            </div>

            <p className="panel-description">
              Adjust the level of each intervention. EcoTwin recalculates the
              projected risk instantly.
            </p>

            <div className="intervention-list">
              {interventions.map((item) => {
                const Icon = item.icon;
                const value = values[item.key];

                return (
                  <div
                    className={`intervention-item ${item.key}`}
                    key={item.key}
                  >
                    <div className="intervention-top">
                      <div className="intervention-icon">
                        <Icon size={19} />
                      </div>

                      <div className="intervention-copy">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>

                      <strong>{value}%</strong>
                    </div>

                    <input
                      className="intervention-slider"
                      type="range"
                      min="0"
                      max={item.max}
                      value={value}
                      onChange={(event) =>
                        updateValue(item.key, event.target.value)
                      }
                    />

                    <div className="slider-labels">
                      <span>0%</span>
                      <span>{item.max}% maximum</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="projection-panel">
            <div className="projection-heading">
              <div>
                <span>PROJECTED OUTCOME</span>
                <h2>Environmental Impact</h2>
              </div>

              <CheckCircle2 size={21} />
            </div>

            <div className="projection-score">
              <div>
                <span>CURRENT</span>
                <strong>{currentOverall}</strong>
                <small> / 100</small>
              </div>

              <ArrowRight className="projection-arrow" size={24} />

              <div className="projected-score">
                <span>PROJECTED</span>
                <strong>{projectedOverall}</strong>
                <small> / 100</small>
              </div>
            </div>

            <div className="projection-levels">
              <span className="current-level">
                {getLevel(currentOverall)} RISK
              </span>

              <span className="projected-level">
                {getLevel(projectedOverall)} RISK
              </span>
            </div>

            <div className="impact-result">
              <div className="impact-result-main">
                <span>PROJECTED RISK REDUCTION</span>
                <strong>
                  {reduction > 0 ? `−${reductionPercent}%` : "0%"}
                </strong>
              </div>

              <p>
                Your selected interventions could reduce the combined
                environmental risk by approximately {Math.max(reduction, 0)}
                points.
              </p>
            </div>

            <div className="risk-results">
              <div className="results-heading">
                <span>RISK BREAKDOWN</span>
                <span>BEFORE → AFTER</span>
              </div>

              {riskRows.map((risk) => {
                const difference = risk.current - risk.projected;

                return (
                  <div className="result-row" key={risk.key}>
                    <div className="result-name">
                      <span className={`result-dot ${risk.color}`} />
                      {risk.label}
                    </div>

                    <div className="result-values">
                      <strong>{risk.current}</strong>
                      <ArrowRight size={13} />
                      <strong>{risk.projected}</strong>

                      <span className="result-change">
                        {difference > 0 ? `−${difference}` : "0"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="simulation-insight">
          <div className="insight-symbol">
            <Sparkles size={20} />
          </div>

          <div>
            <span>ECOTWIN INSIGHT</span>

            <h3>
              {simulation?.insight ||
                "Adjust the interventions to generate an environmental impact insight."}
            </h3>

            <p>
              This simulation is a scenario model designed to help compare
              intervention strategies. Actual outcomes depend on local
              environmental conditions and implementation.
            </p>
          </div>

          <Link to="/" className="insight-link">
            Return to dashboard
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    </div>
  );
}

export default WhatIfSimulator;
