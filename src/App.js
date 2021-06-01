import React, {Component} from "react";
import SignIn from "./pages/SignIn";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Error404 from "./pages/Error404";
import SignAccount from "./pages/SignAccount";
import SignUp from "./pages/SignUp";
import AddEvent from "./pages/AddEvent";
import _ from "lodash";


class App extends Component {
    componentDidMount() {
        window.addEventListener('resize', this.resizeWindow);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWindow);
    }

    resizeWindow = () => {
        const media = +window.innerWidth;
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        let size;

        if (media >= 500 && media <= 767) {
            size = 3
            array = _.chunk(array, size);
        } else if (media >= 768 && media <= 991) {
            size = 5
            array = _.chunk(array, size);
        } else if (media >= 992) {
            size = 7
            array = _.chunk(array, size);
        }
        console.log(array)
        console.log(media)
        console.log(size)
        return array
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={SignIn}/>
                    <Route path="/account" exact component={SignAccount}/>
                    <Route path="/sign-up" exact component={SignUp}/>
                    <Route path="/add-event" exact component={AddEvent}/>
                    <Route path="/edit-event/:eventId" component={AddEvent}/>
                    <Route component={Error404}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;