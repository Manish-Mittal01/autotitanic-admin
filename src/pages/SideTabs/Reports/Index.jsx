import React from "react";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { Button, Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import TableData from "./Component/TableData";

const Vehicles = () => {
  return (
    <>
      <NonAuthLayout>
        <section className="reports py-3 position-relative">
          <Container fluid>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <h2 className="m-0 fw-bold">Vehicles</h2>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="12" className="my-2">
                <div className="Box">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <div className="">
                        <b>Category</b>
                        <Form.Select
                          className="form-control rounded-pill"
                          aria-label="Default select example"
                        >
                          <option>Filter By</option>
                          <option value="1">Cars</option>
                          {/* <option value="2">Bikes</option>
                          <option value="3">Trucks</option> */}
                        </Form.Select>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {/* <Tab.Container id="left-tabs-example" defaultActiveKey="make">
                    <Nav variant="tabs" className="underLineTab">
                      <Nav.Item>
                        <Nav.Link
                          className="bg-transparent text-dark"
                          eventKey="make"
                          onClick={() => handleActiveTabChange(1)}
                        >
                          Make
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          className="bg-transparent text-dark"
                          eventKey="model"
                          onClick={() => handleActiveTabChange(2)}
                        >
                          Model
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          className="bg-transparent text-dark"
                          eventKey="variant"
                          onClick={() => handleActiveTabChange(3)}
                        >
                          Variant
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content className="pt-3">
                      <Tab.Pane eventKey="make">
                        <Table className="table  mt-4">
                          <thead className="border-0">
                            <tr className="secondaryColor">
                              <th className=" border-0 p-3">S.No.</th>
                              <th className=" border-0 p-3">Make</th>
                              <th className=" border-0 p-3">Logo</th>
                              <th className=" border-0 p-3">type</th>
                              <th className=" border-0 p-3">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allMakeList.data?.items?.map((make, idx) => (
                              <tr>
                                <td className="p-3 border-0">{idx + 1}</td>
                                <td className="p-3 border-0">{make?.label}</td>
                                <td className="p-3 border-0">
                                  <img
                                    src={make?.logo}
                                    style={{
                                      height: "60px",
                                      width: "60px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                </td>
                                <td className="p-3 border-0">
                                  {make?.type?.join(", ")}
                                </td>
                                <td className="p-3 border-0">
                                  <SaveButton
                                    tooltipText={"Add new model"}
                                    onClick={() =>
                                      setUserAction({
                                        type: "addModel",
                                        id: make._id,
                                      })
                                    }
                                  />

                                  <EditButton
                                    tooltipText={"Update make"}
                                    onClick={() =>
                                      setUserAction({
                                        type: "editMake",
                                        id: make._id,
                                      })
                                    }
                                  />

                                  <DeleteButton
                                    tooltipText={"Delete make"}
                                    onClick={() =>
                                      setUserAction({
                                        type: "deleteMake",
                                        id: make._id,
                                      })
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <MyPagination
                          paginationDetails={paginationDetails}
                          setPaginationDetails={setPaginationDetails}
                          totalPosts={allMakeList.data?.totalCount}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="model">
                        <Table className="table  mt-4">
                          <thead className="border-0">
                            <tr className="secondaryColor">
                              <th className=" border-0 p-3">S.No.</th>
                              <th className=" border-0 p-3">Model</th>
                              <th className=" border-0 p-3">Make</th>
                              <th className=" border-0 p-3">Types</th>
                              <th className=" border-0 p-3">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allModelList.data?.items?.map((model, idx) => (
                              <tr key={model._id}>
                                <td className="p-3">{idx + 1}</td>
                                <td className="p-3">{model.label}</td>
                                <td className="p-3">{model.make?.label}</td>
                                <td className="p-3">
                                  {model.type?.join(", ")}
                                </td>
                                <td className="p-3 border-0">
                                 

                                  <EditButton
                                    tooltipText={`Edit model`}
                                    onClick={() =>
                                      setUserAction({
                                        type: "editModel",
                                        id: model._id,
                                      })
                                    }
                                  />
                                  <DeleteButton
                                    tooltipText={"Delete Model"}
                                    onClick={() =>
                                      setUserAction({
                                        type: "deleteModel",
                                        id: model._id,
                                      })
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <MyPagination
                          paginationDetails={paginationDetails}
                          setPaginationDetails={setPaginationDetails}
                          totalPosts={allModelList.data?.totalCount}
                        />
                      </Tab.Pane>

                      <Tab.Pane eventKey="variant">
                        <Table className="table  mt-4">
                          <thead className="border-0">
                            <tr className="secondaryColor">
                              <th className=" border-0 p-3">S.No.</th>
                              <th className=" border-0 p-3">Variant</th>
                              <th className=" border-0 p-3">Model</th>
                              <th className=" border-0 p-3">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allVariantList.data?.items?.map((variant, idx) => (
                              <tr key={variant._id}>
                                <td className="p-3">{idx + 1}</td>
                                <td className="p-3">{variant.label}</td>
                                <td className="p-3">{variant.model?.label}</td>
                                <td className="p-3 border-0">
                                  <EditButton
                                    tooltipText={`Edit Variant`}
                                    onClick={() =>
                                      setUserAction({
                                        type: "editVariant",
                                        id: variant._id,
                                      })
                                    }
                                  />
                                  <DeleteButton
                                    tooltipText={"Delete Variant"}
                                    onClick={() =>
                                      setUserAction({
                                        type: "deleteVariant",
                                        id: variant._id,
                                      })
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <MyPagination
                          paginationDetails={paginationDetails}
                          setPaginationDetails={setPaginationDetails}
                          totalPosts={allVariantList.data?.totalCount}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container> */}
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default Vehicles;
