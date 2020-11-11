import React, { useEffect, useState } from 'react'
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
import SubHeader from './SubHeader';
import ConfirmationDialog from '../../components/Dialog/ConfirmationDialog';

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
})

interface IAdminRecordForDialog {
    _id: string;
    name: string;
    surname: string;
}

const Settings = () => {
    const classes: Record<string, string> = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const admins: IAdminRecord[] = useSelector((state: RootState) => state.admins.data);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [deleteDialogData, setDeleteDialogData] = useState<IAdminRecordForDialog>();

    useEffect(() => {
        if (!admins.length) {
            dispatch(fetchAllAdmins());
        }
    }, [admins.length, dispatch])

    const handleEdit = (id: string) => {
        history.push(`/adminform/${id}`)
    }

    const closeDialog = () => {
        setDialogOpen(false);
    }

    const handleDelete = (admin: IAdminRecord) => {
        const { _id, name, surname } = admin;
        setDeleteDialogData({ _id, name, surname });
        setDialogOpen(true);

    }

    const handleConfirmDelete = (id: string) => {
        dispatch(deleteAdminById(id));
        closeDialog();
    }

    return (
        <>
            <SubHeader count={admins.length} />
            <TableContainer className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>Name</TableCell>
                            <TableCell className={classes.tableHead}>Surname</TableCell>
                            <TableCell className={classes.tableHead}>Email Address</TableCell>
                            <TableCell className={classes.tableHead}>Password</TableCell>
                            <TableCell align="right" className={classes.tableHead}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins && admins.map((admin) => {
                            const { _id, email, name, surname, password }: IAdminRecord = admin;
                            return (
                                <TableRow key={admin._id}>
                                    <TableCell className={classes.tableCell}>{name}</TableCell>
                                    <TableCell className={classes.tableCell}>{surname}</TableCell>
                                    <TableCell className={classes.tableCell}>{email}</TableCell>
                                    <TableCell className={classes.tableCell}>{password}</TableCell>
                                    <TableCell align="right" className={classes.tableCell}>
                                        <IconButton className={classes.editButton} aria-label="edit" onClick={() => handleEdit(_id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton className={classes.deleteButton} aria-label="delete" onClick={() => handleDelete(admin)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                {deleteDialogData && deleteDialogData._id && <ConfirmationDialog
                    titleText="Confirm Delete Admin"
                    bodyText={`Are you sure you want to delete admin ${deleteDialogData.name} ${deleteDialogData.surname}?`}
                    open={dialogOpen}
                    handleClose={closeDialog}
                    handleConfirm={() => handleConfirmDelete(deleteDialogData._id)}
                    closeButtonText="No"
                    confirmButtonText="Yes"
                />}
            </TableContainer>
        </>
    )
}

export default Settings;
