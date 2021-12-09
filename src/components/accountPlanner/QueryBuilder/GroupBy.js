import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FilterSelect from "../../configuration/backend/FormElements/FilterSelect";

const GroupBy = props => {
  const { master, onGroupBy } = props;

  const getFields = () => {
    let newArr = [];
    for (const array in master["fields"]) {
      newArr.push(master["fields"][array].map(arr => `${array}.${arr.field}`));
    }
    const newMasterFields = newArr.join().split(",");
    return newMasterFields;
  };

  let fieldArray = getFields() || [];

  fieldArray = fieldArray.map(field => ({
    id: field,
    value: field
  }));
  const [fields, setFields] = useState(fieldArray);
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {
    let fieldArray = getFields() || [];
    fieldArray = fieldArray.map(field => ({
      id: field,
      value: field
    }));

    setFields(fieldArray);
  }, [JSON.stringify(props.selectData)]);

  const onReset = () => {
    setSelectedFields([]);
    onGroupBy([]);
  };

  return (
    <div className="join">
      <div className="react-responsive-ajax-data-table">
        <div className="headLine mb-10">
          <div>Group By</div>
          <div>
            <i className="fa fa-undo pull-right" onClick={() => onReset()} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              {fields && fields.length > 0 && (
                <FilterSelect
                  key={`Group-1`}
                  placeholder="Select Type"
                  onChange={(ind, array, pKey) => {
                    setSelectedFields(array);
                    onGroupBy(array);
                  }}
                  element={{
                    fetch: {
                      dropDownList: fields
                    }
                  }}
                  value={selectedFields}
                  type={"multiple"}
                  searchable={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupBy.propTypes = {
  master: PropTypes.object
};
GroupBy.defaultProps = {};

export default GroupBy;
