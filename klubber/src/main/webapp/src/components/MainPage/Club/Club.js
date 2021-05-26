import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link, useParams} from "react-router-dom"
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItem, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ClubList from "./Clubs/ClubList";
import AuthService from "../../../service/auth/AuthService";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import {Alert, AlertTitle} from "@material-ui/lab";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import Drawer from "@material-ui/core/Drawer";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";


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
    root: {
        display: "flex",
        width: '95%',
    },
    container: {
        height: "600px",
        maxHeight: 600,
        // width: "300px"
    },
    margin: {
        margin: theme.spacing(1),
        color: "white",
        backgroundColor: '#59fa4d',
        borderColor: 'white',
    }

}));

export default function Club(){
    const classes = useStyles();
    let { name } = useParams();

    const [subClub, setSubClub] = useState([]);
    const [subClubUser, setSubClubUser] = useState([]);
    const [isReceived, setIsReceived] = useState(false);
    const [open, setOpen] = useState(false);
    const [leaveClubForm, setLeaveClubForm] = useState({
        name: "",
        user: AuthService.getCurrentUser()
    })

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
        axios.get("/leaveclub/" + name)
            .then(response => {
                console.log(response.data);
                setSubClub(response.data);
                setIsReceived(true)
            })
    }

    useEffect(() => {
        console.log("Club")
        console.log(name)
        axios.get("/listsubclub/" + name)
            .then(response => {
                console.log(response.data);
                setSubClub(response.data);
                setIsReceived(true)
            })
    }, [])

    useEffect(() => {
        console.log("Club")
        console.log(name)
        axios.get("/getclubusers/" + name)
            .then(response => {
                console.log(response.data);
                setSubClubUser(response.data);
            })
    }, [])

    function SubClubList() {
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        SUBCLUB NAME
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subClub.map((row) => (
                                    <TableCell key={row.name}>
                                        <TableRow key={row.name}>
                                            <Link to={"/subclub/" + row.name}>
                                                {row.name}
                                            </Link>
                                        </TableRow>
                                    </TableCell>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </React.Fragment>
        );
    }

    function SubClubUserList() {
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        USER
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subClubUser.map((row) => (
                                    <TableCell key={row.name}>
                                        <TableRow key={row.username}>
                                            <Link>
                                                {row.username}
                                            </Link>
                                        </TableRow>
                                    </TableCell>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </React.Fragment>
        );
    }

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <SubClubUserList/>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>comment</Paper>
                </Grid>
            </React.Fragment>
        );
    }

    function FormRowClub() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <h1> CLUB: {name}</h1>
                </Grid>
                <Grid item xs={12}>
                    <SubClubList/>
                </Grid>
            </React.Fragment>
        );
    }

    return(
        <div className={classes.Club}>
            <Grid container spacing={3}>

                <Grid item xs={9} >
                    <FormRowClub/>
                </Grid>

                <Grid item xs={2} >
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
                        <FormRow />

                    </div>
                </Grid>

                <Grid container item xs={2} spacing={3}>
                </Grid>
            </Grid>

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

    )
}