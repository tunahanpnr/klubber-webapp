import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        color: "white",
        backgroundColor: '#59fa4d',
        borderColor: 'white',
    }
}));

const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'join', label: 'Join', minWidth: 100},
];


export default function ClubJoin(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const joinClubHandler = (id) => {
        // axios.delete("/deleteclub/" + id)
        //     .then(response => {
        //         console.log(response)
        //         props.setDeleted(!props.deleted)
        //     })
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
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
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
                                                    <Link to={value} onClick>
                                                        {value}
                                                    </Link> : null}

                                                {column.id === "join" ?
                                                    <Button variant="outlined"
                                                            color="primary"
                                                            aria-label="join"
                                                            className={classes.margin}
                                                            onClick={() => joinClubHandler(row.id)}>
                                                        Join
                                                    </Button> : null}

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
