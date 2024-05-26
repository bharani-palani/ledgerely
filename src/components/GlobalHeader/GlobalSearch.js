import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import history from "../../history";
import { useKeyPress } from "./globalHooks";
import apiInstance from "../../services/apiServices";
import _debounce from "lodash/debounce";

const GlobalSearch = props => {
  const [items, setItems] = useState({});
  const ref = useRef(null);

  const lang = {
    category: "incExpCat",
    bank: "bank",
    creditCard: "creditCard",
    ccTransactions: "creditCardTransactions",
    bankTransactions: "bankTransactions",
    workbook: "workbook",
  };

  const ListItem = ({ item, active, setSelected, setHovered }) => (
    <li
      className={`list-group-item cursor-pointer small px-2 py-1 border-0 rounded-0 ${
        userContext.userData.theme === "dark"
          ? "bg-dark text-light"
          : "bg-white text-dark"
      } ${active ? "bni-bg bni-text" : ""} `}
      style={{}}
      onClick={() => setSelected(item)}
      onMouseEnter={() => {
        setHovered(item.id);
        setCursor(item.id);
      }}
      onMouseLeave={() => setHovered(undefined)}
    >
      {item.name}
    </li>
  );

  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(undefined);
  const [hovered, setHovered] = useState(undefined);

  const all = Object.keys(items)
    .map(o => [].concat(...items[o]))
    .flat();

  useEffect(() => {
    if (all.length && downPress) {
      setCursor(prevState => {
        const ind = all.findIndex(f => f.id === prevState);
        if (ind < all.length - 1) {
          return all[ind + 1]?.id || prevState;
        } else {
          return all[0]?.id;
        }
      });
    }
  }, [downPress]);

  useEffect(() => {
    if (Object.keys(items).length && upPress) {
      setCursor(prevState => {
        const ind = all.findIndex(f => f.id === prevState);
        if (ind - 1 > -1) {
          return all[ind - 1]?.id || prevState;
        } else {
          return all[all.length - 1]?.id;
        }
      });
    }
  }, [upPress]);

  useEffect(() => {
    if (Object.keys(items).length && enterPress) {
      const ind = all.findIndex(f => f.id === cursor);
      setSelected(all[ind]);
      handleSearch();
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (Object.keys(items).length && hovered) {
      setCursor(prevState => {
        const ind = all.findIndex(f => f.id === prevState);
        return all[ind]?.id || prevState;
      });
    }
  }, [hovered]);

  useEffect(() => {
    if (selected) {
      setSearch(selected?.name);
      setOverlayStatus(false);
      history.push(`${selected.target}`);
    }
  }, [selected]);

  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [overLayStatus, setOverlayStatus] = useState(false);
  const [loader, setLoader] = useState(false);

  const onSearch = useCallback(
    _debounce(e => {
      if (e.target.value) {
        setLoader(true);
        searchTopics(e.target.value)
          .then(r => {
            const data = r.data.response;
            if (data) {
              setOverlayStatus(true);
              setItems(data);
            } else {
              setOverlayStatus(false);
              setItems([]);
            }
          })
          .catch(() => setOverlayStatus(false))
          .finally(() => setLoader(false));
        if (e.which === 13 || e.keyCode === 13) {
          handleSearch();
        }
      } else {
        setOverlayStatus(false);
        setItems([]);
      }
    }, 500),
    [userContext.userConfig.appId],
  );

  const handleSearch = () => {
    if (selected?.target) {
      history.push(selected.target);
    }
  };

  const searchTopics = value => {
    const formdata = new FormData();
    formdata.append("searchString", value);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/dashboard/searchTopics", formdata);
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOverlayStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className='position-relative' ref={ref}>
      <div className='input-group input-group-sm'>
        <span
          className={`btn border border-1 border-end-0 rounded-start-0 border-${
            userContext.userData.theme === "dark" ? "secondary" : ""
          } btn-${
            userContext.userData.theme === "dark" ? "transparent" : "white"
          }`}
        >
          {!loader ? (
            <i
              className={`fa fa-search text-${
                userContext.userData.theme === "dark" ? "secondary" : "dark"
              }`}
            />
          ) : (
            <i
              className={`fa fa-circle-o-notch fa-spin text-${
                userContext.userData.theme === "dark" ? "secondary" : "dark"
              }`}
            />
          )}
        </span>
        <input
          type='text'
          spellCheck='false'
          placeholder={intl.formatMessage({
            id: "globalSearch",
            defaultMessage: "globalSearch",
          })}
          className={`form-control shadow-none rounded-end-0 form-control-sm text-secondary border-${
            userContext.userData.theme === "dark"
              ? "secondary text-secondary"
              : "1 text-dark"
          } bg-transparent`}
          onChange={e => {
            onSearch(e);
            setSearch(e.target.value);
          }}
          onKeyDown={e => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        {search && (
          <button
            className={`btn border border-1 border-start-0 rounded-end-0 border-${
              userContext.userData.theme === "dark" ? "secondary" : ""
            } btn-${
              userContext.userData.theme === "dark" ? "transparent" : "white"
            }`}
            onClick={() => {
              setSearch("");
              setOverlayStatus(false);
            }}
          >
            <i
              className={`fa fa-times text-${
                userContext.userData.theme === "dark" ? "secondary" : "dark"
              }`}
            />
          </button>
        )}
      </div>
      {overLayStatus && (
        <div className='position-absolute w-100'>
          <ul
            className={`list-group rounded-bottom p-0 rounded-top-0 border ${
              userContext.userData.theme === "dark"
                ? "bg-dark border-secondary"
                : "bg-light border-1"
            } border-top-0`}
            style={{ opacity: 0.9 }}
          >
            {Object.keys(items).length > 0 ? (
              Object.keys(items).map((item, i) => (
                <React.Fragment key={i}>
                  <li className='p-0 list-group-item border-0' style={{}}>
                    <div
                      className={`fw-bolder px-1 py-1 ${
                        userContext.userData.theme === "dark"
                          ? "bg-dark text-light"
                          : "bg-white text-dark"
                      }`}
                      style={{}}
                    >
                      <span
                        className={`badge ${
                          userContext.userData.theme === "dark"
                            ? "bg-secondary"
                            : "bg-white text-dark border border-1"
                        }`}
                      >
                        <FormattedMessage
                          id={lang[item]}
                          defaultMessage={lang[item]}
                        />
                      </span>
                    </div>
                    <ul className={`list-group`}>
                      {items[item].map((row, j) => (
                        <ListItem
                          key={row.id}
                          active={row.id === cursor}
                          item={row}
                          setSelected={setSelected}
                          setHovered={setHovered}
                        />
                      ))}
                    </ul>
                  </li>
                </React.Fragment>
              ))
            ) : (
              <li
                className={`p-1 list-group-item border-0 small ${
                  userContext.userData.theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-white text-dark"
                }`}
                style={{}}
              >
                <FormattedMessage
                  id='noRecordsGenerated'
                  defaultMessage='noRecordsGenerated'
                />
              </li>
            )}
            {all.length > 0 && (
              <li
                className={`p-0 px-1 pb-1 list-group-item border-0 ${
                  userContext.userData.theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-white text-dark"
                }`}
                style={{}}
              >
                <div className='text-end fst-italic small'>
                  <span>&#8593;</span>
                  <span className='px-1'>{all.length}</span>
                  <span>
                    <FormattedMessage
                      id={"recordsFound"}
                      defaultMessage={"recordsFound"}
                    />
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
