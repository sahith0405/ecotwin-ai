import {
  Thermometer,
  Droplets,
  Waves,
  Wind,
  ArrowUpRight,
} from "lucide-react";

const icons = {
  heat: Thermometer,
  water: Droplets,
  flood: Waves,
  pollution: Wind,
};

function RiskCard({ type, title, score, status, description }) {
  const Icon = icons[type];

  return (
    <div className="risk-card">
      <div className="risk-card-top">
        <div className={`risk-icon ${type}`}>
          <Icon size={20} strokeWidth={1.8} />
        </div>

        <span className={`risk-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="risk-card-title">{title}</div>

      <div className="risk-score-row">
        <span className="risk-score">{score}</span>
        <span className="risk-out-of">/100</span>

        <div className="risk-arrow">
          <ArrowUpRight size={17} />
        </div>
      </div>

      <p>{description}</p>

      <div className="risk-progress">
        <div
          className={`risk-progress-fill ${type}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default RiskCard;
