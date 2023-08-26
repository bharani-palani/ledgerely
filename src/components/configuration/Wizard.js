import React, { useState, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import ReactiveForm from "./ReactiveForm";

function Wizard(props) {
  const { data, menu, onMassagePayload, onReactiveFormSubmit } = props;
  const [id, setId] = useState(0);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    toggleData(menu[0].filterArray.sort((a, b) => a.sort > b.sort));
  }, []);

  useEffect(() => {
    toggleData(menu[id].filterArray.sort((a, b) => a.sort > b.sort));
  }, [id]);

  const toggleData = idArray => {
    let newFormData = [...data].sort((a, b) =>
      a.elementType > b.elementType ? 1 : -1,
    );
    newFormData = newFormData.map(f => {
      f.className = f.className.replaceAll(" d-none", "");
      if (!idArray.includes(f.id)) {
        f.className = `${f.className} d-none`;
      }
      return f;
    });
    setFormData(newFormData);
  };
  const renderTooltip = label => (
    <Tooltip id='wizard-tooltip' className='in show' {...props}>
      {label}
    </Tooltip>
  );

  const onNext = () => {
    const newId = id + 1;
    setId(newId);
  };

  const onPrev = () => {
    const newId = id - 1;
    setId(newId);
  };

  return (
    <section>
      <div className='wizard'>
        <div className='py-3'>
          <ul className='d-flex justify-content-between' role='tablist'>
            {menu.map((d, i) => (
              <OverlayTrigger
                key={i}
                placement='top'
                overlay={renderTooltip(d.label)}
                triggerType='hover'
              >
                <li
                  // style={{ width: `${100 / menu.length}%` }}
                  className={`btn rounded-circle ${
                    d.id === id ? "btn-bni" : "btn-secondary"
                  }`}
                  onClick={() => setId(d.id)}
                >
                  <span className='round-tab'>
                    <i className={d.icon} />
                  </span>
                </li>
              </OverlayTrigger>
            ))}
          </ul>
        </div>
        <div className='tab-content'>
          <div className='row pb-2'>
            <div className='col-6'>
              <button
                disabled={id === 0}
                onClick={() => onPrev()}
                className='btn btn-bni pull-left'
              >
                <i className='fa fa-angle-double-left' />
              </button>
            </div>
            <div className='col-6'>
              <button
                disabled={id === menu.length - 1}
                onClick={() => onNext()}
                className='btn btn-bni pull-right'
              >
                <i className='fa fa-angle-double-right' />
              </button>
            </div>
          </div>
          {formData.length > 0 && (
            <ReactiveForm
              parentClassName='reactive-form text-dark'
              structure={formData}
              onChange={(index, value) => onMassagePayload(index, value)}
              onSubmit={() => onReactiveFormSubmit()}
              submitBtnClassName='btn btn-bni pull-right'
            />
          )}
          <div className='clearfix' />
        </div>
      </div>
    </section>
  );
}

export default Wizard;
