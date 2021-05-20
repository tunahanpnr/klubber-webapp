import React, {useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import{useLocation} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    Club:{
        backgroundColor:"green",
        position:"fixed",
        height:"100%",
        width:"100%",
        zIndex:"1",
        top:"4.6em",
        left:"5em",
        paddingTop:"10px"
    }
}));

export default function Club(props){
    let location = useLocation();
    return(
        <div className={useStyles().Club}>
            <h1>
                ClubPage
                {location.state.message.id}
            </h1>
            <Button href="/clubSearch">Go to Club Search</Button>
        </div>

    )
}