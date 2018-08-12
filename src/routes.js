import React from 'react';
import { HashRouter, Route, Switch, Redirect} from  'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Home from "./components/homepage.js";
import ErrorPage from "./components/errorPage.js";

const history = createBrowserHistory();

class RouteConfiguration extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
			return (
				<HashRouter>
					<Switch>
						<Redirect exact from="/" to ="/home"/>
						<Route path="/home" component={Home}/>
						<Route component={ErrorPage} />
					</Switch>
				</HashRouter>
			);
    }
}

export default RouteConfiguration