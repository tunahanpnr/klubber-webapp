import React from "react";

import {fade, makeStyles} from "@material-ui/core/styles";
import NavigationBar from "./NavigationBar/NavigationBar";


const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor:"#690b75",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor:"#dbdbdb"

    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    profile :{
        // paddingLeft: `calc(1em + ${theme.spacing(130)}px)`,
    },
    createClub: {
        paddingLeft: `calc(1em + ${theme.spacing(140)}px)`,
    }
}));

export default function AppBar( ){
    return(
        <div>
            <NavigationBar style={useStyles()}/>
        </div>
    )
}