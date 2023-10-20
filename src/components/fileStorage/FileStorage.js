import React, { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Gallery from "../configuration/Gallery";
import { UserContext } from "../../contexts/UserContext";
import OffCanvas from "../shared/OffCanvas";

const FileStorage = props => {
  const userContext = useContext(UserContext);
  const intl = useIntl();
  const help = [
    intl.formatMessage({
      id: "awsS3BucketIsUsedTo",
      defaultMessage: "awsS3BucketIsUsedTo",
    }),
    intl.formatMessage({
      id: "theseFilesCanBeMaintained",
      defaultMessage: "theseFilesCanBeMaintained",
    }),
    intl.formatMessage({
      id: "pleseFollowTheSteps",
      defaultMessage: "pleseFollowTheSteps",
    }),
    intl.formatMessage({
      id: "pleaseTakeBackupOfYour",
      defaultMessage: "pleaseTakeBackupOfYour",
    }),
    intl.formatMessage({
      id: "youCanMaintainMultipleBuckets",
      defaultMessage: "youCanMaintainMultipleBuckets",
    }),
    intl.formatMessage({
      id: "weUseSignedURLs",
      defaultMessage: "weUseSignedURLs",
    }),
    intl.formatMessage({
      id: "youCanCopyTheLocationOfYourFile",
      defaultMessage: "youCanCopyTheLocationOfYourFile",
    }),
    intl.formatMessage(
      {
        id: "forMoreDetailsAboutAwsS3",
        defaultMessage: "forMoreDetailsAboutAwsS3",
      },
      {
        link: `<a target="_blank" href="https://aws.amazon.com/s3/" class="btn-link">https://aws.amazon.com/s3/</a>`,
      },
    ),
  ];
  return (
    <div className='m-2'>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-white lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-floppy-o fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='fileStorage' defaultMessage='fileStorage' />
            </div>
          </div>
          <OffCanvas
            className={`text-center ${
              userContext.userData.theme === "dark"
                ? "bg-dark text-white-50"
                : "bg-white text-black"
            }`}
            btnValue="<i class='fa fa-question-circle' />"
            btnClassName={`col-1 btn btn-sm ${
              userContext.userData.theme === "dark" ? "text-white" : "text-dark"
            }`}
            placement='end'
            key={1}
            label={intl.formatMessage({
              id: "fileStorage",
              defaultMessage: "fileStorage",
            })}
          >
            {help.length > 0 && (
              <ul className={`list-group list-group-flush`}>
                {help.map((point, j) => (
                  <li
                    key={j}
                    className={`list-group-item border-bottom-0 ${
                      userContext.userData.theme === "dark"
                        ? "bg-dark text-white-50"
                        : "bg-white text-black"
                    }`}
                    dangerouslySetInnerHTML={{ __html: point }}
                  ></li>
                ))}
              </ul>
            )}
          </OffCanvas>
        </div>
      </div>
      <div className='container-fluid'>
        <Gallery />
      </div>
    </div>
  );
};

export default FileStorage;
