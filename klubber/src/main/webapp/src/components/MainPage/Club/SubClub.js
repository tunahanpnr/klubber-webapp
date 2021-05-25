import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom"
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AuthService from "../../../service/auth/AuthService";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    Club:{
        backgroundColor:"#eeead1",
        position:"fixed",
        height:"100%",
        width:"100%",
        zIndex:"1",
        top:"4.6em",
        left:"7.2em",
        paddingTop:"10px",
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    subclub: {
        display:"grid",
        gridRowGap: "25px",

    },
    button: {
        display: 'grid',
        textAlign: "start",
        gridRowGap: "10px"

    },
    head: {
        display: 'grid',
        textAlign: "center",
        gridTemplateColumns: "1fr 1fr",
    },

}));

export default function SubClub(){
    const classes = useStyles();
    let { name } = useParams();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRequest = () => {
        setOpen(false);
    }

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>üye</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>comment</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>event</Paper>
                </Grid>
            </React.Fragment>
        );
    }

    function FormRowPost() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <h1> SUB-CLUB: {name}</h1>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        POST
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    }

    return(
        <div className={classes.Club}>
            <Grid container spacing={3}>

                <Grid item xs={9} >
                    <FormRowPost/>
                </Grid>


                <Grid item xs={2} >
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                        >
                            leave
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            POST
                        </Button>
                        <FormRow />

                    </div>
                </Grid>

                <Grid container item xs={2} spacing={3}>
                </Grid>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{"POST"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="post"
                            label="Post"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRequest} color="primary">
                            send
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

        </div>

    )
}