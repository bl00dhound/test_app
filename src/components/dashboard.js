import React from 'react';
import { Button } from 'semantic-ui-react';

const getButtons = (clickHandler, currentTab) => tab =>
	<Button
		onClick={clickHandler(tab)}
		key={tab.id}
		active={tab.id === currentTab.id}
	>{tab.title}</Button>

const Dashboard = ({ tabs, clickHandler, currentTab }) => {
	return (
		<Button.Group>
			{tabs.length && tabs.map(getButtons(clickHandler, currentTab))}
		</Button.Group>
	);
}

export default Dashboard;