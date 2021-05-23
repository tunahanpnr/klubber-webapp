import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import {Link} from "react-router-dom";
import AuthService from "../../../../service/auth/AuthService";

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
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'delete', label: 'Delete', minWidth: 100},
];


export default function ClubList(props) {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const deleteClubHandler = (id) => {
        axios.delete("/deleteclub/" + id + "/" + currentUser.username)
            .then(response => {
                console.log(response)
                props.setDeleted(!props.deleted)
            })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
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
                        {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'name' ?
                                                    <Link to={value}>
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
    );
}
