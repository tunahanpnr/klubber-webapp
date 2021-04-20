import React,{useState,useEffect} from "react";
import AUTH_ROUTES, {RenderRoutes} from "./components/Route/AUTH_ROUTES";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router-dom";
import "./Styles/App.css"
import AppBar from "./components/MainPage/AppBar";
import Signup from "./components/auth/signup/Signup";
import Login from "./components/auth/login/Login";
import Home from "./components/MainPage/Home/Home";
import Club from "./components/MainPage/Club/Club";
import ClubSearch from "./components/MainPage/ClubSearch/ClubSearch";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {setIsAuth(true)
    }, []);

    let appBar = isAuth ? <Route component={AppBar}/> : null;

    return (
        <BrowserRouter>
                <div className="App" >
                    {appBar}
                    <Switch>
                        <Route
                            path={"/"}
                            exact={true}
                            component={() => <Login isAuth={ isAuth} setIsAuth = {setIsAuth}/>}
                        />
                        {/*<Route*/}
                        {/*    path={"/login"}*/}
                        {/*    exact={true}*/}
                        {/*    component={Login(isAuth)}*/}
                        {/*/>*/}
                        <Route
                            path={"/signup"}
                            exact={true}
                            component={Signup}
                        />
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
                    </Switch>
                </div>
        </BrowserRouter>
    );
}

export default App;

