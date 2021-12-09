import React from "react";
import PropTypes from "prop-types";

const HtmlIcon = props => {
  const { className, entity, ...rest } = props;
  return (
    <span
      className={`htmlIcon ${className}`}
      dangerouslySetInnerHTML={{ __html: entity }}
      {...rest}
    />
  );
};

// cross - &#10006;
// minus - &#10134;
// plus - &#10010;

HtmlIcon.propTypes = {
  className: PropTypes.string,
  entity: PropTypes.string
};
HtmlIcon.defaultProps = {
  property: "String name"
};

export default HtmlIcon;
