import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import RecommendedClubs from "./Home Comps/RecommendedClubs"

const useStyles = makeStyles((theme) => ({
    Home:{
        backgroundColor:"#d6c8ff",
        position:"fixed",
        height:"100%",
        width:"100%",
        zIndex:"1",
        top:"5.2em",
        left:"7.8em",
        paddingTop:"10px",
        borderRadius:"4px",
        paddingLeft:"8px"
    },
    Title:{
        fontSize:"50px",
    }
}));

export default function Home(){
    const classes = useStyles();

    return(
        <div className={classes.Home}>
            <h1 className={classes.Title}>
                Welcome To KLUBBER !
            </h1>
            <RecommendedClubs>

            </RecommendedClubs>

        </div>

    )
}