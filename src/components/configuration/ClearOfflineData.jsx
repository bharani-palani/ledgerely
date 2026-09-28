import React, { useEffect, useState, useContext } from "react";
import ConfirmationModal from "./Gallery/ConfirmationModal";
import { Button, Row, Col } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { db } from "../../services/indexedDb";
import { Table } from "../../components/shared/D3/";
import { UserContext } from "../../contexts/UserContext";
import helpers from "../../helpers";
import Loader from "../resuable/Loader";

const ClearOfflineData = () => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const tenantId = userContext.userConfig.tenantId;
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(true);

  const [offLineDetails, setOffLineDetails] = useState({
    tableInfo: [],
    totalRecords: 0,
  });

  const loadOfflineDetails = async () => {
    try {
      setLoader(true);
      const final = await db.transaction("r", db.tables, async () => {
        const tableInfo = await Promise.all(
          db.tables
            .filter(t => t.name !== "localeTable")
            .map(async table => ({
              name: helpers.camelCaseToText(table.name).toUpperCase(),
              count: await table.where("tenantId").equals(tenantId).count(),
            })),
        );

        const totalRecords = tableInfo.reduce((t, c) => t + c.count, 0);

        return {
          totalRecords,
          tableInfo: tableInfo.map(({ name, count }) => ({
            name,
            [`count(${totalRecords})`]: count,
          })),
        };
      });

      setOffLineDetails(final);
    } catch (err) {
      console.log("cache loading error", err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadOfflineDetails();
  }, []);

  const deleteOfflineData = async () => {
    await Promise.all(
      db.tables
        .filter(t => t.name !== "localeTable")
        .map(async table => {
          const hasTenantIndex = table.schema.indexes.some(index => index.name === "tenantId");
          if (!hasTenantIndex) {
            console.log("no index", table);
            return;
          }
          await table.where("tenantId").equals(tenantId).delete();
        }),
    );
    setOpenModal(false);
    loadOfflineDetails();
  };
  return loader ? (
    <Loader middle />
  ) : (
    <Row className='p-3'>
      {openModal && (
        <ConfirmationModal
          show={openModal}
          confirmationstring={intl.formatMessage({
            id: "confirmDelete",
            defaultMessage: "confirmDelete",
          })}
          handleHide={() => {
            setOpenModal(false);
          }}
          handleYes={() => deleteOfflineData()}
          size='md'
          animation={false}
        />
      )}
      <Col md={6}>
        <FormattedMessage id='clearOfflineDataMsg' defaultMessage='clearOfflineDataMsg' />
      </Col>
      <Col md={6}>
        <Table
          data={offLineDetails.tableInfo}
          theme={userContext?.userData?.theme}
          fillColor={helpers.bootstrapColorVariables[0]}
          fontColor='currentColor'
          lineColor='transparent'
          width={`100%`}
          height={"200px"}
        />
        <Button size='sm' className='mt-3 pull-right' onClick={() => setOpenModal(true)}>
          <FormattedMessage id='delete' defaultMessage='delete' />!
        </Button>
      </Col>
    </Row>
  );
};

export default ClearOfflineData;
