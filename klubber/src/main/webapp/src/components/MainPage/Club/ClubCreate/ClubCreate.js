import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CCForm from "./CCForm";

const useStyles = makeStyles((theme) => ({
    Club:{
        backgroundColor:"#dadbce",
        position:"fixed",
        width:"93%",
        zIndex:"1",
        top:"4.6em",
        left:"5em",
        paddingTop:"2px",
        paddingLeft:"10px",
        paddingRight:"10px",
        borderRadius:"25px",
        height:"90%"
    }
}));

export default function ClubCreate(){
    return(
        <div className={useStyles().Club}>
            <h1>
                Club Create Page
            </h1>
            <CCForm/>
        </div>

    )
}