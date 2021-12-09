import React from "react";
import PropTypes from "prop-types";

const Checkbox = props => {
  const { info, checked, marker, ...rest } = props;

  return (
    <label className="checkBoxComponent">
      <span>{info.value}</span>{marker && <span className="sup">*</span>}
      <input checked={checked} type="checkbox" {...rest} />
      <span className="checkmark"></span>
    </label>
  );
};

Checkbox.propTypes = {
  info: PropTypes.object,
  checked: PropTypes.bool
};
Checkbox.defaultProps = {
  checked: false
};

export default Checkbox;
