import React from 'react';

const Div = ({ children, ...rest }) => {
	return <div {...rest}>{children}</div>;
};

export default Div;
