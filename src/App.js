import React, {Component} from "react";
import SignIn from "./pages/SignIn";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Error404 from "./pages/Error404";
import SignAccount from "./pages/SignAccount";
import SignUp from "./pages/SignUp";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={SignIn}/>
                    <Route path="/account" exact component={SignAccount}/>
                    <Route path="/sign-up" exact component={SignUp}/>
                    <Route component={Error404}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;