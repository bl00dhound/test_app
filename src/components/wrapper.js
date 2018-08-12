import React from 'react';
import { Route } from 'react-router-dom';

const Wrapper = ({ CurrentComponent }) => {
	if (typeof CurrentComponent === 'function') return <CurrentComponent />;
	else return <div>Empty</div>;
}

export default Wrapper;