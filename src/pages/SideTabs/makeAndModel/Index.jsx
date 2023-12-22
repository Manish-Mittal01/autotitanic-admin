import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
// import PromptModal from "./Component/PromptModal";
import { handleApiRequest } from "../../../services/handleApiRequest";
import {
  deleteMake,
  deleteModel,
  getAllMake,
  getAllModel,
} from "../../../redux/states/makeAndModel/thunk";
import AddModelPopup from "./Component/AddModelPopup";
import AddOrUpdateMake from "./Component/AddOrUpdateMake";
import DeletePopup from "../../../components/Modals/DeletePop";
import MyPagination from "../../../components/common/myPagination";

const MakeAndModel = () => {
  const { allMakeList, allModelList } = useSelector(
    (state) => state.makeAndModel
  );
  const [userAction, setUserAction] = useState(null);
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 10,
  });

  const handleMakeList = async () => {
    await handleApiRequest(getAllMake, paginationDetails);
  };

  const handleModelList = async () => {
    await handleApiRequest(getAllModel, paginationDetails);
  };

  const handleDeleteMake = async () => {
    await handleApiRequest(deleteMake, { makeId: userAction.id });
    await handleMakeList();
  };
  const handleDeleteModel = async () => {
    await handleApiRequest(deleteModel, { modelId: userAction.id });
    await handleModelList();
  };

  const handleDelete = () => {
    if (userAction.type === "deleteMake") {
      handleDeleteMake();
    } else {
      handleDeleteModel();
    }
  };

  useEffect(() => {
    handleMakeList();
    handleModelList();
  }, [paginationDetails]);

  console.log("allMakeList", allMakeList);
  console.log("allModelList", allModelList);

  return (
    <>
      <NonAuthLayout>
        <section className="Transaction py-3 position-relative">
          <Container fluid>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp pb-3 px-lg-3 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10 border-bottom">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <h2 className="m-0 fw-bold">Make and Model</h2>
                    </div>
                    <div className="right d-flex align-items-center flex-wrap gap-10">
                      <div className="d-flex text-dark align-items-center btn justify-content-center rounded-pill gap-10">
                        <p
                          className="m-0 fw-normal text-muted"
                          onClick={() => {
                            setUserAction({ type: "addMake" });
                          }}
                        >
                          Add Make
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Tab.Container id="left-tabs-example" defaultActiveKey="make">
              <Nav variant="tabs" className="underLineTab">
                <Nav.Item>
                  <Nav.Link
                    className="bg-transparent text-dark"
                    eventKey="make"
                  >
                    Make
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="bg-transparent text-dark"
                    eventKey="model"
                  >
                    Model
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="pt-3">
                <Tab.Pane eventKey="make">
                  <Table className="table  mt-4">
                    <thead className="border-0">
                      <tr className="secondaryColor">
                        <th className=" border-0 p-3">S.No.</th>
                        <th className=" border-0 p-3">Label</th>
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
                            <EditIcon
                              className="m-1 pointer"
                              onClick={() =>
                                setUserAction({
                                  type: "addModel",
                                  id: make._id,
                                })
                              }
                            />
                            <EditIcon
                              className="m-1 pointer"
                              onClick={() =>
                                setUserAction({
                                  type: "editMake",
                                  id: make._id,
                                })
                              }
                            />
                            <DeleteIcon
                              className="m-1 pointer"
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
                          <td className="p-3">{model.type?.join(", ")}</td>
                          <td className="p-3 border-0">
                            <EditIcon
                              className="m-1 pointer"
                              onClick={() =>
                                setUserAction({
                                  type: "editModel",
                                  id: model._id,
                                })
                              }
                            />
                            <DeleteIcon
                              className="m-1 pointer"
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
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Container>
        </section>
      </NonAuthLayout>
      {(userAction?.type === "addModel" ||
        userAction?.type === "editModel") && (
        <AddModelPopup
          userAction={userAction}
          setUserAction={setUserAction}
          handleModelList={handleModelList}
        />
      )}
      {(userAction?.type === "addMake" || userAction?.type === "editMake") && (
        <AddOrUpdateMake
          userAction={userAction}
          setUserAction={setUserAction}
          handleMakeList={handleMakeList}
        />
      )}

      {(userAction?.type === "deleteMake" ||
        userAction?.type === "deleteModel") && (
        <DeletePopup
          userAction={userAction}
          setUserAction={setUserAction}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default MakeAndModel;
