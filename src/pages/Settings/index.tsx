import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { deleteAdminById, fetchAll as fetchAllAdmins } from '../../store/features/adminsSlice';
import { useSelector, useDispatch } from 'react-redux'
import IAdminRecord from '../../types/admins/IAdminRecord';
import { RootState } from '../../store';
import SearchBar from '../../components/SearchBar';
import {searchTypesAdmins} from "../../types/admins/IAdminSearchTypes"

const useStyles = makeStyles({
    container: {
        maxWidth: '90%',
        margin: '0 auto',
    },    
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
    tableCell: {
        padding: '8px 16px',
        border: 'none'
    }
})

const Settings = () => {
    const classes: Record<string, string> = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const admins: IAdminRecord[] = useSelector((state: RootState) => state.admins.data);
    useEffect(() => { 
        if (!admins.length) {
            dispatch(fetchAllAdmins());
        }
    }, [admins.length, dispatch])

    const handleAddAdmin = () => {
        history.push("/adminform")
    }

    const handleEdit = (id: string) => {
        history.push(`/adminform/${id}`)
    }

    const handleDelete = (id: string) => {
        dispatch(deleteAdminById(id));
        history.push("/settings")
    }

    return (
      <div className={classes.container}>
        <SearchBar role="admins" searchTypes={searchTypesAdmins} />
        <IconButton onClick={handleAddAdmin} aria-label="">
          <AddIcon />
        </IconButton>
        <TableContainer className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>Name</TableCell>
                <TableCell className={classes.tableHead}>Surname</TableCell>
                <TableCell className={classes.tableHead}>
                  Email Address
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.tableHead}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins &&
                admins.map((admin) => (
                  <TableRow key={admin._id}>
                    <TableCell className={classes.tableCell}>
                      {admin.name}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {admin.surname}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {admin.email}
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(admin._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(admin._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}

export default Settings;
