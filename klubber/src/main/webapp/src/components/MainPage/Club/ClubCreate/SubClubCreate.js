import React, {useEffect, useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../../../service/auth/AuthService";
import {Alert, AlertTitle} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 140,
    },
    button: {
        backgroundColor: "#008937",
        '&:hover': {
            background: "#008932",
        },
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SubClubCreate(){
    const classes = useStyles();
    const [clubs, setClubs] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [open, setOpen] = useState(false);
    const [added, setAdded] = useState(false);

    const [subClubCreateForm, setSubClubCreateForm] = useState({
        name: "",
        admin_id: currentUser,
        club_id: null,
    })

    useEffect(() => {
        axios.get("/listclub")
            .then(response => {
                console.log("-----")
                console.log(response.data);
                setClubs(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get("/fetchusers")
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const postSubClubCreateRequest = () => {
        {console.log("****")}
        {console.log(subClubCreateForm)}
        {console.log(open)}
        handleClickOpen()

        axios.post("/createsubclub", subClubCreateForm)
            .then(
                (response) => {
                    console.log("SUB-CLUB CREATE")
                    console.log(response);
                    setAdded(true);
                    if(response.data == ""){
                        console.log("No response")
                    }
                },
            ).catch(
            (error) => {
                console.log(error);
            })
    }


    const handleChange = (event) => {
        console.log(event.target.value);
        {clubs.map((club) => (
            (event.target.value == club.name) ?
            setSubClubCreateForm({...subClubCreateForm, club_id: club}) : null
        ))}
    };


    return(
        <Container component="main" maxWidth="xs">
            <div className={useStyles().paper}>
                <Typography component="h1" variant="h5">
                    Sub Club Create Page
                </Typography>

                <FormControl className={classes.formControl} fullWidth="true" >
                    <InputLabel id="clubName-label">Club</InputLabel>
                    <Select
                        labelId="clubName-select-label"
                        id="clubName-select"
                        value={subClubCreateForm.club_id}
                        onChange={e => setSubClubCreateForm({...subClubCreateForm, club_id: e.target.value})}
                        // onChange={handleChange}

                    >
                        {clubs.map((club) => (
                            <MenuItem key={club.name} value={club.name}>
                                {club.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Sub-Club Name"
                    name="subClubName"
                    autoComplete="subClubName"
                    autoFocus
                    value={subClubCreateForm.name}
                    onChange={e => setSubClubCreateForm({...subClubCreateForm, name: e.target.value})}
                />
                <FormControl className={classes.formControl} fullWidth="true">
                    <InputLabel id="admin-label">Admin</InputLabel>
                    <Select
                        labelId="admin-select-label"
                        id="admin-select"
                        // value={subClubCreateForm.admin_id}
                        // onChange={e => setSubClubCreateForm({...subClubCreateForm, admin_id: e.target.value})}
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    onClick={postSubClubCreateRequest}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                >
                    Create Sub-Club!
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {added == true ?
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>Sub-Club added to the system successfully</strong>
                    </Alert> :
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>ERROR! Could not create club</strong>
                    </Alert>}
                </Dialog>
            </div>
        </Container>
    )
}