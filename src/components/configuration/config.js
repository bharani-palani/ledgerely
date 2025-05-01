import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../services/apiServices";
import Loader from "../resuable/Loader";
import { UserContext } from "../../contexts/UserContext";
import Wizard from "../configuration/Wizard";
import CryptoJS from "crypto-js";
import Encryption from "../../helpers/clientServerEncrypt";
import { encryptKeys, encryptSaltKey, clientServerEncryptKeys } from "./crypt";
import { useIntl } from "react-intl";
import { GlobalContext } from "../../contexts/GlobalContext";
import { countryList } from "../../helpers/static";
import { MyAlertContext } from "../../contexts/AlertContext";
import { FormattedMessage } from "react-intl";

function Config() {
  const apiInstance = useAxios();
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const globalContext = useContext(GlobalContext);
  const wizardData = [
    {
      id: 0,
      label: intl.formatMessage({
        id: "accountInfo",
        defaultMessage: "accountInfo",
      }),
      icon: "fa fa-user",
      filterArray: [
        "name",
        "email",
        "mobile",
        "country",
        "address1",
        "address2",
        "city",
        "postalCode",
        "state",
        "currency",
      ],
    },
    {
      id: 1,
      label: intl.formatMessage({
        id: "webDefaults",
        defaultMessage: "webDefaults",
      }),
      icon: "fa fa-globe",
      filterArray: [
        "bgSongDefaultPlay",
        "switchSongFeatureRequired",
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
      id: "isOwner",
      index: "isOwner",
      elementType: "hidden",
      value: "",
      className: "",
    },
    {
      id: "name",
      index: "name",
      label: intl.formatMessage({ id: "name", defaultMessage: "name" }),
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
      },
    },
    {
      id: "mobile",
      index: "mobile",
      label: intl.formatMessage({ id: "mobile", defaultMessage: "mobile" }),
      elementType: "text",
      value: "",
      placeHolder: "+91 9XXXXXXXXX",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /^[0-9]{10}$/,
        errorMsg: intl.formatMessage({
          id: "enterValidMobileNumber",
          defaultMessage: "enterValidMobileNumber",
        }),
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
      },
    },
    {
      id: "country",
      index: "country",
      label: intl.formatMessage({ id: "country", defaultMessage: "country" }),
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      list: countryList.map(c => ({
        label: c.value,
        value: c.id,
      })),
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
      },
    },
    {
      id: "address1",
      index: "address1",
      label: intl.formatMessage({ id: "address1", defaultMessage: "address1" }),
      elementType: "text",
      value: "",
      placeHolder: "5, East woods street",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
      },
    },
    {
      id: "address2",
      index: "address2",
      label: intl.formatMessage({ id: "address2", defaultMessage: "address2" }),
      elementType: "text",
      value: "",
      placeHolder: "Downtown",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
      },
    },
    {
      id: "city",
      index: "city",
      label: intl.formatMessage({ id: "city", defaultMessage: "city" }),
      elementType: "text",
      value: "",
      placeHolder: "New York",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
      },
    },
    {
      id: "postalCode",
      index: "postalCode",
      label: intl.formatMessage({
        id: "postalCode",
        defaultMessage: "postalCode",
      }),
      elementType: "text",
      value: "",
      placeHolder: "New York",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
      },
    },
    {
      id: "state",
      index: "state",
      label: intl.formatMessage({ id: "state", defaultMessage: "state" }),
      elementType: "text",
      value: "",
      placeHolder: "New York",
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
      },
    },
    {
      id: "currency",
      index: "currency",
      label: `${intl.formatMessage({
        id: "billing",
        defaultMessage: "billing",
      })} ${intl.formatMessage({
        id: "currency",
        defaultMessage: "currency",
      })}`,
      elementType: "dropDown",
      value: "",
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      list: [],
      className: "col-md-3 col-sm-6",
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
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
      },
    },
    {
      id: "social_media_instagram",
      index: "social_media_instagram",
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
      },
    },
  ];
  const [formStructure, setFormStructure] = useState(masterConfig);
  const [loader, setLoader] = useState(true);
  const [kycDone, setKycDone] = useState(true);

  const encryption = new Encryption();

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("getBackend", formdata);
  };

  const getPricingCurrencies = () => {
    return apiInstance.get("/payments/getPricingCurrencies"); // start
  };

  useEffect(() => {
    setLoader(true);
    const TableRows = formStructure.map(form => form.index);
    const a = getBackendAjax("apps", TableRows);
    const b = getPricingCurrencies();

    Promise.all([a, b])
      .then(r => {
        const cList = r[1].data.response.map(m => ({
          value: m.currency,
          label: m.currency,
        }));
        const responseObject = r[0].data.response[0];
        const responseArray = Object.keys(responseObject);
        let backupStructure = [...formStructure];
        backupStructure = backupStructure.map(backup => {
          if (responseArray.includes(backup.index)) {
            backup.value = encryptKeys.includes(backup.index)
              ? CryptoJS.AES.decrypt(
                  responseObject[backup.index],
                  globalContext[encryptSaltKey],
                ).toString(CryptoJS.enc.Utf8)
              : clientServerEncryptKeys.includes(backup.index)
                ? encryption.decrypt(
                    responseObject[backup.index],
                    globalContext[encryptSaltKey],
                  )
                : responseObject[backup.index];
          }
          if (backup.index === "currency") {
            backup.list = cList;
          }
          return backup;
        });
        const kyc = backupStructure.every(b => b.value);
        setKycDone(kyc);
        setFormStructure(backupStructure);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [JSON.stringify(userContext.userConfig)]);

  useEffect(() => {
    if (!kycDone) {
      myAlertContext.setConfig({
        show: true,
        className: "alert-warning border-0 text-dark",
        type: "warning",
        dismissible: true,
        heading: <KycHeading />,
        content: <KycContent />,
      });
    }
  }, [kycDone]);

  const KycHeading = () => (
    <div className='d-flex align-items-center'>
      <i className='fa fa-exclamation-triangle pe-1' />
      <div>
        <FormattedMessage id='kycHeading' defaultMessage='kycHeading' />
      </div>
    </div>
  );

  const KycContent = () => (
    <FormattedMessage id='kycContent' defaultMessage='kycContent' />
  );
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
      ?.value;
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
        if (res.data.response !== null && res.data.response) {
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
          userContext.setUserConfig({
            ...userContext.userConfig,
            ...massageStructure,
          });
          localStorage.setItem("userConfig", JSON.stringify(massageStructure));
          userContext.updateUserData("theme", massageStructure.webTheme);
        }
      })
      .catch(() =>
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
          <Loader />
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
