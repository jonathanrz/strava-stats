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

    if (!splits_metric) return "Metrics not found";

    const currentSplit = splits_metric[index];

    if (!currentSplit) return "Not found";

    const totalTime = sumBy(slice(splits_metric, 0, index + 1), (split) => {
      const secondsPerMeters = split.moving_time / split.distance;
      return secondsPerMeters * 1000;
    });

    return (
      <div>
        <div>{formatTime(totalTime)}</div>
        <div>
          <small>
            {formatSpeed(currentSplit.moving_time, currentSplit.distance)}
          </small>
        </div>
      </div>
    );
  }

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:nth-of-type(even)": { backgroundColor: "#e2e2e2" },
      }}
      hover
    >
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
      <TableCell align="right">
        {(activity.distance / 1000).toFixed(2)} km
      </TableCell>
      <TableCell align="right">{formatTime(activity.moving_time)}</TableCell>
      <TableCell align="right">
        {formatSpeed(activity.moving_time, activity.distance)}
      </TableCell>
      <TableCell align="center">{activity.average_heartrate} bpm</TableCell>
      {splits.map((split, index) => (
        <TableCell
          key={split}
          sx={{
            width: 60,
          }}
          align="right"
        >
          {renderSplitContent(index)}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default ActivityRow;
