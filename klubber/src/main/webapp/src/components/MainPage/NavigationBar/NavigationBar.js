import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Container} from "@material-ui/core";
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








export default function NavigationBar(props) {
    const classes = props.style;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [CCanchorEl, setCCAnchorEl] = React.useState(null);
    const [clubs, setClubs] = useState([]);


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
        setCCAnchorEl(event.currentTarget);
    };

    const handleClubCreateMenuClose = () => {
        setCCAnchorEl(null);
    };

    useEffect(() => {
        axios.get("/listclub")
            .then(response => {
                setClubs(response.data);
            })
    },)

    const renderClubCreateMenu = (
        <Menu
            anchorEl={CCanchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={'club-create-menu'}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
            <CssBaseline />

            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
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
                    <div>
                        <Container className={classes.profile}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Button href="/profile">
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
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {clubs.map((club) =>{
                        return(
                            // <MenuItem value={club.name}>{club.name}</MenuItem>
                            <ListItem button key={club.name}>
                                <ListItemText primary={club.name} />
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </div>
    );
}
