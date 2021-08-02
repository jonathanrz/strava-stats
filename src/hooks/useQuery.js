import { useLocation } from "react-router-dom";

function useQuery() {
  return useLocation()
    .search.replace("?", "")
    .split("&")
    .map((param) => {
      const [key, value] = param.split("=");
      return { key, value };
    });
}

export default useQuery;
