import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import RecClubCard from "./RecClubCard";

const useStyles = makeStyles((theme) => ({
    RecClub: {
        marginTop: "20px",
        marginLeft: "4px",
        marginRight: "4px",
        height:"30%",
        backgroundColor: "#dfdad4",
        borderRadius:"12px",
        padding: "6px"
    },
    RecClubClubs:{
        backgroundColor: "#c792d6",
        marginLeft: "10px",
        padding:"10px",
        height: "70%",
        flexDirection: "row-reverse"
    }

}));


export default function RecommendedClubs() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get("/listclub")
            .then(response => {
                console.log("-----")
                console.log(response.data);
                setRows(response.data);
            })
    }, [])


    return(
        <div className={classes.RecClub}>
            <h1>
                Recommended Clubs for You
            </h1>
            <Box display="flex" >
                {rows.map((row) => {
                return (
                    <RecClubCard name={row.name}></RecClubCard>
                )
                })}
            </Box>
        </div>
    )
}