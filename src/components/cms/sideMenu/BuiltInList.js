import React, { useContext } from 'react';
import { LayoutContext } from '../layoutDesign';
import * as BuiltInComponents from '../BuiltInComponents';
import { v4 as uuidv4 } from 'uuid';
import { Accordion, Card, useAccordionButton, Button } from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';

function BuiltInList(props) {
  const layoutContext = useContext(LayoutContext);
  const userContext = useContext(UserContext);
  const builtInList = Object.keys(BuiltInComponents);
  const segregatedList = [
    {
      id: 0,
      label: 'Block Elements',
      list: builtInList.filter(f =>
        [
          'Div',
          'P',
          'H1',
          'H2',
          'H3',
          'H4',
          'H5',
          'H5',
          'H6',
          'Blockquote',
          'Fieldset',
          'Abbr',
          'Address',
          'Cite',
          'Code',
          'Hr',
          'Iframe',
          'Legend',
          'Pre',
          'Style',
          'Path',
          'Tfoot',
        ].includes(f)
      ),
    },
    {
      id: 1,
      label: 'Inline Elements',
      list: builtInList.filter(f =>
        [
          'A',
          'Span',
          'Em',
          'I',
          'Bdo',
          'Sub',
          'Sup',
          'Small',
          'B',
          'Kbd',
          'Label',
          'Strong',
          'U',
        ].includes(f)
      ),
    },
    {
      id: 2,
      label: 'HTML5 Elements',
      list: builtInList.filter(f =>
        [
          'Article',
          'Aside',
          'Audio',
          'Source',
          'Bdi',
          'Canvas',
          'Embed',
          'Figcaption',
          'Figure',
          'Footer',
          'Header',
          'Hgroup',
          'Keygen',
          'Main',
          'Mark',
          'Nav',
          'Picture',
          'Progress',
          'Section',
          'Summary',
          'Svg',
          'Template',
          'Time',
          'Track',
          'Video',
        ].includes(f)
      ),
    },
    {
      id: 3,
      label: 'Listing Elements',
      list: builtInList.filter(f =>
        [
          'Table',
          'Tbody',
          'Thead',
          'Tr',
          'Th',
          'Td',
          'Ul',
          'Li',
          'Ol',
        ].includes(f)
      ),
    },
    {
      id: 4,
      label: 'Form Elements',
      list: builtInList.filter(f =>
        [
          'Form',
          'Select',
          'Optgroup',
          'Option',
          'Input',
          'Textarea',
          'Button',
        ].includes(f)
      ),
    },
    {
      id: 5,
      label: 'AWS | Google',
      list: builtInList.filter(f =>
        ['AwsMedia', 'GoogleMaps', 'GoogleMapsMarker'].includes(f)
      ),
    },
  ];

  const addElementToNode = (key, details, element) => {
    const sample = {
      key: uuidv4(),
      props: {},
      children: [],
      component: element,
      title: `Hello ${element}`,
    };

    const newObject = findAndAddComponent(key, { ...details }, sample);
    layoutContext.setState(prevState => ({
      ...prevState,
      selectedNodeId: sample.key,
      selectedComponent: sample.component,
      pageDetails: {
        ...prevState.pageDetails,
        pageObject: newObject,
      },
    }));
  };

  const findAndAddComponent = (key, node, insertObj) => {
    if (node.key === key) {
      node.children.push(insertObj);
    }
    node.children.forEach(ch => {
      findAndAddComponent(key, ch, insertObj);
    });
    return node;
  };

  const CustomToggle = ({ children, eventKey, object }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () => null);

    return (
      <button
        type="button"
        className={`btn-sm text-start btn ${
          userContext.userData.theme === 'dark' ? 'btn-dark' : 'btn-white'
        }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  };

  return (
    <LayoutContext.Consumer>
      {layoutDetails => (
        <Accordion defaultActiveKey={5} alwaysOpen>
          {segregatedList.length > 0 &&
            segregatedList.map((s, i) => (
              <Card
                key={s.id}
                className={`mb-1 ${
                  userContext.userData.theme === 'dark'
                    ? 'bg-dark text-light'
                    : 'bg-light text-dark'
                }`}
              >
                <Card.Header className="row m-0 p-0">
                  <CustomToggle eventKey={s.id} object={s}>
                    {s.label}
                  </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={s.id}>
                  <Card.Body>
                    {s.list.length &&
                      s.list.map((list, j) => (
                        <Button
                          key={j}
                          disabled={!layoutDetails.state.selectedNodeId}
                          size="sm"
                          className="badge bg-secondary border-0 me-1"
                          onClick={() =>
                            addElementToNode(
                              layoutDetails.state.selectedNodeId,
                              layoutDetails.state.pageDetails.pageObject,
                              list
                            )
                          }
                        >
                          {list.toLowerCase()}
                        </Button>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
        </Accordion>
      )}
    </LayoutContext.Consumer>
  );
}

export default BuiltInList;
