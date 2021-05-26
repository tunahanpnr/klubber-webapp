import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom"
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AuthService from "../../../service/auth/AuthService";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import PostCard from "../../Post/PostCard";

const useStyles = makeStyles((theme) => ({
    Club: {
        backgroundColor: "#eeead1",
        position: "fixed",
        height: "100%",
        width: "100%",
        zIndex: "1",
        top: "4.6em",
        left: "7.2em",
        paddingTop: "10px",
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    subclub: {
        display: "grid",
        gridRowGap: "25px",

    },
    button: {
        display: 'grid',
        textAlign: "start",
        gridRowGap: "10px"

    },
    head: {
        display: 'grid',
        textAlign: "center",
        gridTemplateColumns: "1fr 1fr",
    },

}));

export default function SubClub() {
    const classes = useStyles();
    const {name} = useParams()
    const [currentUser] = useState(AuthService.getCurrentUser());
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/getPosts/" + name)
            .then(response => {
                console.log("-----")
                console.log(response.data);
                setPosts(response.data)
            })
    }, [name]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeContent = (cont) => {
        setContent(cont.target.value);
    };

    const handleRequest = () => {
        const newPost = {
            content: content,
            username: currentUser.username,
            subClubName: name
        }

        axios.post("/createpost", newPost).then((response) => {
            console.log(response.data)
            setPosts([...posts, newPost])
        })

        setOpen(false);
    }

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>üye</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>comment</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>event</Paper>
                </Grid>
            </React.Fragment>
        );
    }

    const showPost = () => {
        return (posts.map((post) => {
                return (<PostCard post={post}/>)
            }
        ))
    }
    return (
        <div className={classes.Club}>
            <Grid container spacing={3}>

                <Grid item xs={9}>
                    <Grid item xs={12}>
                        <h1> SUB-CLUB: {name}</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            POST
                            {showPost()}
                        </Paper>
                    </Grid>
                </Grid>


                <Grid item xs={2}>
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon/>}
                        >
                            leave
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            POST
                        </Button>
                        <FormRow/>

                    </div>
                </Grid>

                <Grid container item xs={2} spacing={3}>
                </Grid>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{"POST"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="post"
                            label="Post"
                            fullWidth
                            value={content}
                            onChange={handleChangeContent}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRequest} color="primary">
                            send
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

        </div>

    )
}