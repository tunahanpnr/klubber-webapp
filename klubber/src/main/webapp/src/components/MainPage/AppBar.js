import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import NavBar from "./Home/NavBar";


const useStyles = makeStyles((theme) => ({
    NavBar:{
        backgroundColor: "purple",
        minHeight:"3.4em",
        flexDirection:"row",
        alignItems:"center"
    },
    ClubBar:{  //sidebar
        position:"fixed",
        height:"100%",
        width:"70px",
        backgroundColor:"#690b75",
        zIndex:"1",
        top:"4.0em",
        overflowX:"hidden",
        paddingTop:"10px"
    },



}));

export default function AppBar( ){

    return(

        <div>
            <div className={useStyles().NavBar}>
                <NavBar/>
            </div>
            <div  className={useStyles().ClubBar}>YO</div>

        </div>

    )
}