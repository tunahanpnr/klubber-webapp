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
        position: "fixed",
        top: "5.2em",
        left: "7.8em",
        backgroundColor: "#78aa7c",
        width: "85%",
        height: "81.5vh",
    },
    paperLittleUp: {
        height: "40%",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        overflow: "scroll"
    },
    paperLittleDown: {
        height: "40%",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        overflow: "scroll"
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
    const [chatType, setChatType] = useState();

    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [mySubClubs, setMySubClubs] = useState([]);


    useEffect(() => {
        console.log("rendering Grid.js")
        axios.get("/fetchusers")
            .then(response => {
                console.log("Grids-fetchusers");
                console.log(response.data);
                setUsers(response.data);
            })

        axios.get("/getMySubClubs/" + sender.username)
            .then(response => {
                console.log("Grids-getMySubClubs");
                console.log(response.data);
                setMySubClubs(response.data);
            })

    }, [sender.username]);

    function listUsers() {
        return (users.map((user) => {
                return (
                    <ListItem
                        button
                        onClick={() => pickReceiver(user.username, "private")}>
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

    function listSubClubs() {
        return (mySubClubs.map((subClub) => {
                return (
                    <ListItem
                        button
                        onClick={() => pickReceiver(subClub.name, "subClub")}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={subClub.name}
                        />
                    </ListItem>
                )
            }
        ))
    }

    const pickReceiver = (receiver, chatType) => {
        console.log("new receiver: " + receiver)

        setChatType(chatType)
        setReceiver(receiver)
    }

    let openChat = (receiver) ? <Chat receiver={receiver} sender={sender} chatType={chatType}/> : null;
    return (

        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={4}>
                    <Paper elevation={3} className={classes.paperLittleUp}>{listUsers()}</Paper>
                    <Paper elevation={3} className={classes.paperLittleDown}>{listSubClubs()}</Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper elevation={3} className={classes.paper}>
                        {openChat}
                        {!receiver && <h2>Start chat with choosing a chat from left</h2>}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

