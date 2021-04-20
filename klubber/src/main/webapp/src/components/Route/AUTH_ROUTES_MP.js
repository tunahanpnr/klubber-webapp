import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../MainPage/Home/Home";
import MainPage from "../MainPage/AppBar";
import Club from "../MainPage/Club/Club";

const AUTH_ROUTES_MP = [
    { path: "/mainPage", key: "ROOT", exact: true, component: () => <Home/> },
    { path: "/mainPage/home", key: "HOME", exact: true, component: () => <Home/> },
    { path: "/mainPage/club", key: "CLUB", exact: true, component: () => <Club/> },

    // {
    //     path: "/app",
    //     key: "APP",
    //     component: () => <h1>App</h1>,
    //     routes: [
    //         {
    //             path: "/app",
    //             key: "APP_ROOT",
    //             exact: true,
    //             component: () => <h1>App Index</h1>,
    //         },
    //         {
    //             path: "/app/page",
    //             key: "APP_PAGE",
    //             exact: true,
    //             component: () => <h1>App Page</h1>,
    //         },
    //     ],
    // },
];

/**
 * Render a route with potential sub routes
 */
function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component {...props} routes={route.routes} />}
        />
    );
}

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutesMP({ routes }) {
    return (
        <Switch>
            {routes.map((route, i) => {
                return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
            <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
    );
}


export default AUTH_ROUTES_MP;
