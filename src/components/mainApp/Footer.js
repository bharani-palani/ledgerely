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
    <div
      style={{ fontSize: "0.7rem" }}
      className={`text-secondary text-end p-1 position-fixed bottom-0 end-0 bg-${userContext.userData.theme === "dark" ? "dark" : "white"}`}
    >
      &copy; {yearOfPublication()} {globalContext.appName}
    </div>
  );
};

export default Footer;
