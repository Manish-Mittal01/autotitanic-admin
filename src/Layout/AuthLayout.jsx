import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const AuthLayout = ({ children }) => {
  return (
    <>
      <section
        className="AuthPage position-relative d-flex align-items-center justify-content-center"
        style={{ background: "#FFFBF2" }}
      >
        <Container fluid>
          <Row className="justify-content-end">
            <Col lg="12" className="my-2">
              <div className="formInner">
                <div className="logo text-center">
                  <img
                    src={"assets/images/mainLogo.png"}
                    alt="logo"
                    className="img-fluid"
                  />
                </div>
                {children}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AuthLayout;
