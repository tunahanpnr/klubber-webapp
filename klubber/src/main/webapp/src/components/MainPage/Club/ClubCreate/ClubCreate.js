import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CCForm from "./CCForm";



const useStyles = makeStyles((theme) => ({
    questionnaire:{
        display: "grid",
        backgroundColor:"#eeead1",
        position: 'static',
        //justifyContent: "center",
    }
}));

export default function ClubCreate(){
    const classes = useStyles();

    return(
        <div className={classes.questionnaire}>
            <CCForm/>
        </div>
    )
}