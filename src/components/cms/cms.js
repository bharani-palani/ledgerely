import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Settings from '../wrapper/settings';
import AccountPlanner from '../accountPlanner/AccountPlanner';
import LayoutDesign from './layoutDesign';
import * as ReactBootstrap from 'react-bootstrap';

const Div = ({ children, ...rest }) => {
	return <div {...rest}>{children}</div>;
};

function Cms(props) {
	const structure = props.location.state;

	const componentMap = {
		'app-settings': Settings,
		'app-moneyPlanner': AccountPlanner,
		'app-layoutDesign': LayoutDesign,
		'app-bootstrap': ReactBootstrap,
		div: Div
	};

    const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1);
    }

    const getCompopnent = (comp) => {
        const pieces = comp.split("-");
        if(pieces.length > 2) {
            return componentMap[`${pieces[0]}-${pieces[1]}`][capitalize(pieces[2])];
        } else {
            return componentMap[comp];
        }
    };

	const recursiveComponent = (str) => {
        const element = getCompopnent(str.component);
		if (typeof element !== 'undefined') {
			return React.createElement(
				element,
				str.props && Object.keys(str.props).length > 0 ? str.props : {},
				str.children &&
					(typeof str.children === 'string'
						? str.children
						: str.children.map((c, i) => <React.Fragment key={i}>{recursiveComponent(c)}</React.Fragment>))
			);
		}
	};

	return recursiveComponent(structure);
}

export default withRouter(Cms);
