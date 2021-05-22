import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import Question from "./Question";
import {Alert, AlertTitle} from "@material-ui/lab";
import AuthService from "../../../../service/auth/AuthService";

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: "80px",
        marginLeft: "130px",
        marginRight: "30px",
        backgroundColor: "#eeead1",
    },
    questions: {
        display: "grid",
        gridRowGap: "25px",
    },
    button: {
        display: "flex",
        marginLeft: "auto"
    },
    message: {
        display: "grid",
        justifyContent: "center"
    }

}));

export default function CCForm() {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const classes = useStyles();

    const [clubCreateForm, setClubCreateForm] = useState({
        name: "",
        requiredScore: 100,
        questions: []
    })

    const [question, setQuestions] = useState(
        {
            question: "",
            answers: [{
                answer: "",
                score: 4
            }, {
                answer: "",
                score: 4
            }, {
                answer: "",
                score: 4
            }, {
                answer: "",
                score: 4
            }]
        }
    )

    const answerChangeHandler = (e, i) => {
        let newAnswers = [...question.answers]; // copying the old datas array
        newAnswers[i].answer = e.target.value; // replace e.target.value with whatever you want to change it to

        setQuestions({...question, answers: newAnswers})
        console.log(question)
    }


    const [add, setAdd] = useState(false)

    const handleCallback = (childData) => {
        console.log("childData")
        console.log(childData)
        clubCreateForm.questions.push(childData)
    }

    const errorMessage = (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>check it out!</strong>
        </Alert>
    )

    const successMessage = (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>Club added to the system successfully</strong>
        </Alert>
    )

    const postClubCreateRequest = () => {
        console.log("-------------------------")
        clubCreateForm.questions = question
        console.log(clubCreateForm)
        axios.post("/createclub/" + currentUser.username, clubCreateForm)
            .then(
                (response) => {
                    console.log("CLUB CREATE")
                    console.log(response);
                    if (response.data === "") {
                        console.log("No response")
                        setAdd(false)
                    }
                    setAdd(true)
                },
            ).catch(
            (error) => {
                console.log(error);
                setAdd(false)
            })
    }


    return (
        <form className={classes.form}>
            <h1>CREATE CLUB</h1>
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
                <Question question={question} answerChangeHandler={answerChangeHandler} id={"1"}/>
                <Question question={question} answerChangeHandler={answerChangeHandler} id={"2"}/>
                <Question question={question} answerChangeHandler={answerChangeHandler} id={"3"}/>
                <Question question={question} answerChangeHandler={answerChangeHandler} id={"4"}/>
                <Question question={question} answerChangeHandler={answerChangeHandler} id={"5"}/>
            </div>

            <Button className={classes.button}
                    onClick={postClubCreateRequest}
                    variant="contained"
                    color="inherit"
                    size="large"
            >
                Create Club!
            </Button>
            <div className={classes.message}>
                {add == true && successMessage}
                {/*//{add==true && window.alert("Club added to the system successfully")}*/}
            </div>
        </form>
    )
}