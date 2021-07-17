import { useMemo } from "react";
import axios from "axios";
import Cookie from "js-cookie";

function useAxios() {
  const token = Cookie.get("token");

  return useMemo(() => {
    return axios.create({
      baseURL: "https://www.strava.com/api/v3/",
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [token]);
}

export default useAxios;