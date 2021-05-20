import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../service/auth/AuthService";


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

export default function Profile() {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const classes = useStyles();

    // const postSignupRequest = () => {
    //     axios.post("/signup", newUser)
    //         .then(response => {
    //             console.log(newUser)
    //             console.log(response)
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    My Profile
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
                        value={currentUser.name}
                        // onChange={e => setNewUser({...newUser, name: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="surname"
                        label="Surname"
                        name="surname"
                        value={currentUser.surname}
                        // onChange={e => setNewUser({...newUser, surname: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={currentUser.username}
                        // onChange={e => setNewUser({...newUser, username: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        value={currentUser.email}
                        // onChange={e => setNewUser({...newUser, email: e.target.value})}
                    />
                </form>
            </div>
        </Container>
    )
}