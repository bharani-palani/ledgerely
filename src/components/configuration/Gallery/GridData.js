import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import Thumbnail from "./Thumbnail";
import { UserContext } from "../../../contexts/UserContext";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";

function GridData(props) {
  const intl = useIntl();
  const {
    data,
    directory,
    selectedId,
    onCreateFolder,
    onDeleteFolder,
    onRename,
    onDownload,
    isDirectory,
    ...rest
  } = props;
  const [view, setView] = useState("list");
  const [newFileFolder, setNewFileFolder] = useState("");
  const [createFolder, setCreateFolder] = useState(false);
  const [rename, setRename] = useState(false);
  const [renameObj, setRenameObj] = useState({});
  const userContext = useContext(UserContext);

  const getFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const copyTextToClipboard = async text => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  const handleCopyClick = copyText => {
    copyTextToClipboard(copyText)
      .then(() => {
        userContext.renderToast({
          message: intl.formatMessage(
            {
              id: "fileValueCopiedToClipboard",
              defaultMessage: "fileValueCopiedToClipboard",
            },
            { file: copyText },
          ),
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCreateFolder = () => {
    if (newFileFolder) {
      onCreateFolder(selectedId, newFileFolder);
      setCreateFolder(false);
      setNewFileFolder("");
    } else {
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "folderNameCantBeEmpty",
          defaultMessage: "folderNameCantBeEmpty",
        }),
      });
    }
  };

  const handleRename = () => {
    const first = renameObj.path ? `${renameObj.path}/` : "";
    if (newFileFolder) {
      const obj = {
        oldKey: `${first}${renameObj.value}`,
        newKey: `${first}${newFileFolder}`,
      };
      onRename(obj, selectedId, isDirectory);
    } else {
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "fieldCantBeEmpty",
          defaultMessage: "fieldCantBeEmpty",
        }),
      });
    }
  };

  const reset = () => {
    setCreateFolder(false);
    setRename(false);
  };

  useEffect(() => {
    reset();
    let bDirec = directory;
    bDirec = bDirec.split("/");
    const path = bDirec
      .filter(
        (_, i) => i < (isDirectory ? bDirec.length - 2 : bDirec.length - 1),
      )
      .join("/");
    const value = isDirectory
      ? bDirec[bDirec.length - 2]
      : bDirec[bDirec.length - 1];
    setRenameObj({
      path: path,
      value: value,
    });
  }, [directory, isDirectory]);

  const toggleCreateRename = () => {
    return createFolder ? directory : renameObj.path;
  };

  const renderCloneTooltip = (props, content) => (
    <Tooltip id='button-tooltip-1' className='in show' {...rest}>
      {content}
    </Tooltip>
  );

  return (
    <div className='tableGrid'>
      <div className='headerGrid'>
        {!createFolder && !rename && (
          <div className='dirLabel'>
            {directory && (
              <>
                <i className='fa fa-folder-open px-2' />
                <span>{directory}</span>
              </>
            )}
          </div>
        )}
        {(createFolder || rename) && (
          <div className='input-group input-group-sm'>
            <OverlayTrigger
              placement='top'
              overlay={renderCloneTooltip(props, toggleCreateRename())}
              triggerType='hover'
            >
              <span className='input-group-text'>
                <i className='fa fa-folder-open px-2' /> {toggleCreateRename()}
              </span>
            </OverlayTrigger>

            <input
              type='text'
              autoFocus
              onFocus={e => setNewFileFolder(e.target.value)}
              placeholder={
                createFolder
                  ? intl.formatMessage({
                      id: "newFolder",
                      defaultMessage: "newFolder",
                    })
                  : intl.formatMessage({
                      id: "renameFileOrFolder",
                      defaultMessage: "renameFileOrFolder",
                    })
              }
              defaultValue={rename ? renameObj.value : ""}
              onChange={e => setNewFileFolder(e.target.value)}
              className='form-control'
            />
            <>
              {createFolder && (
                <>
                  <button
                    className='btn btn-secondary'
                    onClick={() => handleCreateFolder()}
                    type='button'
                  >
                    <i className='fa fa-upload' />
                  </button>
                  <button
                    className='btn btn-secondary'
                    onClick={() => reset()}
                    type='button'
                  >
                    <i className='fa fa-undo' />
                  </button>
                </>
              )}
              {rename && (
                <>
                  <button
                    className='btn btn-secondary'
                    onClick={() => handleRename()}
                    type='button'
                  >
                    <i className='fa fa-font' />
                  </button>
                  <button
                    className='btn btn-secondary'
                    onClick={() => reset()}
                    type='button'
                  >
                    <i className='fa fa-undo' />
                  </button>
                </>
              )}
            </>
          </div>
        )}
        <div>
          <div className='text-end'>
            {isDirectory && !createFolder && (
              <i
                className={`fa fa-plus viewButtons`}
                onClick={() => {
                  setRename(false);
                  setCreateFolder(true);
                }}
              />
            )}
            {data.length > 0 && !rename && (
              <i
                className='fa fa-font viewButtons'
                onClick={() => {
                  setCreateFolder(false);
                  setRename(true);
                }}
              />
            )}
            {data.length > 0 && (
              <i
                className='fa fa-trash viewButtons'
                onClick={() => onDeleteFolder(selectedId)}
              />
            )}
            {data.length > 0 && (
              <i
                className='fa fa-list viewButtons'
                onClick={() => setView("list")}
              />
            )}
            {data.length > 0 && (
              <i
                className='fa fa-table viewButtons'
                onClick={() => setView("table")}
              />
            )}
          </div>
        </div>
      </div>
      <div className='gridWrapper'>
        <div className={`responsive-gallery-grid ${view}-grid`}>
          {view === "list" && data.length > 0 && (
            <div className={`child ${view}-child`}>
              <div></div>
              <div className='title ps-2'>
                <FormattedMessage id='fileName' defaultMessage='fileName' />
              </div>
              <div className='title ps-2'>
                <FormattedMessage id='fileSize' defaultMessage='fileSize' />
              </div>
              <div className='title ps-2'>
                <FormattedMessage
                  id='lastModified'
                  defaultMessage='lastModified'
                />
              </div>
            </div>
          )}
          {data.length > 0 &&
            data.map((d, i) => (
              <React.Fragment key={i}>
                {d.size > 0 && (
                  <div
                    className={`child ${view}-child ${view}-child-${userContext.userData.theme}`}
                  >
                    {view === "list" && <Thumbnail object={d} />}

                    <div className={`${view === "table" ? "text-center" : ""}`}>
                      <div className='copyable'>
                        <span className='d-flex'>
                          <i
                            onClick={() =>
                              handleCopyClick(
                                `${userContext.userConfig.fileStorageType}/${d.label}`,
                              )
                            }
                            title={intl.formatMessage({
                              id: "copyToClipboard",
                              defaultMessage: "copyToClipboard",
                            })}
                            className='fa fa-copy btn btn-sm btn-secondary rounded-circle p-2'
                          />
                          <i
                            onClick={() =>
                              onDownload(
                                `${userContext.userConfig.fileStorageType}/${d.label}`,
                              )
                            }
                            className='fa fa-download btn btn-sm btn-secondary ms-2 rounded-circle p-2'
                          />
                        </span>
                        <span
                          title={d.label}
                          className={`ellipsis ${
                            view === "table" ? "text-center" : ""
                          }`}
                        >
                          {d.label.split("/").slice(-1)}
                        </span>
                      </div>
                    </div>
                    {view === "table" && <Thumbnail object={d} />}
                    {view === "table" ? (
                      <div className='copyable info'>
                        <div className='text-center'>
                          {`${getFileSize(d.size)}`}
                        </div>
                        <div className='text-center'>
                          {moment(d.lastModified).format(
                            "MMM Do YYYY, h:mm:ss a",
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className='ps-2'>{`${getFileSize(d.size)}`}</div>
                        <div className='ps-2'>
                          {moment(d.lastModified).format(
                            "MMM Do YYYY, h:mm:ss a",
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
      {directory === "" && (
        <div className='p-5 text-center bni-border bni-border-all bni-border-all-1 rounded icon-bni'>
          <i className='fa fa-file fa-3x py-3' />
          <div>
            <FormattedMessage
              id='selectaFileOrFolderToViewThem'
              defaultMessage='selectaFileOrFolderToViewThem'
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GridData;
