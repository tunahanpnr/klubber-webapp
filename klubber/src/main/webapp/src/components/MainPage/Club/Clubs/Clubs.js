import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "./List";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    Club: {
        backgroundColor: "green",
        position: "fixed",
        height: "100%",
        width: "100%",
        zIndex: "1",
        top: "4.6em",
        left: "5em",
        paddingTop: "10px"
    }
}));

function createData(name, button) {

    return { name, button};
}

export default function Clubs(){
    const [rows, setRows] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        axios.get("/listclub")
            .then(response => {
                console.log(response.data);
                setRows(response.data);
            })
    }, [deleted])

    return(
        <div className={useStyles().Club}>
            <List rows={rows} setDeleted={setDeleted} deleted={deleted}/>
        </div>

    )
}