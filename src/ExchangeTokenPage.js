import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import useQuery from "./hooks/useQuery";

function ExchangeTokenPage() {
  const [athlete, setAthlete] = useState();
  const params = useQuery();
  const code = params.find((p) => p.key === "code");

  useEffect(() => {
    if (!code || !code.value) return;

    axios
      .post("https://www.strava.com/oauth/token", {
        client_id: process.env.REACT_APP_STRAVA_STATS_CLIENT_ID,
        client_secret: process.env.REACT_APP_STRAVA_STATS_CLIENT_SECRET,
        code: code.value,
        grant_type: "authorization_code",
      })
      .then(({ data }) => {
        Cookie.set("token", data.access_token);
        setAthlete(data.athlete);
      });
  }, [code]);

  return (
    <div>
      {athlete ? (
        <div>
          <span>Successfully signed {athlete.username}</span>
          <Redirect to="/" />
        </div>
      ) : (
        `Loading athlete data`
      )}
    </div>
  );
}

export default ExchangeTokenPage;
