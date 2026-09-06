import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext(null);

export const LOCATIONS = [
  "Hyderabad",
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Chennai",
];

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem("ecotwin-location") || "Hyderabad";
  });

  const [environment, setEnvironment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("ecotwin-location", location);
  }, [location]);

  useEffect(() => {
    let cancelled = false;

    const loadEnvironment = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:8080/api/environment/${encodeURIComponent(location)}`
        );

        if (!response.ok) {
          throw new Error("Unable to load environmental profile");
        }

        const data = await response.json();

        if (!cancelled) {
          setEnvironment(data);
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError("Unable to connect to the EcoTwin risk engine.");
          setEnvironment(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadEnvironment();

    return () => {
      cancelled = true;
    };
  }, [location]);

  const changeLocation = (nextLocation) => {
    if (LOCATIONS.includes(nextLocation)) {
      setLocation(nextLocation);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        changeLocation,
        environment,
        loading,
        error,
        locations: LOCATIONS,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used inside LocationProvider");
  }

  return context;
}
