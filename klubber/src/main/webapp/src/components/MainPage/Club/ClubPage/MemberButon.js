import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AuthService from "../../../../service/auth/AuthService";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'grid',
        textAlign: "start",
        gridRowGap: "10px"
    }
}));

export default function MemberButon(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [currentUser] = useState(AuthService.getCurrentUser());
    let history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleRequest = () => {
        setOpen(false);
    }

    const handleLeave = () => {
        console.log("leave")
        console.log(props.name)
        console.log(currentUser.username)
        axios.post("/leaveclub/" + props.name + "/" + currentUser.username)
            .then(response => {
                console.log(response.data);
                history.goBack()
            })
    }

    return (
        <div className={classes.button}>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleLeave}
            >
                leave
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                request sub-club
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{"SUB-CLUB REQUEST"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Sub-club name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequest} color="primary">
                        Request
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}