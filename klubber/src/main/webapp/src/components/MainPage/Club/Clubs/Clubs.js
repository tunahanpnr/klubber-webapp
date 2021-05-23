import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "./List";
import axios from "axios";
import ClubList from "./ClubList";
import ClubJoin from "./ClubJoin";
import AuthService from "../../../../service/auth/AuthService";

const useStyles = makeStyles((theme) => ({
    Club: {
        backgroundColor:"#eeead1",
        position: "fixed",
        height: "92%",
        width: "96%",
        zIndex: "1",
        top:"4em",
        left:"5.45em",
        paddingTop:"10px",
        paddingLeft:"10px",
        paddingRight:"10px",
        borderRadius:"8px",
        marginLeft: 50,

    }

}));

export default function Clubs(props){
    const [rows, setRows] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const user = AuthService.getCurrentUser();


    useEffect(() => {
        axios.get("/listclub")
            .then(response => {
                console.log("-----")
                console.log(response.data);
                setRows(response.data);
            })
    }, [deleted])

    return(
        <div className={useStyles().Club}>
            {(user.role == "ADMIN") ? (
                <List rows={rows} setDeleted={setDeleted} deleted={deleted}/>
            ) : (
                <div>
                    <h2>MY CLUBS</h2>
                    <ClubList rows={rows} setDeleted={setDeleted} deleted={deleted}/>
                    <h2>AVAİLABLE CLUBS</h2>
                    <ClubJoin rows={rows} setDeleted={setDeleted} deleted={deleted}/>
                </div>
            )}
        </div>
    )
}