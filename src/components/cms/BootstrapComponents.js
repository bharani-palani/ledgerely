import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';

const BootstrapAlert = ({ children, ...rest }) => {
  return <ReactBootstrap.Alert {...rest}>{children}</ReactBootstrap.Alert>;
};

const BootstrapAlertLink = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Alert.Link {...rest}>{children}</ReactBootstrap.Alert.Link>
  );
};

const BootstrapAlertHeading = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Alert.Heading {...rest}>
      {children}
    </ReactBootstrap.Alert.Heading>
  );
};

const BootstrapAccordion = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Accordion {...rest}>{children}</ReactBootstrap.Accordion>
  );
};

const BootstrapAccordionItem = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Accordion.Item {...rest}>
      {children}
    </ReactBootstrap.Accordion.Item>
  );
};

const BootstrapAccordionHeader = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Accordion.Header {...rest}>
      {children}
    </ReactBootstrap.Accordion.Header>
  );
};

const BootstrapAccordionBody = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Accordion.Body {...rest}>
      {children}
    </ReactBootstrap.Accordion.Body>
  );
};

// const BootstrapAccordionCollapse = ({ children, ...rest }) => {
//   return (
//     <ReactBootstrap.Accordion.Collapse {...rest}>
//       {children}
//     </ReactBootstrap.Accordion.Collapse>
//   );
// };

const BootstrapAccordionCustomButton = ({ children, eventKey, ...rest }) => {
  const decoratedOnClick = ReactBootstrap.useAccordionButton(eventKey);

  return (
    <ReactBootstrap.Button onClick={decoratedOnClick} {...rest}>
      {children}
    </ReactBootstrap.Button>
  );
};

const BootstrapBadge = ({ children, ...rest }) => {
  return <ReactBootstrap.Badge {...rest}>{children}</ReactBootstrap.Badge>;
};

const BootstrapBreadCrumb = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Breadcrumb {...rest}>{children}</ReactBootstrap.Breadcrumb>
  );
};

const BootstrapBreadCrumbItem = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Breadcrumb.Item {...rest}>
      {children}
    </ReactBootstrap.Breadcrumb.Item>
  );
};

const BootstrapButton = ({ children, ...rest }) => {
  return <ReactBootstrap.Button {...rest}>{children}</ReactBootstrap.Button>;
};

const BootstrapToggleCheckboxButtonGroup = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.ToggleButtonGroup {...rest} type="checkbox">
      {children}
    </ReactBootstrap.ToggleButtonGroup>
  );
};

const BootstrapToggleRadioButtonGroup = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.ToggleButtonGroup {...rest} type="radio" name="appRadio">
      {children}
    </ReactBootstrap.ToggleButtonGroup>
  );
};

const BootstrapToggleButton = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.ToggleButton {...rest}>
      {children}
    </ReactBootstrap.ToggleButton>
  );
};

const BootstrapButtonToolbar = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.ButtonToolbar {...rest}>
      {children}
    </ReactBootstrap.ButtonToolbar>
  );
};

const BootstrapButtonGroup = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.ButtonGroup {...rest}>
      {children}
    </ReactBootstrap.ButtonGroup>
  );
};

const BootstrapCard = ({ children, ...rest }) => {
  return <ReactBootstrap.Card {...rest}>{children}</ReactBootstrap.Card>;
};

const BootstrapCardGroup = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.CardGroup {...rest}>{children}</ReactBootstrap.CardGroup>
  );
};

const BootstrapCardImg = ({ children, ...rest }) => {
  return <ReactBootstrap.Card.Img {...rest} />;
};

const BootstrapCardImgOverlay = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Card.ImgOverlay {...rest}>
      {children}
    </ReactBootstrap.Card.ImgOverlay>
  );
};

const BootstrapCardHeader = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Card.Header {...rest}>
      {children}
    </ReactBootstrap.Card.Header>
  );
};

const BootstrapCardFooter = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Card.Footer {...rest}>
      {children}
    </ReactBootstrap.Card.Footer>
  );
};

const BootstrapCardTitle = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Card.Title {...rest}>{children}</ReactBootstrap.Card.Title>
  );
};

const BootstrapCardLink = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Card.Link {...rest}>{children}</ReactBootstrap.Card.Link>
  );
};

const BootstrapCardbody = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Card.Body {...rest}>{children}</ReactBootstrap.Card.Body>
  );
};

const BootstrapCardText = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Card.Text {...rest}>{children}</ReactBootstrap.Card.Text>
  );
};

const BootstrapListGroup = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.ListGroup {...rest}>{children}</ReactBootstrap.ListGroup>
  );
};

const BootstrapListGroupItem = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.ListGroupItem {...rest}>
      {children}
    </ReactBootstrap.ListGroupItem>
  );
};

const BootstrapCarousel = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Carousel {...rest}>{children}</ReactBootstrap.Carousel>
  );
};

const BootstrapCarouselItem = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Carousel.Item {...rest}>
      {children}
    </ReactBootstrap.Carousel.Item>
  );
};

const BootstrapCarouselCaption = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Carousel.Caption {...rest}>
      {children}
    </ReactBootstrap.Carousel.Caption>
  );
};

const BootstrapCloseButton = ({ children, ...rest }) => {
  return <ReactBootstrap.CloseButton {...rest} />;
};

const BootstrapRow = ({ children, ...rest }) => {
  return <ReactBootstrap.Row {...rest}>{children}</ReactBootstrap.Row>;
};

const BootstrapCol = ({ children, ...rest }) => {
  return <ReactBootstrap.Col {...rest}>{children}</ReactBootstrap.Col>;
};

const BootstrapSplitButton = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.SplitButton {...rest}>
      {children}
    </ReactBootstrap.SplitButton>
  );
};

const BootstrapDropdown = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Dropdown {...rest}>{children}</ReactBootstrap.Dropdown>
  );
};

const BootstrapDropdownDivider = ({ children, ...rest }) => {
  return <ReactBootstrap.Dropdown.Divider {...rest} />;
};

const BootstrapDropdownToggle = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Dropdown.Toggle {...rest}>
      {children}
    </ReactBootstrap.Dropdown.Toggle>
  );
};

const BootstrapDropdownHeader = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Dropdown.Header {...rest}>
      {children}
    </ReactBootstrap.Dropdown.Header>
  );
};

const BootstrapDropdownMenu = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Dropdown.Menu {...rest}>
      {children}
    </ReactBootstrap.Dropdown.Menu>
  );
};

const BootstrapDropdownItem = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Dropdown.Item {...rest}>
      {children}
    </ReactBootstrap.Dropdown.Item>
  );
};

const BootstrapDropdownButton = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.DropdownButton {...rest}>
      {children}
    </ReactBootstrap.DropdownButton>
  );
};

const BootstrapFigure = ({ children, ...rest }) => {
  return <ReactBootstrap.Figure {...rest}>{children}</ReactBootstrap.Figure>;
};

const BootstrapFigureImage = ({ children, ...rest }) => {
  return <ReactBootstrap.Figure.Image {...rest} />;
};

const BootstrapFigureCaption = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Figure.Caption {...rest}>
      {children}
    </ReactBootstrap.Figure.Caption>
  );
};

const BootstrapImage = ({ children, ...rest }) => {
  return <ReactBootstrap.Image {...rest} />;
};

const BootstrapModal = ({ children, ...rest }) => {
  return <ReactBootstrap.Modal {...rest}>{children}</ReactBootstrap.Modal>;
};

const BootstrapModalDialog = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Modal.Dialog {...rest}>
      {children}
    </ReactBootstrap.Modal.Dialog>
  );
};

const BootstrapModalHeader = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Modal.Header {...rest}>
      {children}
    </ReactBootstrap.Modal.Header>
  );
};

const BootstrapModalTitle = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Modal.Title {...rest}>
      {children}
    </ReactBootstrap.Modal.Title>
  );
};

const BootstrapModalBody = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Modal.Body {...rest}>{children}</ReactBootstrap.Modal.Body>
  );
};

const BootstrapNav = ({ children, ...rest }) => {
  return <ReactBootstrap.Nav {...rest}>{children}</ReactBootstrap.Nav>;
};

const BootstrapNavItem = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Nav.Item {...rest}>{children}</ReactBootstrap.Nav.Item>
  );
};

const BootstrapNavLink = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Nav.Link {...rest}>{children}</ReactBootstrap.Nav.Link>
  );
};

const BootstrapNavDropdown = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.NavDropdown {...rest}>
      {children}
    </ReactBootstrap.NavDropdown>
  );
};

const BootstrapNavDropdownItem = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.NavDropdown.Item {...rest}>
      {children}
    </ReactBootstrap.NavDropdown.Item>
  );
};

const BootstrapContainer = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Container {...rest}>{children}</ReactBootstrap.Container>
  );
};

const BootstrapNavbar = ({ children, ...rest }) => {
  return <ReactBootstrap.Navbar {...rest}>{children}</ReactBootstrap.Navbar>;
};

const BootstrapNavbarBrand = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Navbar.Brand {...rest}>
      {children}
    </ReactBootstrap.Navbar.Brand>
  );
};

const BootstrapNavbarText = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Navbar.Text {...rest}>
      {children}
    </ReactBootstrap.Navbar.Text>
  );
};

const BootstrapNavbarToggle = ({ children, ...rest }) => {
  return <ReactBootstrap.Navbar.Toggle {...rest} />;
};

const BootstrapNavbarCollapse = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Navbar.Collapse {...rest}>
      {children}
    </ReactBootstrap.Navbar.Collapse>
  );
};

const BootstrapNavbarOffcanvas = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Navbar.Offcanvas {...rest}>
      {children}
    </ReactBootstrap.Navbar.Offcanvas>
  );
};

const BootstrapOffcanvas = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Offcanvas show={true} {...rest}>
      {children}
    </ReactBootstrap.Offcanvas>
  );
};

const BootstrapOffcanvasHeader = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Offcanvas.Header {...rest}>
      {children}
    </ReactBootstrap.Offcanvas.Header>
  );
};

const BootstrapOffcanvasTitle = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Offcanvas.Title {...rest}>
      {children}
    </ReactBootstrap.Offcanvas.Title>
  );
};

const BootstrapOffcanvasBody = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Offcanvas.Body {...rest}>
      {children}
    </ReactBootstrap.Offcanvas.Body>
  );
};

const BootstrapOverlay = ({ children, ...rest }) => {
  return <ReactBootstrap.Overlay {...rest}>{children}</ReactBootstrap.Overlay>;
};

const BootstrapOverlayTrigger = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.OverlayTrigger {...rest}>
      {children}
    </ReactBootstrap.OverlayTrigger>
  );
};

const BootstrapPopover = ({ children, ...rest }) => {
  return <ReactBootstrap.Popover {...rest}>{children}</ReactBootstrap.Popover>;
};

const BootstrapPopoverHeader = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Popover.Header {...rest}>
      {children}
    </ReactBootstrap.Popover.Header>
  );
};

const BootstrapPopoverBody = ({ children, ...rest }) => {
  return (
    <ReactBootstrap.Popover.Body {...rest}>
      {children}
    </ReactBootstrap.Popover.Body>
  );
};

export {
  BootstrapAlert,
  BootstrapAlertLink,
  BootstrapAlertHeading,
  BootstrapAccordion,
  BootstrapAccordionItem,
  BootstrapAccordionHeader,
  BootstrapAccordionBody,
  //   BootstrapAccordionCollapse,
  BootstrapAccordionCustomButton,
  BootstrapBadge,
  BootstrapBreadCrumb,
  BootstrapBreadCrumbItem,
  BootstrapButton,
  BootstrapToggleCheckboxButtonGroup,
  BootstrapToggleRadioButtonGroup,
  BootstrapToggleButton,
  BootstrapButtonToolbar,
  BootstrapButtonGroup,
  BootstrapCardGroup,
  BootstrapCard,
  BootstrapCardImg,
  BootstrapCardImgOverlay,
  BootstrapCardHeader,
  BootstrapCardFooter,
  BootstrapCardTitle,
  BootstrapCardLink,
  BootstrapCardbody,
  BootstrapCardText,
  BootstrapListGroup,
  BootstrapListGroupItem,
  BootstrapCarousel,
  BootstrapCarouselItem,
  BootstrapCarouselCaption,
  BootstrapCloseButton,
  BootstrapRow,
  BootstrapCol,
  BootstrapSplitButton,
  BootstrapDropdown,
  BootstrapDropdownDivider,
  BootstrapDropdownToggle,
  BootstrapDropdownHeader,
  BootstrapDropdownMenu,
  BootstrapDropdownItem,
  BootstrapDropdownButton,
  BootstrapFigure,
  BootstrapFigureImage,
  BootstrapFigureCaption,
  BootstrapImage,
  BootstrapModal,
  BootstrapModalDialog,
  BootstrapModalHeader,
  BootstrapModalTitle,
  BootstrapModalBody,
  BootstrapNav,
  BootstrapNavLink,
  BootstrapNavItem,
  BootstrapNavDropdown,
  BootstrapNavDropdownItem,
  BootstrapContainer,
  BootstrapNavbar,
  BootstrapNavbarBrand,
  BootstrapNavbarText,
  BootstrapNavbarToggle,
  BootstrapNavbarCollapse,
  BootstrapNavbarOffcanvas,
  BootstrapOffcanvas,
  BootstrapOffcanvasHeader,
  BootstrapOffcanvasTitle,
  BootstrapOffcanvasBody,
  BootstrapOverlay,
  BootstrapOverlayTrigger,
  BootstrapPopover,
  BootstrapPopoverHeader,
  BootstrapPopoverBody,
};
