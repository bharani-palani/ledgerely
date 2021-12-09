import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FilterSelect from "../../configuration/backend/FormElements/FilterSelect";
import Radio from "../../configuration/backend/FormElements/Radio";

const Select = props => {
  const { onSelect, master } = props;
  const selectTypes = ["*", "SUM", "COUNT", "MIN", "MAX", "AVG", "DISTINCT"];
  const [selectType, setSelectType] = useState("");
  const [masterFields, setMasterFields] = useState([]);
  const [hasAlias, setHasAlias] = useState(false);
  const [aliasArray, setAliasArray] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState("");

  useEffect(() => {
    onChange(fields);
  }, [fields, hasAlias, aliasArray]);

  useEffect(() => {
    let newArr = [];
    for (const array in master["fields"]) {
      newArr.push(
        master["fields"][array].map(arr => ({
          id: `${array}.${arr.field}`,
          value: `${array}.${arr.field}`,
          marker: arr.marker
        }))
      );
    }
    const newMasterFields = [].concat.apply([], newArr);
    setMasterFields(newMasterFields);
    setFields([]);
  }, []);

  const onReset = () => {
    setSelectType("");
    setHasAlias(false);
    setAliasArray([]);
    setFields([]);
    setSelectedFields("");
  };

  const onChange = array => {
    let selectJoin = "";
    selectJoin = selectType === "*" ? array.join(", ") : array[0];
    const aliasStrings = aliasArray.map(a => a.split(" AS ")[1]).join(", ");
    onSelect({
      fields: selectJoin || "*",
      fieldArray: array,
      hasAlias,
      aliases: aliasArray.join(", ") || "",
      aliasArray,
      aliasStrings
    });
  };

  const aliasOnChange = (value, index) => {
    let newAliasArray = [...aliasArray];
    if (newAliasArray[index]) {
      newAliasArray = newAliasArray.map((al, i) => {
        if (index === i) {
          al = value ? `${fields[i]} AS ${value}` : `${fields[i]} AS F${i + 1}`;
        }
        return al;
      });
      setAliasArray(newAliasArray);
    }
  };

  const onAddRemoveFields = arrayOrValue => {
    Array.isArray(arrayOrValue)
      ? setFields(arrayOrValue)
      : setFields([`${selectType}(${arrayOrValue})`]);
    Array.isArray(arrayOrValue)
      ? setSelectedFields(arrayOrValue)
      : setSelectedFields(`${arrayOrValue}`);
    reset();
  };

  const reset = () => {
    setAliasArray([]);
    setHasAlias(false);
  };

  return (
    <div className="select">
      <div className="headLine mb-10">
        <div>Select</div>
        <div>
          <i className="fa fa-undo pull-right" onClick={() => onReset()} />
        </div>
      </div>
      <div className="react-responsive-ajax-data-table">
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <FilterSelect
                key={1}
                placeholder="Select Type"
                onChange={(ind, value, pKey) => {
                  setSelectType(value);
                  selectType === "*" ? onChange([]) : onChange("");
                  setFields([]);
                  setHasAlias(false);
                  setAliasArray([]);
                }}
                element={{
                  fetch: {
                    dropDownList: selectTypes.map(type => ({
                      id: type,
                      value: type
                    }))
                  }
                }}
                value={selectType}
                type={"single"}
                searchable={false}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              {
                <FilterSelect
                  key={2}
                  placeholder="Select Field(s)"
                  onChange={(ind, arrayOrValue, pKey) =>
                    onAddRemoveFields(arrayOrValue)
                  }
                  element={{
                    fetch: {
                      dropDownList: masterFields.map(({id, value, marker}) => ({
                        id: id,
                        value: value,
                        marker: marker
                      }))
                    }
                  }}
                  value={selectedFields}
                  type={selectType === "*" ? "multiple" : "single"}
                  searchable={true}
                />
              }
            </div>
          </div>
          {fields.length > 0 && (
            <div className="col-md-3">
              <div className="form-group">
                <Radio
                  index={{ i: 0, j: "radioNull" }}
                  onChange={(ind, val, pKey) => {
                    setHasAlias(val === "1");
                    if (val === "1") {
                      const newalias = fields.map(
                        (v, i) => `${v} AS F${i + 1}`
                      );
                      setAliasArray(newalias);
                    } else {
                      setAliasArray([]);
                    }
                  }}
                  element={{
                    radio: {
                      radioList: [
                        { label: "Has Alias", value: "1" },
                        { label: "No Alias", value: "0" }
                      ]
                    }
                  }}
                  value={hasAlias ? "1" : "0"}
                />
              </div>
            </div>
          )}
        </div>
        <div className="row">
          {hasAlias &&
            fields.length > 0 &&
            fields.map((field, i) => (
              <div key={i} className={`col-md-3`}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={`${field} (Alias)`}
                    className="form-control"
                    defaultValue={`F${i + 1}`}
                    onBlur={e => {
                      if (!e.target.value) {
                        e.target.value = `F${i + 1}`;
                      }
                    }}
                    onChange={e => aliasOnChange(e.target.value, i)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  property: PropTypes.string
};
Select.defaultProps = {
  property: "String name"
};

export default Select;
