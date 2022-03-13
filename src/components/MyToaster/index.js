import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";

const MyToaster = props => {
  const { message, type, icon, autoClose } = props;

  const renderToast = () =>
    toast[type](
      <div>
        <span>
          <i class={icon}></i> {message}
        </span>
      </div>
    );

  renderToast(type);
  return <ToastContainer autoClose={autoClose} className="" />;
};

MyToaster.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string, // warn, success, error, info
  icon: PropTypes.string, // fa fa-info-circle, fa fa-exclamation-circle, fa-thumbs-down, fa fa-thumbs-up
  autoClose: PropTypes.number
};
MyToaster.defaultProps = {
  message: "",
  type: "success",
  icon: "fa fa-thumbs-up",
  autoClose: 3000
};

export default MyToaster;
