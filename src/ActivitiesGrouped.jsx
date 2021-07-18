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
    const duration = dayjs(time * 1000).subtract(
      dayjs().utcOffset(),
      "minutes"
    );

    return duration.format("HH:mm:ss");
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activitiesFiltered.map((activity) => (
            <TableRow
              key={activity.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {formatTime(activity.elapsed_time)}
              </TableCell>
              <TableCell>{activity.average_speed}</TableCell>
              <TableCell>{activity.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ActivitiesGrouped;
