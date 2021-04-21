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
        name: "",
        questions: []
    })

    const [question1, setQuestions] = useState(
        {
            question: "",
            a:"",
            b:"",
            c:"",
            d:"",
        }
    )
    const [question2, setQuestions2] = useState(
        {
            question: "",
            a:"",
            b:"",
            c:"",
            d:"",
        }
    )
    const [question3, setQuestions3] = useState(
        {
            question: "",
            a:"",
            b:"",
            c:"",
            d:"",
        }
    )

    const postClubCreateRequest = () => {
        console.log(clubCreateForm)
        clubCreateForm.questions.push(question1);
        clubCreateForm.questions.push(question2);
        clubCreateForm.questions.push(question3);
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
                id="name"
                label="Club Name"
                name="clubName"
                autoComplete="clubName"
                autoFocus
                value={clubCreateForm.name}
                onChange={e => setClubCreateForm({...clubCreateForm, name: e.target.value})}
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
                    value={question1.question}
                    onChange={e => setQuestions({...question1, question: e.target.value})}
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
                        value={question1.a}
                        onChange={e => setQuestions({...question1, a: e.target.value})}
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
                        value={question1.b}
                        onChange={e => setQuestions({...question1, b: e.target.value})}
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
                        value={question1.c}
                        onChange={e => setQuestions({...question1, c: e.target.value})}
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
                        value={question1.d}
                        onChange={e => setQuestions({...question1, d: e.target.value})}
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
                    value={question2.question}
                    onChange={e => setQuestions2({...question2, question: e.target.value})}
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
                        value={question2.a}
                        onChange={e => setQuestions2({...question2, a: e.target.value})}
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
                        value={question2.b}
                        onChange={e => setQuestions2({...question2, b: e.target.value})}
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
                        value={question2.c}
                        onChange={e => setQuestions2({...question2, c: e.target.value})}
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
                        value={question2.d}
                        onChange={e => setQuestions2({...question2, d: e.target.value})}
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
                    value={question3.question}
                    onChange={e => setQuestions3({...question3, question: e.target.value})}
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
                        value={question3.a}
                        onChange={e => setQuestions3({...question3, a: e.target.value})}
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
                        value={question3.b}
                        onChange={e => setQuestions3({...question3, b: e.target.value})}
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
                        value={question3.c}
                        onChange={e => setQuestions3({...question3, c: e.target.value})}
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
                        value={question3.d}
                        onChange={e => setQuestions3({...question3, d: e.target.value})}
                    />
                </div>
                {/*<TextField
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
                </div>*/}
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