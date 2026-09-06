import {
  Bell,
  Search,
  MapPin,
  ChevronDown,
} from "lucide-react";

function TopBar() {
  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search locations, risks..."
          aria-label="Search"
        />
      </div>

      <div className="topbar-actions">
        <button className="location-selector">
          <MapPin size={17} />
          <span>Hyderabad, India</span>
          <ChevronDown size={16} />
        </button>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="profile">
          <div className="avatar">S</div>

          <div className="profile-info">
            <strong>Sahith</strong>
            <span>Environmental Explorer</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
