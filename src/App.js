import React, {Component} from "react";
import SignIn from "./pages/SignIn";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Error404 from "./pages/Error404";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
        }
    }

    componentDidMount() {
    }

    handleChange = (ev, i) => {
        this.setState({values: { ...this.state.values, [i]: ev.target.value }})
    };

    handleSubmit = () => {

    };

    render() {
        const {values} = this.state;
        console.log(values);
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={SignIn}/>
                    <Route component={Error404}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;