import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Grid, Typography} from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AuthService from "../../../../service/auth/AuthService";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(4)
    },
    container: {
        marginTop: "80px",
        marginLeft: "130px",
        marginRight: "30px",
        backgroundColor: "#eeead1",
    },
    title: {
        backgroundColor: "#eeaaaa"
    }


}));

export default function Questionnaire(props) {
    const classes = useStyles();
    const [choices, setChoices] = useState([0, 0, 0, 0, 0])
    const [user, setUser] = useState(AuthService.getCurrentUser())

    const [myAnswers, setMyAnswers] = useState({
        clubname: "",
        username: "",
        answers: []
    })

    const postQuestionnaireHandler = () => {
        var i;
        let temp = []
        for (i = 0; i < props.questions.length; i++) {
            temp.push(props.questions[i].answerDTOList[choices[i]])
        }
        setMyAnswers()
        axios.post("/joinclub", {
            clubname: props.clubname.name,
            username: user.username,
            answers: temp
        })
            .then(response => {
                console.log("-----")
                console.log(response.data);
            })

    }

    const handleToggle = (choice, value) => () => {
        {
            console.log(choices)
        }
        let temp = [...choices]
        if (choice === "q0") {
            temp[0] = value
        } else if (choice === "q1") {
            temp[1] = value
        } else if (choice === "q2") {
            temp[2] = value
        } else if (choice === "q3") {
            temp[3] = value
        }else if (choice === "q4") {
            temp[4] = value
        }
        setChoices(temp)
    };

    const showQuestions = () => {

        return (props.questions.map((question, i) => {
            return (
                <div key={question.id}>
                    <Typography>
                        {question.question}
                    </Typography>
                    <List>
                        {question.answerDTOList.map((answer, index) => (
                            <ListItem
                                key={answer.id}
                                role={undefined}
                                button
                                onClick={handleToggle("q" + i, index)}
                            >

                                <Radio
                                    checked={choices[i] === index}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText
                                    primary={answer.answer}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            )
        }))

    }

    return (
        <div>
            {showQuestions()}
            <Button
                onClick={postQuestionnaireHandler}
                variant="contained"
                color="primary"
            >
                Join
            </Button>
        </div>
    )
}