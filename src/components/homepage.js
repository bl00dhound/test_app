import React from 'react';
import { Route } from 'react-router-dom';
import { sort, ifElse, test, find, propEq, compose, __ } from 'ramda';

import Dashboard from './dashboard';
import Wrapper from './wrapper';

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tabs: [],
			CurrentComponent: {},
			currentTab: {}
		};

		this.clickHandler = this.clickHandler.bind(this);
		this.renderComponent = this.renderComponent.bind(this);
		this.goTo = this.goTo.bind(this);
	}

	goTo(tabId) {
		const neededPath = `/home/${tabId}`;
		if (this.props.location.pathname === neededPath) return;
		else this.props.history.push(neededPath);
	}

	clickHandler(tab) {
		return () => {
			this.renderComponent(tab);
		};
	}

	renderComponent(tab) {
		import(/* webpackMode: "eager" */ `./${tab.path}`)
			.then(component => {
				this.setState({
					CurrentComponent: component.default,
					currentTab: tab
				});
				this.goTo(tab.id);
			})
	}

	componentWillMount() {
		fetch('http://localhost:3000/tabs.json')
			.then(data => data.json())
			.then(sort((a, b) => a.order - b.order))
			.then(tabs => {
				this.setState({ tabs });
				return this.props.location.pathname.split('/').slice(-1)[0]
			})
			.then(ifElse(
				test(/home/),
				() => this.renderComponent(this.state.tabs[0]),
				name => compose(
					this.renderComponent,
					find(__, this.state.tabs),
					propEq('id')
				)(name)
			));
	}

	render() {
		return (
			<div className='homepage'>
				<Dashboard {...this.state} clickHandler={this.clickHandler} />
				<Wrapper {...this.state} className='content'/>
			</div>
		);
	}
}

export default Home;