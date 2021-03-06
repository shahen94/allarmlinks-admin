import React, { useState } from 'react'
import IAdminRecord from '../../types/admins/IAdminRecord';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteAdminById, resetAdminsError } from '../../store/features/adminsSlice';
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import AdminEditForm from '../Admin/AdminEditForm';
import ConfirmationDialog from '../../components/Dialog/ConfirmationDialog';
import { RootState } from '../../store';
import { CircularProgress } from '@material-ui/core';
import { ActionStatus } from '../../types/auth/ILoginData';
import { IAdminState } from '../../types/admins/IAdminState';

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
        border: 'none',
        color: '#707070'
    },
    editButton: {
        color: '#3967d6'
    },
    deleteButton: {
        color: '#d0332d'
    }
})

interface Props {
    admin: IAdminRecord;
}

const AdminGridListItem = (props: Props) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { _id, email, name, surname, password }: IAdminRecord = props.admin;
    const classes: Record<string, string> = useStyles();
    const dispatch = useDispatch();
    const adminsState: IAdminState = useSelector(
        (state: RootState) => state.admins
    );

    const closeDialog = () => {
        setDialogOpen(false);
    }

    const handleDelete = (admin: IAdminRecord) => {
        setDialogOpen(true);
    }

    const handleConfirmDelete = (id: string) => {
        dispatch(deleteAdminById(id));
        closeDialog();
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        dispatch(resetAdminsError());
    };

    if (adminsState.status === `UPDATE_ADMINS_${ActionStatus.Pending}`) {
        return (
            <div className="loader-container">
                <CircularProgress disableShrink className="loader" />
            </div>
        );
    }

    return (
        <>
            <TableRow key={_id}>
                <TableCell className={classes.tableCell}>{name}</TableCell>
                <TableCell className={classes.tableCell}>{surname}</TableCell>
                <TableCell className={classes.tableCell}>{email}</TableCell>
                <TableCell className={classes.tableCell}>{password}</TableCell>
                <TableCell align="center" className={classes.tableCell}>
                    <IconButton className={classes.editButton} aria-label="edit" onClick={handleModalOpen}>
                        <EditIcon />
                    </IconButton>
                    <IconButton className={classes.deleteButton} aria-label="delete" onClick={() => handleDelete(props.admin)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="form-modal"
                disableBackdropClick
            >
                <AdminEditForm adminId={_id} onModalClose={handleModalClose} />
            </Modal>
            <ConfirmationDialog
                titleText="Confirm Delete Admin"
                bodyText={`Are you sure you want to delete admin ${name} ${surname}?`}
                open={dialogOpen}
                handleClose={closeDialog}
                handleConfirm={() => handleConfirmDelete(_id)}
                closeButtonText="No"
                confirmButtonText="Yes"
            />
        </>
    )
}

export default AdminGridListItem;
