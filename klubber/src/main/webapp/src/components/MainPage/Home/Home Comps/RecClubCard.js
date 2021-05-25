import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    Card: {
        marginTop: "2px",
        marginLeft: "14px",
        marginRight: "2px",
        marginBottom:"2px",
        backgroundColor: "#df95aa",
        fontSize:"20px",
        padding:"10px",
        height:"0",
        width:"10%",
        paddingBottom:"10%",

    }

}));

export  default  function  RecClubCard(props) {
    const  classes = useStyles();

    return(
        <div className={classes.Card}>
            {props.name}
        </div>
    )

}