import React, { useContext, useState, useEffect, useRef } from "react";
import apiInstance from "../../services/apiServices";
import { Table } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";

const Transactions = () => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const listInnerRef = useRef();
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    count: 10,
    skip: 0,
  });
  const [loading, setLoading] = useState(false);
  const [lazy, setLazy] = useState(true);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;
      if (isNearBottom) {
        setParams(prev => ({
          ...prev,
          skip: prev.skip + 10,
        }));
      }
    }
  };

  useEffect(() => {
    const listInnerElement = listInnerRef.current;
    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(params);
    const queryString = query.toString();
    if (lazy) {
      setLoading(true);
      apiInstance
        .get(`/payments/razorpay/getTransactions?${queryString}`)
        .then(res => {
          setData(prev => ({
            ...prev,
            items:
              params.skip === 0
                ? res.data.response.items
                : [...prev.items, ...res.data.response.items],
          }));
          setLazy(res?.data?.response?.count > 0);
        })
        .catch(err => {
          console.error(err);
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "unableToReachServer",
              defaultMessage: "unableToReachServer",
            }),
          });
          setLazy(false);
        })
        .finally(() => setLoading(false));
    }
  }, [params]);

  const badgeStatus = {
    created: "bg-info",
    active: "bg-success",
    cancelled: "bg-danger",
    completed: "bg-primary",
    authenticated: "bg-success",
    pending: "bg-warning",
    expired: "bg-danger",
    halted: "bg-warning",
    paused: "bg-warning",
  };

  return (
    <div className='container-fluid'>
      <div className='fs-3 py-2'>
        <FormattedMessage id={"history"} defaultMessage={"history"} />
      </div>
      <div
        className='table-responsive-sm'
        style={{ maxHeight: "215px", overflow: "auto" }}
        ref={listInnerRef}
      >
        <Table
          striped
          bordered
          hover
          size='sm'
          variant={userContext.userData.theme}
          className='table-mobile'
        >
          <thead className='sticky-top top-0'>
            <tr
              className={`border border-1 ${userContext.userData.theme === "dark" ? "border-secondary" : ""}`}
            >
              <th>
                <FormattedMessage
                  id={"subscriptionId"}
                  defaultMessage={"subscriptionId"}
                />
              </th>
              <th>
                <FormattedMessage id={"status"} defaultMessage={"status"} />
              </th>
              <th>
                <FormattedMessage
                  id={"cycleStart"}
                  defaultMessage={"cycleStart"}
                />
              </th>
              <th>
                <FormattedMessage id={"cycleEnd"} defaultMessage={"cycleEnd"} />
              </th>
              <th>
                <FormattedMessage id={"endsAt"} defaultMessage={"endsAt"} />
              </th>
              <th>
                <FormattedMessage
                  id={"createdAt"}
                  defaultMessage={"createdAt"}
                />
              </th>
              <th>
                <FormattedMessage id={"details"} defaultMessage={"details"} />
              </th>
            </tr>
          </thead>
          <tbody className='small'>
            {data?.items && data?.items.length > 0 ? (
              data?.items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <span
                      className={`badge ${badgeStatus[item.status]} text-capitalize`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {moment
                      .unix(item.current_start)
                      .format("MMM Do YYYY, h:mm a")}
                  </td>
                  <td>
                    {moment
                      .unix(item.current_end)
                      .format("MMM Do YYYY, h:mm a")}
                  </td>
                  <td>
                    {moment.unix(item.end_at).format("MMM Do YYYY, h:mm a")}
                  </td>
                  <td>
                    {moment.unix(item.created_at).format("MMM Do YYYY, h:mm a")}
                  </td>
                  <td className='text-center'>
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href={item.short_url}
                      className='btn-link'
                    >
                      <i className='fa fa-link' />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='text-center'>
                  <FormattedMessage
                    id='noRecordsGenerated'
                    defaultMessage='noRecordsGenerated'
                  />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className='py-1 small d-flex align-items-center justify-content-end'>
        {data?.items?.length > 0 && (
          <div>
            <span>{Number(data?.items?.length)}</span>
            <span className='px-1'>
              <FormattedMessage
                id={"recordsFound"}
                defaultMessage={"recordsFound"}
              />
            </span>
          </div>
        )}
        {loading && <i className='fa fa-circle-o-notch fa-spin' />}
      </div>
    </div>
  );
};

export default Transactions;
