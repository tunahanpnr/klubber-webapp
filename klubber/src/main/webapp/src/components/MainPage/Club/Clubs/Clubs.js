import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "./List";
import axios from "axios";
import ClubList from "./ClubList";
import ClubJoin from "./ClubJoin";
import AuthService from "../../../../service/auth/AuthService";
import PostCard from "../../../Post/PostCard";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor:"#eeead1",
        position:"fixed",
        height:"100%",
        width:"100%",
        zIndex:"1",
        top:"4.6em",
        left:"7.2em",
        paddingTop:"10px",
        flexGrow: 1,
    }

}));

export default function Clubs(props){
    const [rows, setRows] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const user = AuthService.getCurrentUser();


    useEffect(() => {
        console.log("Club.js")
        axios.get("/listclub")
            .then(response => {
                console.log("-----")
                console.log(response.data);
                setRows(response.data);
            })
    }, [deleted])

    return(
        <div className={useStyles().paper}>
            {(user.role == "ADMIN") ? (
                <List rows={rows} setDeleted={setDeleted} deleted={deleted}/>
            ) : (
                <div>
                    {/*<h2>MY CLUBS</h2>*/}
                    {/*<ClubList rows={rows} setDeleted={setDeleted} deleted={deleted}/>*/}
                    <h2>AVAILABLE CLUBS</h2>
                    <ClubJoin rows={rows} setDeleted={setDeleted} deleted={deleted}/>
                </div>
            )}
            {/*<PostCard/>*/}
        </div>
    )
}