import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AuthService from "../../../../service/auth/AuthService";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: '95%',
    },
    container: {
        height: "600px",
        maxHeight: 600,
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
    const [joinClubForm, setJoinClubForm] = useState({
        name: "",
        club_user: AuthService.getCurrentUser()
    })


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
                        {props.rows.map((row) => {
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

                                                {column.id === "join" ?
                                                    <Button variant="outlined"
                                                            color="primary"
                                                            aria-label="join"
                                                            className={classes.margin}
                                                            href={"QuestionnairePage/" + row.name}
                                                    >
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
