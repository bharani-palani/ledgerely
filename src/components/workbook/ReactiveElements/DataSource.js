import React, { useContext, useState, createContext } from "react";
import { Modal } from "react-bootstrap";
import WorkbookContext from "../WorkbookContext";
import { UserContext } from "../../../contexts/UserContext";
import { VerticalPanes, Pane } from "../VerticalPane";
import DSOptions from "../DataSourceOptions";
import DynamicClause from "./DynamicClause";

export const DSContext = createContext([{}, () => {}]);

const DataSource = props => {
  // const { id, title, onChange } = props;
  const userContext = useContext(UserContext);
  const workbookContext = useContext(WorkbookContext);
  const { theme, table, selectedWBFields } = workbookContext;
  const [show, setShow] = useState(true);
  const optionsConfig = [
    // change this to API data
    {
      id: "MP",
      label: "Money Penny",
      tables: [
        {
          label: "banks",
          fields: [
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
          label: "credit_cards",
          fields: [
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
          label: "categories",
          fields: [
            "inc_exp_cat_name",
            "inc_exp_cat_is_metric",
            "inc_exp_cat_is_plan_metric",
          ],
        },
        {
          label: "inc_exp_trx",
          fields: [
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
          label: "credit_card_trx",
          fields: [
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
    where: {
      appId: userContext.userConfig.appId,
    },
    limit: 1000,
  });

  return (
    <DSContext.Provider value={{ clause, setClause }}>
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
                          e.dataTransfer.setData("text", `${table}.${sel}`);
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
              <DynamicClause targetKey='select' type='array' />
              <DynamicClause targetKey='from' type='string' />
            </Pane>
            <Pane
              width={"50%"}
              className={`${theme === "dark" ? "border-secondary" : ""}`}
            >
              <div className='h-50'>
                <div
                  style={{ borderRadius: "0px 5px 0px 0px" }}
                  className='border-0 w-100 border-0 bni-bg py-1 text-center text-dark small'
                >
                  Query
                </div>
                <div
                  className='overflow-auto p-1'
                  style={{ height: "calc(100% - 30px)" }}
                >
                  <pre>{JSON.stringify(clause, null, 2)}</pre>
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
