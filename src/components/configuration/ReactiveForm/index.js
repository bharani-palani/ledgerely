import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';
import OffCanvas from '../../shared/OffCanvas';
import { UserContext } from "../../../contexts/UserContext";

function ReactiveForm(props) {
	const { structure, showSubmit, parentClassName, onChange, onSubmit, submitBtnLabel, ...rest } = props;
	const userContext = useContext(UserContext);
	const [ data, setData ] = useState(structure);
	const [ eye, setEye ] = useState(false);
	const [ errorIndexes, setErrorIndexes ] = useState([]);

	useEffect(
		() => {
			setData(data);
		},
		[ JSON.stringify(data) ]
	);

	const handleChange = (e, index, value) => {
		onChange(index, value);
	};

	const handleSubmit = () => {
		const errors = data
			.map((d) => {
				if (d.options) {
					if (d.options.validation) {
						return !new RegExp(d.options.validation).test(d.value) && d.index;
					} else {
						return false;
					}
				} else {
					return false;
				}
			})
			.filter((f) => f);
		if (errors.length > 0) {
			setErrorIndexes(errors);
		} else {
			onSubmit();
		}
	};

	const ErrorSpan = (props) => {
		const { label } = props;
		return <div className="text-danger pt-2">{label}</div>;
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

	const debounceFn = useCallback(
		_debounce((e, row) => {
			handleChange(e, row.index, e.target.value);
			validate(row, e.target.value);
		}, 300),
		[]
	);

	const renderElement = (row, key) => {
		switch (row.elementType) {
			case 'hidden':
				return (
					<div key={key}>
						<input id={row.id} className="d-none" type="hidden" defaultValue={row.value} {...rest} />
					</div>
				);
			case 'text':
				return (
					<div className="py-2" key={key}>
						<div className="form-floating">
							<input
								id={row.id}
								type="text"
								placeholder={row.placeHolder}
								onChange={(e) => {
									e.persist();
									debounceFn(e, row);
								}}
								className={`form-control ${errorIndexes.includes(row.index) ? 'is-invalid' : ''}`}
								defaultValue={row.value}
								{...rest}
							/>
							{
								row.options && row.options.help && 
								<OffCanvas
									btnValue='<i class="fa fa-question-circle text-secondary" />'
									btnClassName={`btn-light rounded-circle help`}
									placement="end"
									key={1}
									label={row.label}
								>
									<ul className={`list-group list-group-flush`}>
									{row.options.help.map((point,j) => (
										<li key={j} className={`list-group-item ${userContext.userData.theme === 'dark' ? 'bg-dark text-white-50' : 'bg-light text-dark'}`}>{point}</li>
									))}
									</ul>
								</OffCanvas>
							}
							<label htmlFor={row.id}>
								{row.options && row.options.required && <sup className="text-danger">*</sup>}
								{row.label}
							</label>
						</div>
						{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
					</div>
				);
			case 'number':
				return (
					<div className="py-2" key={key}>
						<div className="form-floating">
							{
								row.options && row.options.help && 
								<OffCanvas
									btnValue='<i class="fa fa-question-circle text-secondary" />'
									btnClassName={`btn-light rounded-circle help`}
									placement="end"
									key={1}
									label={row.label}
								>
									<ul className={`list-group list-group-flush`}>
									{row.options.help.map((point,j) => (
										<li key={j} className={`list-group-item ${userContext.userData.theme === 'dark' ? 'bg-dark text-white-50' : 'bg-light text-dark'}`}>{point}</li>
									))}
									</ul>
								</OffCanvas>
							}
							<input
								id={row.id}
								type="number"
								placeholder={row.placeHolder}
								onChange={(e) => {
									e.persist();
									debounceFn(e, row);
								}}
								className={`form-control ${errorIndexes.includes(row.index) ? 'is-invalid' : ''}`}
								defaultValue={row.value}
								{...rest}
							/>
							{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
							<label htmlFor={row.id}>
								{row.options && row.options.required && <sup className="text-danger">*</sup>}
								{row.label}
							</label>
						</div>
					</div>
				);
			case 'textArea':
				return (
					<div className="py-2" key={key}>
						<div className="form-floating">
							{
								row.options && row.options.help && 
								<OffCanvas
									btnValue='<i class="fa fa-question-circle text-secondary" />'
									btnClassName={`btn-light rounded-circle help`}
									placement="end"
									key={1}
									label={row.label}
								>
									<ul className={`list-group list-group-flush`}>
									{row.options.help.map((point,j) => (
										<li key={j} className={`list-group-item ${userContext.userData.theme === 'dark' ? 'bg-dark text-white-50' : 'bg-light text-dark'}`}>{point}</li>
									))}
									</ul>
								</OffCanvas>
							}
							<textarea
								id={row.id}
								rows={row.options.rowLength}
								placeholder={row.placeHolder}
								onChange={(e) => {
									e.persist();
									debounceFn(e, row);
								}}
								className={`form-control ${errorIndexes.includes(row.index) ? 'is-invalid' : ''}`}
								{...rest}
								defaultValue={row.value}
							/>
							{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
							<label htmlFor={row.id}>
								{row.options && row.options.required && <sup className="text-danger">*</sup>}
								{row.label}
							</label>
						</div>
					</div>
				);
			case 'password':
				return (
					<div className="py-2" key={key}>
						<div className="form-floating password">
							{
								row.options && row.options.help && 
								<OffCanvas
									btnValue='<i class="fa fa-question-circle text-secondary" />'
									btnClassName={`btn-light rounded-circle help`}
									placement="end"
									key={1}
									label={row.label}
								>
									<ul className={`list-group list-group-flush`}>
									{row.options.help.map((point,j) => (
										<li key={j} className={`list-group-item ${userContext.userData.theme === 'dark' ? 'bg-dark text-white-50' : 'bg-light text-dark'}`}>{point}</li>
									))}
									</ul>
								</OffCanvas>
							}
							<input
								id={row.id}
								type={`${!eye ? 'password' : 'text'}`}
								placeholder={row.placeHolder}
								onChange={(e) => {
									e.persist();
									debounceFn(e, row);
								}}
								className={`form-control ${errorIndexes.includes(row.index) ? 'is-invalid' : ''}`}
								defaultValue={row.value}
								{...rest}
							/>
							<i onClick={() => setEye(!eye)} className={`eye fa fa-${eye ? 'eye' : 'eye-slash'}`} />
							{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
							<label htmlFor={row.id}>
								{row.options &&  row.options.required && <sup className="text-danger">*</sup>}
								{row.label}
							</label>
						</div>
					</div>
				);
			case 'dropDown':
				return (
					<div className="py-2" key={key}>
						<div className="form-floating">
							{
								row.options && row.options.help && 
								<OffCanvas
									btnValue='<i class="fa fa-question-circle text-secondary" />'
									btnClassName={`btn-light rounded-circle help`}
									placement="end"
									key={1}
									label={row.label}
								>
									<ul className={`list-group list-group-flush`}>
									{row.options.help.map((point,j) => (
										<li key={j} className={`list-group-item ${userContext.userData.theme === 'dark' ? 'bg-dark text-white-50' : 'bg-light text-dark'}`}>{point}</li>
									))}
									</ul>
								</OffCanvas>
							}
							<select
								id={row.id}
								onChange={(e) => {
									validate(row, e.target.value);
									handleChange(e, row.index, e.target.value);
								}}
								className={`form-select ${errorIndexes.includes(row.index) ? 'is-invalid' : ''}`}
								defaultValue={row.value}
								{...rest}
							>
								<option value="">{row.placeHolder}</option>
								{row.list.map((l, i) => (
									<option key={i} value={l.value} selected={l.value === row.value}>
										{l.label}
									</option>
								))}
							</select>
							{errorIndexes.includes(row.index) && <ErrorSpan label={row.options.errorMsg} />}
							<label htmlFor={row.id}>
								{row.options &&  row.options.required && <sup className="text-danger">*</sup>}
								{row.label}
							</label>
						</div>
					</div>
				);
			// todo need to test
			case 'checkBox':
				return (
					<div className="py-2" key={key}>
						<div className="form-check position-relative">
							{
								row.options && row.options.help && 
								<OffCanvas
									btnValue='<i class="fa fa-question-circle text-secondary" />'
									btnClassName={`btn-light rounded-circle help`}
									placement="end"
									key={1}
									label={row.label}
								>
									<ul className={`list-group list-group-flush`}>
									{row.options.help.map((point,j) => (
										<li key={j} className={`list-group-item ${userContext.userData.theme === 'dark' ? 'bg-dark text-white-50' : 'bg-light text-dark'}`}>{point}</li>
									))}
									</ul>
								</OffCanvas>
							}
							<input
								className="form-check-input"
								onChange={(e) => {
									validate(row, e.target.value);
									handleChange(e, row.index, e.target.value);
								}}
								type="checkbox"
								defaultValue={row.value}
								{...rest}
								id={row.id}
								defaultChecked={Boolean(row.value)}
							/>
							<label className="form-check-label" htmlFor={row.id}>
								{row.label}
							</label>
						</div>
					</div>
				);
			// todo need to test
			case 'radio':
				return (
					<div className="py-2" key={key}>
						<div className="form-check">
							<input
								className="form-check-input"
								onChange={(e) => {
									validate(row, e.target.value);
									handleChange(e, row.index, e.target.value);
								}}
								type="radio"
								id={row.id}
								defaultValue={row.value}
								defaultChecked={Boolean(row.value)}
							/>
							<label className="form-check-label" htmlFor={row.id}>
								{row.label}
							</label>
						</div>
					</div>
				);

			default:
				return <div>Unknown Element</div>;
		}
	};

	return (
		<div className={parentClassName}>
			<div className="row">
				{data.length > 0 &&
					data.map((row, i) => (
						<div key={i} className={row.className}>
							{renderElement(row, i)}
						</div>
					))}
				{data.length > 0 &&
					data.filter((d) => d.elementType === 'hidden').length > 0 &&
					data.filter((d) => d.elementType === 'hidden').map((r, i) => renderElement(r, i))}
				{showSubmit && (
					<div className="col-md-12 py-2">
						<button
							// disabled={errorIndexes.length > 0}
							onClick={() => handleSubmit()}
							className="btn btn-bni pull-right"
						>
							{submitBtnLabel}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

ReactiveForm.propTypes = {
	structure: PropTypes.array,
	showSubmit: PropTypes.bool,
	className: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	submitBtnLabel: PropTypes.string,
	parentClassName: PropTypes.string
};
ReactiveForm.defaultProps = {
	structure: {
		options: { rowLength: 3 }
	},
	submitBtnLabel: 'Submit',
	showSubmit: true,
	parentClassName: 'my-reactive-form'
};

export default ReactiveForm;
