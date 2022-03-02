import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FilterSelect from "../../configuration/backend/FormElements/FilterSelect";

const From = props => {
  const { master, onFrom } = props;
  const [fromStr, setFromStr] = useState("");
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const tables = Object.entries(master.tables).map(t => {
      return `${t[1]} AS ${t[0]}`;
    });
    setTables(tables);
    setFromStr(tables[0]);
    onFrom(tables[0]);
  }, []);

  const onSelectTables = value => {
    setFromStr(value);
    onFrom(value);
  };

  const onReset = () => {
    onSelectTables(tables[0]);
  };

  return (
    <div>
      <div className="pt-2">
        <div className="h6">From</div>
        <div>
          <i className="fa fa-undo pull-right" onClick={() => onReset()} />
        </div>
      </div>
      <div className="react-responsive-ajax-data-table">
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              {
                <FilterSelect
                  key={1}
                  placeholder="Select Table"
                  onChange={(ind, value, pKey) => onSelectTables(value)}
                  element={{
                    fetch: {
                      dropDownList: tables.map(type => ({
                        id: type,
                        value: type
                      }))
                    }
                  }}
                  value={fromStr}
                  type={"single"}
                  searchable={true}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

From.propTypes = {
  master: PropTypes.object,
  onFrom: PropTypes.func
};
From.defaultProps = {};

export default From;
