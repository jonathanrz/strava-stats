import dayjs from "dayjs";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import slice from "lodash/slice";
import sumBy from "lodash/sumBy";
import useAsync from "./hooks/useAsync";
import { useActivitiesContext } from "./contexts/ActivitiesContext";

function ActivityRow({ activity, splits }) {
  const { loadActivity } = useActivitiesContext();

  const activityDataAsync = useAsync(
    () => loadActivity(activity.id),
    [activity.id]
  );

  function formatTime(time) {
    const duration = dayjs.duration(time * 1000);

    if (duration.hours() > 0) return duration.format("H[h]mm[m]ss[s]");

    return duration.format("mm[m]ss[s]");
  }

  function formatSpeed(time, distance) {
    const secondsPerMeters = time / distance;
    const secondsPerKm = secondsPerMeters * 1000;
    const minutesPerKm = Math.trunc(secondsPerKm / 60);
    let secondsRestPerKm = Math.trunc(secondsPerKm % 60).toString();
    if (secondsRestPerKm.length === 1)
      secondsRestPerKm = "0" + secondsRestPerKm;
    return `${minutesPerKm}:${secondsRestPerKm}/km`;
  }

  function renderSplitContent(index) {
    if (activityDataAsync.loading) return "...";
    if (activityDataAsync.error) return "Error";

    const { splits_metric } = activityDataAsync.data;

    const currentSplit = splits_metric[index];

    if (!currentSplit) return "Not found";

    const totalTime = sumBy(slice(splits_metric, 0, index + 1), "moving_time");

    return `${formatSpeed(currentSplit.moving_time, currentSplit.distance)} -
      ${formatTime(totalTime)}`;
  }

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {dayjs(activity.start_date).format("MMM, DD YYYY")}
      </TableCell>
      <TableCell>
        <a
          href={`https://www.strava.com/activities/${activity.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {activity.name}
        </a>
      </TableCell>
      <TableCell>{(activity.distance / 1000).toFixed(2)} km</TableCell>
      <TableCell component="th" scope="row">
        {formatTime(activity.moving_time)}
      </TableCell>
      <TableCell>
        {formatSpeed(activity.moving_time, activity.distance)}
      </TableCell>
      {splits.map((split, index) => (
        <TableCell
          key={split}
          sx={{
            width: 60,
          }}
        >
          {renderSplitContent(index)}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default ActivityRow;
