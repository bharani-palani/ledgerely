import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FilterSelect from '../../configuration/backend/FormElements/FilterSelect';
import { UserContext } from '../../../contexts/UserContext';

const Join = (props) => {
	const { master, onJoin } = props;
	const userContext = useContext(UserContext);
	const joinTypes = [ 'INNER', 'LEFT', 'RIGHT', 'OUTER' ];
	const [ pointers, setPointers ] = useState([]);
	const init = joinTypes.map((type) => ({
		type,
		joins: [
			{
				tableDropDown: {
					fetch: {
						dropDownList: Object.keys(master.tables).map((table) => ({
							id: table,
							value: table
						}))
					}
				},
				selectedSource: '',
				selectedTarget: '',
				sourceFields: {},
				targetFields: {}
			}
		]
	}));
	const [ criterias, setCriterias ] = useState(init);

	useEffect(
		() => {
			onChange();
		},
		[ criterias ]
	);

	const onReset = () => {
		setCriterias(init);
	};

	const onChange = () => {
		const validCriterias = [ ...criterias ].filter((object) =>
			object.joins.some((obj) => obj.selectedSource && obj.selectedTarget)
		);

		const joins = [];
		validCriterias.forEach((object) =>
			object.joins.forEach((join) => {
				if (
					master.tables[join.sourceFields.table] &&
					join.sourceFields.table &&
					join.sourceFields.table &&
					join.selectedSource
				) {
					joins.push(
						`${object.type} JOIN ${master.tables[join.sourceFields.table]} AS ${join.sourceFields
							.table} ON ${join.sourceFields.table}.${join.selectedSource} = ${join.targetFields
							.table}.${join.selectedTarget}`
					);
				}
			})
		);
		onJoin(joins);
	};

	const onSelectTables = (array, pIndex, cIndex) => {
		const [ source, target ] = array;
		source && target && setPointers([ source, target ]);
		let newSourceTarget = [ ...criterias ];
		newSourceTarget = newSourceTarget.map((object, i) => {
			if (pIndex === i) {
				object.joins.map((join, j) => {
					if (j === cIndex) {
						join.sourceFields =
							(master.fields[source] && {
								table: source,
								fetch: {
									dropDownList: master.fields[source].map(({ field, marker }) => ({
										id: field,
										value: field,
										marker: marker
									}))
								}
							}) ||
							{};

						join.targetFields =
							(master.fields[target] && {
								table: target,
								fetch: {
									dropDownList: master.fields[target].map(({ field, marker }) => ({
										id: field,
										value: field,
										marker: marker
									}))
								}
							}) ||
							{};
					}
					return join;
				});
			}
			return object;
		});
		setCriterias(newSourceTarget);
	};

	const onAddRow = (type) => {
		let cloneCriterias = [ ...criterias ];
		const items = {
			tableDropDown: {
				fetch: {
					dropDownList: Object.keys(master.tables).map((table) => ({
						id: table,
						value: table
					}))
				}
			},
			selectedSource: '',
			selectedTarget: '',
			sourceFields: {},
			targetFields: {}
		};
		cloneCriterias = cloneCriterias.map((object) => {
			if (object.type === type) {
				object.joins.push(items);
			}
			return object;
		});
		setCriterias(cloneCriterias);
	};

	const onRemoveRow = (type, index) => {
		let cloneCriterias = [ ...criterias ];
		cloneCriterias = cloneCriterias.map((object) => {
			if (object.type === type) {
				const array = object.joins.filter((_, j) => j !== index);
				object.joins = array;
			}
			return object;
		});
		setCriterias(cloneCriterias);
	};

	const onSelectPointer = (type, pointerValue, point, index) => {
		const [ source, target ] = pointers;
		if (source && target) {
			const on = point === 'source' ? 'selectedSource' : 'selectedTarget';
			let cloneCriterias = [ ...criterias ];
			cloneCriterias = cloneCriterias.map((object) => {
				if (object.type === type) {
					const array = object.joins.map((join, cIndex) => {
						if (cIndex === index) {
							join[on] = pointerValue;
						}
						return join;
					});
					object.joins = array;
				}
				return object;
			});
			setCriterias(cloneCriterias);
		}
	};
	return (
		<div className="join pt-2">
			<div className="react-responsive-ajax-data-table">
				<div className="h6">
					<div>Join</div>
					<div>
						<i className="fa fa-undo pull-right" onClick={() => onReset()} />
					</div>
				</div>
				<div className="table-responsive">
					<table
						className={`table table-borderless ${userContext.userData.theme === 'dark'
							? 'text-light'
							: 'text-dark'}`}
					>
						<thead>
							<tr>
								{joinTypes.map((criteria, i) => (
									<td className="text-center" key={i}>
										{criteria}
									</td>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								{criterias.map((object, i) => (
									<td key={i}>
										{object.joins.map((join, j) => (
											<React.Fragment key={j}>
												<div className="mb-2">
													<FilterSelect
														index={{ i, j: -1 }}
														placeholder={'Select Tables'}
														onChange={(ind, array, pKey) => {
															onSelectTables(array, i, j);
														}}
														element={join.tableDropDown}
														value={''}
														type={'multiple'}
														searchable={true}
													/>
												</div>
												{Object.keys(join.sourceFields).length > 0 && (
													<div className="mb-2">
														<FilterSelect
															index={{ i, j }}
															placeholder={'Set Source Relation'}
															onChange={(ind, value, pKey) => {
																onSelectPointer(object.type, value, 'source', j);
															}}
															element={join.sourceFields}
															value={''}
															type={'single'}
															searchable={false}
														/>
													</div>
												)}
												{Object.keys(join.targetFields).length > 0 && (
													<div className="mb-2">
														<FilterSelect
															index={{ i, j }}
															placeholder={'Set Target Relation'}
															onChange={(ind, value, pKey) => {
																onSelectPointer(object.type, value, 'target', j);
															}}
															element={join.targetFields}
															value={''}
															type={'single'}
															searchable={false}
														/>
													</div>
												)}
												<div className="mb-2">
													{j > 0 ? (
														<i
															onClick={() => onRemoveRow(object.type, j)}
															className="fa fa-times-circle danger"
														/>
													) : (
														<i />
													)}
													<i
														onClick={() => onAddRow(object.type)}
														className="pull-right fa fa-plus-circle success"
													/>
												</div>
											</React.Fragment>
										))}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

Join.propTypes = {
	property: PropTypes.string
};
Join.defaultProps = {
	property: 'String name'
};

export default Join;
