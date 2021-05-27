import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Container, makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AuthService from "../../../service/auth/AuthService";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import {Button} from "@material-ui/core";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField} from '@material-ui/core';
import {Link as Link} from "react-router-dom";
import KlubberLogo from "./KlubberLogo.png"


const useStyles = makeStyles((theme) => ({

    Search: {
        backgroundColor: "white",
        borderRadius: "10px",
        marginLeft: "20px",
        minWidth: "30%"

    }
}));


export default function NavigationBar(props) {
    const classes2 = useStyles();
    const classes = props.style;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [CCanchorEl, setCCAnchorEl] = React.useState(null);
    const [clubs, setClubs] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersClubs, setUsersClubs] = useState([]);
    const [searchables, setSearchables] = useState([]);
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    const defaultProps = {
        options: searchables,
        getOptionLabel: (option) => option.name,
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        console.log("pressed");
        AuthService.logout();
    }
    const isCCMenuOpen = Boolean(CCanchorEl)

    const handleClubCreateMenuOpen = (event) => {
        if(currentUser.role === "ADMIN") {
            setCCAnchorEl(event.currentTarget);
        }
    };

    const handleClubCreateMenuClose = () => {
        setCCAnchorEl(null);
    };


    useEffect(() => {
        axios.get("/getMyClubs/" + currentUser.username)
            .then(response => {
                setClubs(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get("/fetchusers")
            .then(response => {
                setUsers(response.data);


            })
    }, [])

    useEffect(() => {
        setSearchables([])
        for (let i = 0; i < clubs.length; i++) {
            let searchableObj = {type: "club", name: clubs[i].name}
            setSearchables(searchables => [...searchables, searchableObj])
        }

        for (let i = 0; i < users.length; i++) {
            let searchableObj = {type: "user", name: users[i].username}
            setSearchables(searchables => [...searchables, searchableObj])
        }

    }, [users, clubs])


    const renderClubCreateMenu = (
        <Menu
            anchorEl={CCanchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={'club-create-menu'}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isCCMenuOpen}
            onClose={handleClubCreateMenuClose}
        >
            <MenuItem onClick={handleClubCreateMenuClose}>
                <Button href="/ClubCreate">
                    Club
                </Button>
                <Button href="/SubClubCreate">
                    SubClub
                </Button>
            </MenuItem>
        </Menu>
    );


    return (
        <div className={classes.root}>
            <CssBaseline/>

            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Autocomplete
                        className={classes2.Search}
                        id="search"
                        {...defaultProps}
                        getOptionLabel={(option) => option.name}
                        renderOption={(option) => (
                            <React.Fragment>
                                <span
                                    style={{cursor: "pointer"}}
                                    onClick={() => {

                                        if (option.type === "club") {
                                            window.location.href = "/club/" + option.name;
                                        } else if (option.type === "user") {
                                            window.location.href = "/profile/" + option.name;
                                        }

                                    }}
                                >
                                  {option.name + "    :" + option.type}
                                </span>
                            </React.Fragment>
                        )}
                        renderInput={(params) => <TextField {...params} label="Search for members&clubs"
                                                            variant="outlined"/>}
                    />
                    {(currentUser.role === "ADMIN") &&
                        <IconButton className={classes.createClub}
                        edge="end"
                        aria-label="club create button"
                        aria-controls={'club-create-menu'}
                        aria-haspopup="true"
                        onClick={handleClubCreateMenuOpen}
                        color="inherit"
                        >
                        <AddBoxOutlinedIcon/>
                        </IconButton>
                    }
                    <div>
                        <Container className={classes.profile}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>

                                    <Button href={"/profile/"+currentUser.username}>

                                        Profile
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Button href="/clubs">
                                        Clubs
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Button onClick={logOut}>
                                        Log Out
                                    </Button>
                                </MenuItem>
                            </Menu>
                        </Container>
                        {renderClubCreateMenu}


                    </div>


                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >

                <img src={KlubberLogo} alt="website logo"/>
                <div className={classes.toolbar} />
                <Divider />

                <List>
                    {clubs && clubs.map((club) => {
                        return (
                            <ListItem button key={club.name}>
                                <ListItemText primary={club.name}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </div>
    );
}
