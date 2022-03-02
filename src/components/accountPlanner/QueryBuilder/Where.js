import React, { useEffect, useState } from "react";
import FilterSelect from "../../configuration/backend/FormElements/FilterSelect";
import PropTypes from "prop-types";
import Radio from "../../configuration/backend/FormElements/Radio";

const Where = props => {
  const { onWhere, master } = props;
  const [masterFields, setMasterFields] = useState([]);
  const init = {
    SEP: "AND",
    AND: [
      {
        field: "",
        criteria: "",
        clause: "",
        placeholder: "",
        valueType: "",
        value: "",
        condition: "AND"
      }
    ],
    OR: [
      {
        field: "",
        criteria: "",
        clause: "",
        placeholder: "",
        valueType: "",
        value: "",
        condition: "OR"
      }
    ]
  };
  const [wheres, setWheres] = useState(init);

  const conditions = [
    {
      label: "Between",
      value: "BETWEEN {a} AND {b}",
      placeholder: "Double comma sepearated values",
      valueType: "DOUBLE"
    },
    {
      label: "Equal To",
      value: "= '{a}'",
      placeholder: "String / Number",
      valueType: "SINGLE"
    },
    {
      label: "Not Equal To",
      value: "!= '{a}'",
      placeholder: "String / Number",
      valueType: "SINGLE"
    },
    {
      label: "Lesser Than",
      value: "< '{a}'",
      placeholder: "Number",
      valueType: "SINGLE"
    },
    {
      label: "Greater Than",
      value: "> '{a}'",
      placeholder: "Number",
      valueType: "SINGLE"
    },
    {
      label: "Lesser Than Equal To",
      value: "<= '{a}'",
      placeholder: "Number",
      valueType: "SINGLE"
    },
    {
      label: "Greater Than Equal To",
      value: ">= '{a}'",
      placeholder: "Number",
      valueType: "SINGLE"
    },
    {
      label: "contains",
      value: "LIKE '%{a}%'",
      placeholder: "String / Number",
      valueType: "SINGLE"
    },
    {
      label: "Starts With",
      value: "LIKE '{a}%'",
      placeholder: "String / Number",
      valueType: "SINGLE"
    },
    {
      label: "Ends With",
      value: "LIKE '%{a}'",
      placeholder: "String / Number",
      valueType: "SINGLE"
    },
    {
      label: "Does Not Contain",
      value: "NOT LIKE '%{a}%'",
      placeholder: "String / Number",
      valueType: "SINGLE"
    },
    {
      label: "Does Not Begin With",
      value: "NOT LIKE '{a}%'",
      placeholder: "String / Number",
      valueType: "SINGLE"
    },
    {
      label: "Does Not End With",
      value: "NOT LIKE '%{a}'",
      placeholder: "String / Number",
      valueType: "SINGLE"
    },
    {
      label: "Is Null",
      value: "IS NULL",
      placeholder: "String / Number",
      valueType: "NULL"
    },
    {
      label: "Is Not Null",
      value: "IS NOT NULL",
      placeholder: "String / Number",
      valueType: "NULL"
    },
    {
      label: "In",
      value: "IN {n}",
      placeholder: "comma seperated values",
      valueType: "MULTIPLE"
    },
    {
      label: "Not In",
      value: "NOT IN {n}",
      placeholder: "comma seperated values",
      valueType: "MULTIPLE"
    }
  ];

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
  }, []);

  useEffect(() => {
    const first = wheres.AND.filter(where => where.clause);
    const last = wheres.OR.filter(where => where.clause);
    const fArray = first.map(
      (f, i) =>
        `${f.field} ${f.clause}${
          i !== first.length - 1 ? ` ${f.condition}` : ""
        }`
    );
    const lArray = last.map(
      (f, i) =>
        `${f.field} ${f.clause}${
          i !== last.length - 1 ? ` ${f.condition}` : ""
        }`
    );
    const all = [
      ...(fArray.length > 0 ? [`(${fArray.join(" ")})`] : []),
      ...(fArray.length > 0 && lArray.length > 0 ? [wheres.SEP] : []),
      ...(lArray.length > 0 ? [`(${lArray.join(" ")})`] : [])
    ];
    onWhere(all);
  }, [wheres]);

  const onReset = () => {
    setWheres(init);
  };

  const onAddWhere = cond => {
    const obj = {
      field: "",
      criteria: "",
      clause: "",
      placeholder: "",
      valueType: "",
      value: "",
      condition: cond === "AND" ? "AND" : "OR"
    };
    let where = { ...wheres };
    where[cond] = [...where[cond], obj];
    setWheres(where);
  };

  const onDeleteWhere = (condition, index) => {
    let where = { ...wheres };
    const a = where[condition].filter((_, i) => i !== index);
    where[condition] = a;
    setWheres(where);
  };

  const onChangeDropDown = (value, index, property, condition) => {
    let where = { ...wheres };
    const a = where[condition].map((w, i) => {
      if (index === i) {
        w[property] = value;
        if (property === "criteria") {
          const filter = conditions.filter(c => c.value === value)[0];
          w.placeholder = filter.placeholder;
          w.valueType = filter.valueType;
          w.clause = w.valueType === "NULL" ? w.criteria : "";
          w.value = "";
        }
      }
      return w;
    });
    where[condition] = a;
    setWheres(where);
  };

  const onChangeClause = (value, index, condition) => {
    let where = { ...wheres };
    const valueType = where[condition].filter((w, i) => i === index)[0]
      .valueType;
    const a = where[condition].map((w, i) => {
      if (index === i) {
        let newVal = "";
        switch (valueType) {
          case "SINGLE":
            newVal = value ? w.criteria.replace("{a}", `${value}`) : "";
            break;
          case "DOUBLE":
            const dpieces = value.split(",");
            if (dpieces.length >= 2 && dpieces[0] && dpieces[1]) {
              newVal = w.criteria.replace("{a}", `'${dpieces[0]}'`);
              newVal = newVal.replace("{b}", `'${dpieces[1]}'`);
            } else {
              newVal = "";
            }
            break;
          case "MULTIPLE":
            const mpieces = value.split(",");
            newVal = mpieces.some(s => s)
              ? w.criteria.replace("{n}", `(${mpieces})`)
              : "";
            break;
          case "NULL":
            newVal = w.criteria;
            break;
          default:
            newVal = value;
        }
        w.clause = newVal;
        w.value = value;
      }
      return w;
    });
    where[condition] = a;
    setWheres(where);
  };

  const onChangeSeperator = value => {
    let where = { ...wheres };
    where.SEP = value;
    setWheres(where);
  };

  return (
    <div className="where pt-2">
      <div className="h6">
        <div>Where</div>
        <div>
          <i className="fa fa-undo pull-right" onClick={() => onReset()} />
        </div>
      </div>
      <div className="react-responsive-ajax-data-table">
        {wheres.AND.map((where, i) => (
          <div key={i} className="row pt-2">
            <div className="col-md-1 actionIcons">
              {i > 0 ? (
                <i
                  onClick={() => onDeleteWhere("AND", i)}
                  className="fa fa-times-circle danger"
                />
              ) : (
                <i />
              )}
              <i
                onClick={() => onAddWhere("AND")}
                className="fa fa-plus-circle success"
              />
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {masterFields.length > 0 && (
                  <FilterSelect
                    key={`field-${i}`}
                    placeholder="Select field"
                    onChange={(ind, value, pKey) => {
                      onChangeDropDown(value, i, "field", "AND");
                    }}
                    element={{
                      fetch: {
                        dropDownList: masterFields.map(({id, value, marker}) => ({
                          id: id,
                          value: value,
                          marker: marker
                        }))
                      }
                    }}
                    value={where.field}
                    type={"single"}
                    searchable={false}
                  />
                )}
              </div>
            </div>
            {where.field && conditions.length > 0 && (
              <div className="col-md-3">
                <div className="form-group">
                  <FilterSelect
                    key={`criteria-${i}`}
                    placeholder="Select Criteria"
                    onChange={(ind, value, pKey) => {
                      onChangeDropDown(value, i, "criteria", "AND");
                    }}
                    element={{
                      fetch: {
                        dropDownList: conditions.map(type => ({
                          id: type.value,
                          value: type.label
                        }))
                      }
                    }}
                    value={where.criteria}
                    type={"single"}
                    searchable={false}
                  />
                </div>
              </div>
            )}
            {where.criteria && where.valueType !== "NULL" && (
              <div className="col-md-3">
                <div className="form-group">
                  <input
                    key={`AndKey-${i}`}
                    type="text"
                    title={where.placeholder}
                    placeholder={where.placeholder}
                    className="form-control"
                    onChange={e => onChangeClause(e.target.value, i, "AND")}
                    value={where.value}
                  />
                </div>
              </div>
            )}
            <div className="col-md-2">
              <div className="form-group">
                {(where.clause || where.valueType === "NULL") && (
                  <Radio
                    index={{ i, j: "AND" }}
                    onChange={(ind, value, pKey) =>
                      onChangeDropDown(value, i, "condition", "AND")
                    }
                    element={{
                      radio: {
                        radioList: [
                          { label: "AND", value: "AND", checked: true },
                          { label: "OR", value: "OR", checked: false }
                        ]
                      }
                    }}
                    value={"AND"}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="andOrWrapper">
              <Radio
                index={{ i: 0, j: "sepCond" }}
                onChange={(ind, value, pKey) => onChangeSeperator(value)}
                element={{
                  radio: {
                    radioList: [
                      { label: "AND", value: "AND", checked: true },
                      { label: "OR", value: "OR", checked: false }
                    ]
                  }
                }}
                value={wheres.SEP}
              />
            </div>
          </div>
        </div>
        {wheres.OR.map((where, i) => (
          <div key={i} className="row">
            <div className="col-md-1 actionIcons">
              {i > 0 ? (
                <i
                  onClick={() => onDeleteWhere("OR", i)}
                  className="fa fa-times-circle danger"
                />
              ) : (
                <i />
              )}
              <i
                onClick={() => onAddWhere("OR")}
                className="fa fa-plus-circle success"
              />
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {masterFields.length > 0 && (
                  <FilterSelect
                    key={`field-${i}`}
                    placeholder="Select field"
                    onChange={(ind, value, pKey) => {
                      onChangeDropDown(value, i, "field", "OR");
                    }}
                    element={{
                      fetch: {
                        dropDownList: masterFields.map(({id, value, marker}) => ({
                          id: id,
                          value: value,
                          marker: marker
                        }))
                      }
                    }}
                    value={where.field}
                    type={"single"}
                    searchable={false}
                  />
                )}
              </div>
            </div>
            {where.field && conditions.length > 0 && (
              <div className="col-md-3">
                <div className="form-group">
                  <FilterSelect
                    key={`criteria-${i}`}
                    placeholder="Select Criteria"
                    onChange={(ind, value, pKey) => {
                      onChangeDropDown(value, i, "criteria", "OR");
                    }}
                    element={{
                      fetch: {
                        dropDownList: conditions.map(type => ({
                          id: type.value,
                          value: type.label
                        }))
                      }
                    }}
                    value={where.criteria}
                    type={"single"}
                    searchable={false}
                  />
                </div>
              </div>
            )}
            {where.criteria && where.valueType !== "NULL" && (
              <div className="col-md-3">
                <div className="form-group">
                  <input
                    type="text"
                    key={`ORKey-${i}`}
                    title={where.placeholder}
                    placeholder={where.placeholder}
                    className="form-control"
                    onChange={e => onChangeClause(e.target.value, i, "OR")}
                    value={where.value}
                  />
                </div>
              </div>
            )}
            {(where.clause || where.valueType === "NULL") && (
              <div className="col-md-2">
                <div className="form-group">
                  <Radio
                    index={{ i, j: "OR" }}
                    onChange={(ind, value, pKey) =>
                      onChangeDropDown(value, i, "condition", "OR")
                    }
                    element={{
                      radio: {
                        radioList: [
                          { label: "AND", value: "AND", checked: false },
                          { label: "OR", value: "OR", checked: true }
                        ]
                      }
                    }}
                    value={"OR"}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Where.propTypes = {
  onWhere: PropTypes.func
};
Where.defaultProps = {
  property: "String name"
};

export default Where;
