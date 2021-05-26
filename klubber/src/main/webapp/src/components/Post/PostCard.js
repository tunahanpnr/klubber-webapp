import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import AuthService from "../../service/auth/AuthService";
import {Card, CardActions, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        maxWidth: "25%",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


export default function PostCard(props) {

    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.post.username}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.post.subClubName}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.post.content}
                </Typography>
            </CardContent>
        </Card>
    );
}