import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import history from "../../history";

const GlobalSearch = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [search, setSearch] = useState("");

  const onSearch = e => {
    setSearch(e.target.value);
    if (e.which === 13 || e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (search) {
      history.push(`/dashboard/?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className='position-relative'>
      <div className='input-group input-group-sm'>
        <input
          type='text'
          placeholder={intl.formatMessage({
            id: "globalSearch",
            defaultMessage: "",
          })}
          className={`form-control rounded-start-0 form-control-sm text-secondary border-${
            userContext.userData.theme === "dark"
              ? "secondary text-light"
              : "1 text-dark"
          } bg-transparent`}
          onChange={e => onSearch(e)}
          onKeyDown={e => onSearch(e)}
          value={search}
        />
        <button
          className={`btn border border-1 border-start-0 rounded-end-0 border-${
            userContext.userData.theme === "dark" ? "secondary" : ""
          } btn-${
            userContext.userData.theme === "dark" ? "transparent" : "white"
          }`}
          onClick={() => handleSearch()}
        >
          <i
            className={`fa fa-search text-${
              userContext.userData.theme === "dark" ? "secondary" : "dark"
            }`}
          />
        </button>
      </div>
      {/* <div className='position-absolute w-100'>
        <ul className={`list-group small bg-${userContext.userData.theme}`}>
          <li
            className={`list-group-item bg-transparent rounded-0 border-bottom p-1 ${
              userContext.userData.theme === "dark"
                ? "text-white border-secondary"
                : "text-dark border-1"
            }`}
          >
            An item
          </li>
          <li
            className={`list-group-item bg-transparent p-1 border-bottom rounded-bottom-2 ${
              userContext.userData.theme === "dark"
                ? "text-white border-secondary"
                : "text-dark border-1"
            }`}
          >
            And a fifth one
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default GlobalSearch;
