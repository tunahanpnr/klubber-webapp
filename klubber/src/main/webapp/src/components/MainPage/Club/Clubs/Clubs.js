import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "./List";
import axios from "axios";
import ClubJoin from "./ClubJoin";
import AuthService from "../../../../service/auth/AuthService";
import {Grid, Paper} from "@material-ui/core";
import ClubList from "./ClubList";

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
    },
    root: {
        padding: theme.spacing(2),
        flexGrow: 1,
        position: "fixed",
        top: "5.2em",
        left: "7.8em",
        backgroundColor: "#78aa7c",
        width: "94.5%",
        height: "92vh",
    },
    paper2: {
        height: "100%",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },

}));

export default function Clubs(props){
    const [joinedClubs, setJoinedClubs] = useState([]);
    const [availableClubs, setAvailableClubs] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const classes = useStyles();

    const user = AuthService.getCurrentUser();


    useEffect(() => {
        axios.get("/getMyClubs/"+user.username)
            .then(response => {
                console.log("-----")
                console.log(response.data);
                setJoinedClubs(response.data);
            })

        axios.get("/getAvailableClubs/"+user.username)
            .then(response => {
                console.log("-----")
                console.log(response.data);
                setAvailableClubs(response.data);
            })
    }, [deleted])

    return(
        <div className={useStyles().paper}>
            {(user.role === "ADMIN") ? (
                <List rows={joinedClubs} setDeleted={setDeleted} deleted={deleted}/>
            ) : (
                <div className={classes.root}>
                    <Grid container spacing={3}>

                        <Grid item xs={6}>
                            <Paper elevation={3} className={classes.paper2}>
                                <h2>MY CLUBS</h2>
                                <ClubList rows={joinedClubs} setDeleted={setDeleted} deleted={deleted}/>
                            </Paper>

                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={3} className={classes.paper2}>
                                <h2>AVAILABLE CLUBS</h2>
                                <ClubJoin rows={availableClubs} setDeleted={setDeleted} deleted={deleted}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                // <div>
                //     <h2>MY CLUBS</h2>
                //     <ClubList rows={rows} setDeleted={setDeleted} deleted={deleted}/>
                //
                // </div>
            )}
            {/*<PostCard/>*/}
        </div>
    )
}