import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Col,
  Container,
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
import AddOrUpdateMake from "./Component/AddOrUpdateMake";
import DeletePopup from "../../../components/Modals/DeletePop";
import {
  deleteCity,
  deleteCountry,
  getAllCity,
  getAllCountry,
} from "../../../redux/states/country/thunk";
import AddCityPopup from "./Component/AddCityPopup";
import MyPagination from "../../../components/common/myPagination";
import { defaultPage } from "../../../utils/constants";
import MyTooltip from "../../../components/common/tooltip";
import { debounce } from "lodash";

const CountryAndCity = () => {
  const { allCountryList, allCityList } = useSelector(
    (state) => state.countryAndCity
  );
  const [userAction, setUserAction] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [paginationDetails, setPaginationDetails] = useState(defaultPage);

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
    setPaginationDetails(defaultPage);
  };

  const handleCountryList = async (searchQuery) => {
    const request = {
      ...paginationDetails,
      search: searchQuery,
    };
    await handleApiRequest(getAllCountry, request);
  };

  const handleCityList = async (searchQuery) => {
    const request = {
      ...paginationDetails,
      search: searchQuery,
    };
    await handleApiRequest(getAllCity, request);
  };

  const handleDeleteCountry = async () => {
    await handleApiRequest(deleteCountry, userAction.id);
    await handleCountryList();
  };

  const handleDeleteCity = async () => {
    await handleApiRequest(deleteCity, userAction.id);
    await handleCityList();
  };

  const handleDelete = () => {
    if (userAction.type === "deleteCountry") {
      handleDeleteCountry();
    } else {
      handleDeleteCity();
    }
  };

  const debounceSearch = debounce(
    (e) => {
      const search = e.target.value;
      if (activeTab === 1) {
        handleCountryList(search);
      } else if (activeTab === 2) {
        handleCityList(search);
      }
    },
    [1000]
  );

  useEffect(() => {
    if (activeTab === 1) {
      handleCountryList();
    } else if (activeTab === 2) {
      handleCityList();
    }
  }, [paginationDetails, activeTab]);

  return (
    <>
      <NonAuthLayout>
        <section className="Transaction py-3 position-relative">
          <Container fluid>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp pb-3  px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10 border-bottom">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <h2 className="m-0 fw-bold">Locations</h2>
                      <div className="searchForm position-relative icon-with-text">
                        <input
                          name="search_string"
                          type="text"
                          placeholder={
                            activeTab === 1
                              ? "Search by Country"
                              : "Search by City"
                          }
                          className="form-control rounded-pill"
                          onChange={debounceSearch}
                        />
                        <span className="icn position-absolute">
                          <SearchIcon />
                        </span>
                      </div>
                    </div>
                    {activeTab === 1 && (
                      <div className="right d-flex align-items-center flex-wrap gap-10">
                        <div className="d-flex text-dark align-items-center btn justify-content-center rounded-pill gap-10">
                          <p
                            className="m-0 fw-normal text-muted"
                            onClick={() => {
                              setUserAction({ type: "addCountry" });
                            }}
                          >
                            Add Country
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>

            <Tab.Container id="left-tabs-example" defaultActiveKey="country">
              <Nav variant="tabs" className="underLineTab">
                <Nav.Item>
                  <Nav.Link
                    className="bg-transparent text-dark"
                    eventKey="country"
                    onClick={() => handleActiveTabChange(1)}
                  >
                    Country
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="bg-transparent text-dark"
                    eventKey="city"
                    onClick={() => handleActiveTabChange(2)}
                  >
                    City
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="pt-3">
                <Tab.Pane eventKey="country">
                  <Table className="table  mt-4">
                    <thead className="border-0">
                      <tr className="secondaryColor">
                        <th className=" border-0 p-3">S.No.</th>
                        <th className=" border-0 p-3">Country</th>
                        <th className=" border-0 p-3">Code</th>
                        <th className=" border-0 p-3">Currency</th>
                        <th className=" border-0 p-3">Flag</th>
                        <th className=" border-0 p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCountryList.data?.items?.map((country, idx) => {
                        return (
                          <tr>
                            <td className="p-3 border-0">{idx + 1}</td>
                            <td className="p-3 border-0">{country?.name}</td>
                            <td className="p-3 border-0">
                              {country?.countryCode}
                            </td>
                            <td className="p-3 border-0">
                              {country?.currency}
                            </td>
                            <td className="p-3 border-0">
                              <img
                                src={country?.flag}
                                style={{
                                  height: "60px",
                                  width: "60px",
                                  borderRadius: "50%",
                                }}
                              />
                            </td>
                            <td className="p-3 border-0">
                              <OverlayTrigger
                                overlay={MyTooltip("Add new city")}
                              >
                                <SaveIcon
                                  data-tooltip-id="deleteMake"
                                  data-tooltip-content="Delete this Make"
                                  className="m-1 pointer"
                                  onClick={() =>
                                    setUserAction({
                                      type: "addCity",
                                      id: country._id,
                                    })
                                  }
                                />
                              </OverlayTrigger>

                              <OverlayTrigger
                                overlay={MyTooltip("Update country")}
                              >
                                <EditIcon
                                  // data-tooltip-id="deleteMake"
                                  // data-tooltip-content="Delete this Make"
                                  className="m-1 pointer"
                                  onClick={() =>
                                    setUserAction({
                                      type: "editCountry",
                                      id: country._id,
                                    })
                                  }
                                />
                              </OverlayTrigger>
                              <OverlayTrigger
                                overlay={MyTooltip("Delete country")}
                              >
                                <DeleteIcon
                                  // data-tooltip-id="deleteMake"
                                  // data-tooltip-content="Delete this Make"
                                  className="m-1 pointer"
                                  onClick={() =>
                                    setUserAction({
                                      type: "deleteCountry",
                                      id: country._id,
                                    })
                                  }
                                />
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <MyPagination
                    paginationDetails={paginationDetails}
                    setPaginationDetails={setPaginationDetails}
                    totalPosts={allCountryList.data?.totalCount}
                  />
                </Tab.Pane>

                <Tab.Pane eventKey="city">
                  <Table className="table  mt-4">
                    <thead className="border-0">
                      <tr className="secondaryColor">
                        <th className=" border-0 p-3">S.No.</th>
                        <th className=" border-0 p-3">City Name</th>
                        <th className=" border-0 p-3">Country</th>
                        <th className=" border-0 p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCityList.data?.items?.map((city, idx) => {
                        return (
                          <tr>
                            <td className="p-3 border-0">{idx + 1}</td>
                            <td className="p-3 border-0">{city?.name}</td>
                            <td className="p-3 border-0">
                              {city?.country?.name}
                            </td>
                            <td className="p-3 border-0">
                              <EditIcon
                                className="m-1 pointer"
                                onClick={() =>
                                  setUserAction({
                                    type: "editCity",
                                    id: city._id,
                                  })
                                }
                              />
                              <DeleteIcon
                                className="m-1 pointer"
                                onClick={() =>
                                  setUserAction({
                                    type: "deleteCity",
                                    id: city._id,
                                  })
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <MyPagination
                    paginationDetails={paginationDetails}
                    setPaginationDetails={setPaginationDetails}
                    totalPosts={allCityList.data?.totalCount}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Container>
        </section>
      </NonAuthLayout>

      {(userAction?.type === "addCity" || userAction?.type === "editCity") && (
        <AddCityPopup
          userAction={userAction}
          setUserAction={setUserAction}
          handleCityList={handleCityList}
        />
      )}

      {(userAction?.type === "addCountry" ||
        userAction?.type === "editCountry") && (
        <AddOrUpdateMake
          userAction={userAction}
          setUserAction={setUserAction}
          handleMakeList={handleCountryList}
        />
      )}

      {(userAction?.type === "deleteCountry" ||
        userAction?.type === "deleteCity") && (
        <DeletePopup
          userAction={userAction}
          setUserAction={setUserAction}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default CountryAndCity;
