import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { handleApiRequest } from "../../../../services/handleApiRequest";
import {
  createCity,
  getCityDetails,
  updateCityDetails,
} from "../../../../redux/states/country/thunk";

const AddCityPopup = ({ userAction, setUserAction, handleCityList }) => {
  const { cityDetails } = useSelector((state) => state.countryAndCity);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setUserAction(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCityDetails = async () => {
    await handleApiRequest(getCityDetails, userAction.id);
  };

  const handleAddOrUpdateCity = async (e) => {
    e.preventDefault();
    const request = {
      ...formData,
      country: userAction.id,
    };

    let response = {};
    if (userAction.type === "editCity") {
      response = await handleApiRequest(updateCityDetails, request);
    } else {
      response = await handleApiRequest(createCity, request);
    }

    if (response.status) {
      await handleCityList();
      handleClose();
      setFormData({});
    }
  };

  useEffect(() => {
    if (userAction.type === "editCity") {
      handleCityDetails();
    }
  }, []);

  useEffect(() => {
    if (cityDetails.data) {
      setFormData({
        ...cityDetails.data,
      });
    }
  }, [cityDetails]);

  // console.log("formData", formData);
  // console.log("modelDetails", modelDetails);

  return (
    <>
      <Modal show={userAction} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOrUpdateCity}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name "
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateCity}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCityPopup;
