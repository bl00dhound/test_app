import React from 'react';

const getButtons = clickHandler => tab => <button onClick={clickHandler(tab)} key={tab.id}>{tab.title}</button>

const Dashboard = ({ tabs, clickHandler }) => {
	return (
		<div>
			{tabs.length && tabs.map(getButtons(clickHandler))}
		</div>
	);
}

export default Dashboard;