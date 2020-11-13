import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {fetchAll as fetchAllAdmins} from "../../store/features/adminsSlice";
import {useDispatch, useSelector} from "react-redux";
import IAdminRecord from "../../types/admins/IAdminRecord";
import {RootState} from "../../store";
import SubHeader from "./SubHeader";
import {ActionStatus} from '../../types/auth/ILoginData';
import AdminGridListItem from "./AdminGridListItem";
import {CircularProgress} from '@material-ui/core';
import "../../styles/global.scss"

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f4f4f4',
        border: 'none',
        overflowY: 'hidden'
    },
    table: {
        minWidth: 650,
        backgroundColor: '#f4f4f4'
    },
    tableHead: {
        fontWeight: 'bolder'
    },
    tableHead15: {
        width: '15%'
    },
    tableHead22: {
        width: '22%'
    },
    tableCell: {
        padding: '8px 16px',
        border: 'none'
    },
    editButton: {
        color: '#3967d6'
    },
    deleteButton: {
        color: '#d0332d'
    }
});

const Settings = () => {
    const classes: Record<string, string> = useStyles();
    const dispatch = useDispatch();
    const admins: any = useSelector(
        (state: RootState) => state.admins
    );

    useEffect(() => {
        if (!admins.data || !admins.data.length) {
            dispatch(fetchAllAdmins());
        }
    }, []);

    return (
        <div className="main-container">
            <SubHeader count={admins.data.length}/>
            {admins.status === ActionStatus.Success &&
            <TableContainer className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead + " " + classes.tableHead15}>Name</TableCell>
                            <TableCell className={classes.tableHead + " " + classes.tableHead15}>Surname</TableCell>
                            <TableCell className={classes.tableHead + " " + classes.tableHead22}>Email
                                Address</TableCell>
                            <TableCell className={classes.tableHead}>Password</TableCell>
                            <TableCell align="center" className={classes.tableHead}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.data && admins.data.map((admin: IAdminRecord) =>
                            <AdminGridListItem admin={admin}/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            {admins.status === ActionStatus.Pending &&
            <div className = "loader-container">
                <CircularProgress disableShrink className = "loader"/>
            </div>
            }

        </div>
    )
}

export default Settings;
