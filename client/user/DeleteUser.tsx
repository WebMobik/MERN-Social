import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { remove } from '../api/user';
import auth from '../auth/auth-helper';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import { StateComponentT } from './types';

const DeleteUser = ({ userId }) => {
    const history = useHistory()
    const [state, setState] = useState<StateComponentT>()
    const jwt = auth.isAuthenticated()

    const handleDeleteUser = () => {
        remove({userId}, {t: jwt.token})
            .then(data => {
                if(data && data.error) {
                    setState({...state, error: data.error})
                } else {
                    auth.clearJWT(() => console.log('user deleted'))
                    history.replace('/')
                }
            })
    }

    const handleClose = () => {
        setState({...state, open: false})
    }

    const handleOpen = () => {
        setState({...state, open: true})
    }

    return (
        <span>
            <IconButton aria-label="Delete" onClick={handleOpen} color="secondary">
                <DeleteIcon/>
            </IconButton>

            <Dialog open={state.open} onClose={handleClose}>
                <DialogTitle>{"Delete Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete your account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteUser} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
};

export default DeleteUser