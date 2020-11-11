import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useGlobalStyles from '../../styles/styles';

interface IProps {
    titleText: string;
    bodyText: string;
    open: boolean;
    handleConfirm: () => void;
    handleClose: () => void;
    confirmButtonText?: string;
    closeButtonText?: string;
    defaultFocusConfirm?: boolean;
    defaultPrimaryClose?: boolean;
}

const ConfirmationDialog = (props: IProps) => {
    const globalClasses = useGlobalStyles();
    const { titleText, bodyText, open, handleClose, defaultPrimaryClose, defaultFocusConfirm, closeButtonText, confirmButtonText } = props;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {bodyText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    color={defaultPrimaryClose ? "primary" : "default"}
                    autoFocus={!props.defaultFocusConfirm}
                    className={globalClasses.button}
                >
                    {closeButtonText || "Cancel"}
                </Button>
                <Button
                    onClick={props.handleConfirm}
                    variant="contained"
                    color={!defaultPrimaryClose ? "primary" : "default"}
                    autoFocus={defaultFocusConfirm}
                    className={globalClasses.button}
                >
                    {confirmButtonText || "OK"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog;
