import { useMemo } from "react";
import dayjs from "dayjs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function ActivitiesGrouped({ activities, distance }) {
  const minDistance = distance - 500;
  const maxDistance = distance + 500;
  const activitiesFiltered = useMemo(
    () =>
      activities.filter(
        (activity) =>
          activity.distance >= minDistance && activity.distance <= maxDistance
      ),
    [activities, minDistance, maxDistance]
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Speed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activitiesFiltered.map((activity) => (
            <TableRow
              key={activity.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {dayjs(activity.start_date).format("MMM, DD YYYY")}
              </TableCell>
              <TableCell>{activity.name}</TableCell>
              <TableCell>{activity.distance}</TableCell>
              <TableCell component="th" scope="row">
                {formatTime(activity.moving_time)}
              </TableCell>
              <TableCell>
                {formatSpeed(activity.moving_time, activity.distance)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ActivitiesGrouped;
