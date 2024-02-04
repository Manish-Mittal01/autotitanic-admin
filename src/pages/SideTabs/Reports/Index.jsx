import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Nav, Row, Tab, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getVehicleList } from "../../../redux/states/vehicles/thunk";
import VehicleCard from "./Component/vehicleCard";
import { categories, postStatus } from "../../../utils/constants";

const Vehicles = () => {
  const { vehicleList } = useSelector((state) => state.vehicles);
  const [filters, setFilters] = useState({});

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehicleList = async () => {
    const request = {};
    Object.keys(filters).forEach((filter) => {
      request[filter] = filters[filter]?.value;
    });
    await handleApiRequest(getVehicleList, { filters: request });
  };

  useEffect(() => {
    handleVehicleList();
  }, [filters]);

  // console.log("vehicleList", vehicleList);

  return (
    <>
      <NonAuthLayout>
        <section className="reports py-3 position-relative">
          <Container fluid>
            <Row>
              <Col lg="12" className="">
                <div className="Box border-bottom my-3 ">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <h2 className="m-0 fw-bold">Inventory</h2>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="12" className="">
                <Row>
                  <Col lg={3} className="ps-lg-5 ps-3 ">
                    <b>Category</b>
                    <Select
                      options={categories}
                      value={filters.type}
                      onChange={(selected) => {
                        handleChange("type", selected);
                      }}
                    />
                  </Col>
                  <Col lg={3} className="">
                    <b>Status</b>
                    <Select
                      options={postStatus}
                      value={filters.status || ""}
                      onChange={(selected) => {
                        handleChange("status", selected);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Col>
                  {vehicleList.data?.totalCount > 0 ? (
                    vehicleList.data?.items?.map((vehicle) => (
                      <VehicleCard vehicle={vehicle} handleVehicleList={handleVehicleList} />
                    ))
                  ) : (
                    <h4 className="text-center my-5">No items found</h4>
                  )}
                </Col>
              </Col>
            </Row>
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default Vehicles;
