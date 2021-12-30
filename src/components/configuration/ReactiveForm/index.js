import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import md5 from 'md5';
import helpers from '../../../helpers';

function ReactiveForm(props) {
	const { structure, numColumns, className, onChange, ...rest } = props;
	const [ data, setData ] = useState(structure);
	const [ eye, setEye ] = useState(false);
	const [ errorIndexes, setErrorIndexes ] = useState([]);

	useEffect(
		() => {
			setData(data);
		},
		[ data ]
	);

	const handleChange = (e, index, value) => {
		onChange(index, value);
	};

	const renderCloneTooltip = (props, content, id) => {
		const Html = () => (
			<ul
				style={{
					listStyle: 'auto',
					padding: '10px',
          textAlign: 'left',
          margin:0
				}}
			>
				{content.map((c) => <li dangerouslySetInnerHTML={{ __html: c }} />)}
			</ul>
		);
		return (
			<Tooltip id={`tooltip-${id}`} className="in show" {...rest}>
				<Html key={`html-1`} />
			</Tooltip>
		);
	};

	const HelpContent = (props) => {
		const { label, id } = props;
		return (
			<OverlayTrigger placement="top" overlay={renderCloneTooltip(props, label, id)} trigger="click">
				<i className="fa fa-question-circle" />
			</OverlayTrigger>
		);
	};

	const ErrorSpan = (props) => {
		const { label } = props;
		return <div className="text-danger small">{label}</div>;
	};

	const validate = (row, value) => {
		if (row.options.validation) {
			let bErrorIndexes = [ ...errorIndexes ];
			const test = new RegExp(row.options.validation).test(value);
			if (!test) {
				bErrorIndexes.push(row.index);
			} else {
				const myIndex = bErrorIndexes.indexOf(row.index);
				if (myIndex !== -1) {
					bErrorIndexes.splice(myIndex, 1);
				}
			}
			bErrorIndexes = [ ...new Set(bErrorIndexes) ];
			setErrorIndexes(bErrorIndexes);
		}
	};

	const renderElement = (row, key) => {
		switch (row.elementType) {
			case 'text':
				return (
					<div className="form-group" key={key}>
						<label htmlFor={row.id}>
							{row.options.required && <sup className="text-danger">*</sup>}
							{row.label} {row.options.help && <HelpContent label={row.options.help} id={row.id} />}
						</label>
						<input
							id={row.id}
							type="text"
							placeholder={row.placeHolder}
							onChange={(e) => handleChange(e, row.index, e.target.value)}
							onKeyUp={(e) => validate(row, e.target.value)}
							className={row.className}
							defaultValue={row.value}
							{...rest}
						/>
						{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
					</div>
				);
			case 'number':
				return (
					<div className="form-group" key={key}>
						<label htmlFor={row.id}>
							{row.options.required && <sup className="text-danger">*</sup>}
							{row.label} {row.options.help && <HelpContent label={row.options.help} id={row.id} />}
						</label>
						<input
							id={row.id}
							type="number"
							placeholder={row.placeHolder}
							onChange={(e) => handleChange(e, row.index, e.target.value)}
							onKeyUp={(e) => validate(row, e.target.value)}
							className={row.className}
							defaultValue={row.value}
							{...rest}
						/>
						{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
					</div>
				);
			case 'password':
				return (
					<div className="form-group password" key={key}>
						<label htmlFor={row.id}>
							{row.options.required && <sup className="text-danger">*</sup>}
							{row.label} {row.options.help && <HelpContent label={row.options.help} id={row.id} />}
						</label>
						<input
							id={row.id}
							type={`${!eye ? 'password' : 'text'}`}
							placeholder={row.placeHolder}
							onChange={(e) => handleChange(e, row.index, md5(e.target.value))}
							onKeyUp={(e) => validate(row, e.target.value)}
							className={row.className}
							defaultValue={row.value}
							{...rest}
						/>
						<i onClick={() => setEye(!eye)} className={`eye fa fa-${eye ? 'eye' : 'eye-slash'}`} />
						{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
					</div>
				);
			case 'dropDown':
				return (
					<div className="form-group" key={key}>
						<label htmlFor={row.id}>
							{row.options.required && <sup className="text-danger">*</sup>}
							{row.label} {row.options.help && <HelpContent label={row.options.help} />}
						</label>
						<select
							id={row.id}
							onChange={(e) => {
								validate(row, e.target.value);
								handleChange(e, row.index, e.target.value);
							}}
							className={row.className}
							defaultValue={row.value}
							{...rest}
						>
							<option value="">{row.placeHolder}</option>
							{row.list.map((l, i) => (
								<option key={i} value={l.value}>
									{l.label}
								</option>
							))}
						</select>
						{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
					</div>
				);
			default:
				return <div>Unknown Element</div>;
		}
	};
	return (
		<div className={className}>
			{JSON.stringify(errorIndexes)}
			<div className="row">
				{helpers
					.chunkArray(data, Math.ceil(data.length / numColumns))
					.map((row,i) => (
						<div key={i} className={`col-md-${Math.ceil(12 / numColumns)}`}>{row.map((r,j) => renderElement(r,j))}</div>
					))}
				<div className="col-md-12">
					<button
						disabled={errorIndexes.length > 0}
						onClick={() => alert('success')}
						className="btn btn-bni pull-right"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default ReactiveForm;
