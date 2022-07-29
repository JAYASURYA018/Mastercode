import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import "./AEConsole.css";
import "./scss/_custom.scss";
import Callback from './components/authentication/Callback';
import Home from './components/home/Home';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';


class App extends Component<any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const { history } = this.props;
		return (
			<>
					<ConnectedRouter history={history}>
						<Switch>
							<Route path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
							<Route path={`${process.env.PUBLIC_URL}/`} component={Home} />
						</Switch>
					</ConnectedRouter>
				<ToastContainer />

			</>
		);
	}
}

export default App;
