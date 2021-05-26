import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AuthService from "../../../../service/auth/AuthService";
import axios from "axios";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'grid',
        textAlign: "start",
        gridRowGap: "10px"

    }
}));



export default function AdminButton(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [currentUser] = useState(AuthService.getCurrentUser());
    let history = useHistory();


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeContent = (cont) => {
        setContent(cont.target.value);
    };

    const handleChangeClubName = () => {
        {console.log("update")}
        {console.log("/updateclub/" + props.name + "/" + currentUser.username)}
        axios.post("/updateclub/" + props.name + "/" + currentUser.username, {name:content})
            .then((response) => {
                console.log(response.data)
                history.goBack()
        })
        setOpen(false);
    }


    return (
        <div className={classes.button}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                >
                    update name
                </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{"new club name"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newName"
                        label="new name"
                        fullWidth
                        value={content}
                        onChange={handleChangeContent}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleChangeClubName} color="primary">
                        change
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}