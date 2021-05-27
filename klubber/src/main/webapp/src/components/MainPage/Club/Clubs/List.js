import {makeStyles} from "@material-ui/core/styles";
import React, {useState,useEffect} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {Link as Link} from "react-router-dom"
import AuthService from "../../../../service/auth/AuthService";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '92%',
        marginLeft: "10px",
    },
    container: {
        display: 'flex',
        height: "600px",
        maxHeight: 600,
    },
    margin: {
        margin: theme.spacing(1),
    }
}));

const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'delete', label: 'Delete', minWidth: 100},
];


export default function List(props,{setUsername}) {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("/listclub")
            .then(response => {
                console.log("-----")
                console.log(response.data);
                setList(response.data);
            })
    }, [])

    const deleteClubHandler = (id) => {
        console.log(id)
        axios.delete("/deleteclub/" + id + "/" + currentUser.username)
            .then(response => {
                console.log(response)
                props.setDeleted(!props.deleted)
            })
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list && list.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'name' ?
                                                    <Link to={"club/" + value}>
                                                        {value}
                                                    </Link> : null}
                                                {column.id === "delete" ?
                                                    <IconButton aria-label="delete" className={classes.margin}
                                                                onClick={() => deleteClubHandler(row.name)}>
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
    )
}
