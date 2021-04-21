import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
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
        height:"100%",

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
    },
    answers:{
        display:"flex",
        flexDirection:"row"
    },
    questions:{
        padding:"4px",
        minHeight:"400px",
        maxHeight:"600px",
        backgroundColor:"yellow",
        borderRadius:"5px",
        overflowY:"scroll"
    }
}));

export default function CCForm(){
    const classes = useStyles();
    const [clubCreateForm, setClubCreateForm] = useState({
        clubName: "",
        question1: "",
        q1a1:"",
        q1a2:"",
        q1a3:"",
        q1a4:"",
        q1a5:"",
        question2:"",
        q2a1:"",
        q2a2:"",
        q2a3:"",
        q2a4:"",
        q2a5:"",
        question3:"",
        q3a1:"",
        q3a2:"",
        q3a3:"",
        q3a4:"",
        q3a5:"",
        question4:"",
        q4a1:"",
        q4a2:"",
        q4a3:"",
        q4a4:"",
        q4a5:"",
        question5:"",
        q5a1:"",
        q5a2:"",
        q5a3:"",
        q5a4:"",
        q5a5:""
    })

    const postClubCreateRequest = () => {
        console.log(clubCreateForm)
        axios.post("/createclub", clubCreateForm)
            .then(
                (response) => {
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
        <form className={classes.form}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="clubName"
                label="Club Name"
                name="clubName"
                autoComplete="clubName"
                autoFocus
                value={clubCreateForm.clubName}
                onChange={e => setClubCreateForm({...clubCreateForm, clubName: e.target.value})}
            />
            <div className={classes.questions}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="question1"
                    label="Question 1"
                    name="Question 1"
                    autoComplete="Question 1"
                    value={clubCreateForm.question1}
                    onChange={e => setClubCreateForm({...clubCreateForm, question1: e.target.value})}
                />
                <div className={classes.answers}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q1a1"
                        label="Answer"
                        name="q1a1"
                        autoComplete="q1a1"
                        value={clubCreateForm.q1a1}
                        onChange={e => setClubCreateForm({...clubCreateForm, q1a1: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q1a2"
                        label="Answer"
                        name="q1a2"
                        autoComplete="q1a2"
                        value={clubCreateForm.q1a2}
                        onChange={e => setClubCreateForm({...clubCreateForm, q1a2: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q1a3"
                        label="Answer"
                        name="q1a3"
                        autoComplete="q1a3"
                        value={clubCreateForm.q1a3}
                        onChange={e => setClubCreateForm({...clubCreateForm, q1a3: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q1a4"
                        label="Answer"
                        name="q1a4"
                        autoComplete="q1a4"
                        value={clubCreateForm.q1a4}
                        onChange={e => setClubCreateForm({...clubCreateForm, q1a4: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q1a5"
                        label="Answer"
                        name="q1a5"
                        autoComplete="q1a5"
                        value={clubCreateForm.q1a5}
                        onChange={e => setClubCreateForm({...clubCreateForm, q1a5: e.target.value})}
                    />
                </div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="question2"
                    label="Question 2"
                    name="Question 2"
                    autoComplete="Question 2"
                    value={clubCreateForm.question2}
                    onChange={e => setClubCreateForm({...clubCreateForm, question2: e.target.value})}
                />
                <div className={classes.answers}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q2a1"
                        label="Answer"
                        name="q2a1"
                        autoComplete="q2a1"
                        value={clubCreateForm.q2a1}
                        onChange={e => setClubCreateForm({...clubCreateForm, q2a1: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q2a2"
                        label="Answer"
                        name="q2a2"
                        autoComplete="q2a2"
                        value={clubCreateForm.q2a2}
                        onChange={e => setClubCreateForm({...clubCreateForm, q2a2: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q2a3"
                        label="Answer"
                        name="q2a3"
                        autoComplete="q2a3"
                        value={clubCreateForm.q2a3}
                        onChange={e => setClubCreateForm({...clubCreateForm, q2a3: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q2a4"
                        label="Answer"
                        name="q2a4"
                        autoComplete="q2a4"
                        value={clubCreateForm.q2a4}
                        onChange={e => setClubCreateForm({...clubCreateForm, q2a4: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q2a5"
                        label="Answer"
                        name="q2a5"
                        autoComplete="q2a5"
                        value={clubCreateForm.q2a5}
                        onChange={e => setClubCreateForm({...clubCreateForm, q2a5: e.target.value})}
                    />
                </div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="question3"
                    label="Question 3"
                    name="Question 3"
                    autoComplete="Question 3"
                    value={clubCreateForm.question3}
                    onChange={e => setClubCreateForm({...clubCreateForm, question3: e.target.value})}
                />
                <div className={classes.answers}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q3a1"
                        label="Answer"
                        name="q3a1"
                        autoComplete="q3a1"
                        value={clubCreateForm.q3a1}
                        onChange={e => setClubCreateForm({...clubCreateForm, q3a1: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q3a2"
                        label="Answer"
                        name="q3a2"
                        autoComplete="q3a2"
                        value={clubCreateForm.q3a2}
                        onChange={e => setClubCreateForm({...clubCreateForm, q3a2: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q3a3"
                        label="Answer"
                        name="q3a3"
                        autoComplete="q3a3"
                        value={clubCreateForm.q3a3}
                        onChange={e => setClubCreateForm({...clubCreateForm, q3a3: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q3a4"
                        label="Answer"
                        name="q3a4"
                        autoComplete="q3a4"
                        value={clubCreateForm.q3a4}
                        onChange={e => setClubCreateForm({...clubCreateForm, q3a4: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q3a5"
                        label="Answer"
                        name="q3a5"
                        autoComplete="q3a5"
                        value={clubCreateForm.q3a5}
                        onChange={e => setClubCreateForm({...clubCreateForm, q3a5: e.target.value})}
                    />
                </div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="question4"
                    label="Question 4"
                    name="Question 4"
                    autoComplete="Question 4"
                    value={clubCreateForm.question4}
                    onChange={e => setClubCreateForm({...clubCreateForm, question4: e.target.value})}
                />
                <div className={classes.answers}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q4a1"
                        label="Answer"
                        name="q4a1"
                        autoComplete="q4a1"
                        value={clubCreateForm.q4a1}
                        onChange={e => setClubCreateForm({...clubCreateForm, q4a1: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q4a2"
                        label="Answer"
                        name="q4a2"
                        autoComplete="q4a2"
                        value={clubCreateForm.q4a2}
                        onChange={e => setClubCreateForm({...clubCreateForm, q4a2: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q4a3"
                        label="Answer"
                        name="q4a3"
                        autoComplete="q4a3"
                        value={clubCreateForm.q4a3}
                        onChange={e => setClubCreateForm({...clubCreateForm, q4a3: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q4a4"
                        label="Answer"
                        name="q4a4"
                        autoComplete="q4a4"
                        value={clubCreateForm.q4a4}
                        onChange={e => setClubCreateForm({...clubCreateForm, q4a4: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q4a5"
                        label="Answer"
                        name="q4a5"
                        autoComplete="q4a5"
                        value={clubCreateForm.q4a5}
                        onChange={e => setClubCreateForm({...clubCreateForm, q4a5: e.target.value})}
                    />
                </div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="question5"
                    label="Question 5"
                    name="Question 5"
                    autoComplete="Question 5"
                    value={clubCreateForm.question5}
                    onChange={e => setClubCreateForm({...clubCreateForm, question5: e.target.value})}
                />
                <div className={classes.answers}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q5a1"
                        label="Answer"
                        name="q5a1"
                        autoComplete="q5a1"
                        value={clubCreateForm.q5a1}
                        onChange={e => setClubCreateForm({...clubCreateForm, q5a1: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q5a2"
                        label="Answer"
                        name="q5a2"
                        autoComplete="q5a2"
                        value={clubCreateForm.q5a2}
                        onChange={e => setClubCreateForm({...clubCreateForm, q5a2: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q5a3"
                        label="Answer"
                        name="q5a3"
                        autoComplete="q5a3"
                        value={clubCreateForm.q5a3}
                        onChange={e => setClubCreateForm({...clubCreateForm, q5a3: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q5a4"
                        label="Answer"
                        name="q5a4"
                        autoComplete="q5a4"
                        value={clubCreateForm.q5a4}
                        onChange={e => setClubCreateForm({...clubCreateForm, q5a4: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="q5a5"
                        label="Answer"
                        name="q5a5"
                        autoComplete="q5a5"
                        value={clubCreateForm.q5a5}
                        onChange={e => setClubCreateForm({...clubCreateForm, q5a5: e.target.value})}
                    />
                </div>
            </div>

            <Button

                onClick={postClubCreateRequest}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.signIn}
            >
                Create Club!
            </Button>

        </form>
    )
}