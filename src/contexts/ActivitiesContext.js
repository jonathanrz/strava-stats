import React, { useRef } from "react";
import useAxios from "../hooks/useAxios";

const ActivitiesContext = React.createContext();

function ActivitiesProvider({ children }) {
  const activitiesCache = useRef({});
  const axios = useAxios();

  function loadActivity(id) {
    if (activitiesCache.current[id]) return activitiesCache.current[id];

    activitiesCache.current[id] = axios
      .get(`activities/${id}`)
      .then(({ data }) => data);

    return activitiesCache.current[id];
  }

  return (
    <ActivitiesContext.Provider value={{ loadActivity }}>
      {children}
    </ActivitiesContext.Provider>
  );
}

function useActivitiesContext() {
  const context = React.useContext(ActivitiesContext);
  if (context === undefined) {
    throw new Error(
      "useActivitiesContext must be used within a ActivitiesProvider"
    );
  }
  return context;
}

export { ActivitiesProvider, useActivitiesContext };
