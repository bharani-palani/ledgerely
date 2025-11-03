import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";

const Footer = () => {
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);

  const yearOfPublication = () => {
    const pubYear = globalContext.yearOfPublication;
    const currentYear = moment().year();
    return pubYear == currentYear ? pubYear : `${pubYear} - ${currentYear}`;
  };

  return (
    <div className={`appFooter text-secondary p-1 position-fixed bg-${userContext.userData.theme === "dark" ? "dark" : "white"}`}>
      &copy; {yearOfPublication()} {globalContext.appName}
    </div>
  );
};

export default Footer;
