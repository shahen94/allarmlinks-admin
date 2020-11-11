import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import AdminForm from '../Admin/AdminForm';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    addButton: {
        color: '#3967d6'
    },
    formModal: {
        top: '100px !important',
        right: '100px !important',
        left: 'unset !important'
        //   display: 'inline-flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',
    }
})

interface IProps {
    count: number
}

const SubHeader = ({ count }: IProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const classes: Record<string, string> = useStyles();

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h5" component="h5">
                        {count} Admins
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <IconButton onClick={handleModalOpen} aria-label="" className={classes.addButton}>
                        <AddIcon />
                    </IconButton>
                </Grid>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.formModal}
                    disableBackdropClick
                >
                    <AdminForm onModalClose={handleModalClose} />
                </Modal>
            </Grid>
        </div>
    )
}

export default SubHeader;