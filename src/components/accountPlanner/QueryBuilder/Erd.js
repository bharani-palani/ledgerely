import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Erd = (props) => {
	const { master } = props;
	const [ tables, setTables ] = useState([]);

	useEffect(() => {
		const tables = Object.keys(master.fields).map((f) => {
			return {
				table: master.tables[f],
				fields: master.fields[f]
			};
		});
		setTables(tables);
	}, []);

	return (
		<div className="Erd">
			<div className="erdGrid">
				{tables.map((t, i) => (
					<div key={i} className="tableBox">
						<div className="tableName">{t.table}</div>
						<ul>
							{t.fields.map((f, j) => (
								<li key={j}>
									{f.field} {f.marker && <i className="fa fa-key green" />}{' '}
									{f.type && <em>{f.type.toUpperCase()}</em>}{' '}
									{f.relationId && <i className={`fa fa-link ${f.relationId}`} />}{' '}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

Erd.propTypes = {
	property: PropTypes.string
};

Erd.defaultProps = {
	property: 'String name'
};

export default Erd;
