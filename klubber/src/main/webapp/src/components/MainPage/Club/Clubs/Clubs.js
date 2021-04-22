import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "./List";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    Club: {
        backgroundColor: "green",
        position: "fixed",
        height: "92%",
        width: "96%",
        zIndex: "1",
        top:"4.95em",
        left:"5.45em",
        paddingTop:"10px",
        paddingLeft:"10px",
        paddingRight:"10px",
        borderRadius:"8px",
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