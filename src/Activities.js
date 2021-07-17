import useAxios from "./hooks/useAxios";
import useAsync from "./hooks/useAsync";

function Activities() {
  const axios = useAxios();
  const activitiesAsync = useAsync(() => axios.get("activities"), []);

  console.log({ activitiesAsync });

  return <div>Activities</div>;
}

export default Activities;
