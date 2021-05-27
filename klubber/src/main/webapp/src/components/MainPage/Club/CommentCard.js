import React from "react";
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
    root: {
        maxWidth: "90%",
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


export default function CommentCard(props) {

    const classes = useStyles();
    return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.comment.username}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.comment.comment}
                    </Typography>
                </CardContent>
            </Card>
    );
}