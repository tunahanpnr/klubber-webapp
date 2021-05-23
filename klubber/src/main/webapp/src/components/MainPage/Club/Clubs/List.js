import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {Link as Link} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 780,
    },
    margin: {
        margin: theme.spacing(1),
    }
}));

/*function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}*/

const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'delete', label: 'Delete', minWidth: 100},
    /*{
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },*/
];



export default function List(props,{setUsername}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const deleteClubHandler = (id) => {
        axios.delete("/deleteclub/" + id)
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
                        {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>{
                            console.log(row)
                        })}
                        {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {

                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>

                                                <Link
                                                    to={{
                                                        pathname: '/club',
                                                        state: { message: row }
                                                    }}>
                                                    {typeof value === 'number' ? null : value}
                                                </Link>


                                                {column.id === "delete" ?
                                                    <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteClubHandler(row.id)}>
                                                        <DeleteIcon/>
                                                    </IconButton> : null}

                                            </TableCell>
                                        );

                                    })
                                    }

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}