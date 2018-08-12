import React from 'react';
import './wrapper.css';

const Wrapper = ({ CurrentComponent }) => (
	<div className='content'>
		{typeof CurrentComponent === 'function' ? <CurrentComponent /> : ''}
	</div>
)

export default Wrapper;