import React, {useEffect, useState} from 'react';

import {Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FolderIcon from '@material-ui/icons/Folder';
import axios from "axios";
import AuthService from "../../service/auth/AuthService";
import Chat from "./Chat";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        flexGrow: 1,
    },
    paper: {
        height: "100%",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));


export default function Grids() {
    const sender = AuthService.getCurrentUser();
    const [receiver, setReceiver] = useState();

    const classes = useStyles();
    const [users, setUsers] = useState([]);


    useEffect(() => {
        console.log("rendering Grid.js")

        console.log("fetch")
        axios.get("/fetchusers")
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
    }, [users]);

    function listUsers() {
        return (users.map((user) => {
                return (
                    <ListItem
                        button
                        onClick={() => pickReceiver(user.username)}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.username}
                        />
                    </ListItem>
                )
            }
        ))

    }

    const pickReceiver = (receiver) => {
        console.log("new receiver: " + receiver)

        setReceiver(receiver)
    }

    let openChat = (receiver) ? <Chat receiver={receiver} sender={sender}/> : null;
    return (

        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={4}>
                    <Paper elevation={3} className={classes.paper}>{listUsers()}</Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper elevation={3} className={classes.paper}>{openChat}</Paper>
                </Grid>
            </Grid>
        </div>
    )
}

