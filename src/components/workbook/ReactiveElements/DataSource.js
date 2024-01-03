import React, { useContext, useState, createContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import WorkbookContext from "../WorkbookContext";
// import { UserContext } from "../../../contexts/UserContext";
import { VerticalPanes, Pane } from "../VerticalPane";
import DSOptions from "../DataSourceOptions";
import DynamicClause from "./DynamicClause";
import { GlobalContext } from "../../../contexts/GlobalContext";

export const DSContext = createContext([{}, () => {}]);

const DataSource = props => {
  // const { id, title, onChange } = props;
  const globalContext = useContext(GlobalContext);
  // const userContext = useContext(UserContext);
  const workbookContext = useContext(WorkbookContext);
  const { theme, table, selectedWBFields } = workbookContext;
  const [show, setShow] = useState(true);
  const [payload, setPayload] = useState({});
  const optionsConfig = [
    // change this to API data
    {
      id: "MP",
      label: globalContext.appName,
      tables: [
        {
          label: "banks",
          fields: [
            "bank_id",
            "bank_name",
            "bank_account_number",
            "bank_swift_code",
            "bank_account_type",
            "bank_country",
            "bank_sort",
            "bank_locale",
            "bank_currency",
          ],
        },
        {
          label: "income_expense_category",
          fields: [
            "inc_exp_cat_id",
            "inc_exp_cat_name",
            "inc_exp_cat_is_metric",
            "inc_exp_cat_is_plan_metric",
          ],
        },
        {
          label: "income_expense",
          fields: [
            "inc_exp_id",
            "inc_exp_name",
            "inc_exp_amount",
            "inc_exp_plan_amount",
            "inc_exp_type",
            "inc_exp_date",
            "inc_exp_added_at",
            "inc_exp_category",
            "inc_exp_bank",
            "inc_exp_comments",
            "inc_exp_is_planned",
            "inc_exp_is_income_metric",
          ],
        },
        {
          label: "credit_cards",
          fields: [
            "credit_card_id",
            "credit_card_name",
            "credit_card_number",
            "credit_card_start_date",
            "credit_card_end_date",
            "credit_card_payment_date",
            "credit_card_annual_interest",
            "credit_card_locale",
            "credit_card_currency",
          ],
        },
        {
          label: "credit_card_transactions",
          fields: [
            "cc_id",
            "cc_transaction",
            "cc_date",
            "cc_opening_balance",
            "cc_payment_credits",
            "cc_purchases",
            "cc_taxes_interest",
            "cc_expected_balance",
            "cc_for_card",
            "cc_inc_exp_cat",
            "cc_comments",
            "cc_transaction_status",
            "cc_added_at",
          ],
        },
      ],
      hasUpload: false,
    },
    {
      id: "CSV",
      label: "CSV File",
      fileType: "text/csv,text/comma-separated-values,application/csv",
      hasUpload: true,
    },
    {
      id: "TEXT",
      label: "Text File (Tab delimited)",
      fileType: "text/plain",
      hasUpload: true,
    },
    {
      id: "JSON",
      label: "JSON File",
      fileType: "application/json",
      hasUpload: true,
    },
  ];
  const [clause, setClause] = useState({
    select: [],
    from: "",
    where: [],
    join: [],
    groupBy: [],
    orderBy: [],
    limit: [1000, 0],
  });

  useEffect(() => {
    const pay = {
      select: clause.select,
      from: clause.from,
      where: clause.where.map(({ row }) => row),
      join: clause.join.map(({ row }) => row),
      groupBy: clause.groupBy,
      orderBy: clause.orderBy.map(({ row }) => row),
      limit: clause.limit,
    };
    // setPayload(clause);
    setPayload(pay);
  }, [clause]);

  return (
    <DSContext.Provider value={{ clause, setClause, optionsConfig }}>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size='xl'
        backdrop='static'
        style={{ zIndex: 9999 }}
        fullscreen
      >
        <Modal.Header closeButton className='py-2'>
          <Modal.Title as={"small"}>Data Source</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`p-2 ${
            theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
          }`}
        >
          <VerticalPanes
            theme={theme}
            style={{ height: "calc(100vh - 105px)" }}
            className={`border border-1 ${
              theme === "dark" ? "border-secondary" : ""
            } rounded`}
          >
            <Pane
              width={"20%"}
              className={`border border-1 ${
                theme === "dark" ? "border-secondary" : ""
              } border-start-0 border-top-0 border-bottom-0`}
            >
              {optionsConfig.map((c, i) => (
                <DSOptions key={c.id} config={c} />
              ))}
            </Pane>
            <Pane
              width={"20%"}
              className={`${
                theme === "dark" ? "border-secondary" : ""
              } border-top-0 border-bottom-0`}
            >
              <div className='border-0 rounded-0 w-100 border-0 bni-bg py-1 text-center text-dark small'>
                Fields
              </div>
              <div className=''>
                {selectedWBFields?.length
                  ? selectedWBFields.map((sel, i) => (
                      <div
                        draggable={true}
                        className='cursor-pointer p-1 small bni-border'
                        key={i}
                        onDragStart={e => {
                          e.dataTransfer.setData(
                            "text",
                            JSON.stringify({
                              source: ["select", "where", "groupBy", "orderBy"],
                              data: `${table}.${sel}`,
                            }),
                          );
                        }}
                      >
                        {sel}
                      </div>
                    ))
                  : null}
              </div>
            </Pane>
            <Pane
              width={"30%"}
              className={`border border-1 ${
                theme === "dark" ? "border-secondary" : ""
              } border-top-0 border-bottom-0`}
            >
              <div
                className={`border-0 rounded-0 w-100 bni-bg py-1 text-center text-dark small`}
              >
                Clauses
              </div>
              <div
                className='overflow-auto'
                style={{ height: "calc(100% - 30px)" }}
              >
                <DynamicClause
                  targetKey='select'
                  type='array'
                  contextMenu={[
                    { label: "NULL", mode: "function" },
                    { label: "SUM", mode: "function" },
                    { label: "COUNT", mode: "function" },
                    { label: "MIN", mode: "function" },
                    { label: "MAX", mode: "function" },
                    { label: "AVG", mode: "function" },
                    { label: "DISTINCT", mode: "function" },
                  ]}
                />
                <DynamicClause targetKey='from' type='string' />
                <DynamicClause
                  targetKey='where'
                  type='arrayOfObjects'
                  suffixList={["AND", "OR"]}
                  contextMenu={[
                    {
                      label: "EQUALTO",
                      mode: "operator",
                      value: "= '{a}'",
                      valueType: "SINGLE",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "NOTEQUALTO",
                      mode: "operator",
                      value: "!= '{a}'",
                      valueType: "SINGLE",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "LESSTHAN",
                      mode: "operator",
                      value: "< '{a}'",
                      valueType: "SINGLE",
                      placeholder: "Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "GREATERTHAN",
                      mode: "operator",
                      value: "> '{a}'",
                      valueType: "SINGLE",
                      placeholder: "Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "LESSTHANEQUALTO",
                      mode: "operator",
                      value: "<= '{a}'",
                      valueType: "SINGLE",
                      placeholder: "Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "GREATERTHANEQUALTO",
                      mode: "operator",
                      value: ">= '{a}'",
                      valueType: "SINGLE",
                      placeholder: "Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "CONTAINS",
                      mode: "operator",
                      value: "LIKE '%{a}%'",
                      valueType: "SINGLE",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "STARTSWITH",
                      mode: "operator",
                      value: "LIKE '{a}%'",
                      valueType: "SINGLE",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "ENDSWITH",
                      mode: "operator",
                      value: "LIKE '%{a}'",
                      valueType: "SINGLE",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "DOESNOTCONTAIN",
                      mode: "operator",
                      value: "NOT LIKE '%{a}%'",
                      valueType: "SINGLE",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "DOESNOTBEGINWITH",
                      mode: "operator",
                      value: "NOT LIKE '{a}%'",
                      valueType: "SINGLE",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "DOESNOTENDWITH",
                      mode: "operator",
                      value: "NOT LIKE '%{a}'",
                      valueType: "SINGLE",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "ISNULL",
                      mode: "operator",
                      value: "IS NULL",
                      valueType: "NULL",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "ISNOTNULL",
                      mode: "operator",
                      value: "IS NOT NULL",
                      valueType: "NULL",
                      placeholder: "String / Number",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "IN",
                      mode: "operator",
                      value: "IN {n}",
                      valueType: "MULTIPLE",
                      placeholder: "Comma seperated values (n values)",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "NOTIN",
                      mode: "operator",
                      value: "NOT IN {n}",
                      valueType: "MULTIPLE",
                      placeholder: "Comma seperated values (n values)",
                      suffix: "AND",
                      input: "",
                    },
                    {
                      label: "BETWEEN",
                      mode: "operator",
                      value: "BETWEEN '{a}' AND '{b}'",
                      valueType: "DOUBLE",
                      placeholder: "Comma sepearated values (2 values)",
                      suffix: "AND",
                      input: "",
                    },
                  ]}
                />
                <DynamicClause
                  targetKey='join'
                  type='relation'
                  contextMenu={[
                    {
                      label: "INNER",
                      mode: "joinQuery",
                    },
                    {
                      label: "OUTER",
                      mode: "joinQuery",
                    },
                    {
                      label: "LEFT",
                      mode: "joinQuery",
                    },
                    {
                      label: "RIGHT",
                      mode: "joinQuery",
                    },
                    {
                      label: "LEFT OUTER",
                      mode: "joinQuery",
                    },
                    {
                      label: "RIGHT OUTER",
                      mode: "joinQuery",
                    },
                  ]}
                />
                <DynamicClause
                  targetKey='orderBy'
                  type='arrayOfObjects'
                  contextMenu={[
                    {
                      label: "DESC",
                      mode: "operator",
                      value: "DESC",
                      valueType: "NULL",
                    },
                    {
                      label: "ASC",
                      mode: "operator",
                      value: "ASC",
                      valueType: "NULL",
                    },
                  ]}
                />
                <DynamicClause
                  targetKey='limit'
                  type='range'
                  contextMenu={[
                    {
                      label: "Count",
                      input: 1000,
                      min: 0,
                      max: 1000,
                    },
                    {
                      label: "Offset",
                      input: 0,
                      min: 0,
                      max: 1000,
                    },
                  ]}
                />
              </div>
            </Pane>
            <Pane
              width={"50%"}
              className={`${theme === "dark" ? "border-secondary" : ""}`}
            >
              <div className='h-50'>
                <div
                  style={{ borderRadius: "0px 5px 0px 0px" }}
                  className='d-flex align-items-center justify-content-between border-0 w-100 border-0 bni-bg py-1 ps-2 pe-1 text-dark small'
                >
                  <span className='text-center'>Query</span>
                  <button className={`btn btn-sm btn-${theme} py-0`}>
                    Run Query
                  </button>
                </div>
                <div
                  className='overflow-auto p-1'
                  style={{ height: "calc(100% - 30px)" }}
                >
                  <pre>{JSON.stringify(payload, null, 2)}</pre>
                </div>
              </div>
              <div className='h-50'>
                <div className='border-0 w-100 border-0 bni-bg py-1 text-center text-dark small'>
                  Data
                </div>
                <div
                  className='overflow-auto'
                  style={{ height: "calc(100% - 30px)" }}
                >
                  DB data
                </div>
              </div>
            </Pane>
          </VerticalPanes>
        </Modal.Body>
        <Modal.Footer
          className={`border-1 rounded-bottom py-1 px-1 ${
            theme === "dark"
              ? "bg-dark text-white border-secondary"
              : "bg-white text-dark"
          }`}
        >
          <button className='btn btn-bni btn-sm'>Load data</button>
        </Modal.Footer>
      </Modal>
      <div
        onClick={() => setShow(!show)}
        className='p-5 cursor-pointer bni-border bni-border-all bni-border-all-1 rounded-3 icon-bni d-flex align-items-center justify-content-center'
      >
        <div>Click to load data</div>
      </div>
    </DSContext.Provider>
  );
};

export default DataSource;
