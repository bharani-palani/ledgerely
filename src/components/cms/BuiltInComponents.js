import React from 'react';

const Div = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

const Section = ({ children, ...rest }) => {
  return <section {...rest}>{children}</section>;
};

const I = ({ children, ...rest }) => {
  return <i {...rest}>{children}</i>;
};

export { Div, Section, I };
