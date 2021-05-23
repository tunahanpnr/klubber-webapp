import React, {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import AppBar from "./components/MainPage/AppBar";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/MainPage/Home/Home";
import Club from "./components/MainPage/Club/Club";
import ClubSearch from "./components/MainPage/Club/ClubSearch/ClubSearch";
import ClubCreate from "./components/MainPage/Club/ClubCreate/ClubCreate";
import AuthService from "./service/auth/AuthService";
import Clubs from "./components/MainPage/Club/Clubs/Clubs";
import SubClubCreate from "./components/MainPage/Club/ClubCreate/SubClubCreate";
import Profile from "./components/Profile/Profile";
import Grids from "./components/Chat/Grids";

function App() {

    const [currentUser, setCurrentUser] = useState();
    const [username, setUsername] = useState('Default username');


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        console.log(user);
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    let appBar = currentUser ? <Route component={AppBar}/> : null;
    let protect = currentUser ? null : <Route path={"/"} component={Login}/>;


    return (
        <BrowserRouter>
            <div className="App">
                {appBar}
                <Switch>
                    <Route
                        path={"/login"}
                        exact={true}
                        component={Login}
                    />
                    <Route
                        path={"/signup"}
                        exact={true}
                        component={Signup}
                    />
                    {protect}
                    <Route
                        path={"/home"}
                        exact={true}
                        component={Home}
                    />
                    <Route
                        path={"/clubs"}
                        exact={true}
                        component={Clubs}
                        setUsername={setUsername}
                    />
                    <Route
                        path={"/club"}
                        exact={true}
                        component={Club}
                        username={username}
                    />
                    <Route
                        path={"/clubSearch"}
                        exact={true}
                        component={ClubSearch}
                    />
                    {/*<Route*/}
                    {/*    path={"/clubCreate"}*/}
                    {/*    exact={true}*/}
                    {/*    component={ClubCreate}*/}
                    {/*/>*/}
                    <Route
                        path={"/profile"}
                        exact={true}
                        component={Profile}
                    />
                    <Route
                        path={"/chat"}
                        component={Grids}
                    />
                    <Route
                        path={"/SubClubCreate"}
                        exact={true}
                        component={SubClubCreate}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

