import {
  Thermometer,
  Wind,
  CloudRain,
  Trees,
  Droplets,
} from "lucide-react";

const metrics = [
  {
    icon: Thermometer,
    label: "Temperature",
    value: "31°C",
    detail: "2.4°C above average",
    type: "heat",
  },
  {
    icon: Wind,
    label: "Air Quality",
    value: "126",
    detail: "Unhealthy for sensitive groups",
    type: "pollution",
  },
  {
    icon: CloudRain,
    label: "Rainfall",
    value: "42 mm",
    detail: "Last 30 days",
    type: "flood",
  },
  {
    icon: Trees,
    label: "Green Cover",
    value: "18%",
    detail: "Below recommended level",
    type: "impact",
  },
  {
    icon: Droplets,
    label: "Water Availability",
    value: "64%",
    detail: "Moderate availability",
    type: "water",
  },
];

function EnvironmentalPulse() {
  return (
    <section className="pulse-card">
      <div className="pulse-heading">
        <div>
          <span>LOCATION INTELLIGENCE</span>
          <h2>Environmental Pulse</h2>
        </div>

        <div className="pulse-location">
          <span className="pulse-live" />
          Hyderabad
        </div>
      </div>

      <div className="pulse-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div className="pulse-metric" key={metric.label}>
              <div className={`pulse-icon ${metric.type}`}>
                <Icon size={18} />
              </div>

              <div className="pulse-label">{metric.label}</div>

              <div className="pulse-value">{metric.value}</div>

              <div className="pulse-detail">{metric.detail}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EnvironmentalPulse;
