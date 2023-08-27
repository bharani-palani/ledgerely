import React, { useState, useEffect, useContext } from "react";
import helpers from "../../helpers";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import { UserContext } from "../../contexts/UserContext";
import Wizard from "../configuration/Wizard";
import CryptoJS from "crypto-js";
import Encryption from "../../helpers/clientServerEncrypt";
import { encryptKeys, encryptSaltKey, clientServerEncryptKeys } from "./crypt";
import { useIntl } from "react-intl";

function Config(props) {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const wizardData = [
    {
      id: 0,
      label: intl.formatMessage({
        id: "googleApi",
        defaultMessage: "googleApi",
      }),
      icon: "fa fa-user",
      filterArray: ["web", "email"],
    },
    {
      id: 1,
      label: intl.formatMessage({
        id: "webDefaults",
        defaultMessage: "webDefaults",
      }),
      icon: "fa fa-globe",
      filterArray: [
        "bgSong",
        "bgSongDefaultPlay",
        "switchSongFeatureRequired",
        "bgVideo",
        "bgVideoDefaultPlay",
        "switchVideoFeatureRequired",
        "webLayoutType",
        "webMenuType",
        "webTheme",
        "switchThemeFeatureRequired",
      ],
    },
    {
      id: 2,
      label: intl.formatMessage({
        id: "socialMedia",
        defaultMessage: "socialMedia",
      }),
      icon: "fa fa-facebook",
      filterArray: [
        "social_media_facebook",
        "social_media_twitter",
        "social_media_linkedIn",
        "social_media_instagram",
      ],
    },
  ];
  const masterConfig = [
    {
      id: "appId",
      index: "appId",
      elementType: "hidden",
      value: "",
      className: "",
    },
    {
      id: "web",
      index: "web",
      label: intl.formatMessage({ id: "website", defaultMessage: "website" }),
      elementType: "text",
      value: "",
      placeHolder: "johndoe.com",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "enterValidWebsite",
          defaultMessage: "enterValidWebsite",
        }),
        help: [
          intl.formatMessage({
            id: "yourWebDomain",
            defaultMessage: "yourWebDomain",
          }),
          intl.formatMessage({
            id: "thisValueWillBeSetToYourGlobalVariables",
            defaultMessage: "thisValueWillBeSetToYourGlobalVariables",
          }),
        ],
      },
    },
    {
      id: "email",
      index: "email",
      label: intl.formatMessage({ id: "email", defaultMessage: "email" }),
      elementType: "text",
      value: "",
      placeHolder: "support@johndoe.com",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        errorMsg: intl.formatMessage({
          id: "enterValidEmail",
          defaultMessage: "enterValidEmail",
        }),
        help: [
          intl.formatMessage({
            id: "yourPersonalOrCompanyMailId",
            defaultMessage: "yourPersonalOrCompanyMailId",
          }),
          intl.formatMessage({
            id: "thisValueWillBeSetToYourGlobalVariables",
            defaultMessage: "thisValueWillBeSetToYourGlobalVariables",
          }),
        ],
      },
    },
    {
      id: "bgSong",
      index: "bgSong",
      label: intl.formatMessage({
        id: "themeBackgroundMusic",
        defaultMessage: "themeBackgroundMusic",
      }),
      elementType: "textArea",
      value: "",
      placeHolder: "https://mysong.mp3",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "chooseYourThemeSongPlayableForPeople",
            defaultMessage: "chooseYourThemeSongPlayableForPeople",
          }),
          intl.formatMessage({
            id: "ifNotRequiredLeaveaSlash",
            defaultMessage: "ifNotRequiredLeaveaSlash",
          }),
          intl.formatMessage({
            id: "ifRequiredPasteItFromAwsGallery",
            defaultMessage: "ifRequiredPasteItFromAwsGallery",
          }),
        ],
      },
    },
    {
      id: "bgSongDefaultPlay",
      index: "bgSongDefaultPlay",
      label: intl.formatMessage({
        id: "themeMusicDefaultPlay",
        defaultMessage: "themeMusicDefaultPlay",
      }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      list: [
        {
          label: intl.formatMessage({ id: "yes", defaultMessage: "yes" }),
          value: 1,
        },
        {
          label: intl.formatMessage({ id: "no", defaultMessage: "no" }),
          value: 0,
        },
      ],
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "themeBackgroundMusicWillBePlayed",
            defaultMessage: "themeBackgroundMusicWillBePlayed",
          }),
          intl.formatMessage({
            id: "ifRequiredPasteItFromAwsGallery",
            defaultMessage: "ifRequiredPasteItFromAwsGallery",
          }),
        ],
      },
    },
    {
      id: "switchSongFeatureRequired",
      index: "switchSongFeatureRequired",
      label: intl.formatMessage({
        id: "requireBackgroundSongSwitch",
        defaultMessage: "requireBackgroundSongSwitch",
      }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-md-3 col-sm-6",
      list: [
        {
          label: intl.formatMessage({ id: "yes", defaultMessage: "yes" }),
          value: "1",
        },
        {
          label: intl.formatMessage({ id: "no", defaultMessage: "no" }),
          value: "0",
        },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "youCanShowOrHideAudioControl",
            defaultMessage: "youCanShowOrHideAudioControl",
          }),
          intl.formatMessage({
            id: "thisFeatureCanBeEnabledOrDisabled",
            defaultMessage: "thisFeatureCanBeEnabledOrDisabled",
          }),
        ],
      },
    },
    {
      id: "bgVideo",
      index: "bgVideo",
      label: intl.formatMessage({
        id: "themeBackgroundVideo",
        defaultMessage: "themeBackgroundVideo",
      }),
      elementType: "textArea",
      value: "",
      placeHolder: "https://my-video.mp4",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "chooseYourThemeVideoWhichPlaysInBackground",
            defaultMessage: "chooseYourThemeVideoWhichPlaysInBackground",
          }),
          intl.formatMessage({
            id: "dontWorryItWillBeMuted",
            defaultMessage: "dontWorryItWillBeMuted",
          }),
          intl.formatMessage({
            id: "KeepaSmallVideo",
            defaultMessage: "KeepaSmallVideo",
          }),
          intl.formatMessage({
            id: "ifRequiredPasteItFromAwsGallery",
            defaultMessage: "ifRequiredPasteItFromAwsGallery",
          }),
        ],
      },
    },
    {
      id: "bgVideoDefaultPlay",
      index: "bgVideoDefaultPlay",
      label: intl.formatMessage({
        id: "themeVideoDefaultPlay",
        defaultMessage: "themeVideoDefaultPlay",
      }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      list: [
        {
          label: intl.formatMessage({ id: "yes", defaultMessage: "yes" }),
          value: "1",
        },
        {
          label: intl.formatMessage({ id: "no", defaultMessage: "no" }),
          value: "0",
        },
      ],
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "themeBackgroundVideoWillBePlayed",
            defaultMessage: "themeBackgroundVideoWillBePlayed",
          }),
        ],
      },
    },
    {
      id: "switchVideoFeatureRequired",
      index: "switchVideoFeatureRequired",
      label: intl.formatMessage({
        id: "requireBackgroundVideoSwitch",
        defaultMessage: "requireBackgroundVideoSwitch",
      }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-md-3 col-sm-6",
      list: [
        {
          label: intl.formatMessage({ id: "yes", defaultMessage: "yes" }),
          value: "1",
        },
        {
          label: intl.formatMessage({ id: "no", defaultMessage: "no" }),
          value: "0",
        },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "youCanShowOrHideVideoControlSwitch",
            defaultMessage: "youCanShowOrHideVideoControlSwitch",
          }),
          intl.formatMessage({
            id: "thisFeatureCanBeEnabledOrDisabled",
            defaultMessage: "thisFeatureCanBeEnabledOrDisabled",
          }),
        ],
      },
    },
    {
      id: "webLayoutType",
      index: "webLayoutType",
      label: intl.formatMessage({
        id: "WebLayoutType",
        defaultMessage: "WebLayoutType",
      }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-md-3 col-sm-6",
      list: [
        { label: "Default", value: "default" },
        { label: "Classic", value: "classic" },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "thisSetupIsOnlyForLargeDisplays",
            defaultMessage: "thisSetupIsOnlyForLargeDisplays",
          }),
          `Default: ${intl.formatMessage({
            id: "occupiesEntireWidthOfScreen",
            defaultMessage: "occupiesEntireWidthOfScreen",
          })}`,
          `Classic: ${intl.formatMessage({
            id: "occupies70%WidthInScreenMiddle",
            defaultMessage: "occupies70%WidthInScreenMiddle",
          })}`,
        ],
      },
    },
    {
      id: "webMenuType",
      index: "webMenuType",
      label: intl.formatMessage({
        id: "WebMenuType",
        defaultMessage: "WebMenuType",
      }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-md-3 col-sm-6",
      list: [
        {
          label: intl.formatMessage({ id: "top", defaultMessage: "top" }),
          value: "topMenu",
        },
        {
          label: intl.formatMessage({ id: "left", defaultMessage: "left" }),
          value: "sideMenuLeft",
        },
        {
          label: intl.formatMessage({ id: "right", defaultMessage: "right" }),
          value: "sideMenuRight",
        },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "whereYouWantToPlaceYourMenuLinks",
            defaultMessage: "whereYouWantToPlaceYourMenuLinks",
          }),
        ],
      },
    },
    {
      id: "webTheme",
      index: "webTheme",
      label: intl.formatMessage({ id: "webTheme", defaultMessage: "webTheme" }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-md-3 col-sm-6",
      list: [
        {
          label: intl.formatMessage({ id: "dark", defaultMessage: "dark" }),
          value: "dark",
        },
        {
          label: intl.formatMessage({ id: "light", defaultMessage: "light" }),
          value: "light",
        },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "howDoesYourWebsiteLookOnStartUp",
            defaultMessage: "howDoesYourWebsiteLookOnStartUp",
          }),
          `${intl.formatMessage({
            id: "dark",
            defaultMessage: "dark",
          })} / ${intl.formatMessage({
            id: "light",
            defaultMessage: "light",
          })}`,
        ],
      },
    },
    {
      id: "switchThemeFeatureRequired",
      index: "switchThemeFeatureRequired",
      label: intl.formatMessage({
        id: "switchThemeFeatureRequired",
        defaultMessage: "switchThemeFeatureRequired",
      }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-md-3 col-sm-6",
      list: [
        {
          label: intl.formatMessage({ id: "yes", defaultMessage: "yes" }),
          value: "1",
        },
        {
          label: intl.formatMessage({ id: "no", defaultMessage: "no" }),
          value: "0",
        },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage({
            id: "youCanShowOrHideThemeButtons",
            defaultMessage: "youCanShowOrHideThemeButtons",
          }),
          intl.formatMessage({
            id: "thisFeatureCanBeEnabledOrDisabled",
            defaultMessage: "thisFeatureCanBeEnabledOrDisabled",
          }),
        ],
      },
    },
    {
      id: "social_media_facebook",
      index: "social_media_facebook",
      label: intl.formatMessage({ id: "facebook", defaultMessage: "facebook" }),
      elementType: "textArea",
      value: "",
      placeHolder: "https://facebook.com/xyz",
      className: "col-md-3 col-sm-6",
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage(
            {
              id: "yourSocialProfileLink",
              defaultMessage: "yourSocialProfileLink",
            },
            { media: "facebook" },
          ),
        ],
      },
    },
    {
      id: "social_media_twitter",
      index: "social_media_twitter",
      label: intl.formatMessage({ id: "twitter", defaultMessage: "twitter" }),
      elementType: "textArea",
      value: "",
      placeHolder: "https://twitter.com/xyz",
      className: "col-md-3 col-sm-6",
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage(
            {
              id: "yourSocialProfileLink",
              defaultMessage: "yourSocialProfileLink",
            },
            { media: "twitter" },
          ),
        ],
      },
    },
    {
      id: "social_media_linkedIn",
      index: "social_media_linkedIn",
      label: intl.formatMessage({ id: "linkedIn", defaultMessage: "linkedIn" }),
      elementType: "textArea",
      value: "",
      placeHolder: "https://linkedIn.com/xyz",
      className: "col-md-3 col-sm-6",
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage(
            {
              id: "yourSocialProfileLink",
              defaultMessage: "yourSocialProfileLink",
            },
            { media: "linkedIn" },
          ),
        ],
      },
    },
    {
      id: "social_media_instagram",
      index: "social_media_instagram",
      label: "",
      elementType: "textArea",
      label: intl.formatMessage({
        id: "instagram",
        defaultMessage: "instagram",
      }),
      placeHolder: "https://instagram.com/xyz",
      className: "col-md-3 col-sm-6",
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          intl.formatMessage(
            {
              id: "yourSocialProfileLink",
              defaultMessage: "yourSocialProfileLink",
            },
            { media: "instagram" },
          ),
        ],
      },
    },
  ];
  const [formStructure, setFormStructure] = useState(masterConfig);
  const [loader, setLoader] = useState(true);
  const encryption = new Encryption();

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    return apiInstance.post("getBackend", formdata);
  };

  useEffect(() => {
    setLoader(true);
    const TableRows = formStructure.map(form => form.index);
    getBackendAjax("apps", TableRows)
      .then(r => {
        const responseObject = r.data.response[0];
        const responseArray = Object.keys(responseObject);
        let backupStructure = [...formStructure];
        backupStructure = backupStructure.map(backup => {
          if (responseArray.includes(backup.index)) {
            backup.value = encryptKeys.includes(backup.index)
              ? CryptoJS.AES.decrypt(
                  responseObject[backup.index],
                  userContext.userConfig[encryptSaltKey],
                ).toString(CryptoJS.enc.Utf8)
              : clientServerEncryptKeys.includes(backup.index)
              ? encryption.decrypt(
                  responseObject[backup.index],
                  userContext.userConfig[encryptSaltKey],
                )
              : responseObject[backup.index];
          }
          return backup;
        });
        setFormStructure(backupStructure);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [JSON.stringify(userContext.userConfig)]);

  const onMassagePayload = (index, value) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.value = value;
      }
      return backup;
    });
    setFormStructure(backupStructure);
  };

  const onReactiveFormSubmit = () => {
    setLoader(true);
    const salt = [...formStructure].filter(f => f.id === encryptSaltKey)[0]
      .value;
    let payload = [...formStructure].map(f => ({
      [f.id]: encryptKeys.includes(f.id)
        ? CryptoJS.AES.encrypt(f.value, salt).toString()
        : clientServerEncryptKeys.includes(f.id)
        ? encryption.encrypt(f.value, salt)
        : f.value,
    }));
    payload = Object.assign({}, ...payload);
    const newPayload = {
      Table: "apps",
      updateData: [payload],
    };
    const formdata = new FormData();
    formdata.append("postData", JSON.stringify(newPayload));

    apiInstance
      .post("/postBackend", formdata)
      .then(res => {
        if (res.data.response) {
          let backupStructure = [...formStructure];
          const bPayLoad = Object.keys(payload);
          backupStructure = backupStructure.map(backup => {
            if (bPayLoad.includes(backup.index)) {
              backup.value = payload[backup.index];
            }
            return backup;
          });
          setFormStructure(backupStructure);
          userContext.renderToast({
            message: intl.formatMessage({
              id: "transactionSavedSuccessfully",
              defaultMessage: "transactionSavedSuccessfully",
            }),
          });
          let massageStructure = backupStructure.map(b => [b.id, b.value]);
          massageStructure = Object.fromEntries(massageStructure);
          userContext.setUserConfig(massageStructure);
          userContext.updateUserData("theme", massageStructure.webTheme);
        }
      })
      .catch(e =>
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        }),
      )
      .finally(() => setLoader(false));
  };

  return (
    <div className=''>
      {loader ? (
        <div className='text-center mt-100'>
          <Loader
            type={helpers.loadRandomSpinnerIcon()}
            color={document.documentElement.style.getPropertyValue(
              "--app-theme-bg-color",
            )}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <Wizard
          key={1}
          data={formStructure}
          menu={wizardData}
          onMassagePayload={onMassagePayload}
          onReactiveFormSubmit={onReactiveFormSubmit}
        />
      )}
    </div>
  );
}
export default Config;
