import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import From from "./From";
import Join from "./Join";
import GroupBy from "./GroupBy";
import OrderBy from "./OrderBy";
import Limit from "./Limit";
import Where from "./Where";
import Erd from "./Erd";
import "./QueryBuilder.scss";
import { FormattedMessage } from 'react-intl'

const QueryBuilder = props => {
  const { schema, onUpdateSchema, onUpdateObject } = props;
  const [sqlQuery, setSqlQuery] = useState("");

  const initFrom = () => {
    let entries = Object.entries(schema.tables)[0];
    entries = `${entries[1]} AS ${entries[0]}`;
    return entries;
  };

  const [query, setQuery] = useState({
    select: {},
    from: initFrom(),
    join: {},
    where: [],
    groupBy: [],
    orderBy: [],
    limit: {}
  });

  const makeQuery = (area, object) => {
    const obj = {
      ...query,
      ...(area === "select" && { select: object }),
      ...(area === "from" && { from: object }),
      ...(area === "join" && { join: object }),
      ...(area === "where" && { where: object }),
      ...(area === "groupBy" && { groupBy: object }),
      ...(area === "orderBy" && { orderBy: object }),
      ...(area === "limit" && { limit: object })
    };
    setQuery(obj);
  };

  useEffect(() => {
    let queryText = [
      "SELECT",
      query.select.aliasArray && query.select.aliasArray.length > 0
        ? "\t" + query.select.aliasArray.join(", ")
        : query.select.fieldArray && query.select.fieldArray.length > 0
          ? "\t" + query.select.fieldArray.join(" ,")
          : "\t*",
      "FROM",
      query.from && "\t" + query.from,
      ...(query.join.length > 0 ? [query.join.join("\n")] : []),
      ...(query.where.length > 0
        ? [`WHERE \r\n\t${query.where.join("\n\t")}`]
        : []),
      ...(query.groupBy.length > 0
        ? [`GROUP BY \r\n\t${query.groupBy.join(", ")}`]
        : []),
      ...(query.orderBy.length > 0
        ? [`ORDER BY \r\n\t${query.orderBy.join(", ")}`]
        : []),
      ...(query.limit.offset > 0
        ? [`LIMIT ${query.limit.offset}, ${query.limit.rowCount}`]
        : [`LIMIT ${query.limit.rowCount}`])
    ];
    queryText = queryText.join("\r\n");
    setSqlQuery(queryText);
  }, [query]);

  const sendAll = () => {
    onUpdateSchema(sqlQuery);
    onUpdateObject(query);
  };

  const getAutoSavedQuery = () => {
    const query = localStorage.getItem("query");
    setSqlQuery(query);
  };

  return (
    <div className="queryBuilder">
      <Erd master={schema} />
      <Select
        master={schema}
        onSelect={selectObject => makeQuery("select", selectObject)}
      />
      <From
        master={schema}
        onFrom={fromObject => makeQuery("from", fromObject)}
      />
      <Join
        master={schema}
        onJoin={joinObject => makeQuery("join", joinObject)}
      />
      <Where
        master={schema}
        onWhere={whereObject => makeQuery("where", whereObject)}
      />
      <GroupBy
        master={schema}
        onGroupBy={groupObject => makeQuery("groupBy", groupObject)}
      />
      <OrderBy
        master={schema}
        onOrderBy={groupObject => makeQuery("orderBy", groupObject)}
      />
      <Limit onLimit={limitObject => makeQuery("limit", limitObject)} />
      {/* <pre>{JSON.stringify(query, null, 2)}</pre> */}
      <div className="queryWrapper mt-2">
        <div className="heading">
          <div>Query</div>
          {localStorage.getItem("query") && <div>
            <button
              onClick={() => getAutoSavedQuery()}
              className="btn-red pull-right"
            >
              <FormattedMessage id="getAutoSavedQuery" />
            </button>
          </div>}
        </div>
        <textarea
          className="form-control query-list"
          value={sqlQuery}
          onChange={e => {
            setSqlQuery(e.target.value);
          }}
        />
      </div>
      <div className="pb-2 text-end">
        <button
          className="btn btn-bni sm"
          onClick={() => {
            sendAll();
            localStorage.setItem('query', sqlQuery);
          }}
        >
          <FormattedMessage id="generate" />
        </button>
      </div>
    </div>
  );
};

QueryBuilder.propTypes = {
  schema: PropTypes.object,
  onUpdateSchema: PropTypes.func,
  onUpdateObject: PropTypes.func
};

QueryBuilder.defaultProps = {
  schema: {
    fields: {
      T1: [{ field: "sampleFieldId1" }],
      T2: [{ field: "sampleFieldId2" }]
    },
    tables: { T1: "sampleTable1", T2: "sampleTable2" }
  },
  onUpdateSchema: () => { },
  onUpdateObject: () => { }
};

export default QueryBuilder;
