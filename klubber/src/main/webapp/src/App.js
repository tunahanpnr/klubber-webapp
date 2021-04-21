import React, {useEffect, useState} from "react";
import AUTH_ROUTES, {RenderRoutes} from "./components/Route/AUTH_ROUTES";
import {Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import AppBar from "./components/MainPage/AppBar";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/MainPage/Home/Home";
import Club from "./components/MainPage/Club/Club";
import ClubSearch from "./components/MainPage/ClubSearch/ClubSearch";
import ClubCreate from "./components/MainPage/ClubCreate/ClubCreate";
import AuthService from "./service/auth/AuthService";

function App() {

    const [currentUser, setCurrentUser] = useState();

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
                        path={"/club"}
                        exact={true}
                        component={Club}
                    />
                    <Route
                        path={"/clubSearch"}
                        exact={true}
                        component={ClubSearch}
                    />
                    <Route
                        path={"/clubCreate"}
                        exact={true}
                        component={ClubCreate}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

