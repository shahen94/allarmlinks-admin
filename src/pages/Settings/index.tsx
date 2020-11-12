import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { fetchAll as fetchAllAdmins } from "../../store/features/adminsSlice";
import { useSelector, useDispatch } from "react-redux";
import IAdminRecord from "../../types/admins/IAdminRecord";
import { RootState } from "../../store";
import SubHeader from "./SubHeader";
import AdminGridListItem from "./AdminGridListItem";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f4f4f4",
    border: "none",
    overflowY: "hidden",
  },
  table: {
    minWidth: 650,
    backgroundColor: "#f4f4f4",
  },
  tableHead: {
    fontWeight: "bolder",
  },
  tableCell: {
    padding: "8px 16px",
    border: "none",
  },
  editButton: {
    color: "#3967d6",
  },
  deleteButton: {
    color: "#d0332d",
  },
});

const Settings = () => {
  const classes: Record<string, string> = useStyles();
  const dispatch = useDispatch();
  const admins: IAdminRecord[] = useSelector(
    (state: RootState) => state.admins.data
  );

  useEffect(() => {
    if (!admins || !admins.length) {
      dispatch(fetchAllAdmins());
    }
  }, []);

  return (
    <div className="main-container">
      <SubHeader count={admins.length} />
      <TableContainer className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Name</TableCell>
              <TableCell className={classes.tableHead}>Surname</TableCell>
              <TableCell className={classes.tableHead}>Email Address</TableCell>
              <TableCell className={classes.tableHead}>Password</TableCell>
              <TableCell className={classes.tableHead}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins &&
              admins.map((admin: IAdminRecord) => (
                <AdminGridListItem admin={admin} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Settings;
