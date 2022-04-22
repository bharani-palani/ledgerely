import React, { useContext, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import ReactiveForm from '../configuration/ReactiveForm';
import { LayoutContext } from './layoutDesign';
import Loader from 'react-loader-spinner';
import helpers from '../../helpers';

function AddPage(props) {
  const userContext = useContext(UserContext);
  const layoutContext = useContext(LayoutContext);
  const { onFormSubmit, ...rest } = props;
  const [loader, setLoader] = useState(false);
  const [formStructure, setFormStructure] = useState([
    {
      id: 'page_label',
      index: 'page_label',
      label: 'Page Label',
      elementType: 'text',
      value: '',
      placeHolder: 'Ex: Home',
      className: '',
      options: {
        required: true,
        validation: /^[a-zA-Z]{4,20}$/g,
        errorMsg: 'Min - 4 | Max - 20 alphabets required',
      },
    },
    {
      id: 'page_route',
      index: 'page_route',
      label: 'Page Link (With leading slash)',
      elementType: 'text',
      value: '/',
      placeHolder: 'Ex: /home',
      className: '',
      options: {
        required: true,
        validation: /\//gi,
        errorMsg: 'Leading slash required',
      },
    },
    {
      id: 'page_access_levels',
      index: 'page_access_levels',
      label: 'Page Access To',
      elementType: 'checkBox',
      value: [],
      isInline: true,
      placeHolder: '',
      className: '',
      list: [],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: 'At least 1 access level is required',
      },
    },
    {
      id: 'pageClone',
      index: 'pageClone',
      label: 'Clone Page',
      elementType: 'dropDown',
      value: '',
      placeHolder: 'Select',
      list: layoutContext.state.pageList.map(page => ({
        value: page.pageId,
        label: page.pageLabel,
      })),
    },
  ]);

  useEffect(() => {
    let addAccessToForm = [...formStructure];
    addAccessToForm = addAccessToForm.map(form => {
      if (form.id === 'page_access_levels') {
        const getSuperAdminId = layoutContext.state.accessLevels.filter(
          f => f.accessValue === 'superAdmin'
        )[0].accessId;
        form.value = [getSuperAdminId];
        const accessList = layoutContext.state.accessLevels.map(access => ({
          id: access.accessId,
          value: access.accessId,
          label: access.accessLabel,
          checked:
            String(access.accessId) === String(getSuperAdminId) ? true : false,
          disabled:
            String(access.accessId) === String(getSuperAdminId) ? true : false,
        }));
        form.list = accessList;
      }
      return form;
    });
    setFormStructure(addAccessToForm);
  }, []);

  const onMassagePayload = (index, value, list = {}) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.list &&
          backup.list.length > 0 &&
          backup.list.map(l => {
            if (String(l.id) === String(list.id)) {
              l.checked = list.checked;
            }
            return l;
          });
        const newValue =
          !value && Object.keys(list).length > 0
            ? backup.list.filter(f => f.checked).map(c => c.value)
            : value;
        backup.value = newValue;
      }
      return backup;
    });
    setFormStructure(backupStructure);
  };

  const onReactiveFormSubmit = () => {
    const bData = [...formStructure];
    const pageLabel = bData.filter(f => f.id === 'page_label')[0].value;
    const pageRoute = bData.filter(f => f.id === 'page_route')[0].value;
    const pageAccess = bData.filter(f => f.id === 'page_access_levels')[0]
      .value;
    const pageClone = bData.filter(f => f.id === 'pageClone')[0].value;

    const data = {
      pageLabel,
      pageRoute,
      pageAccess,
      pageClone,
    };
    setLoader(true);
    onFormSubmit(data);
  };

  return (
    <Modal
      {...rest}
      style={{ zIndex: 9999 }}
      backdrop="static"
      centered
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Page</Modal.Title>
      </Modal.Header>
      {/* todo: clone from existing page pending*/}
      <Modal.Body
        className={`rounded-bottom ${
          userContext.userData.theme === 'dark'
            ? 'bg-dark text-light'
            : 'bg-white text-dark'
        }`}
      >
        {!loader ? (
          <ReactiveForm
            parentClassName={`reactive-form ${
              userContext.userData.theme === 'dark' ? 'text-light' : 'text-dark'
            }`}
            structure={formStructure}
            onChange={onMassagePayload}
            onSubmit={onReactiveFormSubmit}
            submitBtnLabel={'Save'}
          />
        ) : (
          <div className="text-center">
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
      </Modal.Body>
    </Modal>
  );
}

export default AddPage;
