import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Col,
  Container,
  Form,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as SaveIcon } from "../../../assets/icons/save.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { handleApiRequest } from "../../../services/handleApiRequest";
import {
  deleteMake,
  deleteModel,
  deleteVariant,
  getAllMake,
  getAllModel,
  getAllVariant,
} from "../../../redux/states/makeAndModel/thunk";
import AddModelPopup from "./Component/AddModelPopup";
import AddOrUpdateMake from "./Component/AddOrUpdateMake";
import DeletePopup from "../../../components/Modals/DeletePop";
import MyPagination from "../../../components/common/myPagination";
import { categories, defaultPage } from "../../../utils/constants";
import MyTooltip from "../../../components/common/tooltip";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  DeleteButton,
  EditButton,
  SaveButton,
} from "../../../components/common/actionButtons";
import AddVariantPopup from "./Component/AddVariantPop";

const MakeAndModel = () => {
  const navigate = useNavigate();
  const { allMakeList, allModelList, allVariantList } = useSelector(
    (state) => state.makeAndModel
  );
  const [userAction, setUserAction] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [paginationDetails, setPaginationDetails] = useState(defaultPage);

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
    setPaginationDetails(defaultPage);
  };

  const handleMakeList = async (searchQuery) => {
    const request = {
      ...paginationDetails,
      search: searchQuery,
    };
    await handleApiRequest(getAllMake, request);
  };

  const handleModelList = async (searchQuery) => {
    const request = {
      ...paginationDetails,
      search: searchQuery,
    };
    await handleApiRequest(getAllModel, request);
  };

  const handleVariantList = async (searchQuery) => {
    const request = {
      ...paginationDetails,
      search: searchQuery,
    };
    await handleApiRequest(getAllVariant, request);
  };

  const handleDeleteMake = async () => {
    await handleApiRequest(deleteMake, { makeId: userAction.id });
    await handleMakeList();
  };
  const handleDeleteModel = async () => {
    await handleApiRequest(deleteModel, { modelId: userAction.id });
    await handleModelList();
  };
  const handleDeleteVariant = async () => {
    await handleApiRequest(deleteVariant, { id: userAction.id });
    await handleVariantList();
  };

  const handleDelete = () => {
    if (userAction.type === "deleteMake") {
      handleDeleteMake();
    } else if (userAction.type === "deleteModel") {
      handleDeleteModel();
    } else if (userAction?.type === "deleteVariant") {
      handleDeleteVariant();
    }
  };

  const debounceSearch = debounce(
    (e) => {
      const search = e.target.value;
      if (activeTab === 1) {
        handleMakeList(search);
      } else if (activeTab === 2) {
        handleModelList(search);
      } else if (activeTab === 3) {
        handleVariantList(search);
      }
    },
    [1000]
  );

  useEffect(() => {
    if (activeTab === 1) {
      handleMakeList();
    } else if (activeTab === 2) {
      handleModelList();
    } else if (activeTab === 3) {
      handleVariantList();
    }
  }, [paginationDetails, activeTab]);

  // console.log("allMakeList", allMakeList);
  // console.log("allModelList", allModelList);

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
                    {activeTab === 1 && (
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
                    )}
                  </div>
                </div>
              </Col>
              <Col lg="12" className="my-2">
                <div className="Box">
                  <div className="filterWrp pb-3 px-lg-3 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10 border-bottom">
                    <div className="left d-flex align-items-end gap-10 flex-wrap">
                      <div className="">
                        <b>Category</b>
                        <Form.Select
                          name="filter_status"
                          className="form-control rounded-pill"
                          aria-label="Default select example"
                          value={paginationDetails.category}
                          onChange={(e) => {
                            const category = e.target.value;
                            setPaginationDetails((prev) => {
                              return { ...prev, category: category };
                            });
                            navigate(`/make?category=${category}`);
                          }}
                        >
                          <option value="">All</option>
                          {categories?.map((category) => (
                            <option value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="searchForm position-relative icon-with-text">
                        <input
                          name="search_string"
                          type="text"
                          placeholder={
                            activeTab === 1
                              ? "Search by Make"
                              : activeTab === 2
                              ? "Search by Model"
                              : "Search by Variant"
                          }
                          className="form-control rounded-pill"
                          onChange={debounceSearch}
                        />
                        <span className="icn position-absolute">
                          <SearchIcon />
                        </span>
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
                          <td className="p-3">{model.type?.join(", ")}</td>
                          <td className="p-3 border-0">
                            <SaveButton
                              tooltipText={"Add Variant"}
                              onClick={() => {
                                setUserAction({
                                  type: "addVariant",
                                  id: model._id,
                                });
                              }}
                            />

                            <EditButton
                              tooltipText={`Edit model`}
                              onClick={() =>
                                setUserAction({
                                  type: "editVariant",
                                  id: model._id,
                                })
                              }
                            />
                            <DeleteButton
                              tooltipText={"Delete Model"}
                              onClick={() =>
                                setUserAction({
                                  type: "deleteVariant",
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
            </Tab.Container>
          </Container>
        </section>
      </NonAuthLayout>

      {(userAction?.type === "addVariant" ||
        userAction?.type === "editVariant") && (
        <AddVariantPopup
          userAction={userAction}
          setUserAction={setUserAction}
          handleVariantList={handleVariantList}
        />
      )}
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
        userAction?.type === "deleteModel" ||
        userAction?.type === "deleteVariant") && (
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
