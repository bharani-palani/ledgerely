import React from "react";

const HtmlIcon = props => {
  const { className, entity, ...rest } = props;
  return <span className={`htmlIcon ${className}`} dangerouslySetInnerHTML={{ __html: entity }} {...rest} />;
};

// cross - &#10006;
// minus - &#10134;
// plus - &#10010;

export default HtmlIcon;
