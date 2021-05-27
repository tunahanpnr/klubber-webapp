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


    const [add, setAdd] = useState(false)


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

    const pushQuestion = (question) => {
        console.log(clubCreateForm)
        let newQuestions = [...clubCreateForm.questions]; // copying the old datas array
        newQuestions.push(question)

        setClubCreateForm({...clubCreateForm, questions: newQuestions})

        console.log(clubCreateForm)
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
                <Question id={1} pushQuestion={pushQuestion}/>
                <Question id={2} pushQuestion={pushQuestion}/>
                <Question id={3} pushQuestion={pushQuestion}/>
                <Question id={4} pushQuestion={pushQuestion}/>
                <Question id={5} pushQuestion={pushQuestion}/>
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
                {add && successMessage}
                {/*//{add==true && window.alert("Club added to the system successfully")}*/}
            </div>
        </form>
    )
}