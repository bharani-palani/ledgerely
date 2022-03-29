import React, { useState, useEffect } from 'react';
import {Row, Col, ButtonGroup, DropdownButton, Dropdown, Button, Accordion, ListGroup} from 'react-bootstrap';

function LayoutDesign(props) {
    const [sideMenu, setSideMenu] = useState([
        {id: 0, label: "Components", children: [
            {id: 0.1, label: "Built in", body: "built in body"}, 
            {id: 0.2, label: "Bootstrap", body: "Bootstrap body"}]
        },
        {id: 1, label: "Props", body: "Props body"},
        {id: 2, label: "Styles", body: "Styles body"},
        {id: 3, label: "Functions", body: "Functions body"},
        {id: 4, label: "Database", children: [
            {id: 4.1, label: "List", body: "List table"}, 
            {id: 4.2, label: "Create", body: "Create table"},
            {id: 4.3, label: "Fetch", body: "Fetch table"}]
        },
    ])
    return (
        <div className='container-fluid'>
            <div className="pt-4">
				<div className="text-center">
					<h2 className="">Design layout</h2>
					<hr className="my-3" />
					<i className="fa fa-paint-brush fa-2x py-2" />
					<p className="">Design your web pages</p>
				</div>
			</div>
            <Row className='pt-1'>
                <Col md={9} >
                    <Row>
                        <Col md={6}>
                            <ButtonGroup>
                                <DropdownButton as={ButtonGroup} variant="light" title="Pages">
                                    <Dropdown.Item eventKey="1">Page 1</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Page 2</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">Page 3</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">Page 4</Dropdown.Item>
                                </DropdownButton>
                                <Button variant="light"><i className='fa fa-save' /> Save</Button>
                                <DropdownButton as={ButtonGroup} title="Actions" variant="light">
                                    <Dropdown.Item eventKey="1"><i className='fa fa-cloud-upload' /> Publish</Dropdown.Item>
                                    <Dropdown.Item eventKey="2"><i className='fa fa-thumbs-o-up' /> Activate</Dropdown.Item>
                                    <Dropdown.Item eventKey="3"><i className='fa fa-thumbs-o-down' /> In-Activate</Dropdown.Item>
                                    <Dropdown.Item eventKey="4" className="text-danger"><i className='fa fa-trash' /> Delete</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </Col>
                        <Col md={6}>
                            <ListGroup horizontal>
                                <ListGroup.Item className='py-1 px-2'><i className='fa fa-user' /> <small>Bharani</small></ListGroup.Item>
                                <ListGroup.Item className='py-1 px-2'><i className='fa fa-calendar' /> <small>2022-03-28 22:40:43</small></ListGroup.Item>
                                <ListGroup.Item className='py-1 px-2'><i className='fa fa-clock-o' /> <small>2022-03-28 22:40:43</small></ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={3}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        {sideMenu.map(side => (
                            <Accordion.Item eventKey={side.id}>
                                <Accordion.Header className='bg-light text-dark'>{side.label}</Accordion.Header>
                                <Accordion.Body className='text-dark'>
                                    {side.children ? (
                                        side.children.map(ch => (
                                            <Accordion.Item eventKey={ch.id}>
                                                <Accordion.Header className='bg-light text-dark'>{ch.label}</Accordion.Header>
                                                <Accordion.Body className='text-dark'>
                                                    {ch.body}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))
                                    ) : side.body}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}

                    </Accordion>
                </Col>
            </Row>
        </div>
    )
}

export default LayoutDesign;