import {
  Bell,
  Search,
  MapPin,
  ChevronDown,
  User,
  LogOut,
  Check,
  X,
  ShieldCheck,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "../context/LocationContext";

function TopBar() {
  const {
    location,
    changeLocation,
    locations,
    environment,
  } = useLocation();

  const [search, setSearch] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [panel, setPanel] = useState(null);

  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem("ecotwin-notification-preferences");

      return saved
        ? JSON.parse(saved)
        : {
            highRisk: true,
            heat: true,
            pollution: true,
            updates: true,
          };
    } catch {
      return {
        highRisk: true,
        heat: true,
        pollution: true,
        updates: true,
      };
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "ecotwin-notification-preferences",
      JSON.stringify(preferences)
    );
  }, [preferences]);

  const filteredLocations = locations.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const risk = environment?.overallRisk ?? 0;
  const risks = environment?.risks ?? {};

  const notifications = [
    ...(preferences.highRisk && risk >= 70
      ? [
          {
            level: "high",
            title: "High environmental risk",
            message: `${location} currently has an overall risk score of ${risk}/100.`,
          },
        ]
      : []),

    ...(preferences.heat && risks.heat >= 70
      ? [
          {
            level: "warning",
            title: "Heat exposure",
            message: `Heat risk is currently ${risks.heat}/100.`,
          },
        ]
      : []),

    ...(preferences.pollution && risks.pollution >= 70
      ? [
          {
            level: "warning",
            title: "Pollution pressure",
            message: `Pollution risk is currently ${risks.pollution}/100.`,
          },
        ]
      : []),

    ...(preferences.updates
      ? [
          {
            level: "positive",
            title: "EcoTwin ready",
            message:
              "Run a What-If simulation to compare environmental interventions.",
          },
        ]
      : []),
  ];

  const selectLocation = (nextLocation) => {
    changeLocation(nextLocation);
    setShowLocation(false);
    setShowNotifications(false);
    setShowProfile(false);
    setPanel(null);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);

    const exactMatch = locations.find(
      (item) => item.toLowerCase() === value.trim().toLowerCase()
    );

    if (exactMatch) {
      selectLocation(exactMatch);
      setSearch("");
    }
  };

  const openPanel = (type) => {
    setPanel(type);
    setShowProfile(false);
    setShowNotifications(false);
    setShowLocation(false);
  };

  const closePanel = () => {
    setPanel(null);
  };

  const togglePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <>
      <header className="topbar">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search locations, risks..."
            aria-label="Search locations"
          />

          {search && filteredLocations.length > 0 && (
            <div className="search-results">
              {filteredLocations.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    selectLocation(item);
                    setSearch("");
                  }}
                >
                  <MapPin size={15} />
                  <span>{item}, India</span>
                </button>
              ))}
            </div>
          )}

          {search && filteredLocations.length === 0 && (
            <div className="search-empty">
              No supported location found
            </div>
          )}
        </div>

        <div className="topbar-actions">

          {/* LOCATION */}
          <div className="location-wrapper">
            <button
              className={`location-selector ${
                showLocation ? "location-selector-open" : ""
              }`}
              onClick={() => {
                setShowLocation(!showLocation);
                setShowNotifications(false);
                setShowProfile(false);
                setPanel(null);
              }}
              aria-label="Select environmental location"
              aria-expanded={showLocation}
            >
              <MapPin size={17} />
              <span>{location}, India</span>

              <ChevronDown
                size={16}
                className={`location-chevron ${
                  showLocation ? "rotated" : ""
                }`}
              />
            </button>

            {showLocation && (
              <div className="location-menu">
                <div className="location-menu-header">
                  <span>ENVIRONMENTAL LOCATION</span>
                  <strong>Select a city</strong>
                </div>

                <div className="location-options">
                  {locations.map((item) => (
                    <button
                      key={item}
                      className={`location-option ${
                        item === location ? "selected" : ""
                      }`}
                      onClick={() => selectLocation(item)}
                    >
                      <span className="location-option-icon">
                        <MapPin size={15} />
                      </span>

                      <span className="location-option-name">
                        {item}
                        <small>India</small>
                      </span>

                      {item === location && (
                        <Check size={16} className="location-check" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div className="notification-wrapper">
            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowLocation(false);
                setShowProfile(false);
                setPanel(null);
              }}
            >
              <Bell size={19} />

              {notifications.length > 0 && (
                <span className="notification-dot" />
              )}
            </button>

            {showNotifications && (
              <div className="topbar-popover notification-popover">
                <div className="popover-header">
                  <div>
                    <span>ECOTWIN ALERTS</span>
                    <h3>Notifications</h3>
                  </div>

                  <Bell size={17} />
                </div>

                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div className="notification-empty">
                      <Check size={18} />
                      <span>No active notifications</span>
                    </div>
                  ) : (
                    notifications.map((notification, index) => (
                      <div
                        className="notification-item"
                        key={`${notification.title}-${index}`}
                      >
                        <span
                          className={`notification-status ${notification.level}`}
                        />

                        <div>
                          <strong>{notification.title}</strong>
                          <p>{notification.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="profile-wrapper">
            <button
              className="profile profile-button"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
                setShowLocation(false);
                setPanel(null);
              }}
              aria-label="Open profile menu"
              aria-expanded={showProfile}
            >
              <div className="avatar">S</div>

              <div className="profile-info">
                <strong>Sahith</strong>
                <span>Environmental Explorer</span>
              </div>

              <ChevronDown
                size={15}
                className={
                  showProfile
                    ? "profile-chevron rotated"
                    : "profile-chevron"
                }
              />
            </button>

            {showProfile && (
              <div className="topbar-popover profile-popover">
                <div className="profile-menu-heading">
                  <div className="avatar large">S</div>

                  <div>
                    <strong>Sahith</strong>
                    <span>Environmental Explorer</span>
                  </div>
                </div>

                <button
                  className="profile-menu-item"
                  onClick={() => openPanel("profile")}
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>

                <button
                  className="profile-menu-item"
                  onClick={() => openPanel("preferences")}
                >
                  <Bell size={16} />
                  <span>Notification preferences</span>
                </button>

                <button
                  className="profile-menu-item logout"
                  onClick={() => {
                    localStorage.removeItem("ecotwin-location");
                    window.location.href = "/";
                  }}
                >
                  <LogOut size={16} />
                  <span>Reset session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PROFILE / NOTIFICATION SETTINGS MODAL */}
      {panel && (
        <div className="topbar-panel-backdrop" onClick={closePanel}>
          <div
            className="topbar-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="topbar-panel-header">
              <div>
                <span>ECOTWIN</span>
                <h2>
                  {panel === "profile"
                    ? "Your Profile"
                    : "Notification Preferences"}
                </h2>
              </div>

              <button
                className="topbar-panel-close"
                onClick={closePanel}
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {panel === "profile" && (
              <div className="topbar-panel-content">
                <div className="profile-large-card">
                  <div className="avatar profile-avatar-large">S</div>

                  <div>
                    <strong>Sahith</strong>
                    <span>Environmental Explorer</span>
                  </div>
                </div>

                <div className="profile-details">
                  <div>
                    <span>ACTIVE LOCATION</span>
                    <strong>
                      <MapPin size={14} />
                      {location}, India
                    </strong>
                  </div>

                  <div>
                    <span>PLATFORM</span>
                    <strong>
                      <Leaf size={14} />
                      EcoTwin Environmental AI
                    </strong>
                  </div>

                  <div>
                    <span>STATUS</span>
                    <strong>
                      <ShieldCheck size={14} />
                      Explorer
                    </strong>
                  </div>
                </div>

                <div className="topbar-panel-note">
                  <ShieldCheck size={16} />
                  <span>
                    Your selected location is shared across Dashboard,
                    Risk Analysis, AI Analyst and What-If Simulator.
                  </span>
                </div>
              </div>
            )}

            {panel === "preferences" && (
              <div className="topbar-panel-content">
                <div className="preferences-intro">
                  <Bell size={20} />
                  <div>
                    <strong>Choose what EcoTwin alerts you about.</strong>
                    <p>
                      Your preferences are saved locally on this device.
                    </p>
                  </div>
                </div>

                <div className="preference-list">
                  {[
                    {
                      key: "highRisk",
                      title: "High-risk alerts",
                      description:
                        "Alert me when overall environmental risk is high.",
                    },
                    {
                      key: "heat",
                      title: "Heat alerts",
                      description:
                        "Show alerts when heat exposure is elevated.",
                    },
                    {
                      key: "pollution",
                      title: "Pollution alerts",
                      description:
                        "Show alerts when pollution pressure is elevated.",
                    },
                    {
                      key: "updates",
                      title: "EcoTwin updates",
                      description:
                        "Show useful tips and simulation reminders.",
                    },
                  ].map((item) => (
                    <div className="preference-row" key={item.key}>
                      <div className="preference-text">
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>

                      <button
                        type="button"
                        className={`preference-toggle ${
                          preferences[item.key] ? "enabled" : ""
                        }`}
                        onClick={() => togglePreference(item.key)}
                        aria-label={`Toggle ${item.title}`}
                        aria-pressed={preferences[item.key]}
                      >
                        <span />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="preference-footer">
                  <AlertTriangle size={15} />
                  <span>
                    Alerts are generated from the current EcoTwin risk
                    profile and are not live emergency warnings.
                  </span>
                </div>

                <button
                  className="preferences-done"
                  onClick={closePanel}
                >
                  Save & Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TopBar;
