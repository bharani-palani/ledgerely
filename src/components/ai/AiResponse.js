import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";
import brandLogo from "../../images/logo/greenIconNoBackground.png";
import { useIntl, FormattedMessage } from "react-intl";
import Typewriter from "typewriter-effect";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CsvDownloader from "react-csv-downloader";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import AiChartWrapper from "./AiChartWrapper";

const AiResponse = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const responseRef = useRef(null);
  const scrollRef = useRef(null);
  const globalContext = useContext(GlobalContext);
  const legerelyContext = useContext(LegerelyContext);
  const { responses } = legerelyContext;
  const { ...rest } = props;

  const scrollToBottom = () => {
    setTimeout(() => {
      responseRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 100);
  };

  const renderAiTooltip = (props, content) => (
    <Tooltip id='ai-tooltip' className='in show' {...rest}>
      {content}
    </Tooltip>
  );

  useEffect(() => {
    scrollToBottom();
    if (scrollRef.current && responses && responses.length > 0) {
      const columns = responses[0]?.data?.type === "array" && responses[0]?.data?.result?.length > 1 ? responses[0]?.data?.result?.length : 1;
      const minColumnsForWideTable = columns === 1 ? 100 : 40;
      scrollRef.current.children[0].style.width = columns * minColumnsForWideTable + "%" || 0;
    }
  }, [responses]);

  const jsonToMarkdownTable = data => {
    if (!data || data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]);
    let markdown = `| ${headers.join(" | ")} |\n`;
    markdown += `| ${headers.map(() => "---").join(" | ")} |\n`;

    data.forEach(row => {
      const rowValues = headers.map(header => row[header]);
      markdown += `| ${rowValues.join(" | ")} |\n`;
    });

    return markdown;
  };

  return (
    <div
      className={`border border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} rounded-3 rounded mb-2`}
      style={{ height: "calc(100% - 70px)", maxHeight: "calc(100% - 70px)" }}
    >
      <div className='d-flex align-items-center justify-content-between bni-bg text-black p-2 rounded-top text-truncate'>
        <FormattedMessage id='ledgerelyAi' defaultMessage='ledgerelyAi' />
        <OverlayTrigger
          placement='left'
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
      <div
        className='py-1 px-3 overflow-auto'
        style={{
          height: "calc(100vh - 260px)",
          maxHeight: "calc(100vh - 260px)",
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
                className={`chat-right-bubble ${res?.data?.chart && Object.keys(res.data.chart).length > 0 ? "isChart" : ""} ${userContext?.userData?.theme} ${res?.data?.hasOwnProperty("error") ? "bg-danger text-light" : `bg-${userContext?.userData?.theme}`} align-self-end p-2 rounded-1 text-wrap text-break`}
              >
                <div className='d-flex gap-2 align-items-start justify-content-between'>
                  {Object.prototype.hasOwnProperty.call(res?.data, "error") ? (
                    <Typewriter
                      options={{
                        cursor: "",
                        strings: res?.data?.error,
                        autoStart: true,
                        delay: 10,
                      }}
                    />
                  ) : (
                    <div ref={scrollRef} className={`table-responsive markDown w-100`}>
                      {res.data.type === "string" && (
                        <Typewriter
                          options={{
                            cursor: "",
                            strings: res.data.result,
                            autoStart: true,
                            delay: 10,
                          }}
                        />
                      )}
                      {res.data.type === null && (
                        <div>
                          <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
                        </div>
                      )}
                      {res.data.type === "array" && <ReactMarkdown remarkPlugins={[remarkGfm]}>{jsonToMarkdownTable(res.data.result)}</ReactMarkdown>}
                    </div>
                  )}
                  <div className='d-flex flex-column gap-2'>
                    <img
                      className='p-1 rounded-circle bni-border bni-border-all bni-border-all-1'
                      src={brandLogo}
                      style={{ width: "30px", height: "30px" }}
                    />
                    {res.data.type === "array" && res.data.result.length > 1 && (
                      <button className='btn btn-bni rounded-circle px-2 py-1'>
                        <CsvDownloader datas={res.data.result} filename={`${globalContext.appName}-ai-export-${res.data.id}.csv`}>
                          <i
                            className='fa fa-file-excel-o'
                            title={intl.formatMessage({
                              id: "download",
                              defaultMessage: "download",
                            })}
                          />
                        </CsvDownloader>
                      </button>
                    )}
                  </div>
                </div>
                {res?.data?.chart && res.data.result && Object.keys(res.data.chart).length > 0 && (
                  <AiChartWrapper data={res.data.result} params={res.data.chart} />
                )}
              </div>
            </div>
          ))}
        <div ref={responseRef} />
      </div>
    </div>
  );
};

export default AiResponse;
