import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper} from "@material-ui/core";
import ChatTemplate from "../../../Chat/ChatTemplate";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        // backgroundColor:"#ffeeee",
    },
    root2: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    question: {
        display: 'grid',
        textAlign: "center",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridColumnGap: "30px"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        height: "100%",
    },
}));

export default function Question(props) {
    const classes = useStyles();
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
    }

    const scoreChangeHandler = (e, i) => {
        let newAnswers = [...question.answers]; // copying the old datas array
        newAnswers[i].score = e.target.value; // replace e.target.value with whatever you want to change it to

        setQuestions({...question, answers: newAnswers})

    }

    const showAnswers = () => {
        return ([1, 2, 3, 4].map((answerId) => {
            return (
                <Grid key={answerId} container spacing={3}>
                    <Grid item xs={5}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label={"Answer" + answerId}
                            name={"Answer " + answerId}
                            autoComplete={"Answer " + answerId}
                            value={question.answers[answerId - 1].answer}
                            onChange={e => answerChangeHandler(e, answerId - 1)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label={"Point " + answerId}
                            name={"Point " + answerId}
                            value={question.answers[answerId - 1].score}
                            onChange={e => scoreChangeHandler(e, answerId - 1)}
                        />
                    </Grid>
                </Grid>
            )
        }))
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id={"question" + props.id}
                        label={"Question " + props.id}
                        name={"Question " + props.id}
                        autoComplete={"Question " + props.id}
                        value={question.question}
                        onChange={e => setQuestions({...question, question: e.target.value})}
                    />
                </Grid>
                <Grid alignItems="center" item style={{ display: "flex" }}>
                    <Button
                        onClick={() => props.pushQuestion(question)}
                        variant="contained"
                        color="primary"
                    >
                        Save Question
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
            >
                {showAnswers()}
            </Grid>
        </div>
    )
}