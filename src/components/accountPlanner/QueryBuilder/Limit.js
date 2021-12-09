import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Limit = props => {
  const { onLimit } = props;
  const [offset, setOffset] = useState(0);
  const [rowCount, seRowCount] = useState(100);

  useEffect(() => {
    onLimit({ offset, rowCount });
  }, [offset, rowCount]);

  const onReset = () => {
    setOffset(0);
    seRowCount(100);
    onLimit({ offset: 0, rowCount: 100 });
  }

  return (
    <div className="join">
      <div className="react-responsive-ajax-data-table">
        <div className="headLine mb-10">
          <div>Limit</div>
          <div>
            <i className="fa fa-undo pull-right" onClick={() => onReset()} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <input
                type="number"
                onChange={e => setOffset(+e.target.value)}
                value={offset}
                placeholder="Offset"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <input
                type="number"
                value={rowCount}
                onChange={e => seRowCount(+e.target.value)}
                placeholder="Row Count"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Limit.propTypes = {
  property: PropTypes.string
};
Limit.defaultProps = {
  property: "String name"
};

export default Limit;
