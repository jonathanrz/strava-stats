import { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useAxios from "./hooks/useAxios";
import useAsync from "./hooks/useAsync";
import ActivitiesGrouped from "./ActivitiesGrouped";

const TABS = [
  {
    label: "5km",
    distance: 5000,
  },
  {
    label: "7km",
    distance: 7000,
  },
  {
    label: "10km",
    distance: 10000,
  },
];

function Activities() {
  const [tabSelected, setTabSelected] = useState(0);
  const axios = useAxios();
  const activitiesAsync = useAsync(
    () => axios.get("activities").then(({ data }) => data),
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabSelected}
          onChange={(event, newValue) => setTabSelected(newValue)}
        >
          {TABS.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <ActivitiesGrouped
        activities={activitiesAsync.data || []}
        distance={TABS[tabSelected].distance}
      />
    </Box>
  );
}

export default Activities;
