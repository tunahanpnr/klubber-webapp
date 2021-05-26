import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import AuthService from "../../../../service/auth/AuthService";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: '95%',
    },
    container: {
        height: "250px",
        maxHeight: 250,

    },
    margin: {
        margin: theme.spacing(1),
    }
}));

const columns = [
    {id: 'subclubName', label: 'SUBCLUB NAME', minWidth: 170},
    {id: 'delete', label: 'DELETE', minWidth: 100},
];


export default function SubClubListAdmin(props) {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    // const [open, setOpen] = useState(false);
    // const [content, setContent] = useState("");
    // const [deleted, setDeleted] = useState(false);

    const deleteSubClubHandler = (id) => {
        console.log("delete")
        console.log(id)
        console.log(currentUser.username)
        axios.delete("/deletesubclub/" + id + "/" + currentUser.username)
            .then(response => {
                console.log(response)
                props.setDeleted(!props.deleted)
            })
    }

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };
    //
    // const handleChangeContent = (cont) => {
    //     setContent(cont.target.value);
    // };

    return (
        <div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.subClub.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'subclubName' ?
                                                        <Link to={"/subclub/" + row.name}>
                                                            {row.name}
                                                        </Link>: null}
                                                    {column.id === "delete" ?
                                                        <IconButton
                                                            aria-label="delete"
                                                            className={classes.margin}
                                                            onClick={() => deleteSubClubHandler(row.name)}
                                                        >
                                                            <DeleteIcon/>
                                                        </IconButton> : null}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/*<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">*/}
            {/*    <DialogTitle id="form-dialog-title">{"POST"}</DialogTitle>*/}
            {/*    <DialogContent>*/}
            {/*        <TextField*/}
            {/*            autoFocus*/}
            {/*            margin="dense"*/}
            {/*            id="post"*/}
            {/*            label="Post"*/}
            {/*            fullWidth*/}
            {/*            value={content}*/}
            {/*            onChange={handleChangeContent}*/}
            {/*        />*/}
            {/*    </DialogContent>*/}
            {/*    <DialogActions>*/}
            {/*        <Button onClick={handleClose} color="primary">*/}
            {/*            change*/}
            {/*        </Button>*/}
            {/*    </DialogActions>*/}
            {/*</Dialog>*/}
        </div>
    );
}