import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterSelect from '../../configuration/backend/FormElements/FilterSelect';

const OrderBy = (props) => {
	const { master, onOrderBy } = props;

	const getFields = () => {
		const newArr = [];
		// eslint-disable-next-line guard-for-in
		for (const array in master['fields']) {
			newArr.push(master['fields'][array].map((arr) => `${array}.${arr.field}`));
		}
		const newMasterFields = newArr.join().split(',');
		return newMasterFields;
	};

	let fieldArray = getFields();
	fieldArray = fieldArray.map((field) => ({
		id: field,
		value: field
	}));
	const [ fields, setFields ] = useState(fieldArray);
	const [ asc, setAsc ] = useState('');
	const [ desc, setDesc ] = useState('');

	useEffect(
		() => {
			let fieldArray = getFields() || [];
			fieldArray = fieldArray.map((field) => ({
				id: field,
				value: field
			}));
			setFields(fieldArray);
		},
		[ JSON.stringify(props.selectData) ]
	);

	useEffect(
		() => {
			const orders = [ desc && `${desc} DESC`, asc && `${asc} ASC` ].filter((v) => v !== '');
			onOrderBy(orders);
		},
		[ asc, desc ]
	);

	const onReset = () => {
		setAsc('');
		setDesc('');
	};
	return (
		<div className="join pt-2">
			<div className="react-responsive-ajax-data-table">
				<div className="h6">
					<div>Order By</div>
					<div>
						<i className="fa fa-undo pull-right" onClick={() => onReset()} />
					</div>
				</div>
				<div className="row">
					<div className="col-md-3">
						<div className="pb-2">
							{fields &&
							fields.length > 0 && (
								<FilterSelect
									key={1}
									placeholder="ASC"
									onChange={(ind, value, pKey) => {
										setAsc(value);
									}}
									element={{
										fetch: {
											dropDownList: fields
										}
									}}
									value={asc}
									type={'single'}
									searchable={false}
								/>
							)}
						</div>
					</div>
					<div className="col-md-3">
						<div className="pb-2">
							{fields &&
							fields.length > 0 && (
								<FilterSelect
									key={1}
									placeholder="DESC"
									onChange={(ind, value, pKey) => {
										setDesc(value);
									}}
									element={{
										fetch: {
											dropDownList: fields
										}
									}}
									value={desc}
									type={'single'}
									searchable={false}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

OrderBy.propTypes = {
	master: PropTypes.object
};
OrderBy.defaultProps = {};

export default OrderBy;
