import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { rows } from './SampleAdmins';
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
import { fetchAll } from '../../store/features/adminsSlice';
import { useSelector, useDispatch } from 'react-redux'
import IAdminRecord from '../../types/admins/IAdminRecord';
import { RootState } from '../../store';

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

interface IProps {

}

const Settings = (props: IProps) => {
    const classes: Record<string, string> = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const admins: IAdminRecord[] = useSelector((state: RootState) => state.admins.admins)
    useEffect(() => {
        if (!admins.length) {
            dispatch(fetchAll())
        }
    }, [])

    const handleAddAdmin = (/*id: string*/) => {
        history.push("/adminform")
    }

    const handleEdit = (id: string) => {
        history.push(`/adminform/${id}`)
    }

    const handleDelete = () => {
        history.push("/settings")
    }

    return (
        <div /*className='admin-grid-container'*/ className={classes.container}>
            <IconButton onClick={handleAddAdmin} aria-label="">
                <AddIcon />
            </IconButton>
            <TableContainer className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>Name</TableCell>
                            <TableCell className={classes.tableHead}>Surname</TableCell>
                            <TableCell className={classes.tableHead}>Email Address</TableCell>
                            <TableCell align="right" className={classes.tableHead}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell className={classes.tableCell}>{row.name}</TableCell>
                                <TableCell className={classes.tableCell}>{row.surname}</TableCell>
                                <TableCell className={classes.tableCell}>{row.email}</TableCell>
                                <TableCell align="right" className={classes.tableCell}>
                                    <IconButton aria-label="edit" onClick={() => handleEdit(row._id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={handleDelete}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Settings;
