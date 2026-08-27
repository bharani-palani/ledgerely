import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";
import { useIntl, FormattedMessage } from "react-intl";
import Typewriter from "typewriter-effect";
import CsvDownloader from "react-csv-downloader";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import AiChartWrapper from "./AiChartWrapper";
import { Table } from "../../components/shared/D3/";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoSvg from "../../images/charts/svgComponents/LogoSvg";
import useAxios from "../../services/apiServices";
import { useMemo } from "react";

const AiResponse = props => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const responseRef = useRef(null);
  const globalContext = useContext(GlobalContext);
  const legerelyContext = useContext(LegerelyContext);
  const [tokenUsage, setTokenUsage] = useState({});
  const { responses, loading } = legerelyContext;
  const { ...rest } = props;

  const scrollToBottom = () => {
    setTimeout(() => {
      responseRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 100);
  };

  const renderAiTooltip = (props, content, className) => (
    <Tooltip id='ai-tooltip' className='in show ai-tooltip-big-width' {...rest}>
      <div dangerouslySetInnerHTML={{ __html: content }} className={className} />
    </Tooltip>
  );

  useEffect(() => {
    scrollToBottom();
  }, [responses, loading]);

  const downloadPdf = obj => {
    if (obj?.data?.result) {
      const head = Object.keys(obj.data.result[0]);
      const body = obj.data.result.map(res => Object.keys(res).map(k => res[k]));

      const doc = new jsPDF();
      doc.text(`${globalContext.appName}`, 15, 10);
      doc.setFontSize(10);
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.text(`${globalContext.appWeb}`, pageWidth - 15, 10, { align: "right" });
      doc.setFontSize(12);
      doc.autoTable({
        styles: { overflow: "linebreak" },
        theme: "striped",
        head: [head],
        body: [...body],
      });
      doc.save(`${globalContext.appName}-ai-export-${obj.data.id}.pdf`);
    }
  };

  const getTokenUsage = () => {
    const formdata = new FormData();
    formdata.append("tenantId", userContext.userConfig.tenantId);
    return apiInstance.post("/ai/ledgerelyAi/getTokenUsage", formdata);
  };

  useEffect(() => {
    if (!loading) {
      getTokenUsage()
        .then(res => {
          const data = res.data.response;
          setTokenUsage(data);
        })
        .catch(err => {
          console.log("Error in getting token usage", err);
          setTokenUsage({});
        });
    }
  }, [loading]);

  const exceededQuotaLimitNotify = useMemo(
    () =>
      renderAiTooltip(
        props,
        `${intl.formatMessage({
          id: "tokens",
          defaultMessage: "tokens",
        })} - ${intl.formatMessage({
          id: "maximumQuotaExceeded",
          defaultMessage: "maximumQuotaExceeded",
        })}`,
        "text-danger",
      ),
    [intl, tokenUsage],
  );

  const belowQuotaLimitNotify = useMemo(
    () =>
      renderAiTooltip(
        props,
        `${intl.formatMessage({
          id: "tokens",
          defaultMessage: "tokens",
        })} ${intl.formatMessage({
          id: "consumed",
          defaultMessage: "consumed",
        })} - ${tokenUsage?.percentage}%`,
        "text-warning",
      ),
    [intl, tokenUsage],
  );

  return (
    <div
      className={`border border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} rounded-3 rounded mb-2`}
      style={{ height: "calc(100% - 75px)", maxHeight: "calc(100% - 75px)" }}
    >
      <div className='d-flex align-items-center justify-content-between bni-bg text-black p-2 rounded-top text-truncate ledgerelyAi-tour'>
        <div>
          <FormattedMessage id='ledgerelyAi' defaultMessage='ledgerelyAi' />
        </div>
        <div className='d-flex align-items-center gap-2'>
          <button
            className={`btn btn-sm ${tokenUsage?.percentage === 100 ? "btn-danger" : userContext?.userData?.theme === "dark" ? "btn-dark" : "btn-light border"} px-1 py-0`}
          >
            <OverlayTrigger
              placement='bottom'
              overlay={tokenUsage?.percentage === 100 ? exceededQuotaLimitNotify : belowQuotaLimitNotify}
              triggerType='hover'
            >
              <span>
                <FormattedMessage id='tokens' defaultMessage='tokens' />
                <span className='ps-1'>
                  <FormattedMessage id='limit' defaultMessage='limit' />
                </span>
              </span>
            </OverlayTrigger>
          </button>
          <div>
            <OverlayTrigger
              placement='bottom'
              overlay={renderAiTooltip(
                props,
                intl.formatMessage({
                  id: "AiChatInfo",
                  defaultMessage: "AiChatInfo",
                }),
              )}
              triggerType='hover'
            >
              <i className='fa fa-info-circle cursor-pointer' />
            </OverlayTrigger>
          </div>
        </div>
      </div>
      <div
        className='py-1 px-3 overflow-auto'
        style={{
          height: "calc(100vh - 270px)",
          maxHeight: "calc(100vh - 270px)",
        }}
      >
        {responses && responses?.length === 0 && (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{
              height: "calc(100vh - 270px)",
              maxHeight: "calc(100vh - 270px)",
            }}
          >
            <div
              className={`shadow-${userContext?.userData?.theme} p-3 rounded-2 text-center text-${userContext?.userData?.theme === "dark" ? "light" : "dark"}`}
            >
              <FormattedMessage id='ledgerelyAiTitle' defaultMessage='ledgerelyAiTitle' />
            </div>
          </div>
        )}
        {responses &&
          responses?.length > 0 &&
          responses.map(res => (
            <div className='d-flex flex-column gap-3 mb-3' key={res?.data?.id} id={res?.data?.id}>
              <div
                className={`chat-left-bubble ${userContext?.userData?.theme} d-flex gap-2 align-items-start align-self-start text-start p-2 rounded-1 text-wrap text-break text-${userContext?.userData?.theme === "dark" ? "light" : "dark"} bg-${userContext?.userData?.theme}`}
              >
                <div className='bni-bg text-dark rounded-circle d-flex align-items-center justify-content-center'>
                  {userContext.userData.imageUrl ? (
                    <img
                      className='rounded-circle'
                      alt='userImage'
                      style={{ height: "30px", width: "30px" }}
                      src={`data:image/png;base64,${userContext.userData.imageUrl}`}
                    />
                  ) : (
                    <div style={{ width: "30px" }}>{userContext?.userData?.name[0]?.toUpperCase()}</div>
                  )}
                </div>
                <div>{res?.prompt}</div>
              </div>
              <div
                className={`chat-right-bubble ${res?.data?.chart && Object.keys(res.data.chart).length > 0 ? "isChart" : ""} ${userContext?.userData?.theme} ${Object.prototype.hasOwnProperty.call(res?.data, "error") ? "bg-danger text-light" : `bg-${userContext?.userData?.theme}`} align-self-end p-2 rounded-1 text-wrap text-break`}
              >
                <div className='d-flex gap-2 align-items-start justify-content-between'>
                  {res?.data && Object.prototype.hasOwnProperty.call(res?.data, "error") ? (
                    <Typewriter
                      options={{
                        cursor: "",
                        strings: res?.data?.error,
                        autoStart: true,
                        delay: 10,
                      }}
                    />
                  ) : (
                    <div className={`w-100`}>
                      {res?.data?.type && res?.data?.type === "string" && (
                        <Typewriter
                          options={{
                            cursor: "",
                            strings: res.data.result,
                            autoStart: true,
                            delay: 10,
                          }}
                        />
                      )}
                      {res?.data?.type === null && (
                        <div>
                          <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
                        </div>
                      )}
                      {res?.data?.type && res?.data?.type === "array" && (
                        <Table
                          data={res.data.result}
                          theme={userContext?.userData?.theme}
                          width={`${Object.keys(res.data.result[0]).length > 2 ? Object.keys(res.data.result[0]).length * 40 : 100}%`}
                          height={"250px"}
                          fontColor={userContext?.userData?.theme === "dark" ? "#fff" : "#000"}
                        />
                      )}
                    </div>
                  )}
                  <div className='d-flex flex-column gap-2'>
                    <LogoSvg className='brand img-fluid' width={30} height={30} />
                    {/* <img className='p-1 rounded-circle icon-bni' src={brandLogo} style={{ width: "30px", height: "30px" }} /> */}
                    {res.data.type === "array" && res.data.result.length > 1 && (
                      <>
                        <button className='btn btn-bni rounded-circle px-2 py-1'>
                          <CsvDownloader datas={res.data.result} filename={`${globalContext.appName}-ai-export-csv-${res.data.id}.csv`}>
                            <i
                              className='fa fa-file-excel-o'
                              title={intl.formatMessage({
                                id: "download",
                                defaultMessage: "download",
                              })}
                            />
                          </CsvDownloader>
                        </button>
                        <button className='btn btn-bni rounded-circle px-2 py-1' onClick={() => downloadPdf(res)}>
                          <i
                            className='fa fa-file-pdf-o'
                            title={intl.formatMessage({
                              id: "download",
                              defaultMessage: "download",
                            })}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {res?.data?.chart && res.data.result && Object.keys(res.data.chart).length > 0 && (
                  <AiChartWrapper data={res.data.result} params={res.data.chart} />
                )}
              </div>
            </div>
          ))}
        {loading && (
          <div
            className={`shadow-lg ${userContext?.userData?.theme === "dark" ? "bg-black" : "bg-light border border-1"} py-3 px-4 pull-right mb-1 text-center `}
            style={{ borderRadius: "1.5rem", borderTopRightRadius: 0 }}
          >
            <div className='d-flex align-items-center d-inline text-secondary'>
              <span className='pe-2 fs-6'>
                <FormattedMessage id='thinking' defaultMessage='thinking' />
              </span>
              <i className='fa fa-2x fa-ellipsis-h animate__animated animate__heartBeat animate__infinite' />
            </div>
          </div>
        )}
        <div ref={responseRef} className={loading ? "py-5" : ""} />
      </div>
    </div>
  );
};

export default AiResponse;
