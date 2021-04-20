import React, {useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    Home:{
        backgroundColor:"teal",
        position:"fixed",
        height:"100%",
        width:"100%",
        zIndex:"1",
        top:"4.2em",
        left:"5em",
        paddingTop:"10px"

    }
}));

export default function Home(){
    return(
        <div className={useStyles().Home}>
            <h1>
                HomePage
            </h1>
            <Button href="/club">Go to Club</Button>
        </div>

    )
}