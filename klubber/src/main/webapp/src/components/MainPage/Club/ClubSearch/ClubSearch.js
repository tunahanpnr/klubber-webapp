import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    Club:{
        backgroundColor:"cyan",
        position:"fixed",
        height:"100%",
        width:"100%",
        zIndex:"1",
        top:"4.6em",
        left:"5em",
        paddingTop:"10px"
    }
}));

export default function ClubSearch(){
    return(
        <div className={useStyles().Club}>
            <h1>
                Club Search Page
            </h1>
            <Button href="/home">Go to Home</Button>
        </div>

    )
}