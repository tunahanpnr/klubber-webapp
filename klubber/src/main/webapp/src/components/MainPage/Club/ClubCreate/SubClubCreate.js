import React, {useEffect, useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CCForm from "./CCForm";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";

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

function Alert(props) {
    return null;
}

Alert.propTypes = {
    severity: PropTypes.string,
    children: PropTypes.node
};

function AlertTitle(props) {
    return null;
}

AlertTitle.propTypes = {children: PropTypes.node};
export default function SubClubCreate(){
    const classes = useStyles();
    const [clubs, setClubs] = useState([]);
    const [users, setUsers] = useState([]);

    const [subClubCreateForm, setSubClubCreateForm] = useState({
        name: "",
        adminId: "",
        clubId: "",
    })

    useEffect(() => {
        axios.get("/listclub")
            .then(response => {
                console.log(response.data);
                setClubs(response.data);
            })
    },[])

    useEffect(() => {
        axios.get("/fetchusers")
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
    },[])


    const postSubClubCreateRequest = () => {
        axios.post("/createsubclub", subClubCreateForm)
            .then(
                (response) => {
                    console.log("SUB-CLUB CREATE")
                    console.log(response);
                    if(response.data === ""){
                        console.log("No response")
                    }
                },
            ).catch(
            (error) => {
                console.log(error);
            })
    }



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
                        value={subClubCreateForm.clubId}
                        onChange={e => setSubClubCreateForm({...subClubCreateForm, clubId: e.target.value})}
                    >
                        {clubs.map((club) => (
                            <MenuItem key={club.id} value={club.id}>
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
                        value={subClubCreateForm.adminId}
                        onChange={e => setSubClubCreateForm({...subClubCreateForm, adminId: e.target.value})}
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
            </div>
        </Container>
    )
}