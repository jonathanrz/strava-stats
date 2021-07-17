import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return useLocation().search.replace('?', '').split('&').map(param => {
    const [key, value] = param.split('=');
    return {key, value};
  });
}

function ExchangeTokenPage() {
  const [athlete, setAthlete] = useState();
  const params = useQuery();
  const code = params.find(p => p.key === 'code');

  useEffect(() => {
    if(!code || !code.value) return;

    axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.REACT_APP_STRAVA_STATS_CLIENT_ID,
      client_secret: process.env.REACT_APP_STRAVA_STATS_CLIENT_SECRET,
      code: code.value,
      grant_type: 'authorization_code'
    }).then(({data}) => setAthlete(data.athlete))
  }, [code]);

  console.log({code});

  return <div>{athlete ? `Successfully signed ${athlete.username}` :  `Loading athlete data`}</div>
}

export default ExchangeTokenPage;