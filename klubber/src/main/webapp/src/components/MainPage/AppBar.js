import React, {useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import AUTH_ROUTES , {RenderRoutes,RouteWithSubRoutes} from "../Route/AUTH_ROUTES";
import {BrowserRoute,Switch,Route} from "react-router-dom";
import Home from "./Home/Home";
import Club from "./Club/Club";
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

export default function AppBar( param){

    return(

        <div>
            <div className={useStyles().NavBar}>
                <NavBar></NavBar>
            </div>
            <div  className={useStyles().ClubBar}>YO</div>

        </div>

    )
}