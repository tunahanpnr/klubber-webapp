import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../service/auth/AuthService";
import Button from "@material-ui/core/Button";
import axios from "axios";


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
        backgroundColor: "#7b1fa2",
        '&:hover': {
            background: "#ab47bc",
        },
    }, signUp: {
        backgroundColor: "#00897b",
        '&:hover': {
            background: "#4db6ac",
        },
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Profile() {
    const classes = useStyles();

    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [updatedUser, setUpdatedUser] = useState(AuthService.getCurrentUser());
    const [changePass, setChangePass] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const [passEnable, setPassEnable] = useState(false);


    const postUpdateUser = () => {
        console.log("/updateprofile/" + currentUser.username)
        console.log(updatedUser)
        axios.post("/updateprofile/" + currentUser.username, updatedUser)
            .then(response => {
                console.log(updatedUser)
                console.log(response)
                if (response.data === "Your profile updated successfully")
                    localStorage.setItem("user", JSON.stringify(setUpdatedUser));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const postChangePassword = () => {
        console.log("/changepassword/" + currentUser.username)
        console.log(updatedUser)
        axios.post("/changepassword/" + currentUser.username, changePass)
            .then(response => {
                console.log(changePass)
                console.log(response)

                setChangePass({
                    oldPassword: "",
                    newPassword: ""
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    My Profile
                </Typography>
                <form className={classes.form}>
                    {!passEnable && <div><TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        value={updatedUser.name}
                        onChange={e => setUpdatedUser({...updatedUser, name: e.target.value})}
                    />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="surname"
                            label="Surname"
                            name="surname"
                            value={updatedUser.surname}
                            onChange={e => setUpdatedUser({...updatedUser, surname: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={updatedUser.username}
                            onChange={e => setUpdatedUser({...updatedUser, username: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            value={updatedUser.email}
                            onChange={e => setUpdatedUser({...updatedUser, email: e.target.value})}
                        /></div>}
                    {passEnable && <div><TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Old Password"
                        label="Old Password"
                        type="Old Password"
                        id="Old Password"
                        value={changePass.oldPassword}
                        onChange={e => setChangePass({...changePass, oldPassword: e.target.value})}
                    />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Old Password"
                            label="Old Password"
                            type="Old Password"
                            id="Old Password"
                            value={changePass.newPassword}
                            onChange={e => setChangePass({...changePass, newPassword: e.target.value})}
                        /></div>}
                    {!passEnable && <Button
                        onClick={postUpdateUser}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.signIn}
                    >
                        Update Profile
                    </Button>}
                    {!passEnable && <Button
                        onClick={() => setPassEnable(true)}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.signUp}
                    >
                        Change Password Fields
                    </Button>}

                    {passEnable && <Button
                        onClick={postChangePassword}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.signIn}
                    >
                        Change My Password
                    </Button>}
                    {passEnable && <Button
                        onClick={() => setPassEnable(false)}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.signUp}
                    >
                        Cancel Change Password
                    </Button>}
                </form>
            </div>
        </Container>
    )
}