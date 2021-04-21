import React from "react";
import AUTH_ROUTES, {RenderRoutes} from "./components/Route/AUTH_ROUTES";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
                <div className="App">
                    <RenderRoutes routes={AUTH_ROUTES}/>
                </div>
        </BrowserRouter>
    );
}

export default App;

