import React from "react";
import { Outlet } from "react-router-dom";
import { SideBarNav } from "../components/SideBarNav";
import { Col, Container, Row } from "react-bootstrap";

export const BaseLayout: React.FC = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={1}>
                    <SideBarNav />
                </Col>
                <Col xs={11}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}