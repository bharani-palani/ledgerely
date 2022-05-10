/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { userCreateForm } from '../configuration/backendTableConfig';
import ReactiveForm from './ReactiveForm';
import apiInstance from '../../services/apiServices';
import { UserContext } from '../../contexts/UserContext';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';
import md5 from 'md5';
import ConfirmationModal from './Gallery/ConfirmationModal';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import generatePassword from 'password-generator';

function Users(props) {
  const userContext = useContext(UserContext);
  const [formStructure, setFormStructure] = useState([]);
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [accessLevels, setAccessLevels] = useState([]);
  const [requestType, setRequestType] = useState('Create');
  const [openModal, setOpenModal] = useState(false);
  const [modalUser, setModalUser] = useState({});
  const [modalAccess, setModalAccess] = useState({});
  const [accessForm, setAccessForm] = useState({
    mode: 'Create',
    icon: 'fa fa-plus',
  });
  const [deleteAccessModal, setDeleteAccessModal] = useState(false);
  const [sendMailCheck, setSendMailCheck] = useState(true);

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
    let password = '';
    const randomLength =
      Math.floor(Math.random() * (maxLength - minLength)) + minLength;
    while (!isStrongEnough(password)) {
      password = generatePassword(
        randomLength,
        false,
        /[\w\d\!\@\#\$\%\^\&\*]/
      );
    }
    return password;
  };

  const generateRandomPassword = () => {
    let backupStructure = [...formStructure];
    const gen = customPassword();
    backupStructure = backupStructure.map(backup => {
      if (backup.id === 'user_password') {
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

  const fecthAccessAndStructure = () => {
    apiInstance
      .post('fetchAccessLevels')
      .then(res => {
        const accessLevelData = res.data.response;
        setAccessLevels(accessLevelData);
        const structure = userCreateForm.map(form => {
          if (form.id === 'user_type') {
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
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Oops.. Unable to fetch levels. Please try again.',
        })
      )
      .finally(() => setLoader(false));
  };

  const editUser = userObject => {
    setFormStructure([]);
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (userObject.hasOwnProperty(backup.id)) {
        backup.value = userObject[backup.id];
        if (backup.id === 'user_type') {
          backup.value =
            accessLevels.filter(
              access => access.access_label === String(userObject.user_type)
            )[0].access_id || '';
        }
      } else {
        backup.value = '';
      }
      return backup;
    });
    setFormStructure([]);
    setLoader(true);
    setTimeout(() => {
      setFormStructure(backupStructure);
      setLoader(false);
      setRequestType('Update');
    }, 1000);
  };

  const deleteUser = userObject => {
    setModalUser(userObject);
    setOpenModal(true);
  };

  const fetchUsers = () => {
    setLoader(true);
    apiInstance
      .post('fetchUsers')
      .then(res => {
        setUsers(res.data.response);
      })
      .catch(() =>
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Oops.. Unable to fetch users. Please try again.',
        })
      )
      .finally(() => setLoader(false));
  };

  const fetchIfUserExist = (checkUser, checkEmail) => {
    const formdata = new FormData();
    formdata.append('username', checkUser);
    formdata.append('email', checkEmail);
    return apiInstance.post('checkUserExists', formdata);
  };

  const mailInstance = form => {
    const formdata = new FormData();
    formdata.append('email', form.filter(f => f.id === 'user_email')[0].value);
    formdata.append(
      'userName',
      form.filter(f => f.id === 'user_name')[0].value
    );
    formdata.append(
      'password',
      form.filter(f => f.id === 'user_password')[0].value
    );
    return apiInstance.post('sendUserInfo', formdata);
  };

  const onReactiveFormSubmit = () => {
    const cloned = [...formStructure];
    let payload = cloned.map(f => {
      return { [f.id]: f.id === 'user_password' ? md5(f.value) : f.value };
    });
    payload = Object.assign({}, ...payload);
    const options = {
      Create: {
        key: 'insertData',
        responseString: 'User successfully created..',
      },
      Update: {
        key: 'updateData',
        responseString: 'User successfully updated..',
      },
    };

    const newPayload = {
      Table: 'users',
      [options[requestType].key]: [payload],
    };
    if (options[requestType].key === 'insertData') {
      const instance = fetchIfUserExist(payload.user_name, payload.user_email);
      instance
        .then(res => {
          const flag = res.data.response;
          if (!flag) {
            apiAction(newPayload, options[requestType].responseString, cloned);
          } else {
            userContext.renderToast({
              type: 'error',
              icon: 'fa fa-times-circle',
              message:
                'This user already exist. Please try another user name or email..',
            });
          }
        })
        .catch(e => {
          console.log('bbb', e);
          userContext.renderToast({
            type: 'error',
            icon: 'fa fa-times-circle',
            message: 'Oops.. Unable to validate user. Please try again..',
          });
        });
    } else {
      apiAction(newPayload, options[requestType].responseString, cloned);
    }
  };

  const handleDeteleUser = () => {
    const payload = {
      Table: 'users',
      deleteData: [modalUser.user_id],
    };
    apiAction(payload, 'User successfully deleted', []);
  };

  const apiAction = (newPayload, responseString, cloned) => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append('postData', JSON.stringify(newPayload));

    const a = apiInstance.post('/postBackend', formdata);
    const b = sendMailCheck && cloned.length > 0 ? mailInstance(cloned) : 1;
    const all = [a, b];

    Promise.all(all)
      .then(res => {
        if (res[0].data.response) {
          userContext.renderToast({ message: responseString });
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Oops.. Something went wrong. Please try again.',
        });
      })
      .finally(() => {
        resetForm();
        fetchUsers();
        setLoader(false);
        setOpenModal(false);
      });
  };

  const resetForm = () => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      backup.value = '';
      return backup;
    });
    setLoader(true);
    setFormStructure([]);
    setTimeout(() => {
      setFormStructure(backupStructure);
      setLoader(false);
      setRequestType('Create');
    }, 1000);
  };

  const saveOrUpdateAccess = () => {
    setLoader(true);
    const statusStr = accessForm.id === '' ? 'added' : 'updated';
    const formdata = new FormData();
    formdata.append('accessId', accessForm.id);
    formdata.append('accessLabel', accessForm.label);
    formdata.append('accessValue', accessForm.value);
    apiInstance
      .post('/saveOrUpdateAccessLevel', formdata)
      .then(res => {
        if (res.data.response) {
          fecthAccessAndStructure();
          userContext.renderToast({
            message: `Access level successfully ${statusStr}`,
          });
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: 'Oops.. Some thing went wrong. Please try again..',
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
      mode: 'Update',
      icon: 'fa fa-pencil',
    });
  };

  const handleDeteleAccess = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append('accessId', modalAccess.access_id);
    apiInstance
      .post('/deleteAccessLevel', formdata)
      .then(res => {
        if (res.data.response) {
          resetForm();
          fecthAccessAndStructure();
          userContext.renderToast({ message: 'Access level deleted' });
        }
      })
      .catch(e => {
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: `Oops.. Hope ${modalAccess.access_label} access has some associations with page and user level. Delete them first.`,
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
      id: '',
      label: '',
      value: '',
      mode: 'Create',
      icon: 'fa fa-plus',
    });
  };

  return (
    <div className="container-fluid mt-3">
      <ConfirmationModal
        show={openModal}
        confirmationstring={`Are you sure to delete user ${modalUser.user_display_name}?`}
        handleHide={() => {
          setOpenModal(false);
          setModalUser({});
        }}
        handleYes={() => handleDeteleUser()}
        size="md"
      />
      <ConfirmationModal
        show={deleteAccessModal}
        confirmationstring={`Are you sure to delete access ${modalAccess.access_label}?`}
        handleHide={() => {
          setDeleteAccessModal(false);
          setModalAccess({});
        }}
        handleYes={() => handleDeteleAccess()}
        size="md"
      />
      {!loader ? (
        <div className="row">
          <div className="col-lg-3">
            <div className="d-flex justify-content-between align-items-center">
              <p className="">{requestType} User</p>
              {requestType !== 'Create' && (
                <button
                  title="Reset"
                  onClick={() => resetForm()}
                  className="btn btn-sm btn-secondary rounded-circle"
                >
                  <i className="fa fa-undo" />
                </button>
              )}
            </div>
            <div className="d-grid">
              <Button onClick={generateRandomPassword} size="sm">
                <i className="fa fa-key" /> Generate Password
              </Button>
            </div>
            <div className="position-relative">
              {formStructure.length && (
                <ReactiveForm
                  parentClassName="reactive-form text-dark"
                  structure={formStructure}
                  onChange={(index, value) => onMassagePayload(index, value)}
                  onSubmit={() => onReactiveFormSubmit()}
                  submitBtnLabel={requestType}
                  submitBtnClassName="btn btn-bni pull-right"
                />
              )}
              <div
                className="form-check position-absolute"
                style={{ bottom: '15px' }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={sendMailCheck}
                  onChange={e => setSendMailCheck(e.target.checked)}
                  id="sendMailCheck"
                />
                <label
                  className="form-check-label small"
                  htmlFor="sendMailCheck"
                >
                  <em>Notify user on mail</em>
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="">Users List</p>
            {users.length > 0 && (
              <div className="table-responsive pb-2 mb-3">
                <table className="table table-striped table-light table-sm">
                  <thead>
                    <tr>
                      <th className="text-truncate">Action</th>
                      <th className="text-truncate">User Name</th>
                      <th className="text-truncate">Display Name</th>
                      <th className="text-truncate">Profile Name</th>
                      <th className="text-truncate">Email</th>
                      <th className="text-truncate">Mobile</th>
                      <th className="text-truncate">Image</th>
                      <th className="text-truncate">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={i}>
                        <td className="p-2 text-center">
                          <i
                            onClick={() => editUser(user)}
                            className={`fa fa-pencil text-success cursor-pointer ${
                              user.user_is_founder === '0' ? 'me-2' : ''
                            }`}
                          />
                          {user.user_is_founder === '0' && (
                            <i
                              onClick={() => deleteUser(user)}
                              className="fa fa-times text-danger cursor-pointer"
                            />
                          )}
                        </td>
                        <td className="text-truncate">{user.user_name}</td>
                        <td className="text-truncate">
                          {user.user_display_name}
                        </td>
                        <td className="text-truncate">
                          {user.user_profile_name}
                        </td>
                        <td className="text-truncate">{user.user_email}</td>
                        <td className="text-truncate">{user.user_mobile}</td>
                        <td className="text-truncate">{user.user_image_url}</td>
                        <td className="text-truncate">{user.user_type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-lg-3">
            <p className="">Create Access Level</p>
            <InputGroup size="sm" className="pb-2">
              <FormControl
                placeholder="Access Label"
                value={accessForm.label}
                onChange={e =>
                  setAccessForm(prevState => ({
                    ...prevState,
                    ...(accessForm.mode === 'Create' && { id: '' }),
                    label: e.target.value,
                  }))
                }
              />
              <FormControl
                placeholder="Access Value"
                value={accessForm.value}
                onChange={e =>
                  setAccessForm(prevState => ({
                    ...prevState,
                    ...(accessForm.mode === 'Create' && { id: '' }),
                    value: e.target.value,
                  }))
                }
              />
              <Button
                variant="primary"
                disabled={!(accessForm.label && accessForm.value)}
                onClick={() => saveOrUpdateAccess()}
              >
                <i className={accessForm.icon} /> {accessForm.mode}
              </Button>
              {accessForm.label && accessForm.value && (
                <Button variant="danger" onClick={() => resetAccessForm()}>
                  <i className="fa fa-undo" title="Reset?" />
                </Button>
              )}
            </InputGroup>
            <p className="">Access List</p>
            <div className="table-responsive">
              <table className="table table-striped table-light table-sm">
                <thead>
                  <tr>
                    <th className="text-truncate">Action</th>
                    <th className="text-truncate">Label</th>
                    <th className="text-truncate">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {accessLevels.map((access, i) => (
                    <tr key={i}>
                      <td className="p-2">
                        {!['superAdmin', 'admin'].includes(
                          access.access_value
                        ) ? (
                          <i
                            onClick={() => editAccess(access)}
                            className={`fa fa-pencil text-success cursor-pointer me-2`}
                          />
                        ) : (
                          <i className={`fa fa-ban text-danger pe-2`} />
                        )}
                        {!['superAdmin', 'admin'].includes(
                          access.access_value
                        ) && (
                          <i
                            onClick={() => deleteAccess(access)}
                            className="fa fa-times text-danger cursor-pointer"
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
          </div>
        </div>
      ) : (
        <div className="text-center mt-100">
          <Loader
            type={helpers.loadRandomSpinnerIcon()}
            color={document.documentElement.style.getPropertyValue(
              '--app-theme-bg-color'
            )}
            height={100}
            width={100}
          />
        </div>
      )}
    </div>
  );
}

export default Users;
