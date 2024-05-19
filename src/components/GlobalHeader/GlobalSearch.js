import React, { useContext, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import history from "../../history";
import { useKeyPress } from "./globalHooks";
import apiInstance from "../../services/apiServices";

const GlobalSearch = props => {
  const [items, setItems] = useState([
    { id: 1, name: "Josh Weir" },
    { id: 2, name: "Sarah Weir" },
    { id: 3, name: "Alicia Weir" },
    { id: 4, name: "Doo Weir" },
    { id: 5, name: "Grooft Weir" },
  ]);

  const ListItem = ({
    item,
    active,
    setSelected,
    setHovered,
    first,
    index,
  }) => (
    <li
      className={`list-group-item cursor-pointer p-1 ${
        active ? "bni-bg bni-text border-0" : ""
      } ${first ? "rounded-0" : ""}`}
      onClick={() => setSelected(item)}
      onMouseEnter={() => {
        setHovered(item);
        setCursor(index);
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
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (items.length && downPress) {
      setCursor(prevState =>
        prevState < items.length - 1 ? prevState + 1 : prevState,
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (items.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (items.length && enterPress) {
      setSelected(items[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (items.length && hovered) {
      setCursor(items.indexOf(hovered));
    }
  }, [hovered]);

  useEffect(() => {
    if (selected) {
      setSearch(selected?.name);
      setOverlayStatus(false);
    }
  }, [selected]);

  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [overLayStatus, setOverlayStatus] = useState(false);

  const onSearch = e => {
    setSearch(e.target.value);
    setOverlayStatus(true);
    if (e.which === 13 || e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (search) {
      history.push(`/dashboard/?q=${encodeURIComponent(search)}`);
      searchTopics().then(r => {
        const res = r.data.response;
        setItems(res);
      });
    }
  };

  const searchTopics = () => {
    const formdata = new FormData();
    formdata.append("searchString", search);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/dashboard/searchTopics", formdata);
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
          className={`form-control rounded-start-0 form-control-sm text-secondary border-end-0 border-${
            userContext.userData.theme === "dark"
              ? "secondary text-secondary"
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
      {overLayStatus && (
        <div className='position-absolute w-100'>
          <ul className={`list-group small bg-${userContext.userData.theme}`}>
            {items.map((item, i) => (
              <ListItem
                key={item.id}
                first={i === 0}
                index={i}
                active={i === cursor}
                item={item}
                setSelected={setSelected}
                setHovered={setHovered}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
