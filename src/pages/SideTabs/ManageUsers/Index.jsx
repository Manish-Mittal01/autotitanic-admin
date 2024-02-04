import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getAllUsers, userStatus } from "../../../redux/states/user/thunk";

const ManageUsers = () => {
  const { usersList } = useSelector((state) => state.users);
  const [request, setRequest] = useState({
    search_string: "",
    filter_status: "",
    limit: 10,
    page: 1,
    showLoader: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest((prevState) => ({
      ...prevState,
      [name]: value, // Update the corresponding property with the new value
    }));
  };

  const handleUserList = async () => {
    const request = {};
    await handleApiRequest(getAllUsers, request);
  };

  const handleUserStatus = async (id) => {
    const response = await handleApiRequest(userStatus, { userId: id });
    if (response.status) {
      handleUserList();
    }
  };

  useEffect(() => {
    handleUserList();
  }, []);

  console.log("usersList", usersList);

  return (
    <>
      <NonAuthLayout>
        <section className="manageUsers position-relative py-3">
          <Container fluid>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <h2 className="m-0 fw-bold">Manage User</h2>
                      <div className="">
                        <Form.Select
                          name="filter_status"
                          className="form-control rounded-pill"
                          aria-label="Default select example"
                          value={request.filter_status}
                          onChange={handleInputChange}
                        >
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </Form.Select>
                      </div>
                      <div className="searchForm position-relative icon-with-text">
                        <input
                          name="search_string"
                          value={request.search_string}
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Search"
                          className="form-control rounded-pill"
                        />
                        <span className="icn position-absolute">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                          >
                            <path
                              d="M7.1875 13.125C10.4667 13.125 13.125 10.4667 13.125 7.1875C13.125 3.90831 10.4667 1.25 7.1875 1.25C3.90831 1.25 1.25 3.90831 1.25 7.1875C1.25 10.4667 3.90831 13.125 7.1875 13.125Z"
                              stroke="#9DA3BB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.75 13.75L12.5 12.5"
                              stroke="#9DA3BB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <Table className="table  mt-4">
                  <thead className="border-0">
                    <tr className="secondaryColor">
                      <th className=" border-0 p-3">S.No.</th>
                      <th className=" border-0 p-3">Name</th>
                      <th className=" border-0 p-3">Email</th>
                      <th className=" border-0 p-3">Mobile</th>
                      <th className=" border-0 p-3">Country</th>
                      <th className=" border-0 p-3">User Type</th>
                      <th className=" border-0 p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.data?.items?.map((user, idx) => (
                      <tr key={user._id}>
                        <td className="p-3">{idx + 1}</td>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.mobile}</td>
                        <td className="p-3">{user.country?.name}</td>
                        <td className="p-3">{user.userType}</td>
                        <td className="p-3">
                          {user.status === "active" ? (
                            <Button variant="danger" onClick={() => handleUserStatus(user._id)}>
                              Block User
                            </Button>
                          ) : (
                            <Button onClick={() => handleUserStatus(user._id)}>Unblock User</Button>
                          )}
                          {/* <SaveButton
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
                          /> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default ManageUsers;
