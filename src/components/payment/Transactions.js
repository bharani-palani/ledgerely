import React, { useContext, useState, useEffect } from "react";
import apiInstance from "../../services/apiServices";
import { Table } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";
import { FormattedMessage } from "react-intl";

const Transactions = () => {
  const userContext = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const params = {
      count: 10,
      skip: 0,
    };
    const query = new URLSearchParams(params);
    const queryString = query.toString();

    apiInstance
      .get(`/payments/razorpay/getTransactions?${queryString}`)
      .then(res => {
        console.log("bbb", res.data.response);
        setData(res.data.response);
      });
  }, []);

  const badgeStatus = {
    created: "bg-info",
    active: "bg-success",
    cancelled: "bg-danger",
    completed: "bg-success",
    authenticated: "bg-success",
    pending: "bg-warning",
    expired: "bg-danger",
    halted: "bg-warning",
    paused: "bg-warning",
  };

  return data?.items && data?.items.length > 0 ? (
    <div className='container-fluid'>
      <div className='fs-3 py-2'>
        <FormattedMessage id={"history"} defaultMessage={"history"} />
      </div>
      <div className='table-responsive-sm'>
        <Table
          striped
          bordered
          hover
          size='sm'
          variant={userContext.userData.theme}
        >
          <thead>
            <tr>
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
          <tbody>
            {data?.items?.map((item, index) => (
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
                  {moment.unix(item.current_end).format("MMM Do YYYY, h:mm a")}
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
                    className='btn btn-sm btn-primary rounded-circle'
                  >
                    <i className='fa fa-link' />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  ) : null;
};

export default Transactions;
