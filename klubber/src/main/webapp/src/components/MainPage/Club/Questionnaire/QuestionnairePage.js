import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Questionnaire from "./Questionnaire";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    form: {
        width: "80%", // Fix IE 11 issue.
        marginTop: theme.spacing(4),
        backgroundColor:"#c3e7af",
        position:"fixed",
        height:"80%",
        zIndex:"1",
        top:"4.2em",
        left:"9em",
        paddingTop:"10px",
        overflowY:"scroll"

    },
    container: {
        marginTop: "80px",
        marginLeft: "130px",
        marginRight: "30px",
        backgroundColor:"#eeead1",
    },
    title: {
        backgroundColor:"#eeaaaa"
    }


}));

export default function QuestionnairePage(){
    const classes = useStyles();
    const [questions, setQuestions] = useState()
    let { name } = useParams();


    useEffect(() => {
        axios.get("/getquestions/" + name)
            .then(response => {
                console.log("/getquestions/" + name)
                console.log(response.data);
                setQuestions(response.data)
            })
    }, [])

    return(
        <div>
            <form className={classes.form} noValidate>
                <h1>CLUB NAME:</h1>
                <h1>{name}</h1>
                {questions && <Questionnaire questions={questions} clubname={{name}}/>}
            </form>
        </div>
    )

}