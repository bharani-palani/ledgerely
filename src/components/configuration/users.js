/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import ReactiveForm from "./ReactiveForm";
import apiInstance from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import md5 from "md5";
import ConfirmationModal from "./Gallery/ConfirmationModal";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import generatePassword from "password-generator";
import { FormattedMessage, injectIntl } from "react-intl";
import { MyAlertContext } from "../../contexts/AlertContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";

function Users(props) {
  const { intl } = props;
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const [formStructure, setFormStructure] = useState([]);
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [accessLevels, setAccessLevels] = useState([]);
  const [requestType, setRequestType] = useState("Create");
  const [openModal, setOpenModal] = useState(false);
  const [modalUser, setModalUser] = useState({});
  const [modalAccess, setModalAccess] = useState({});
  const [accessForm, setAccessForm] = useState({
    mode: "Create",
    icon: "fa fa-plus",
  });
  const [deleteAccessModal, setDeleteAccessModal] = useState(false);
  const [sendMailCheck, setSendMailCheck] = useState(true);
  const [userExist, setUserExist] = useState(false);

  const maxLength = 20;
  const minLength = 8;
  const uppercaseMinCount = 2;
  const lowercaseMinCount = 2;
  const numberMinCount = 2;
  const specialMinCount = 2;
  const UPPERCASE_RE = /([A-Z])/g;
  const LOWERCASE_RE = /([a-z])/g;
  const NUMBER_RE = /([\d])/g;
  const SPECIAL_CHAR_RE = /([\!\@\#\$\%\^\&\*])/g;
  const NON_REPEATING_CHAR_RE = /([\w\d\!\@\#\$\%\^\&\*])\1{2,}/g;

  const userCreateForm = [
    {
      id: "user_id",
      index: "user_id",
      elementType: "hidden",
      updateStatus: true,
      value: null,
      className: "",
    },
    {
      id: "user_name",
      index: "user_name",
      label: intl.formatMessage({ id: "userName", defaultMessage: "userName" }),
      elementType: "text",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({
        id: "userName",
        defaultMessage: "userName",
      }),
      className: "col-lg-3 col-md-6",
      options: {
        required: true,
        validation: /^[a-zA-Z0-9 ]{4,20}$/g,
        errorMsg: intl.formatMessage({
          id: "userNameRequired",
          defaultMessage: "userNameRequired",
        }),
        help: [
          intl.formatMessage({
            id: "setUniqueUserName",
            defaultMessage: "setUniqueUserName",
          }),
          intl.formatMessage({
            id: "thisShouldNotConflictOtherUserNames",
            defaultMessage: "thisShouldNotConflictOtherUserNames",
          }),
          intl.formatMessage(
            { id: "minimumLetters", defaultMessage: "minimumLetters" },
            { n: 4 },
          ),
          intl.formatMessage(
            { id: "maxLetters", defaultMessage: "maxLetters" },
            { n: 20 },
          ),
          intl.formatMessage({
            id: "noSpecialCharactersAllowed",
            defaultMessage: "noSpecialCharactersAllowed",
          }),
        ],
      },
    },
    {
      id: "user_display_name",
      index: "user_display_name",
      label: intl.formatMessage({
        id: "displayName",
        defaultMessage: "displayName",
      }),
      elementType: "text",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({
        id: "displayName",
        defaultMessage: "displayName",
      }),
      className: "col-lg-3 col-md-6",
      options: {
        required: true,
        validation: /^[a-zA-Z0-9 ]{4,20}$/g,
        errorMsg: intl.formatMessage({
          id: "inputDoesNotMatchCriteria",
          defaultMessage: "inputDoesNotMatchCriteria",
        }),
        help: [
          intl.formatMessage(
            { id: "minimumLetters", defaultMessage: "minimumLetters" },
            { n: 4 },
          ),
          intl.formatMessage(
            { id: "maxLetters", defaultMessage: "maxLetters" },
            { n: 20 },
          ),
          intl.formatMessage({
            id: "noSpecialCharactersAllowed",
            defaultMessage: "noSpecialCharactersAllowed",
          }),
        ],
      },
    },
    {
      id: "user_profile_name",
      index: "user_profile_name",
      label: intl.formatMessage({
        id: "profileName",
        defaultMessage: "profileName",
      }),
      elementType: "text",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({
        id: "profileName",
        defaultMessage: "profileName",
      }),
      className: "col-lg-3 col-md-6",
      options: {
        required: true,
        validation: /^[a-zA-Z0-9 ]{4,50}$/g,
        errorMsg: intl.formatMessage({
          id: "inputDoesNotMatchCriteria",
          defaultMessage: "inputDoesNotMatchCriteria",
        }),
        help: [
          intl.formatMessage(
            { id: "minimumLetters", defaultMessage: "minimumLetters" },
            { n: 4 },
          ),
          intl.formatMessage(
            { id: "maxLetters", defaultMessage: "maxLetters" },
            { n: 50 },
          ),
          intl.formatMessage({
            id: "noSpecialCharactersAllowed",
            defaultMessage: "noSpecialCharactersAllowed",
          }),
        ],
      },
    },
    {
      id: "user_password",
      index: "user_password",
      label: intl.formatMessage({ id: "password", defaultMessage: "password" }),
      elementType: "text",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({
        id: "password",
        defaultMessage: "password",
      }),
      className: "col-lg-3 col-md-6",
      options: {
        required: true,
        validation:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,})/,
        errorMsg: `${intl.formatMessage({
          id: "password",
          defaultMessage: "password",
        })} ${intl.formatMessage({
          id: "inputDoesNotMatchCriteria",
          defaultMessage: "inputDoesNotMatchCriteria",
        })}`,
        help: [
          intl.formatMessage(
            { id: "minimumLetters", defaultMessage: "minimumLetters" },
            { n: 8 },
          ),
          intl.formatMessage(
            {
              id: "atleastNCapitalLetter",
              defaultMessage: "atleastNCapitalLetter",
            },
            { n: 1 },
          ),
          intl.formatMessage(
            {
              id: "atleastNSpecialCharacter",
              defaultMessage: "atleastNSpecialCharacter",
            },
            { n: 1 },
          ),
          intl.formatMessage(
            { id: "atleastNNumber", defaultMessage: "atleastNNumber" },
            { n: 1 },
          ),
          intl.formatMessage({
            id: "allTheAboveAreRequired",
            defaultMessage: "allTheAboveAreRequired",
          }),
        ],
      },
    },
    {
      id: "user_email",
      index: "user_email",
      label: intl.formatMessage({ id: "email", defaultMessage: "email" }),
      elementType: "text",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({ id: "email", defaultMessage: "email" }),
      className: "col-lg-3 col-md-6",
      options: {
        required: true,
        validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        errorMsg: intl.formatMessage({
          id: "enterValidEmail",
          defaultMessage: "enterValidEmail",
        }),
        help: [
          intl.formatMessage({
            id: "enterValidEmail",
            defaultMessage: "enterValidEmail",
          }),
        ],
      },
    },
    {
      id: "user_type",
      index: "user_type",
      label: intl.formatMessage({ id: "type", defaultMessage: "type" }),
      elementType: "dropDown",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({
        id: "select",
        defaultMessage: "select",
      }),
      className: "col-lg-3 col-md-6",
      list: [],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({
          id: "thisFieldIsRequired",
          defaultMessage: "thisFieldIsRequired",
        }),
        help: [
          `Super Admin: ${intl.formatMessage({
            id: "hasAccessToSetingsAndBuildInApplications",
            defaultMessage: "hasAccessToSetingsAndBuildInApplications",
          })}`,
          `Admin: ${intl.formatMessage({
            id: "doesNotHaveAccessToSettingsOnlyToApps",
            defaultMessage: "doesNotHaveAccessToSettingsOnlyToApps",
          })}`,
        ],
      },
    },
    {
      id: "user_mobile",
      index: "user_mobile",
      label: intl.formatMessage({ id: "mobile", defaultMessage: "mobile" }),
      elementType: "number",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({
        id: "mobile",
        defaultMessage: "mobile",
      }),
      className: "col-lg-3 col-md-6",
      options: {
        required: true,
        validation: /^[0-9]{10}$/,
        errorMsg: intl.formatMessage({
          id: "enterValidMobileNumber",
          defaultMessage: "enterValidMobileNumber",
        }),
        help: [
          intl.formatMessage({
            id: "enterValidMobileNumber",
            defaultMessage: "enterValidMobileNumber",
          }),
        ],
      },
    },
    {
      id: "user_image",
      index: "user_image",
      label: intl.formatMessage({ id: "image", defaultMessage: "image" }),
      elementType: "file",
      value: "",
      updateStatus: false,
      placeHolder: intl.formatMessage({ id: "image", defaultMessage: "image" }),
      className: "col-lg-3 col-md-6 d-flex align-items-center",
      options: {},
    },
    {
      id: "user_appId",
      index: "user_appId",
      elementType: "invisible",
      value: userContext.userConfig.appId,
      updateStatus: true,
      className: "d-none",
    },
  ];

  const isStrongEnough = password => {
    const uc = password.match(UPPERCASE_RE);
    const lc = password.match(LOWERCASE_RE);
    const n = password.match(NUMBER_RE);
    const sc = password.match(SPECIAL_CHAR_RE);
    const nr = password.match(NON_REPEATING_CHAR_RE);
    return (
      password.length >= minLength &&
      !nr &&
      uc &&
      uc.length >= uppercaseMinCount &&
      lc &&
      lc.length >= lowercaseMinCount &&
      n &&
      n.length >= numberMinCount &&
      sc &&
      sc.length >= specialMinCount
    );
  };

  const customPassword = () => {
    let password = "";
    const randomLength =
      Math.floor(Math.random() * (maxLength - minLength)) + minLength;
    while (!isStrongEnough(password)) {
      password = generatePassword(
        randomLength,
        false,
        /[\w\d\!\@\#\$\%\^\&\*]/,
      );
    }
    return password;
  };

  const generateRandomPassword = () => {
    let backupStructure = [...formStructure];
    const gen = customPassword();
    backupStructure = backupStructure.map(backup => {
      if (backup.id === "user_password") {
        backup.value = gen;
      }
      return backup;
    });
    setFormStructure([]);
    setLoader(true);
    setTimeout(() => {
      setFormStructure(backupStructure);
      setLoader(false);
    }, 1000);
  };

  const onMassagePayload = (index, value) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.value = value;
        backup.updateStatus = true;
      }
      return backup;
    });
    setFormStructure(backupStructure);
  };

  useEffect(() => {
    fetchUsers();
    fecthAccessAndStructure();
    return () => {
      resetForm();
    };
  }, []);

  useEffect(() => {
    // Check for unique user name or email
    if (formStructure.length > 0) {
      const uNameObject = formStructure.filter(f => f.id === "user_name")[0];
      const emailObject = formStructure.filter(f => f.id === "user_email")[0];
      const userNameValidation = new RegExp(
        uNameObject.options.validation,
      ).test(uNameObject.value);

      const emailValidation = new RegExp(emailObject.options.validation).test(
        emailObject.value,
      );
      if (userNameValidation && emailValidation) {
        fetchIfUserExist(uNameObject.value, emailObject.value, "")
          .then(r => setUserExist(r?.data?.response))
          .catch(e => console.log("bbb", e));
      }
    }
  }, [formStructure]);

  const fecthAccessAndStructure = () => {
    apiInstance
      .post("fetchAccessLevels")
      .then(res => {
        const accessLevelData = res.data.response;
        setAccessLevels(accessLevelData);
        const structure = userCreateForm.map(form => {
          if (form.id === "user_type") {
            form.list = accessLevelData.map(access => ({
              value: access.access_id,
              label: access.access_label,
            }));
          }
          return form;
        });
        setFormStructure(structure);
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

  const editUser = userObject => {
    setFormStructure([]);
    let backupStructure = [...formStructure];
    backupStructure = backupStructure
      .filter(f => f.id !== "user_password")
      .map(backup => {
        if (userObject.hasOwnProperty(backup.id)) {
          backup.value = userObject[backup.id];
          if (backup.id === "user_type") {
            backup.value =
              accessLevels.filter(
                access => access.access_label === String(userObject.user_type),
              )[0].access_id || "";
            // user cant update their own role, if yes, dropd own will be disabled.
            backup.disabled =
              userContext.userData.userId ===
              backupStructure.filter(f => f.id === "user_id")[0]?.value;
          }
          if (backup.id === "user_name") {
            backup.disabled = true;
          }
        } else {
          backup.value = "";
        }
        return backup;
      });

    setFormStructure([]);
    setLoader(true);
    setTimeout(() => {
      setFormStructure(backupStructure);
      setLoader(false);
      setRequestType("Update");
      setSendMailCheck(false);
    }, 1000);
  };

  useEffect(() => {
    if (sendMailCheck) {
      let backupStructure = [...formStructure];
      backupStructure = backupStructure.map(backup => {
        if (
          [
            "user_name",
            "user_display_name",
            "user_profile_name",
            "user_email",
            "user_type",
            "user_mobile",
          ].includes(backup.id)
        ) {
          backup.updateStatus = true;
        }
        return backup;
      });
      setFormStructure(backupStructure);
    }
  }, [sendMailCheck]);

  const deleteUser = userObject => {
    setModalUser(userObject);
    setOpenModal(true);
  };

  const fetchUsers = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    apiInstance
      .post("fetchUsers", formdata)
      .then(res => {
        setUsers(res.data.response);
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

  const fetchIfUserExist = (checkUser, checkEmail, userId) => {
    const formdata = new FormData();
    formdata.append("username", checkUser);
    formdata.append("email", checkEmail);
    formdata.append("userId", userId);
    return apiInstance.post("checkUserExists", formdata);
  };

  const mailInstance = form => {
    const formdata = new FormData();
    if (form.filter(f => f.id === "user_email").length > 0) {
      formdata.append(
        "email",
        form.filter(f => f.id === "user_email")[0].value,
      );
    }
    if (form.filter(f => f.id === "user_name").length > 0) {
      formdata.append(
        "userName",
        form.filter(f => f.id === "user_name")[0].value,
      );
    }
    if (form.filter(f => f.id === "user_password").length > 0) {
      formdata.append(
        "password",
        form.filter(f => f.id === "user_password")[0].value,
      );
    }
    if (form.filter(f => f.id === "user_display_name").length > 0) {
      formdata.append(
        "displayName",
        form.filter(f => f.id === "user_display_name")[0].value,
      );
    }

    if (form.filter(f => f.id === "user_profile_name").length > 0) {
      formdata.append(
        "profileName",
        form.filter(f => f.id === "user_profile_name")[0].value,
      );
    }

    if (form.filter(f => f.id === "user_type").length > 0) {
      formdata.append("type", form.filter(f => f.id === "user_type")[0].value);
    }
    if (form.filter(f => f.id === "user_mobile").length > 0) {
      formdata.append(
        "mobile",
        form.filter(f => f.id === "user_mobile")[0].value,
      );
    }
    return formdata.has("email")
      ? apiInstance.post("sendUserInfo", formdata)
      : Promise.resolve(true);
  };

  const onReactiveFormSubmit = () => {
    let cloned = [...formStructure];
    if (requestType === "Update") {
      cloned = cloned.filter(f => f.id !== "user_appId" && f.updateStatus);
    }
    let payload = cloned.map(f => {
      return {
        [f.id]:
          f.id === "user_password"
            ? md5(f.value)
            : f.id === "user_id" && requestType === "Create"
            ? null
            : f.value,
      };
    });
    payload = Object.assign({}, ...payload);
    const options = {
      Create: {
        key: "insertData",
        responseString: intl.formatMessage({
          id: "userSuccessfullyCreated",
          defaultMessage: "userSuccessfullyCreated",
        }),
      },
      Update: {
        key: "updateData",
        responseString: intl.formatMessage({
          id: "userSuccessfullyUpdated",
          defaultMessage: "userSuccessfullyUpdated",
        }),
      },
    };

    const newPayload = {
      Table: "users",
      [options[requestType].key]: [payload],
    };

    const instance = fetchIfUserExist(
      payload.user_name || "",
      payload.user_email || "",
      payload.user_id,
    );
    instance
      .then(res => {
        const flag = res.data.response;
        if (!flag) {
          apiAction(newPayload, options[requestType].responseString, cloned);
        } else {
          userContext.renderToast({
            type: "error",
            icon: "fa fa-times-circle",
            message: intl.formatMessage({
              id: "userAlreadyExist",
              defaultMessage: "userAlreadyExist",
            }),
          });
        }
      })
      .catch(() => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      });
  };

  const handleDeteleUser = () => {
    const payload = {
      Table: "users",
      deleteData: [modalUser.user_id],
    };
    apiAction(
      payload,
      intl.formatMessage({
        id: "userSuccessfullyDeleted",
        defaultMessage: "userSuccessfullyDeleted",
      }),
      [],
    );
  };

  const apiAction = (newPayload, responseString, cloned) => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("postData", JSON.stringify(newPayload));

    const a = apiInstance.post("/postBackend", formdata);
    const b = sendMailCheck && cloned.length > 0 ? mailInstance(cloned) : 1;
    const all = [a, b];

    Promise.all(all)
      .then(res => {
        if (res[0].data.response) {
          userContext.renderToast({ message: responseString });
        }
        if (res[0].data.response === null) {
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: true,
            heading: <UpgradeHeading />,
            content: <UpgradeContent />,
          });
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      })
      .finally(() => {
        fetchUsers();
        fecthAccessAndStructure();
        resetForm();
        setLoader(false);
        setOpenModal(false);
      });
  };

  const resetForm = () => {
    let backupStructure = [...userCreateForm];
    backupStructure = backupStructure.map(backup => {
      // backup.value = "";
      return backup;
    });
    setLoader(true);
    setFormStructure([]);
    setTimeout(() => {
      setFormStructure(backupStructure);
      setLoader(false);
      setRequestType("Create");
      setSendMailCheck(true);
    }, 1000);
  };

  const saveOrUpdateAccess = () => {
    setLoader(true);
    const statusStr =
      accessForm.id === null
        ? intl.formatMessage({ id: "created", defaultMessage: "created" })
        : intl.formatMessage({ id: "updated", defaultMessage: "updated" });
    const formdata = new FormData();
    formdata.append("accessId", accessForm.id);
    formdata.append("accessLabel", accessForm.label);
    formdata.append("accessValue", accessForm.value);
    apiInstance
      .post("/saveOrUpdateAccessLevel", formdata)
      .then(res => {
        if (res.data.response) {
          fecthAccessAndStructure();
          userContext.renderToast({
            message: intl.formatMessage(
              {
                id: "accessLevelSuccessfully",
                defaultMessage: "accessLevelSuccessfully",
              },
              { status: statusStr },
            ),
          });
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      })
      .finally(() => {
        setLoader(false);
        resetForm();
        resetAccessForm();
      });
  };

  const deleteAccess = accessObject => {
    setModalAccess(accessObject);
    setDeleteAccessModal(true);
  };

  const editAccess = access => {
    setAccessForm({
      id: access.access_id,
      label: access.access_label,
      value: access.access_value,
      mode: "Update",
      icon: "fa fa-pencil",
    });
  };

  const handleDeteleAccess = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("accessId", modalAccess.access_id);
    apiInstance
      .post("/deleteAccessLevel", formdata)
      .then(res => {
        if (res.data.response) {
          resetForm();
          fecthAccessAndStructure();
          userContext.renderToast({
            message: intl.formatMessage({
              id: "accessLevelSuccessfullyDeleted",
              defaultMessage: "accessLevelSuccessfullyDeleted",
            }),
          });
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage(
            {
              id: "accessHasAssociations",
              defaultMessage: "accessHasAssociations",
            },
            { level: modalAccess.access_label },
          ),
        });
      })
      .finally(() => {
        setLoader(false);
        setDeleteAccessModal(false);
        resetAccessForm();
        resetForm();
      });
  };

  const resetAccessForm = () => {
    setAccessForm({
      id: null,
      label: "",
      value: "",
      mode: "Create",
      icon: "fa fa-plus",
    });
  };

  return (
    <div className='container-fluid mt-3'>
      <ConfirmationModal
        show={openModal}
        confirmationstring={intl.formatMessage(
          {
            id: "areYouSureToDeleteUser",
            defaultMessage: "areYouSureToDeleteUser",
          },
          { user: modalUser.user_display_name },
        )}
        handleHide={() => {
          setOpenModal(false);
          setModalUser({});
        }}
        handleYes={() => handleDeteleUser()}
        size='md'
      />
      <ConfirmationModal
        show={deleteAccessModal}
        confirmationstring={intl.formatMessage(
          {
            id: "areYouSureToDeleteAccess",
            defaultMessage: "areYouSureToDeleteAccess",
          },
          { access: modalAccess.access_label },
        )}
        handleHide={() => {
          setDeleteAccessModal(false);
          setModalAccess({});
        }}
        handleYes={() => handleDeteleAccess()}
        size='md'
      />
      {!loader ? (
        <div className='row'>
          <div className='col-lg-12 p-0'>
            <div className='d-flex justify-content-between align-items-center'>
              <p className=''>
                <FormattedMessage id='users' defaultMessage='users' />{" "}
                {intl.formatMessage({
                  id: requestType.toLowerCase(),
                  defaultMessage: requestType.toLowerCase(),
                })}
              </p>
              {requestType !== "Create" && (
                <button
                  title={intl.formatMessage({
                    id: "reset",
                    defaultMessage: "reset",
                  })}
                  onClick={() => resetForm()}
                  className='btn btn-sm btn-primary'
                >
                  <i className='fa fa-undo pe-1' />
                  <FormattedMessage id='reset' defaultMessage='reset' />
                </button>
              )}
            </div>
            {requestType === "Create" && (
              <div className='d-flex gap-1 align-items-center justify-content-between'>
                <div className='small text-danger'>
                  {userExist ? (
                    <span>
                      <FormattedMessage
                        id='userAlreadyExist'
                        defaultMessage='userAlreadyExist'
                      />
                    </span>
                  ) : null}
                </div>
                <Button onClick={generateRandomPassword} size='sm'>
                  <i className='fa fa-lock pe-1' />
                  <FormattedMessage
                    id='generatePassword'
                    defaultMessage='generatePassword'
                  />
                </Button>
              </div>
            )}
            <div className='position-relative'>
              {formStructure && formStructure.length > 0 && (
                <ReactiveForm
                  parentClassName='reactive-form text-dark'
                  structure={formStructure}
                  onChange={(index, value) => onMassagePayload(index, value)}
                  onSubmit={() => onReactiveFormSubmit()}
                  submitBtnLabel={intl.formatMessage({
                    id: requestType.toLowerCase(),
                    defaultMessage: requestType.toLowerCase(),
                  })}
                  submitBtnClassName='btn btn-bni pull-right'
                />
              )}
              <div
                className='form-check position-absolute w-75'
                style={{ bottom: intl.locale === "ta" ? "0px" : "15px" }}
              >
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={sendMailCheck}
                  onChange={e => setSendMailCheck(e.target.checked)}
                  id='sendMailCheck'
                />
                <label
                  className='form-check-label small'
                  htmlFor='sendMailCheck'
                >
                  <em>
                    <FormattedMessage
                      id='notifyUserOnMail'
                      defaultMessage='notifyUserOnMail'
                    />
                  </em>
                </label>
              </div>
            </div>
          </div>
          <div className='col-lg-12 p-0'>
            <p className=''>
              <FormattedMessage id='usersList' defaultMessage='usersList' />
            </p>
            {users && users.length > 0 && (
              <div className='table-responsive pb-2 mb-3'>
                <table
                  className={`table table-striped ${
                    userContext.userData.theme === "dark"
                      ? "table-dark"
                      : "table-light"
                  } table-sm small`}
                >
                  <thead>
                    <tr>
                      <th className='text-truncate'>
                        <FormattedMessage id='action' defaultMessage='action' />
                      </th>
                      <th className='text-truncate'>
                        <FormattedMessage
                          id='userName'
                          defaultMessage='userName'
                        />
                      </th>
                      <th className='text-truncate'>
                        <FormattedMessage
                          id='displayName'
                          defaultMessage='displayName'
                        />
                      </th>
                      <th className='text-truncate'>
                        <FormattedMessage
                          id='profileName'
                          defaultMessage='profileName'
                        />
                      </th>
                      <th className='text-truncate'>
                        <FormattedMessage id='email' defaultMessage='email' />
                      </th>
                      <th className='text-truncate'>
                        <FormattedMessage id='mobile' defaultMessage='mobile' />
                      </th>
                      <th className='text-truncate'>
                        <FormattedMessage id='type' defaultMessage='type' />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={i}>
                        <td className=''>
                          <div className='d-flex gap-1 justify-content-between align-items-center'>
                            <div>
                              <button
                                className='btn btn-sm btn-primary rounded-circle p-0 d-block mb-1'
                                style={{
                                  width: "25px",
                                  height: "25px",
                                }}
                                onClick={() => editUser(user)}
                              >
                                <i className={`fa fa-pencil ps-1`} />
                              </button>
                              {user.user_is_founder === "0" ? (
                                <button
                                  className='btn btn-sm btn-danger rounded-circle p-0'
                                  style={{ width: "25px", height: "25px" }}
                                >
                                  <i
                                    onClick={() => deleteUser(user)}
                                    className='fa fa-times pb-1'
                                  />
                                </button>
                              ) : (
                                <span
                                  style={{ width: "25px", height: "25px" }}
                                />
                              )}
                            </div>
                            {user.user_image ? (
                              <img
                                className='rounded-circle'
                                src={`data:image/*;base64,${user.user_image}`}
                                style={{ width: "50px", height: "50px" }}
                              />
                            ) : (
                              <span
                                style={{ width: "50px", height: "50px" }}
                                className={`rounded-circle bg-${
                                  userContext.userData.theme === "dark"
                                    ? "black"
                                    : "secondary"
                                } d-flex align-items-center justify-content-center`}
                              >
                                <i className='fa fa-user fa-2x icon-bni' />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='text-truncate align-middle'>
                          {user.user_name}
                        </td>
                        <td className='text-truncate align-middle'>
                          {user.user_display_name}
                        </td>
                        <td className='text-truncate align-middle'>
                          {user.user_profile_name}
                        </td>
                        <td className='text-truncate align-middle'>
                          {user.user_email}
                        </td>
                        <td className='text-truncate align-middle'>
                          {user.user_mobile}
                        </td>
                        <td className='text-truncate align-middle'>
                          {user.user_type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* <div className='col-lg-3'>
            <p className=''>
              <FormattedMessage
                id='createAccessLevel'
                defaultMessage='createAccessLevel'
              />
            </p>
            <InputGroup size='sm' className='pb-2'>
              <FormControl
                placeholder={intl.formatMessage({
                  id: "label",
                  defaultMessage: "label",
                })}
                value={accessForm.label}
                onChange={e =>
                  setAccessForm(prevState => ({
                    ...prevState,
                    ...(accessForm.mode === "Create" && { id: null }),
                    label: e.target.value,
                  }))
                }
              />
              <FormControl
                placeholder={intl.formatMessage({
                  id: "value",
                  defaultMessage: "value",
                })}
                value={accessForm.value}
                onChange={e =>
                  setAccessForm(prevState => ({
                    ...prevState,
                    ...(accessForm.mode === "Create" && { id: null }),
                    value: e.target.value,
                  }))
                }
              />
              <Button
                variant='primary'
                disabled={!(accessForm.label && accessForm.value)}
                onClick={() => saveOrUpdateAccess()}
              >
                <i className={accessForm.icon} />{" "}
                {intl.formatMessage({
                  id: accessForm.mode.toLowerCase(),
                  defaultMessage: accessForm.mode.toLowerCase(),
                })}
              </Button>
              {accessForm.label && accessForm.value && (
                <Button variant='danger' onClick={() => resetAccessForm()}>
                  <i
                    className='fa fa-undo'
                    title={intl.formatMessage({
                      id: "reset",
                      defaultMessage: "reset",
                    })}
                  />
                </Button>
              )}
            </InputGroup>
            <p className=''>
              <FormattedMessage id='accessList' defaultMessage='accessList' />
            </p>
            <div className='table-responsive'>
              <table
                className={`table table-striped ${
                  userContext.userData.theme === "dark"
                    ? "table-dark"
                    : "table-light"
                } table-sm`}
              >
                <thead>
                  <tr>
                    <th className='text-truncate'>
                      <FormattedMessage id='action' defaultMessage='action' />
                    </th>
                    <th className='text-truncate'>
                      <FormattedMessage id='label' defaultMessage='label' />
                    </th>
                    <th className='text-truncate'>
                      <FormattedMessage id='value' defaultMessage='value' />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accessLevels.map((access, i) => (
                    <tr key={i}>
                      <td className='p-2'>
                        {!["superAdmin", "admin"].includes(
                          access.access_value,
                        ) ? (
                          <i
                            onClick={() => editAccess(access)}
                            className={`fa fa-pencil text-success cursor-pointer me-2`}
                          />
                        ) : (
                          <i className={`fa fa-ban text-danger pe-2`} />
                        )}
                        {!["superAdmin", "admin"].includes(
                          access.access_value,
                        ) && (
                          <i
                            onClick={() => deleteAccess(access)}
                            className='fa fa-times text-danger cursor-pointer'
                          />
                        )}
                      </td>
                      <td>{access.access_label}</td>
                      <td>{access.access_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default injectIntl(Users);
