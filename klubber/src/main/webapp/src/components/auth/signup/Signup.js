import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import icon from "./sign-up.png"
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Dialog} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    signUp: {
        backgroundColor: "#00897b",
        '&:hover': {
            background: "#4db6ac",
        },
        margin: theme.spacing(3, 0, 2),
    },
    signIn: {
        backgroundColor: "#7b1fa2",
        '&:hover': {
            background: "#ab47bc",
        },
    }
}));

export default function Signup(props) {
    const history = useHistory();
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        tc: "",
        password: "",
        role: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const postSignupRequest = () => {
        axios.post("/signup", newUser)
            .then(response => {
                console.log(newUser)
                console.log(response.data)

                if (response.data === "New user added to the system successfully") {
                    history.push("/login");
                }
                else {
                    setErrorMessage(response.data);
                    setOpen(true);
                }
            })
            .catch((e) => {
                console.log("error");
                console.log(e);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <img alt={""} src={icon}/>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        value={newUser.name}
                        onChange={e => setNewUser({...newUser, name: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="surname"
                        label="Surname"
                        name="surname"
                        value={newUser.surname}
                        onChange={e => setNewUser({...newUser, surname: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={newUser.username}
                        onChange={e => setNewUser({...newUser, username: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        value={newUser.email}
                        onChange={e => setNewUser({...newUser, email: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={newUser.password}
                        onChange={e => setNewUser({...newUser, password: e.target.value})}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.signUp}
                        onClick={postSignupRequest}
                    >
                        Sign Up
                    </Button>
                </form>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>{errorMessage}</strong>
                    </Alert>
                </Dialog>
            </div>
        </Container>
    )
}