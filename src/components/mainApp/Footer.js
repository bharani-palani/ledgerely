import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";

const Footer = () => {
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);

  const yearOfPublication = () => {
    const pubYear = globalContext.yearOfPublication;
    const currentYear = moment().year().toString();
    return { string: pubYear === currentYear ? pubYear : `${pubYear} - ${currentYear}`, width: pubYear === currentYear ? 100 : 150 };
  };

  return (
    <div
      style={{ width: yearOfPublication().width }}
      className={`appFooter text-secondary p-1 position-fixed bg-${userContext.userData.theme === "dark" ? "dark" : "white"}`}
    >
      &copy; {yearOfPublication().string} {globalContext.appName}
    </div>
  );
};

export default Footer;
