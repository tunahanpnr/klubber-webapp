import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import icon from "./user.png";
import axios from "axios";
import AuthService from "../../../service/auth/AuthService";

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
    signIn: {
        backgroundColor: "#00897b",
        '&:hover': {
            background: "#4db6ac",
        },
        margin: theme.spacing(3, 0, 2),
    },
    signUp: {
        backgroundColor: "#7b1fa2",
        '&:hover': {
            background: "#ab47bc",
        },
    }
}));

export default function Login(props ) {
    const classes = useStyles();

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const postLoginRequest = () => {
        console.log("postLogin")
        AuthService.login(user)
            .then(
                () => {
                    console.log(user);
                    props.history.push("/home");
                    window.location.reload();
                },
            ).catch(
            (error) => {
                console.log(error.response.data);
            })
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <img src={icon}/>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={user.username}
                        onChange={e => setUser({...user, username: e.target.value})}
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
                        autoComplete="current-password"
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
                    />
                    <Button
                        onClick={postLoginRequest}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.signIn}
                    >
                        Sign In
                    </Button>
                    <Button
                        href="/signup"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.signUp}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    )

}