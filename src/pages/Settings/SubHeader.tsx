import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import AdminForm from '../Admin/AdminForm';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "../../components/SearchBar";
import { searchTypesAdmins } from "../../types/admins/AdminSearchTypes"

const useStyles = makeStyles({
    addButton: {
        color: '#3967d6'
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
            <div className="subheader-container">
                <Typography variant="h5" component="h5">
                    {count} Admins
                    </Typography>
                <SearchBar role="admins" searchTypes={searchTypesAdmins} />
                <IconButton onClick={handleModalOpen} aria-label="" className={classes.addButton}>
                    <AddIcon fontSize="large" />
                </IconButton>
            </div>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="form-modal"
                disableBackdropClick
            >
                <AdminForm onModalClose={handleModalClose} />
            </Modal>
        </div>
    )
}

export default SubHeader;