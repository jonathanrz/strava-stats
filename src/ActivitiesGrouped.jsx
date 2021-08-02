import { useMemo } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ActivityRow from "./ActivityRow";

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

  const splits = new Array(distance / 1000)
    .fill(0)
    .map((data, index) => index + 1);

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
            {splits.map((split) => (
              <TableCell key={split}>{split} km</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {activitiesFiltered.map((activity) => (
            <ActivityRow
              key={activity.id}
              activity={activity}
              splits={splits}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ActivitiesGrouped;
