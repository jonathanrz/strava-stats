import { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";
import useAxios from "./hooks/useAxios";
import useQuery from "./hooks/useQuery";
import ActivitiesGrouped from "./ActivitiesGrouped";

const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TABS = [
  {
    label: "2km",
    distance: 2000,
  },
  {
    label: "5km",
    distance: 5000,
  },
  {
    label: "7km",
    distance: 7000,
  },
  {
    label: "8km",
    distance: 8000,
  },
  {
    label: "10km",
    distance: 10000,
  },
  {
    label: "12km",
    distance: 12000,
  },
  {
    label: "15km",
    distance: 15000,
  },
  {
    label: "18km",
    distance: 18000,
  },
  {
    label: "21km",
    distance: 21000,
  },
];

function Activities() {
  const [page, setPage] = useState(1);
  const [tabSelected, setTabSelected] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const axios = useAxios();
  const params = useQuery();

  const loadActivities = useCallback(() => {
    setLoading(true);

    axios
      .get(`activities?page=${page}&per_page=50`)
      .then(({ data }) => {
        setHasMore(data.length === 50);
        setActivities([
          ...activities,
          ...data.filter((act) => act.type === "Run"),
        ]);
      })
      .finally(() => setLoading(false));
  }, [page]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(loadActivities, [loadActivities]);

  const code = params.find((p) => p.key === "code");

  if (code) return <Redirect to="/exchange_token" />;

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
      {loading && <div>Loading...</div>}
      <ActivitiesGrouped
        activities={activities}
        distance={TABS[tabSelected].distance}
      />
      {hasMore && (
        <LoadMoreButtonContainer>
          <Button variant="outlined" onClick={() => setPage(page + 1)}>
            Load More
          </Button>
        </LoadMoreButtonContainer>
      )}
    </Box>
  );
}

export default Activities;
